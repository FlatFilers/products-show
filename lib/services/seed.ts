import { prismaClient } from "@/lib/prisma-client";
import { UserService } from "@/lib/services/user";

export class SeedService {
  static async seed() {
    console.log("Seeding...");

    const user = await this.upsertUser();

    await this.upsertAttributes(user.id);
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

  static async upsertUser() {
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
