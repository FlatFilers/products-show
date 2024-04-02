import { prismaClient } from "@/lib/prisma-client";

export class ProductService {
  static async getProductsForUser(userId: string) {
    return prismaClient.product.findMany({
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
