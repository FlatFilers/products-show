import { WorkflowType } from "@/lib/workflow-type";
import api from "@flatfile/api";
import { RecordDataWithLinks } from "@flatfile/api/api";
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
      attributes: RecordDataWithLinks[];
      suppliers: RecordDataWithLinks[];
      product_categories: RecordDataWithLinks[];
      products: RecordDataWithLinks[];
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

      records[key as keyof typeof records] = recordsResult.data.records.map(
        (r) => r.values
      );
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
}
