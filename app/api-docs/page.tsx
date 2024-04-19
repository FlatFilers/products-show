import { getApiDocs } from "@/lib/swagger";
import ReactSwagger from "./react-swagger";
import "@/styles/swagger.css";

export default async function IndexPage() {
  const spec = await getApiDocs();
  return (
    <section className="container">
      <ReactSwagger spec={spec} />
    </section>
  );
}
