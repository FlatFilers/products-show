import { prismaClient } from "@/lib/prisma-client";
import { SeedService } from "@/lib/services/seed";
import { Prisma } from "@prisma/client";
import * as bcrypt from "bcrypt";

export class UserService {
  static async createUser({
    email,
    password,
    firstName,
    lastName,
    companyName,
  }: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    companyName: string;
  }) {
    try {
      const user = await prismaClient.user.create({
        data: {
          email,
          firstName,
          lastName,
          password: await this.hashPassword(password),
          companyName,
        },
      });

      await SeedService.upsertAttributes(user.id);

      return user;
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          console.log("Unique constraint violation", e);

          throw new Error("Email already exists");
        }
      }
      throw e;
    }
  }

  static async findUser({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) {
    const user = await prismaClient.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return null;
    }

    const isValid = await this.isValidPassword({
      password,
      hashedPassword: user.password,
    });

    return isValid ? user : null;
  }

  static async hashPassword(plaintextPassword: string): Promise<string> {
    return await bcrypt.hash(plaintextPassword, 10);
  }

  private static async isValidPassword({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
