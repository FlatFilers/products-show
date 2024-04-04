import { FlatfileListener, Client } from "@flatfile/listener";
import { ExcelExtractor } from "@flatfile/plugin-xlsx-extractor";
import { JSONExtractor } from "@flatfile/plugin-json-extractor";
import { spaceConfigure } from "@/lib/dynamic/space-configure";

export const listener = FlatfileListener.create((l: Client) => {
  l.on("**", (event) => {
    console.log(
      `[${JSON.stringify(event.topic)}]
      ${JSON.stringify(event.namespace)} 
      ${JSON.stringify(event.payload)}`
    );
  });

  l.namespace("space:servicesproject", (list) => {
    list.use(spaceConfigure);
    list.use(ExcelExtractor());
    list.use(JSONExtractor());
  });
});
