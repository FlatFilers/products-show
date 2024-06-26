"use client";

import CreateSpaceForm from "@/components/shared/create-space-form";
import HeaderContent from "@/components/shared/header-content";
import {
  FILE_FEED_INITIAL_STEPS,
  FILE_FEED_ITEM,
} from "@/lib/workflow-constants";
import { WorkflowType } from "@/lib/workflow-type";
import SVG from "react-inlinesvg";

export default function SetupSpace() {
  const steps = FILE_FEED_INITIAL_STEPS;
  const item = FILE_FEED_ITEM;

  return (
    <div className="space-y-6">
      <HeaderContent item={item} steps={steps} />

      {steps[0].status === "current" && (
        <div className=" space-y-4 md:max-w-lg">
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
      <SVG
        src={item.heroUri}
        className="w-full md:w-2/3 lg:w-1/2 md:mx-auto md:absolute md:left-[35%] md:top-[100%] lg:left-[40%] lg:top-[60%]"
      />
    </div>
  );
}
