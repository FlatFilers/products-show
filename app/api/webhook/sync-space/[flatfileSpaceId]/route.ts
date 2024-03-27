import { unauthenticatedRoute } from "@/lib/api-helpers";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

export const GET = (
  req: NextRequest,
  context: { params: { flatfileSpaceId: string } }
) =>
  unauthenticatedRoute(req, context, async (rq, cxt) => {
    const spaceId = context.params.flatfileSpaceId;
    invariant(spaceId, "No spaceId provided");

    try {
      // sync
    } catch (e) {
      console.error(`Error upserting client:`, e);

      return NextResponse.json(
        { message: `Error syncing space ${spaceId}` },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { message: "Synced space" },
      {
        status: 200,
      }
    );
  });
