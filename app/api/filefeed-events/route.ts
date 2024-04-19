import { authenticatedRoute } from "@/lib/api-helpers";
import { serializeFilefeedEvents } from "@/lib/serializers/filefeed-event";
import { ActionService } from "@/lib/services/action";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/filefeed-events:
 *   get:
 *     tags: [/api/]
 *     summary: Retrieve all filefeed events for the logged-in user
 *     description: Returns a list of filefeed events associated with the logged-in user.
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
 *       - in: header
 *         name: x-space-id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the filefeed events.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 actions:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       actionType:
 *                         type: string
 *                       createdAt:
 *                         type: string
 *                       data:
 *                         type: object
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

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
