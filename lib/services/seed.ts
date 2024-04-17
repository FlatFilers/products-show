import { prismaClient } from "@/lib/prisma-client";
import { UserService } from "@/lib/services/user";
import { faker } from "@faker-js/faker";

export class SeedService {
  static async seed() {
    const user = await this.upsertUser();

    await this.reseed({ userId: user.id });
  }

  static async reseed({ userId }: { userId: string }) {
    await this.upsertAttributes(userId);
    await this.upsertCategories(userId);
    await this.upsertSuppliers(userId);
    await this.upsertProducts(userId);
  }

  static async upsertAttributes(userId: string) {
    const attrs = [
      {
        externalAttributeId: "abcdef123",
        name: "Large",
        value: "10",
        unit: "meter",
      },
      {
        externalAttributeId: "abcdef125",
        name: "Medium",
        value: "7",
        unit: "meter",
      },
      {
        externalAttributeId: "abcdef124",
        name: "Small",
        value: "5",
        unit: "meter",
      },
    ];

    for (const a of attrs) {
      await prismaClient.attribute.upsert({
        where: {
          userId_externalAttributeId: {
            userId,
            externalAttributeId: a.externalAttributeId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  static async upsertCategories(userId: string) {
    const attrs = [
      {
        externalCategoryId: "cat100",
        name: faker.commerce.department(),
        description: faker.lorem.sentence(5),
      },
      {
        externalCategoryId: "cat200",
        name: faker.commerce.department(),
        description: faker.lorem.sentence(5),
      },
      {
        externalCategoryId: "cat300",
        name: faker.commerce.department(),
        description: faker.lorem.sentence(5),
      },
    ];

    for (const a of attrs) {
      await prismaClient.category.upsert({
        where: {
          userId_externalCategoryId: {
            userId,
            externalCategoryId: a.externalCategoryId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  static async upsertSuppliers(userId: string) {
    const attrs = [
      {
        externalSupplierId: "sup100",
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        country: "USA",
      },
      {
        externalSupplierId: "sup200",
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        country: "USA",
      },
      {
        externalSupplierId: "sup300",
        name: faker.company.name(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        address: faker.location.streetAddress(),
        city: faker.location.city(),
        state: faker.location.state({ abbreviated: true }),
        country: "USA",
      },
    ];

    for (const a of attrs) {
      await prismaClient.supplier.upsert({
        where: {
          userId_externalSupplierId: {
            userId,
            externalSupplierId: a.externalSupplierId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  static async getRandomCategoryId(userId: string) {
    const categories = await prismaClient.category.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const randomIndex = Math.floor(Math.random() * categories.length);
    return categories[randomIndex].id;
  }

  static async getRandomSupplierId(userId: string) {
    const suppliers = await prismaClient.supplier.findMany({
      where: {
        userId,
      },
      select: {
        id: true,
      },
    });

    const randomIndex = Math.floor(Math.random() * suppliers.length);
    return suppliers[randomIndex].id;
  }

  static async upsertProducts(userId: string) {
    const attrs = [
      {
        externalProductId: "prod100",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod200",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod300",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod400",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
      {
        externalProductId: "prod500",
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: 100,
        quantity: 1,
        imageUrl: "https://loremflickr.com/100/100?lock=7826533007753216",
        supplierId: await this.getRandomSupplierId(userId), // Random supplier
        categoryId: await this.getRandomCategoryId(userId), // Random category
      },
    ];

    for (const a of attrs) {
      await prismaClient.product.upsert({
        where: {
          userId_externalProductId: {
            userId,
            externalProductId: a.externalProductId,
          },
        },
        create: {
          ...a,
          userId,
        },
        update: {
          ...a,
          userId,
        },
      });
    }
  }

  private static async upsertUser() {
    const data = {
      email: "test@test.com",
      password: await UserService.hashPassword("asdfasdf"),
      firstName: "Jimmy",
      lastName: "Smith",
      companyName: "Test Corp United",
    };

    const user = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (user) {
      return user;
    }

    return await prismaClient.user.upsert({
      where: {
        email: data.email,
      },
      create: data,
      update: data,
    });
  }
}
