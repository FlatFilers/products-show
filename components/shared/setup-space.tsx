"use client";

import CreateSpaceForm from "@/components/shared/create-space-form";
import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import DownloadSampleData from "@/components/shared/download-sample-data";
import { Step } from "@/components/shared/step-list";
import {
  PROJECT_ONBOARDING_INITIAL_STEPS,
  SAMPLE_DATA_FILENAME,
  WORKFLOW_ITEMS,
} from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";
import { useEffect, useState } from "react";

export default function SetupSpace({
  workflowType,
  storageKey,
}: {
  workflowType: WorkflowType;
  storageKey: string;
}) {
  const item = WORKFLOW_ITEMS[workflowType];
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
  }, [steps]);

  return (
    <div className="space-y-6">
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
    </div>
  );
}