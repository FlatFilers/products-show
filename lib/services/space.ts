import { prismaClient } from "@/lib/prisma-client";
import { FlatfileService } from "./flatfile";
import { WorkflowType } from "@/lib/workflow-type";

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
    let flatfileNamespace;

    // TODO: Adjust for other workflows
    if (workflowType === WorkflowType.FileFeed) {
      flatfileNamespace = process.env.FLATFILE_SERVICES_NAMESPACE;
    } else {
      flatfileNamespace = process.env.FLATFILE_NAMESPACE;
    }

    const flatfileSpace = await FlatfileService.createSpace({
      userId,
      spaceName,
      flatfileNamespace,
    });

    return await prismaClient.space.create({
      data: {
        workflowType,
        flatfileSpaceId: flatfileSpace.id,
        userId,
      },
    });
  }

  static async getSpaceForWorkflow({
    userId,
    workflowType,
  }: {
    userId: string;
    workflowType: string;
  }) {
    return await prismaClient.space.findUnique({
      where: { userId_workflowType: { userId, workflowType } },
    });
  }

  static async getSpace({ id }: { id: string }) {
    return await prismaClient.space.findUniqueOrThrow({
      where: { id },
    });
  }

  static async getSpaceByFlatfileSpaceId({
    flatfileSpaceId,
  }: {
    flatfileSpaceId: string;
  }) {
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
