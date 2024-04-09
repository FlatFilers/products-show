import { ActionType } from "@/lib/action";
import { unauthenticatedRoute } from "@/lib/api-helpers";
import { ActionService } from "@/lib/services/action";
import { SpaceService } from "@/lib/services/space";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

export const POST = (
  req: NextRequest,
  context: { params: { flatfileSpaceId: string } }
) =>
  unauthenticatedRoute(req, context, async (rq, cxt) => {
    const { spaceId, topic } = await rq.json();
    invariant(spaceId, "Requires spaceId");
    invariant(topic, "Requires topic");

    const space = await SpaceService.getSpaceByFlatfileSpaceId({
      flatfileSpaceId: spaceId,
    });

    await ActionService.createAction({
      data: {
        userId: space.userId,
        type: ActionType.FileFeedEvent,
        description: topic,
        metadata: {
          topic,
        },
      },
    });

    return NextResponse.json(
      {},
      {
        status: 201,
      }
    );
  });
