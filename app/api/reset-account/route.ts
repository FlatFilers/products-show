import { authenticatedRoute } from "@/lib/api-helpers";
import { ResetAccountService } from "@/lib/services/reset-account";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reset-account:
 *   post:
 *     summary: Reset the account
 *     description: Resets the account for the logged-in user.
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
 *     responses:
 *       201:
 *         description: Successfully reset the account.
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const POST = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (rq, cxt) => {
    const userId = cxt.user.id;

    await ResetAccountService.resetAccount({ userId });

    return NextResponse.json({}, { status: 201 });
  });
};
