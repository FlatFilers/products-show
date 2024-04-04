"use client";

import { WORKFLOW_ITEMS } from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";
import SVG from "react-inlinesvg";
import { blueprint } from "@/lib/dynamic/blueprint";
import { CustomFieldBuilder } from "@/app/(authenticated)/dynamic-portal/custom-field-builder";
import {
  Option,
  CustomField,
  DEFAULT_CUSTOM_FIELD,
  DYNAMIC_FIELD_KEY,
} from "@/lib/dynamic/field-options";
import { FormEvent, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import dynamic from "next/dynamic";
import { type ISpace } from "@flatfile/react";
import { SheetConfig } from "@flatfile/api/api";
import { listener } from "@/lib/dynamic/listener";

const DynamicEmbeddedSpace = dynamic(
  () => import("@/components/shared/embedded-space"),
  {
    loading: () => <div></div>,
    ssr: false,
  }
);

const generateConfig = ({
  sheet,
  customFieldConfig,
}: {
  sheet: SheetConfig;
  customFieldConfig: any;
}) => {
  const filteredConfig = {
    name: sheet.name,
    sheets: [
      {
        name: sheet.name,
        slug: sheet.slug,
        fields: [...sheet.fields, ...[customFieldConfig]],
      },
    ],
    actions: sheet.actions,
  };
  // console.log("filteredConfig", filteredConfig);

  return filteredConfig;
};

const customOptionsConfig = (options: Option[]) => {
  const mappedOptions = options.map((o) => {
    return {
      value: o.input,
      label: o.output,
    };
  });

  return {
    config: { options: mappedOptions },
  };
};

export default function Workspace({
  savedCustomField,
}: {
  savedCustomField: CustomField | null;
}) {
  const item = WORKFLOW_ITEMS[WorkflowType.Dynamic];
  const sheet = blueprint[0];

  const [showSpace, setShowSpace] = useState(false);
  const [customField, setCustomField] = useState<CustomField>(
    savedCustomField || DEFAULT_CUSTOM_FIELD
  );
  const { toast } = useToast();

  const customFieldConfig = {
    key: DYNAMIC_FIELD_KEY,
    type: customField.type,
    label: customField.name,
    description: "Custom field",
    ...(customField.required && { constraints: [{ type: "required" }] }),
    ...(customField.type === "enum" &&
      customField.enumOptions &&
      customOptionsConfig(customField.enumOptions)),
  };

  const spaceProps: ISpace = {
    publishableKey: process.env.NEXT_PUBLIC_FLATFILE_PUBLISHABLE_KEY,
    environmentId: process.env.NEXT_PUBLIC_FLATFILE_ENVIRONMENT_ID,
    name: "Dynamic Portal",
    // themeConfig: theme("#71a3d2", "#3A7CB9"),
    listener,
    // document,
    workbook: generateConfig({
      sheet,
      customFieldConfig,
    }),
    spaceInfo: {
      // userId,
    },
    sidebarConfig: {
      showDataChecklist: false,
      showSidebar: true,
    },
    spaceBody: {
      // languageOverride: language,
      metadata: {
        customFieldValidations: {
          decimals: customField.decimals,
          dateFormat: customField.dateFormat,
        },
      },
    },
    closeSpace: {
      operation: "contacts:submit", // todo: what do we put here?
      onClose: () => setShowSpace(false),
    },
  };

  const handleResetSubmit = async (e: FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      if (confirm("Reset workspace options?")) {
        const response = await fetch("/api/v1/reset-workspace", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          toast({
            title: "Error resetting workspace",
          });
          throw new Error("Error resetting workspace");
        }

        setCustomField(DEFAULT_CUSTOM_FIELD);

        toast({
          title: "Workspace was reset",
        });
      }
    } catch (error) {
      console.error("Error Resetting Workspace:", error);
    }
  };

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

      <div className="space-y-4">
        <div className="space-y-1">
          <p className="font-semibold">Generate your workspace</p>
          <p className="text-gray-400 text-sm">
            Click to generate the workspace with your custom config and input
            your data.
          </p>
        </div>

        <div className="flex flex-row items-center space-x-8">
          <button
            onClick={() => setShowSpace(!showSpace)}
            className={`space-x-2 px-4 py-2 inline-flex items-center justify-center rounded-md border text-sm font-medium shadow-sm button-bg`}
          >
            <SVG
              src="/images/sparkles-icon.svg"
              className="w-4 h-4 fill-white"
            />
            <span>{showSpace ? "Close Portal" : "Open Portal"}</span>
          </button>

          <button onClick={handleResetSubmit} className="underline text-xs">
            Reset Workspace
          </button>
        </div>
      </div>

      {showSpace && <DynamicEmbeddedSpace spaceProps={spaceProps} />}
    </div>
  );
}
