import { prismaClient } from "@/lib/prisma-client";
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

    return await prismaClient.space.create({
      data: {
        workflowType,
        flatfileSpaceId: flatfileSpace.id,
        userId,
      },
    });
  }

  static async getSpace({ spaceId }: { spaceId: string }) {
    return await prismaClient.space.findUnique({
      where: {
        id: spaceId,
      },
    });
  }
}
