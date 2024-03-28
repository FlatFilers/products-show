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

  static getSpace = async ({
    flatfileSpaceId,
  }: {
    flatfileSpaceId: string;
  }) => {
    const { data } = await api.spaces.get(flatfileSpaceId);
    return data;
  };
}
