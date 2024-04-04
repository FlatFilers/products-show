"use client";

import { WORKFLOW_ITEMS } from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";
import SVG from "react-inlinesvg";
import { blueprint } from "@/lib/dynamic/blueprint";
import { CustomFieldBuilder } from "@/app/(authenticated)/dynamic-portal/custom-field-builder";
import { CustomField, DEFAULT_CUSTOM_FIELD } from "@/lib/dynamic/field-options";
import { useState } from "react";

export default function Workspace() {
  const item = WORKFLOW_ITEMS[WorkflowType.Dynamic];
  const sheet = blueprint[0];

  const [customField, setCustomField] = useState<CustomField>(
    // dbCustomField ?? DEFAULT_CUSTOM_FIELD
    DEFAULT_CUSTOM_FIELD
  );

  // const workbookConfig = {
  //   name: sheet.name,
  //   blueprint,
  //   actions: sheet.actions,
  // };

  return (
    <div className="text-white space-y-8 md:relative lg:max-w-3xl">
      <div className="flex flex-col space-y-4 md:flex-row md:justify-between md:items-center">
        <div className="space-y-4">
          <SVG src={item.imageUri} className={`icon-${item.slug} w-16 h-16`} />
          <h1
            className={`text-4xl font-bold border-b border-${item.slug} pb-4 inline-block`}
          >
            {item.name}
          </h1>
        </div>

        <div className="card-bg card-sm space-y-2 md:max-w-sm">
          <SVG src="/images/lightbulb.svg" />
          <p className="text-sm font-bold">Customize your workspace</p>
          <p className="text-xs font-light">
            Adjust the field options below. Save each as you complete them and
            then click Open Portal to add your data.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2 md:max-w-md">
          <p className="text-sm font-semibold">Create Custom Fields</p>
          <p className="text-sm font-light leading-5">{item.description}</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-3 text-xs border-b border-gray-500 pb-4 space-x-2">
            <div>Field Name</div>
            <div>Field Type</div>
            <div>Required?</div>
          </div>

          <div className="space-y-2">
            {sheet.fields.map((f) => {
              return (
                <div
                  key={f.key}
                  className="grid grid-cols-3 card-bg card-sm space-x-2 text-sm items-center"
                  style={{
                    boxShadow:
                      "8.74046516418457px 9.711627960205078px 18.45209312438965px 0px rgba(61, 73, 100, 0.3) inset",
                  }}
                >
                  <div>{f.label}</div>
                  <div className="capitalize">{f.type}</div>
                  <div className="flex flex-row items-center">
                    <input
                      type="checkbox"
                      checked={
                        f.constraints?.find((c) => c.type === "required") !==
                        undefined
                      }
                      disabled
                      className="text-dynamic-portal"
                    />
                  </div>
                </div>
              );
            })}

            <CustomFieldBuilder
              customField={customField}
              setCustomField={setCustomField}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
