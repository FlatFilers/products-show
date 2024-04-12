import api from "@flatfile/api";
import { DocumentConfig, RecordDataWithLinks } from "@flatfile/api/api";
import { ReadStream } from "fs";

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

    // TODO: There are two workbooks being created here, how can we identiy them?
    const workbook = workbooks.data.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    })[0];

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

      const recordsResult = await api.records.get(sheetId);

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

  static async createDocument({
    flatfileSpaceId,
    document,
  }: {
    flatfileSpaceId: string;
    document: DocumentConfig;
  }) {
    const spaceId = flatfileSpaceId;
    return await api.documents.create(spaceId, document);
  }

  static async updateSpace({
    flatfileSpaceId,
    options = {},
  }: {
    flatfileSpaceId: string;
    options: Record<string, any>;
  }) {
    return await api.spaces.update(flatfileSpaceId, options);
  }
}
