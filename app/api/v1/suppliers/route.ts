import { apiAuthenticatedRoute } from "@/lib/api-helpers";
import { SupplierService } from "@/lib/services/supplier";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/v1/suppliers:
 *   get:
 *     tags: [/api/v1/]
 *     summary: Retrieve all suppliers for the logged-in user
 *     description: Returns a list of suppliers associated with the logged-in user.
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
 *         description: Successfully retrieved the suppliers.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 suppliers:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       externalSupplierId:
 *                         type: string
 *                       name:
 *                         type: string
 *                       email:
 *                         type: string
 *                       phone:
 *                         type: string
 *                       address:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       country:
 *                         type: string
 *       401:
 *         description: Unauthorized, if the user is not logged in or token is invalid.
 */

export const GET = (
  req: NextRequest,
  context: { params: { userId: string } }
) =>
  apiAuthenticatedRoute(req, context, async (rq, cxt) => {
    const suppliers = await SupplierService.getSuppliersForUser(cxt.user.id);

    const mappedSuppliers = suppliers.map((s) => {
      return {
        externalSupplierId: s.externalSupplierId,
        name: s.name,
        email: s.email,
        phone: s.phone,
        address: s.address,
        city: s.city,
        state: s.state,
        country: s.country,
      };
    });

    return NextResponse.json(
      { suppliers: mappedSuppliers },
      {
        status: 200,
      }
    );
  });
