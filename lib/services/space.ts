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

  static async getSpace({ flatfileSpaceId }: { flatfileSpaceId: string }) {
    return await prismaClient.space.findUniqueOrThrow({
      where: { flatfileSpaceId },
    });
  }

  static async getSpaceGuestLink({ spaceId }: { spaceId: string }) {
    const space = await prismaClient.space.findUniqueOrThrow({
      where: {
        id: spaceId,
      },
    });

    const flatfileSpace = await FlatfileService.getSpace({
      flatfileSpaceId: space.flatfileSpaceId,
    });

    return flatfileSpace.guestLink;
  }
}
