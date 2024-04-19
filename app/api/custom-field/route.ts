import { authenticatedRoute } from "@/lib/api-helpers";
import { CustomFieldService } from "@/lib/services/custom-field";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/custom-field:
 *   post:
 *     tags: [/api/]
 *     summary: Create a new custom field
 *     description: Creates a new custom field for the logged-in user.
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
 *               name:
 *                 type: string
 *                 description: The name of the custom field.
 *               type:
 *                 type: string
 *                 description: The type of the custom field.
 *               required:
 *                 type: boolean
 *                 description: Whether the custom field is required.
 *               dateFormat:
 *                 type: string
 *                 description: The date format for the custom field.
 *               decimals:
 *                 type: number
 *                 description: The number of decimals for the custom field.
 *               enumOptions:
 *                 type: array
 *                 description: The enum options for the custom field.
 *     responses:
 *       201:
 *         description: Successfully created the custom field.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 customField:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     userId:
 *                       type: string
 *                     name:
 *                       type: string
 *                     type:
 *                       type: string
 *                     required:
 *                       type: boolean
 *                     dateFormat:
 *                       type: string
 *                     decimals:
 *                       type: number
 *                     enumOptions:
 *                       type: array
 *                       items:
 *                         type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 *       500:
 *         description: Error creating the custom field.
 *
 *   delete:
 *     summary: Delete custom field
 *     description: Deletes the custom field for the logged-in user.
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
 *         description: Successfully deleted the custom field.
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const POST = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (rq, cxt) => {
    const json = await request.json();

    const customField = await CustomFieldService.upsert({
      userId: cxt.user.id,
      data: {
        userId: cxt.user.id,
        name: json.name,
        type: json.type,
        required: json.required,
        dateFormat: json.dateFormat,
        decimals: json.decimals,
        enumOptions: json.enumOptions,
      },
    });

    return NextResponse.json({ customField }, { status: 201 });
  });
};

/**
 * @swagger
 * /api/custom-field:
 *   delete:
 *     tags: [/api/]
 *     summary: Delete custom field
 *     description: Deletes the custom field for the logged-in user.
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
 *         description: Successfully deleted the custom field.
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const DELETE = async (
  request: NextRequest,
  context: { params: any }
) => {
  return authenticatedRoute(request, context, async (rq, cxt) => {
    await CustomFieldService.delete({
      userId: cxt.user.id,
    });

    return NextResponse.json({}, { status: 201 });
  });
};
