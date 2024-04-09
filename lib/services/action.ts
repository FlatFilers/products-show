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
}
