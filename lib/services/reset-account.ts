import { prismaClient } from "@/lib/prisma-client";

export class ResetAccountService {
  static resetAccount = async ({ userId }: { userId: string }) => {
    console.log(`Resetting account for user ${userId}`);
    // Reset account logic here

    // delete categories
    prismaClient.category.deleteMany({
      where: {
        userId,
      },
    });

    // delete suppliers
    prismaClient.supplier.deleteMany({
      where: {
        userId,
      },
    });

    // delete products
    prismaClient.product.deleteMany({
      where: {
        userId,
      },
    });

    // delete spaces
    prismaClient.space.deleteMany({
      where: {
        userId,
      },
    });

    // TODO: Reseed initial data
  };
}
