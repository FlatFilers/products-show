"use client";

import CreateSpaceForm from "@/components/shared/create-space-form";
import HeaderContent from "@/components/shared/header-content";
import {
  FILE_FEED_INITIAL_STEPS,
  FILE_FEED_ITEM,
} from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";

export default function SetupSpace() {
  const steps = FILE_FEED_INITIAL_STEPS;

  return (
    <div className="space-y-6">
      <HeaderContent item={FILE_FEED_ITEM} steps={steps} />

      {steps[0].status === "current" && (
        <div className="text-white space-y-4 md:max-w-lg">
          <h2 className="text-2xl font-semibold">
            Let&apos;s get ready to listen for file feed uploads.
          </h2>
          <p className="">
            First, let&apos;s setup Flatfile to listen for file uploads. 👇
          </p>

          <CreateSpaceForm
            workflowType={WorkflowType.FileFeed}
            spaceName={"File Feed"}
          />
        </div>
      )}
    </div>
  );
}
