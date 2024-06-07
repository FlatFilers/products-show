import { prismaClient } from "@/lib/prisma-client";
import { SeedService } from "@/lib/services/seed";

export class ResetAccountService {
  static async resetAccount({ userId }: { userId: string }) {
    console.log(`Resetting account for user ${userId}`);

    // Reset account logic here
    await prismaClient.$transaction(async (prisma) => {
      await prisma.category.deleteMany({
        where: { userId },
      });

      await prisma.supplier.deleteMany({
        where: { userId },
      });

      await prisma.product.deleteMany({
        where: { userId },
      });

      await prisma.space.deleteMany({
        where: { userId },
      });

      await prisma.user.update({
        where: { id: userId },
        data: {
          flatfileGuestId: null,
        },
      });

      await prisma.action.deleteMany({
        where: { userId },
      });

      await prisma.attribute.deleteMany({
        where: { userId },
      });

      await prisma.customField.deleteMany({
        where: { userId },
      });
    });
    console.log(`Reset account for user ${userId} complete`);

    console.log(`Reseeding data for user ${userId}`);

    await SeedService.reseed({ userId });

    console.log(`Reseeding data for user ${userId} complete`);

    return;
  }
}
