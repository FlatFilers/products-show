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

  static async getSpaceGuestLink({ spaceId }: { spaceId: string }) {
    let space;
    try {
      space = await prismaClient.space.findUniqueOrThrow({
        where: {
          id: spaceId,
        },
      });
    } catch (e) {
      console.error(`Error getting space for ${spaceId}`, e);
      throw Error("Could not get space");
    }

    try {
      const flatfileSpace = await FlatfileService.getSpace({
        flatfileSpaceId: space.flatfileSpaceId,
      });
      return flatfileSpace.guestLink;
    } catch (e) {
      console.error(
        `Error getting Flatfile space for ${space.flatfileSpaceId}`,
        e
      );
      throw Error("Could not get Flatfile space");
    }
  }
}
