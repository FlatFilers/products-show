import { prismaClient } from "@/lib/prisma-client";
import { FlatfileService } from "./flatfile";
import { themeLookup } from "@/lib/theme-and-document";

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

  static async addDocumentAndThemeToSpace({
    flatfileSpaceId,
    workflowType,
  }: {
    flatfileSpaceId: string;
    workflowType: string;
  }) {
    const { theme, document } = themeLookup[workflowType];

    const workflowDocument = await FlatfileService.createDocument({
      flatfileSpaceId,
      document,
    });

    const themeAndDocumentId = {
      translationsPath:
        "https://raw.githubusercontent.com/FlatFilers/Platform-Translations/main/locales/en/translation.json",
      metadata: {
        sidebarConfig: {
          showSidebar: true,
          defaultPage: {
            documentId: workflowDocument.data.id,
          },
        },
        theme,
      },
    };

    await FlatfileService.updateSpace({
      flatfileSpaceId,
      options: themeAndDocumentId,
    });
  }
}
