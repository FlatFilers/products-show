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

    console.log("sup records", JSON.stringify(supplierRecords));

    for (const r of supplierRecords) {
      const mappedRecord = {
        userId: space.userId,
        externalSupplierId: r.supplier_id.value,
        name: r.name.value,
        email: r.email.value,
        phone: r.phone.value,
        address: r.address.value,
        city: r.city.value,
        state: r.state.value,
        country: r.country.value,
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
        externalCategoryId: r.category_id.value,
        name: r.name.value,
        description: r.description.value,
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
            externalCategoryId: r.category.value,
          },
        },
      });
      const supplier = await prismaClient.supplier.findUniqueOrThrow({
        where: {
          userId_externalSupplierId: {
            userId: space.userId,
            externalSupplierId: r.supplier.value,
          },
        },
      });

      const mappedRecord = {
        userId: space.userId,
        externalProductId: r.product_id.value,
        name: r.name.value,
        description: r.description.value,
        categoryId: category.id,
        price: Number.parseFloat(r.price.value),
        quantity: Number.parseFloat(r.quantity.value),
        imageUrl: r.image_url.value,
        supplierId: supplier.id,
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
