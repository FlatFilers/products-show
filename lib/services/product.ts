import { prismaClient } from "@/lib/prisma-client";

export class ProductService {
  static async getAll({ userId }: { userId: string }) {
    return await prismaClient.product.findMany({
      where: {
        userId,
      },
      include: {
        category: true,
        supplier: true,
      },
    });
  }

  static async getProduct(productId: string) {
    return prismaClient.product.findUniqueOrThrow({
      where: {
        id: productId,
      },
      include: {
        category: true,
        supplier: true,
      },
    });
  }
}
