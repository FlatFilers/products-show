import api from "@flatfile/api";
import { RecordDataWithLinks } from "@flatfile/api/api";

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

  static async getRecordsForSpace({
    flatfileSpaceId,
  }: {
    flatfileSpaceId: string;
  }) {
    const workbooks = await api.workbooks.list({
      spaceId: flatfileSpaceId,
    });
    console.log("workbooks", workbooks);

    if (!workbooks?.data) {
      throw new Error(
        `No workbooks found for flatfileSpaceId ${flatfileSpaceId}`
      );
    }

    const workbook = workbooks.data.find((w) => w.id === "us_wb_dgxSXvb2");
    if (!workbook) {
      throw new Error(
        `No workbook found for flatfileSpaceId ${flatfileSpaceId}`
      );
    }
    const workbookId = workbook.id;

    const sheets = await api.sheets.list({
      workbookId,
    });
    console.log("sheets", sheets);

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

      console.log("recordsResult.data.records", recordsResult.data.records);
    });

    await Promise.allSettled(ps);

    console.log("records", JSON.stringify(records));

    return records;
  }
}
