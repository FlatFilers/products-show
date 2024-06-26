import { WorkflowType } from "@/lib/workflow-type";
import api from "@flatfile/api";
import { RecordsWithLinks } from "@flatfile/api/api";
import { ReadStream } from "fs";

const NAMESPACE_FOR_WORKFLOW = {
  [WorkflowType.ProjectOnboarding]: process.env.FLATFILE_PROJECT_NAMESPACE,
  [WorkflowType.Embed]: process.env.FLATFILE_EMBED_NAMESPACE,
  [WorkflowType.FileFeed]: process.env.FLATFILE_FILEFEED_NAMESPACE,
  [WorkflowType.Dynamic]: process.env.FLATFILE_DYNAMIC_NAMESPACE,
};

export class FlatfileService {
  static createSpace = async ({
    userId,
    workflowType,
    spaceName,
  }: {
    userId: string;
    workflowType: WorkflowType;
    spaceName: string;
  }) => {
    const { data } = await api.spaces.create({
      name: spaceName,
      environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
      autoConfigure: true,
      namespace: NAMESPACE_FOR_WORKFLOW[workflowType],
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

  static async getRecordsForSpace({
    flatfileSpaceId,
  }: {
    flatfileSpaceId: string;
  }) {
    const workbooks = await api.workbooks.list({
      spaceId: flatfileSpaceId,
    });

    if (!workbooks?.data) {
      throw new Error(
        `No workbooks found for flatfileSpaceId ${flatfileSpaceId}`
      );
    }

    const workbook = workbooks.data.find(
      (w) => w.name === process.env.WORKBOOK_NAME
    );

    if (!workbook) {
      throw new Error(
        `No workbook found for flatfileSpaceId ${flatfileSpaceId}`
      );
    }
    const workbookId = workbook.id;

    const sheets = await api.sheets.list({
      workbookId,
    });

    if (!sheets?.data) {
      throw new Error(
        `No sheets found for workbookId ${workbookId}, flatfileSpaceId ${flatfileSpaceId}`
      );
    }

    const records: {
      attributes: RecordsWithLinks;
      suppliers: RecordsWithLinks;
      product_categories: RecordsWithLinks;
      products: RecordsWithLinks;
    } = {
      attributes: [],
      suppliers: [],
      product_categories: [],
      products: [],
    };

    const ps = Object.keys(records).map(async (key) => {
      const sheetId = sheets.data.find((s) => s.slug === key)!.id;

      const recordsResult = await api.records.get(sheetId, { filter: "valid" });

      if (!recordsResult?.data) {
        throw new Error(`No records found for sheetId ${sheetId}`);
      }

      records[key as keyof typeof records] = recordsResult.data.records;
    });

    await Promise.allSettled(ps);

    return records;
  }

  static async postFileToSpace({
    flatfileSpaceId,
    file,
  }: {
    flatfileSpaceId: string;
    file: ReadStream;
  }) {
    return await api.files.upload(file, {
      spaceId: flatfileSpaceId,
      environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
    });
  }

  static async updateLanguage({
    flatfileSpaceId,
    language,
  }: {
    flatfileSpaceId: string;
    language: string;
  }) {
    return await api.spaces.update(flatfileSpaceId, {
      languageOverride: language,
    });
  }

  static async createAndInviteGuest({
    flatfileSpaceId,
    email,
    name,
  }: {
    flatfileSpaceId: string;
    email: string;
    name: string;
  }) {
    const guest = await api.guests.create([
      {
        environmentId: process.env.FLATFILE_ENVIRONMENT_ID,
        email,
        name,
        spaces: [
          {
            id: flatfileSpaceId,
          },
        ],
      },
    ]);

    // don't send email in development
    if (process.env.NODE_ENV === "production") {
      await this.inviteGuest({
        guestId: guest.data[0].id,
        flatfileSpaceId: flatfileSpaceId,
      });
    }

    return guest;
  }

  private static async inviteGuest({
    guestId,
    flatfileSpaceId,
  }: {
    guestId: string;
    flatfileSpaceId: string;
  }) {
    return await api.guests.invite([
      {
        guestId,
        spaceId: flatfileSpaceId,
      },
    ]);
  }
}
