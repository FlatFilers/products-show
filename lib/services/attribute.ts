import { prismaClient } from "@/lib/prisma-client";

export class AttributeService {
  static async getAttributesForUser(userId: string) {
    return prismaClient.attribute.findMany({
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
