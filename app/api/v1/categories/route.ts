import { apiAuthenticatedRoute } from "@/lib/api-helpers";
import { CategoryService } from "@/lib/services/category";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/categories:
 *   get:
 *     tags: [/api/v1/]
 *     summary: Retrieve all categories for the logged-in user
 *     description: Returns a list of categories associated with the logged-in user.
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
 *         description: Successfully retrieved the categories.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       externalCategoryId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       description:
 *                         type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const GET = (
  req: NextRequest,
  context: { params: { userId: string } }
) =>
  apiAuthenticatedRoute(req, context, async (rq, cxt) => {
    const categories = await CategoryService.getCategoriesForUser(cxt.user.id);

    const mappedCategories = categories.map((c) => {
      return {
        externalCategoryId: c.externalCategoryId,
        name: c.name,
        description: c.description,
      };
    });

    return NextResponse.json(
      { categories: mappedCategories },
      {
        status: 200,
      }
    );
  });
