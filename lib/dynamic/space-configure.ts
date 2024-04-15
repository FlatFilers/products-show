import { configureSpace } from "@flatfile/plugin-space-configure";
import { blueprint } from "@/lib/dynamic/blueprint";
import { FlatfileListener } from "@flatfile/listener";
import { theme } from "@/lib/dynamic/theme";
import { document } from "@/lib/dynamic/document";

export function spaceConfigure(listener: FlatfileListener) {
  listener.use(
    configureSpace({
      space: {
        metadata: {
          theme,
        },
      },
      documents: [document],
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
