import { authenticatedRoute } from "@/lib/api-helpers";
import { CustomFieldService } from "@/lib/services/custom-field";
import { NextRequest, NextResponse } from "next/server";

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
