import Workspace from "@/app/(authenticated)/dynamic-portal/workspace";
import {
  Option,
  CustomField,
  DATE_FORMATS,
  FIELD_TYPES,
} from "@/lib/dynamic/field-options";
import { getServerSession } from "@/lib/get-server-session";
import { CustomFieldService } from "@/lib/services/custom-field";
import invariant from "ts-invariant";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user.id, "User must be logged in");

  const customField = await CustomFieldService.get({ userId: session.user.id });

  let mappedCustomField: CustomField | null = null;

  if (customField) {
    mappedCustomField = {
      name: customField.name,
      type: customField.type as keyof typeof FIELD_TYPES,
      required: customField.required,
      dateFormat: customField.dateFormat as keyof typeof DATE_FORMATS,
      decimals: customField.decimals as number,
      enumOptions: customField.enumOptions as unknown as Option[],
    };
  }

  return <Workspace savedCustomField={mappedCustomField} />;
}
