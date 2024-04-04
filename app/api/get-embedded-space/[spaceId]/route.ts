import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { authenticatedRoute } from "@/lib/api-helpers";
import { SpaceService } from "@/lib/services/space";

export const GET = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (_req, ctx) => {
    const spaceId = ctx.params.spaceId;
    invariant(spaceId, "Requires space id");

    try {
      const guestLink = await SpaceService.getSpaceGuestLink({
        spaceId,
      });

      return NextResponse.json({ guestLink }, { status: 200 });
    } catch (e) {
      console.error(`Error getting guest link for space ${spaceId}`, e);
      return NextResponse.json(
        { error: "Error getting guest link" },
        { status: 500 }
      );
    }
  });
};
