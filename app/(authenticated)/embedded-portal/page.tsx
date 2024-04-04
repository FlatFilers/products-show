"use client";

import { WorkflowType } from "@/lib/workflow-type";
import CreateSpaceForm from "@/components/shared/create-space-form";
import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import {
  EMBEDDED_PORTAL_ITEM,
  PROJECT_ONBOARDING_INITIAL_STEPS,
  SAMPLE_DATA_FILENAME,
} from "@/lib/workflow-constants";
import { Step } from "@/components/shared/step-list";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Page() {
  const [steps, setSteps] = useState<Step[]>([
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[0], status: "complete" },
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[1], status: "current" },
  ]);

  return (
    <div className="space-y-6">
      <HeaderContent item={EMBEDDED_PORTAL_ITEM} steps={steps} />
      {steps[0].status !== "current" && (
        <div className="text-white space-y-4 md:max-w-lg">
          <h2 className="text-2xl font-semibold">
            🎉 Great! Now let&apos;s setup Flatfile to import those records.
          </h2>
          <p className="">
            Click the button below and we&apos;ll configure the upload space and
            invite you to it. 👇
          </p>

          <CreateSpaceForm
            workflowType={WorkflowType.Embed}
            spaceName={"Embedded Portal"}
          />

          <p className="text-xs block text-gray-400">
            To download the sample data again,{" "}
            <Link
              className={`text-gray-400 underline`}
              download={SAMPLE_DATA_FILENAME}
              href={SAMPLE_DATA_FILENAME}
            >
              click here.
            </Link>
          </p>
        </div>
      )}
      {steps[1].status === "current" && (
        <div>
          <p className="text-2xl">Your Flatfile space is configured. 🎉</p>
        </div>
      )}
    </div>
  );
}
