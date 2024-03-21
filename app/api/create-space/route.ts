import { getServerSession } from "@/lib/get-server-session";
import { SpaceService } from "@/lib/services/space";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

export const POST = async (req: NextRequest) => {
  const session = await getServerSession();

  invariant(session, "Requires session");
  invariant(session.user, "Requires user");

  let json = await req.json();
  invariant(json.workflowType, "Requires workflow type");
  invariant(json.spaceName, "Requires space name");

  let space;
  try {
    space = await SpaceService.createSpace({
      workflowType: json.workflowType,
      userId: session.user.id,
      spaceName: json.spaceName,
    });
  } catch (e) {
    console.error(`Error creating space for ${session.user.id}`, e);
    return new NextResponse("Error creating space", { status: 500 });
  }

  return NextResponse.json({ spaceId: space.id }, { status: 201 });
};
