import { prismaClient } from "@/lib/prisma-client";

export class ResetAccountService {
  static resetAccount = async ({ userId }: { userId: string }) => {
    console.log(`Resetting account for user ${userId}`);

    // Reset account logic here
    await prismaClient.$transaction(async (prisma) => {
      prisma.category.deleteMany({
        where: {
          userId,
        },
      });
      prisma.supplier.deleteMany({
        where: {
          userId,
        },
      });
      prisma.product.deleteMany({
        where: {
          userId,
        },
      });
      prisma.space.deleteMany({
        where: {
          userId,
        },
      });
    });

    // TODO: Reseed initial data
  };
}
