import { unauthenticatedRoute } from "@/lib/api-helpers";
import { SyncService } from "@/lib/services/sync";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

export const GET = (
  req: NextRequest,
  context: { params: { flatfileSpaceId: string } }
) =>
  unauthenticatedRoute(req, context, async (rq, cxt) => {
    const flatfileSpaceId = context.params.flatfileSpaceId;
    invariant(flatfileSpaceId, "No spaceId provided");

    let syncedFlatfileRecordIds;
    try {
      syncedFlatfileRecordIds = await SyncService.syncSpace({
        flatfileSpaceId,
      });
    } catch (e) {
      console.error(`Error syncing space:`, e);

      return NextResponse.json(
        { message: `Error syncing space ${flatfileSpaceId}` },
        {
          status: 500,
        }
      );
    }

    return NextResponse.json(
      { syncedFlatfileRecordIds },
      {
        status: 200,
      }
    );
  });
