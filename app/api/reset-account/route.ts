import { authenticatedRoute } from "@/lib/api-helpers";
import { ResetAccountService } from "@/lib/services/reset-account";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (request: NextRequest, context: { params: any }) => {
  return authenticatedRoute(request, context, async (rq, cxt) => {
    const userId = cxt.user.id;

    ResetAccountService.resetAccount({ userId });

    return NextResponse.json({}, { status: 201 });
  });
};
