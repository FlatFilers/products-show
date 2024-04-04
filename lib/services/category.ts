import { prismaClient } from "@/lib/prisma-client";

export class CategoryService {
  static async getCategoriesForUser(userId: string) {
    return prismaClient.category.findMany({
      where: {
        userId,
      },
    });
  }

  static async getCategory(categoryId: string) {
    return prismaClient.category.findUniqueOrThrow({
      where: {
        id: categoryId,
      },
    });
  }
}
