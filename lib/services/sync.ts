import { prismaClient } from "@/lib/prisma-client";
import { FlatfileService } from "@/lib/services/flatfile";
import { SpaceService } from "@/lib/services/space";

export class SyncService {
  static async syncSpace({ flatfileSpaceId }: { flatfileSpaceId: string }) {
    const space = await SpaceService.getSpaceByFlatfileSpaceId({
      flatfileSpaceId,
    });

    const records = await FlatfileService.getRecordsForSpace({
      flatfileSpaceId,
    });

    console.log("Upserting suppliers...");

    const supplierRecords = records.suppliers;

    for (const r of supplierRecords) {
      const mappedRecord = {
        userId: space.userId,
        externalSupplierId: r.values.supplier_id.value as string,
        name: r.values.name.value as string,
        email: r.values.email.value as string,
        phone: r.values.phone.value as string,
        address: r.values.address.value as string,
        city: r.values.city.value as string,
        state: r.values.state.value as string,
        country: r.values.country.value as string,
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
        externalCategoryId: r.values.category_id.value as string,
        name: r.values.name.value as string,
        description: r.values.description.value as string,
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

    console.log("Upserting attributes...");

    const attributeRecords = records.attributes;

    for (const r of attributeRecords) {
      const mappedRecord = {
        userId: space.userId,
        externalAttributeId: r.values.attribute_id.value as string,
        name: r.values.name.value as string,
        value: r.values.value.value as string,
        unit: r.values.unit.value as string,
      };

      await prismaClient.attribute.upsert({
        where: {
          userId_externalAttributeId: {
            userId: space.userId,
            externalAttributeId: mappedRecord.externalAttributeId,
          },
        },
        create: mappedRecord,
        update: mappedRecord,
      });
    }

    console.log("Done upserting attributes.");

    console.log("Upserting products...");

    const productRecords = records.products;

    for (const r of productRecords) {
      const category = await prismaClient.category.findFirst({
        where: {
          userId: space.userId,
          name: r.values.category.value as string,
        },
      });
      const supplier = await prismaClient.supplier.findFirst({
        where: {
          userId: space.userId,
          name: r.values.supplier.value as string,
        },
      });

      const mappedRecord = {
        userId: space.userId,
        externalProductId: r.values.product_id.value as string,
        name: r.values.name.value as string,
        description: r.values.description.value as string,
        price: Number.parseFloat(r.values.price.value as string),
        quantity: Number.parseFloat(r.values.quantity.value as string),
        imageUrl: r.values.image_url.value as string,
        categoryId: category ? (category.id as string) : undefined,
        supplierId: supplier ? (supplier.id as string) : undefined,
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

    const flatfileRecordIds = productRecords?.map((r) => r.id);

    console.log("Done upserting products.");

    return flatfileRecordIds;
  }
}
