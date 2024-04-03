import { unauthenticatedRoute } from "@/lib/api-helpers";
import { AttributeService } from "@/lib/services/attribute";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

export const GET = (
  req: NextRequest,
  context: { params: { userId: string } }
) =>
  unauthenticatedRoute(req, context, async (rq, cxt) => {
    const searchParams = rq.nextUrl.searchParams;
    const userId = searchParams.get("userId");
    invariant(userId, "No userId provided");

    const attributes = await AttributeService.getAll({
      userId,
    });

    const mappedAttributes = attributes.map((a) => {
      return {
        name: a.name,
        value: a.value,
        unit: a.unit,
      };
    });

    return NextResponse.json(
      { attributes: mappedAttributes },
      {
        status: 200,
      }
    );
  });
