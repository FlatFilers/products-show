import { apiAuthenticatedRoute } from "@/lib/api-helpers";
import { ProductService } from "@/lib/services/product";
import { NextRequest, NextResponse } from "next/server";

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
