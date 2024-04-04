import { prismaClient } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";

export class CustomFieldService {
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
}
