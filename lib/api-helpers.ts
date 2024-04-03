import { BadRequestError, NotFoundError, UnauthorizedError } from "@/lib/error";
import { getServerSession } from "@/lib/get-server-session";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { SessionUser } from "@/nextauth";
import { UserService } from "@/lib/services/user";

type RequestHandler = (
  req: NextRequest,
  context: { params: any } | null
) => Promise<NextResponse>;
type AuthenticatedRequestHandler = (
  req: NextRequest,
  context: { user: SessionUser; params?: any }
) => Promise<NextResponse>;

// Utility function to check for Prisma errors
function isPrismaError(
  error: any
): error is Prisma.PrismaClientKnownRequestError {
  return error instanceof Prisma.PrismaClientKnownRequestError;
}

const handlePrismaError = (e: Prisma.PrismaClientKnownRequestError) => {
  // Unique constraint
  if (e.code === "P2002") {
    return NextResponse.json(
      { errors: { type: "unique-constraint", fields: e.meta?.target } },
      { status: 400 }
    );
  }
  // Not found error
  else if (e.code === "P2025") {
    return NextResponse.json(
      { errors: { type: "not-found" } },
      { status: 404 }
    );
  }
};

/**
 * Error handling that can be applied to any route wrapper
 *
 * @param e
 * @returns
 */
const baseErrorHandler = (e: any) => {
  console.error(`[baseErrorHandler] error`, JSON.stringify(e, null, 2));

  if (isPrismaError(e)) {
    return handlePrismaError(e);
  }

  // Validation error (via zod)
  if (e instanceof ZodError) {
    return NextResponse.json(e.errors, { status: 400 });
  }

  // Auth check failed
  if (e instanceof UnauthorizedError) {
    return NextResponse.json(
      { errors: { Unauthorized: "You are not authorized" } },
      { status: 401 }
    );
  } else if (e instanceof NotFoundError) {
    return NextResponse.json(
      { errors: { NotFound: "Resource not found" } },
      { status: 404 }
    );
  } else if (e instanceof BadRequestError) {
    return NextResponse.json(
      { errors: { name: e.name, message: e.message } },
      { status: 400 }
    );
  }

  // Generic error
  if (process.env.NODE_ENV === "development") {
    console.error(`Error:`, e.message);
  }

  return NextResponse.json({ error: "An error occurred" }, { status: 500 });
};

export const unauthenticatedRoute = async (
  request: NextRequest,
  context: { params: any } | null,
  requestHandler: RequestHandler
) => {
  try {
    let res = await requestHandler(request, context);
    return res;
  } catch (e) {
    return baseErrorHandler(e);
  }
};

export const authenticatedRoute = async (
  request: NextRequest,
  context: { params: any } | null,
  requestHandler: AuthenticatedRequestHandler
) => {
  let session = await getServerSession();

  try {
    invariant(session?.user.id, "User must be logged in");

    let res = await requestHandler(request, {
      ...context,
      user: session.user,
    });
    return res;
  } catch (e) {
    return baseErrorHandler(e);
  }
};

export const apiAuthenticatedRoute = async (
  request: NextRequest,
  context: { params: any } | null,
  requestHandler: AuthenticatedRequestHandler
) => {
  try {
    const listenerAuthToken = request.headers.get("x-listener-auth");

    invariant(
      listenerAuthToken &&
        listenerAuthToken === process.env.LISTENER_AUTH_TOKEN,
      "Invalid listener auth token"
    );

    const userId = request.headers.get("x-user-id");
    invariant(userId, "No x-user-id header provided");

    const user = await UserService.findUserOrThrow({ userId });

    let res = await requestHandler(request, {
      ...context,
      user,
    });
    return res;
  } catch (e) {
    return baseErrorHandler(e);
  }
};
