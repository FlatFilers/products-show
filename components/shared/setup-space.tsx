"use client";

import CreateSpaceForm from "@/components/shared/create-space-form";
import HeaderContent from "@/components/shared/header-content";
import DownloadSampleData from "@/components/shared/download-sample-data";
import { Step } from "@/components/shared/step-list";
import {
  PROJECT_ONBOARDING_INITIAL_STEPS,
  SAMPLE_DATA_FILENAME,
  WorkflowItem,
} from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";
import { useEffect, useState } from "react";
import SVG from "react-inlinesvg";

export default function SetupSpace({
  workflowType,
  storageKey,
  item,
}: {
  workflowType: WorkflowType;
  storageKey: string;
  item: WorkflowItem;
}) {
  const [steps, setSteps] = useState<Step[]>(
    item.steps || PROJECT_ONBOARDING_INITIAL_STEPS
  );

  useEffect(() => {
    if (
      localStorage.getItem(storageKey) === "true" &&
      steps[0].status === "current"
    ) {
      setSteps([
        { ...steps[0], status: "complete" },
        { ...steps[1], status: "current" },
      ]);
    }
  }, [steps, storageKey]);

  return (
    <div className="space-y-8 md:relative">
      <HeaderContent item={item} steps={steps} />

      {steps[0].status === "current" && (
        <DownloadSampleData
          fileName={SAMPLE_DATA_FILENAME}
          onClick={() => {
            localStorage.setItem(storageKey, "true");

            setSteps([
              { ...steps[0], status: "complete" },
              { ...steps[1], status: "current" },
            ]);
          }}
        />
      )}

      {steps[0].status !== "current" && (
        <div className="text-white space-y-4 md:max-w-lg">
          <h2 className="text-2xl font-semibold">
            🎉 Great! Now let&apos;s setup Flatfile to import those records.
          </h2>
          <p className="">
            Click the button below and we&apos;ll configure the upload space and
            invite you to it. 👇
          </p>

          <CreateSpaceForm workflowType={workflowType} spaceName={item.name} />

          <p className="text-xs block text-gray-400">
            To download the sample data again,{" "}
            <a
              className={`text-gray-400 underline`}
              download={SAMPLE_DATA_FILENAME}
              href={SAMPLE_DATA_FILENAME}
            >
              click here.
            </a>
          </p>
        </div>
      )}
      <SVG
        src={item.heroUri}
        className="w-full md:w-2/3 lg:w-1/2 md:mx-auto md:absolute md:left-[45%] md:top-[100%] lg:left-[30%] lg:top-[100%]"
      />
    </div>
  );
}
