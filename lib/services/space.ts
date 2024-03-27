import { prismaClient } from "@/lib/prisma-client";
import { Prisma } from "@prisma/client";
import { FlatfileService } from "./flatfile";

export class SpaceService {
  static async createSpace({
    workflowType,
    userId,
    spaceName,
  }: {
    workflowType: string;
    userId: string;
    spaceName: string;
  }) {
    const flatfileSpace = await FlatfileService.createSpace({
      userId,
      spaceName,
    });

    return await flatfileSpace;

    // TODO: Save the space to the database
    // return await prismaClient.space.create({
    //   data: {
    //     workflowType,
    //     flatfileSpaceId: flatfileSpace.id,
    //     userId,
    //   },
    // });
  }
}
