import { unauthenticatedRoute } from "@/lib/api-helpers";
import { SyncService } from "@/lib/services/sync";
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
      await SyncService.syncSpace({
        flatfileSpaceId: "us_sp_V6Ep7AA8",
      });
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
