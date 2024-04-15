import { configureSpace } from "@flatfile/plugin-space-configure";
import { blueprint } from "@/lib/dynamic/blueprint";
import { FlatfileListener } from "@flatfile/listener";

export function spaceConfigure(listener: FlatfileListener) {
  listener.use(
    configureSpace({
      space: {
        metadata: {
          // add theme here
        },
      },
      workbooks: [
        {
          name: "Field Services Import",
          namespace: "fieldServicesImport",
          sheets: [blueprint[0]],
          actions: [
            {
              operation: "submitAction",
              mode: "foreground",
              constraints: [{ type: "hasData" }],
              label: "Submit Data",
              primary: true,
            },
          ],
        },
      ],
    })
  );
}
