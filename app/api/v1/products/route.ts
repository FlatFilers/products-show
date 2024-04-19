import { apiAuthenticatedRoute } from "@/lib/api-helpers";
import { ProductService } from "@/lib/services/product";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     tags: [/api/v1/]
 *     summary: Retrieve all products for the logged-in user
 *     description: Returns a list of products associated with the logged-in user.
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
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       name:
 *                        type: string
 *                       description:
 *                        type: string
 *                       price:
 *                        type: number
 *                       quantity:
 *                        type: number
 *                       imageUrl:
 *                        type: string
 *                       externalProductId:
 *                        type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const GET = (
  req: NextRequest,
  context: { params: { userId: string } }
) =>
  apiAuthenticatedRoute(req, context, async (rq, cxt) => {
    const products = await ProductService.getAll({
      userId: cxt.user.id,
    });

    const mappedProducts = products.map((p) => {
      return {
        externalProductId: p.externalProductId,
        name: p.name,
        description: p.description,
        price: p.price,
        quantity: p.quantity,
        imageUrl: p.imageUrl,
      };
    });

    return NextResponse.json(
      { products: mappedProducts },
      {
        status: 200,
      }
    );
  });
