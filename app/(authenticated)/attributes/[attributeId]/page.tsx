import { AttributeService } from "@/lib/services/attribute";
import invariant from "ts-invariant";

export default async function Page({
  params,
}: {
  params: {
    attributeId: string;
  };
}) {
  invariant(params.attributeId, "Category id not found");
  const attributeId = params.attributeId;
  const attribute = await AttributeService.getAttribute(attributeId);
  invariant(attribute, "Attribute not found");

  return (
    <div className="px-4 sm:px-6 lg:px-8 w-1/2">
      <div className="resource-show">
        <div>
          <h3>{attribute.name}</h3>
          <p>Attribute details</p>
        </div>
        <div>
          <dl>
            <div>
              <dt>Attribute ID</dt>
              <dd>{attribute.externalAttributeId}</dd>
            </div>
            <div>
              <dt>Value</dt>
              <dd>{attribute.value}</dd>
            </div>
            <div>
              <dt>Unit</dt>
              <dd>{attribute.unit || "-"}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
