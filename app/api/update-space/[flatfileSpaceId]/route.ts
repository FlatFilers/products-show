import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { authenticatedRoute } from "@/lib/api-helpers";
import { FlatfileService } from "@/lib/services/flatfile";

export const PUT = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (req, ctx) => {
    const flatfileSpaceId = ctx.params.flatfileSpaceId;
    invariant(flatfileSpaceId, "Requires flatfile space id");

    const language = req.nextUrl.searchParams.get("language") as string;

    try {
      await FlatfileService.updateSpace({
        flatfileSpaceId,
        language,
      });

      return NextResponse.json({}, { status: 200 });
    } catch (e) {
      console.error(`Error updating space ${flatfileSpaceId}`, e);
      return NextResponse.json(
        { error: "Error updating space" },
        { status: 500 }
      );
    }
  });
};
