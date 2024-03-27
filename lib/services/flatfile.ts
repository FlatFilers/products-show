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

    const sheets = sheetJson.data;

    let records: {
      attributes: {
        attribute_id: {
          value: string;
        };
        name: {
          value: string;
        };
        value: {
          value: string;
        };
        unit: {
          value: string;
        };
      }[];
      suppliers: {
        supplier_id: {
          value: string;
        };
        name: {
          value: string;
        };
        email: {
          value: string;
        };
        phone: {
          value: string;
        };
        address: {
          value: string;
        };
        city: {
          value: string;
        };
        state: {
          value: string;
        };
        country: {
          value: string;
        };
      }[];
      product_categories: {
        category_id: {
          value: string;
        };
        name: {
          value: string;
        };
        description: {
          value: string;
        };
      }[];
      products: {
        product_id: {
          value: string;
        };
        name: {
          value: string;
        };
        description: {
          value: string;
        };
        category: {
          value: string;
        };
        price: { value: string };
        quantity: { value: string };
        image_url: {
          value: string;
        };
        supplier: {
          value: string;
        };
        attribute: {
          value: string;
        };
      }[];
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

      const data = json.data.records.map((r: any) => r.values);

      records[key as keyof typeof records] = data;

      console.log("json.data", json.data.records);
      console.log("data", data);

      console.log("recordsResult", json);
    });

    await Promise.allSettled(ps);

    console.log("records", JSON.stringify(records));

    return records;
  }
}
