import api from "@flatfile/api";

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
    const workbookResult = await fetch(
      `https://api.x.flatfile.com/v1/workbooks?spaceId=${flatfileSpaceId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLATFILE_API_KEY}`,
        },
      }
    );

    const workbookJson = await workbookResult.json();

    // TODO: Set name and lookup by name
    const workbook = workbookJson.data.find(
      (w: any) => w.id === "us_wb_dgxSXvb2"
    );
    const workbookId = workbook.id;
    //

    console.log("workbookJson", workbookJson);

    const sheetResult = await fetch(
      `https://api.x.flatfile.com/v1/sheets?workbookId=${workbookId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLATFILE_API_KEY}`,
        },
      }
    );

    const sheetJson = await sheetResult.json();
    console.log("SheetJson", sheetJson);

    // const sheetIds = sheetJson.data.map((s: any) => s.id);
    const sheets = sheetJson.data;

    let records: {
      attributes: any[];
      suppliers: any[];
      product_categories: any[];
      products: any[];
    } = {
      attributes: [],
      suppliers: [],
      product_categories: [],
      products: [],
    };

    const ps = Object.keys(records).map(async (key) => {
      const sheetId = sheets.find((s: any) => s.slug === key).id;

      const recordsResult = await fetch(
        `https://api.x.flatfile.com/v1/sheets/${sheetId}/records`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.FLATFILE_API_KEY}`,
          },
        }
      );

      const json = await recordsResult.json();

      records[key as keyof typeof records].push(json.data);

      console.log("recordsResult", json);
    });

    await Promise.allSettled(ps);

    console.log("records", JSON.stringify(records));
  }
}
