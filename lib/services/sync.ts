import { prismaClient } from "@/lib/prisma-client";
import { FlatfileService } from "@/lib/services/flatfile";
import { SpaceService } from "@/lib/services/space";

export class SyncService {
  static async syncSpace({ flatfileSpaceId }: { flatfileSpaceId: string }) {
    const space = await SpaceService.getSpace({ flatfileSpaceId });

    const records = await FlatfileService.getRecordsForSpace({
      flatfileSpaceId,
    });

    console.log("Upserting suppliers...");

    const supplierRecords = records.suppliers;

    for (const r of supplierRecords) {
      const mappedRecord = {
        userId: space.userId,
        externalSupplierId: r.supplier_id.value as string,
        name: r.name.value as string,
        email: r.email.value as string,
        phone: r.phone.value as string,
        address: r.address.value as string,
        city: r.city.value as string,
        state: r.state.value as string,
        country: r.country.value as string,
      };

      await prismaClient.supplier.upsert({
        where: {
          userId_externalSupplierId: {
            userId: space.userId,
            externalSupplierId: mappedRecord.externalSupplierId,
          },
        },
        create: mappedRecord,
        update: mappedRecord,
      });
    }

    console.log("Done upserting suppliers.");

    console.log("Upserting categories...");

    const categoryRecords = records.product_categories;

    for (const r of categoryRecords) {
      const mappedRecord = {
        userId: space.userId,
        externalCategoryId: r.category_id.value as string,
        name: r.name.value as string,
        description: r.description.value as string,
      };

      await prismaClient.category.upsert({
        where: {
          userId_externalCategoryId: {
            userId: space.userId,
            externalCategoryId: mappedRecord.externalCategoryId,
          },
        },
        create: mappedRecord,
        update: mappedRecord,
      });
    }

    console.log("Done upserting categories.");

    console.log("Upserting products...");

    const productRecords = records.products;

    for (const r of productRecords) {
      const category = await prismaClient.category.findUniqueOrThrow({
        where: {
          userId_externalCategoryId: {
            userId: space.userId,
            externalCategoryId: r.category.value as string,
          },
        },
      });
      const supplier = await prismaClient.supplier.findUniqueOrThrow({
        where: {
          userId_externalSupplierId: {
            userId: space.userId,
            externalSupplierId: r.supplier.value as string,
          },
        },
      });

      const mappedRecord = {
        userId: space.userId,
        externalProductId: r.product_id.value as string,
        name: r.name.value as string,
        description: r.description.value as string,
        categoryId: category.id as string,
        price: Number.parseFloat(r.price.value as string),
        quantity: Number.parseFloat(r.quantity.value as string),
        imageUrl: r.image_url.value as string,
        supplierId: supplier.id as string,
      };

      await prismaClient.product.upsert({
        where: {
          userId_externalProductId: {
            userId: space.userId,
            externalProductId: mappedRecord.externalProductId,
          },
        },
        create: mappedRecord,
        update: mappedRecord,
      });
    }

    console.log("Done upserting products.");
  }
}
