"use client";

import CreateSpaceForm from "@/components/shared/create-space-form";
import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import DownloadSampleData from "@/components/shared/download-sample-data";
import { Step } from "@/components/shared/step-list";
import {
  PROJECT_ONBOARDING_INITIAL_STEPS,
  PROJECT_ONBOARDING_ITEM,
  SAMPLE_DATA_FILENAME,
  EMBEDDED_PORTAL_ITEM,
} from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";
import { useEffect, useState } from "react";

const STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_ID}-project-onboarding-downloaded`;
const EMBED_STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_ID}-embedded-portal-downloaded`;

export default function SetupSpace({
  workflowType,
}: {
  workflowType: WorkflowType;
}) {
  const [steps, setSteps] = useState<Step[]>(PROJECT_ONBOARDING_INITIAL_STEPS);

  let storageKey;
  let item;
  let spaceName;
  if (workflowType === WorkflowType.Embed) {
    storageKey = EMBED_STORAGE_KEY;
    item = EMBEDDED_PORTAL_ITEM;
    spaceName = "Embedded Portal";
  } else {
    storageKey = STORAGE_KEY;
    item = PROJECT_ONBOARDING_ITEM;
    spaceName = "Project Onboarding";
  }

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

          <CreateSpaceForm workflowType={workflowType} spaceName={spaceName} />

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
