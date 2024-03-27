import { FlatfileClient } from "@flatfile/api";
import { SpaceService } from "./space";

export class FlatfileService {
  static createSpace = async ({
    userId,
    spaceName,
  }: {
    userId: string;
    spaceName: string;
  }) => {
    // const flatfile = this.flatfileClient();
    // const result = await flatfile.spaces.create({
    //   name: spaceName,
    //   environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
    //   autoConfigure: true,
    //   namespace: process.env.FLATFILE_NAMESPACE,
    //   metadata: {
    //     userId,
    //   },
    // });

    const result = await fetch("https://api.x.flatfile.com/v1/spaces", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.FLATFILE_API_KEY}`,
      },
      body: JSON.stringify({
        name: spaceName,
        environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
        autoConfigure: true,
        namespace: process.env.FLATFILE_NAMESPACE,
        metadata: {
          userId,
        },
      }),
    });

    const json = await result.json();
    return json.data;
  };

  static getSpace = async ({ spaceId }: { spaceId: string }) => {
    const space = await SpaceService.getSpace({ spaceId });

    if (!space) {
      throw new Error(`Space not found for ${spaceId}`);
    }

    const flatfileSpaceId = space.flatfileSpaceId;

    const result = await fetch(
      `https://api.x.flatfile.com/v1/spaces/${flatfileSpaceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLATFILE_API_KEY}`,
        },
      }
    );

    const json = await result.json();
    return json.data;
  };

  static flatfileClient() {
    return new FlatfileClient({
      token: process.env.FLATFILE_API_KEY,
    });
  }
}
