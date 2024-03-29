"use client";

import CreateSpaceForm from "@/app/(authenticated)/project-onboarding/create-space-form";
import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import DownloadSampleData from "@/components/shared/download-sample-data";
import { Step } from "@/components/shared/step-list";
import { WORKFLOW_ITEMS } from "@/lib/workflow-items";
import { WorkflowType } from "@/lib/workflow-type";
import { useState } from "react";

const SAMPLE_DATA_FILENAME = "/jobs_employees.xlsx";
const ITEM = WORKFLOW_ITEMS[WorkflowType.ProjectOnboarding];
const STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_ID}-project-onboarding-downloaded`;
const INITIAL_STEPS: Step[] = [
  {
    name: "Download Sample Data",
    status: "current",
  },
  {
    name: "Setup Flatfile",
    status: "upcoming",
  },
];

export default function SetupSpace() {
  const needsSampleData = localStorage.getItem(STORAGE_KEY) !== "true";

  const currentSteps: Step[] = needsSampleData
    ? INITIAL_STEPS
    : [
        { ...INITIAL_STEPS[0], status: "complete" },
        { ...INITIAL_STEPS[1], status: "current" },
      ];
  const [steps, setSteps] = useState<Step[]>(currentSteps);

  return (
    <div className="space-y-6">
      <HeaderContent item={ITEM} steps={steps} />

      {needsSampleData && (
        <DownloadSampleData
          fileName={SAMPLE_DATA_FILENAME}
          onClick={() => {
            localStorage.setItem(STORAGE_KEY, "true");

            setSteps([
              { ...steps[0], status: "complete" },
              { ...steps[1], status: "current" },
            ]);
          }}
        />
      )}

      <div className="text-white space-y-4 md:max-w-lg">
        <h2 className="text-2xl font-semibold">
          🎉 Great! Now let&apos;s setup Flatfile to import those records.
        </h2>
        <p className="">
          Click the button below and we&apos;ll configure the upload space and
          invite you to it. 👇
        </p>

        <CreateSpaceForm
          workflowType={WorkflowType.ProjectOnboarding}
          spaceName={"Project Onboarding"}
        />

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
    </div>
  );
}
