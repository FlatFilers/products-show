import { NextRequest, NextResponse } from "next/server";
import invariant from "ts-invariant";
import { authenticatedRoute } from "@/lib/api-helpers";
import { SpaceService } from "@/lib/services/space";

/**
 * @swagger
 * /api/visit-space/{spaceId}:
 *   get:
 *     summary: Get guest link for space
 *     description: Returns the guest link for the space.
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
 *       - in: path
 *         name: spaceId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the guest link.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guestLink:
 *                   type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 *       500:
 *         description: Error getting guest link.
 */

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
