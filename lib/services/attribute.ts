import { prismaClient } from "@/lib/prisma-client";

export class AttributeService {
  static async getAll({ userId }: { userId: string }) {
    return await prismaClient.attribute.findMany({
      where: {
        userId,
      },
    });
  }

  static async getAttribute(attributeId: string) {
    return prismaClient.attribute.findUniqueOrThrow({
      where: {
        id: attributeId,
      },
    });
  }
}
