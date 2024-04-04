import { prismaClient } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";

export class CustomFieldService {
  static async get({ userId }: { userId: string }) {
    return await prismaClient.customField.findUnique({
      where: {
        userId,
      },
    });
  }

  static async upsert({
    userId,
    data,
  }: {
    userId: string;
    data: Prisma.CustomFieldUncheckedCreateInput;
  }) {
    return await prismaClient.customField.upsert({
      where: {
        userId,
      },
      create: data,
      update: data,
    });
  }

  static async delete({ userId }: { userId: string }) {
    return await prismaClient.customField.delete({
      where: {
        userId,
      },
    });
  }
}
