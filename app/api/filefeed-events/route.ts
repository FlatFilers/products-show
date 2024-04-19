import { authenticatedRoute } from "@/lib/api-helpers";
import { serializeFilefeedEvents } from "@/lib/serializers/filefeed-event";
import { ActionService } from "@/lib/services/action";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (rq, cxt) => {
    const actions = await ActionService.getFilefeedEvents({
      userId: cxt.user.id,
    });

    return NextResponse.json(
      { actions: serializeFilefeedEvents(actions) },
      { status: 200 }
    );
  });
};
