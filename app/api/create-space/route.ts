import { SpaceService } from "@/lib/services/space";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { authenticatedRoute } from "@/lib/api-helpers";

export const POST = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (request, context) => {
    let json = await request.json();
    invariant(json.workflowType, "Requires workflow type");
    invariant(json.spaceName, "Requires space name");

    const userId = context.user.id;

    let space;
    try {
      space = await SpaceService.createSpace({
        workflowType: json.workflowType,
        userId,
        spaceName: json.spaceName,
      });
    } catch (e) {
      console.error(`Error creating space for ${userId}`, e);
      return new NextResponse("Error creating space", { status: 500 });
    }

    return NextResponse.json({ spaceId: space.id }, { status: 201 });
  });
};
