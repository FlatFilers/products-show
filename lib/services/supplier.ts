import { prismaClient } from "@/lib/prisma-client";

export class SupplierService {
  static async getSuppliersForUser(userId: string) {
    return prismaClient.supplier.findMany({
      where: {
        userId,
      },
    });
  }

  static async getSupplier(supplierId: string) {
    return prismaClient.supplier.findUnique({
      where: {
        id: supplierId,
      },
    });
  }
}
