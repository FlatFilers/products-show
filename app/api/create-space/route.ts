import { authenticatedRoute } from "@/lib/api-helpers";
import { fetchFileFromDrive } from "@/lib/google-drive";
import { FlatfileService } from "@/lib/services/flatfile";
import { SpaceService } from "@/lib/services/space";
import { WorkflowType } from "@/lib/workflow-type";
import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";

/**
 * @swagger
 * /api/create-space:
 *   post:
 *     tags: [/api/]
 *     summary: Create a new space
 *     description: Creates a new space for the logged-in user.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         required: true
 *         schema:
 *           type: string
 *         description: Bearer token for authentication.
 *       - in: header
 *         name: x-listener-auth
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               workflowType:
 *                 type: string
 *                 description: The type of workflow for the space.
 *               spaceName:
 *                 type: string
 *                 description: The name of the space.
 *     responses:
 *       201:
 *         description: Successfully created the space.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 spaceId:
 *                   type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 *       500:
 *         description: Error creating the space.
 */

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

    return NextResponse.json({ spaceId: space.id }, { status: 201 });
  });
};
