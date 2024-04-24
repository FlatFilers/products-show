import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { authenticatedRoute } from "@/lib/api-helpers";
import { FlatfileService } from "@/lib/services/flatfile";
import { SpaceService } from "@/lib/services/space";

export const PUT = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (req, ctx) => {
    const spaceId = ctx.params.spaceId;
    invariant(spaceId, "Requires flatfile space id");

    const language = req.nextUrl.searchParams.get("language") as string;
    invariant(language, "Requires language");

    const space = await SpaceService.getSpace({
      id: spaceId,
    });

    if (!space) {
      return NextResponse.json({ error: "Space not found" }, { status: 404 });
    }

    const flatfileSpaceId = space.flatfileSpaceId;

    await FlatfileService.updateLanguage({
      flatfileSpaceId,
      language,
    });

    return NextResponse.json({}, { status: 200 });
  });
};
