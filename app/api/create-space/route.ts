import { authenticatedRoute } from "@/lib/api-helpers";
import { fetchFileFromDrive } from "@/lib/google-drive";
import { FlatfileService } from "@/lib/services/flatfile";
import { SpaceService } from "@/lib/services/space";
import { UserService } from "@/lib/services/user";
import { WorkflowType } from "@/lib/workflow-type";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

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

    if (space.workflowType === WorkflowType.FileFeed) {
      const file = await fetchFileFromDrive();
      await FlatfileService.postFileToSpace({
        flatfileSpaceId: space.flatfileSpaceId,
        file,
      });
    }

    if (space.workflowType === WorkflowType.ProjectOnboarding) {
      const user = await UserService.findUserBySpaceOrThrow({
        flatfileSpaceId: space.flatfileSpaceId,
      });

      await FlatfileService.createAndInviteGuest({
        flatfileSpaceId: space.flatfileSpaceId,
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
      });
    }

    return NextResponse.json({ spaceId: space.id }, { status: 201 });
  });
};
