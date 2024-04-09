import { ActionType } from "@/lib/action";
import { prismaClient } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";

export class ActionService {
  static async createAction({
    data,
  }: {
    data: Prisma.ActionUncheckedCreateInput;
  }) {
    return await prismaClient.action.create({
      data,
    });
  }

  static async getFilefeedEvents({ userId }: { userId: string }) {
    return await prismaClient.action.findMany({
      where: {
        userId,
        type: {
          in: [ActionType.FileFeedEvent, ActionType.SyncFilefeedRecords],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        user: true,
      },
    });
  }
}
