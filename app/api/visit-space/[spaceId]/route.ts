import { FlatfileService } from "@/lib/services/flatfile";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { authenticatedRoute } from "@/lib/api-helpers";

export const GET = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (_req, ctx) => {
    const spaceId = ctx.params.spaceId;
    invariant(spaceId, "Requires space id");

    let space;
    try {
      space = await FlatfileService.getSpace({
        spaceId,
      });
    } catch (e) {
      console.error(`Error getting space for ${spaceId}`, e);
      return new NextResponse("Error getting space", { status: 500 });
    }

    return NextResponse.json({ guestLink: space.guestLink }, { status: 200 });
  });
};
