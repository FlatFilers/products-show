import { prismaClient } from "@/lib/prisma-client";
import { UserService } from "@/lib/services/user";

async function main() {
  console.log("Seeding...");

  const user = await upsertUser();

  await upsertAttributes(user.id);
}

const upsertAttributes = async (userId: string) => {
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
};

const upsertUser = async () => {
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
};

main()
  .then(async () => {
    //
  })
  .catch(async (e) => {
    console.error(e);
    process.exit(1);
  });
