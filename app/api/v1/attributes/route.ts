import { apiAuthenticatedRoute } from "@/lib/api-helpers";
import { AttributeService } from "@/lib/services/attribute";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/attributes:
 *   get:
 *     summary: Retrieve all attributes for the logged-in user
 *     description: Returns a list of attributes associated with the logged-in user.
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
 *         description: Successfully retrieved the attributes.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 attributes:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       value:
 *                         type: string
 *                       unit:
 *                         type: string
 *                       externalId:
 *                         type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const GET = (
  req: NextRequest,
  context: { params: { userId: string } }
) =>
  apiAuthenticatedRoute(req, context, async (rq, cxt) => {
    const attributes = await AttributeService.getAll({
      userId: cxt.user.id,
    });

    const mappedAttributes = attributes.map((a) => {
      return {
        name: a.name,
        value: a.value,
        unit: a.unit,
        externalId: a.externalAttributeId,
      };
    });

    return NextResponse.json(
      { attributes: mappedAttributes },
      {
        status: 200,
      }
    );
  });
