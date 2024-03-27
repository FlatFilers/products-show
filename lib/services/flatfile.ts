import api from "@flatfile/api";
import { SpaceService } from "./space";

export class FlatfileService {
  static createSpace = async ({
    userId,
    spaceName,
  }: {
    userId: string;
    spaceName: string;
  }) => {
    const { data } = await api.spaces.create({
      name: spaceName,
      environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
      autoConfigure: true,
      namespace: process.env.FLATFILE_NAMESPACE,
      metadata: {
        userId,
      },
    });
    return data;
  };

  static getSpace = async ({ spaceId }: { spaceId: string }) => {
    const space = await SpaceService.getSpace({ spaceId });

    if (!space) {
      throw new Error(`Space not found for ${spaceId}`);
    }

    const flatfileSpaceId = space.flatfileSpaceId;

    const { data } = await api.spaces.get(flatfileSpaceId);
    return data;
  };
}
