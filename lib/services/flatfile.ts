import { FlatfileClient } from "@flatfile/api";

export class FlatfileService {
  static createSpace = async ({
    userId,
    spaceName,
  }: {
    userId: string;
    spaceName: string;
  }) => {
    const flatfile = this.flatfileClient();
    const result = await flatfile.spaces.create({
      name: spaceName,
      environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
      autoConfigure: true,
      namespace: process.env.FLATFILE_NAMESPACE,
      metadata: {
        userId,
      },
    });

    return result.data;
  };

  static flatfileClient() {
    return new FlatfileClient({
      token: process.env.FLATFILE_API_KEY,
    });
  }
}
