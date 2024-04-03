import { prismaClient } from "@/lib/prisma-client";

export class AttributeService {
  static async getAll({ userId }: { userId: string }) {
    return await prismaClient.attribute.findMany({
      where: {
        userId,
      },
    });
  }
}
