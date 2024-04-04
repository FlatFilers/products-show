import { apiAuthenticatedRoute } from "@/lib/api-helpers";
import { AttributeService } from "@/lib/services/attribute";
import { NextRequest, NextResponse } from "next/server";

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
