"use client";

import StepList, { Step } from "@/components/shared/step-list";
import { WorkflowItem } from "@/lib/workflow-items";
import SVG from "react-inlinesvg";

export default function HeaderContent({
  item,
  steps,
}: {
  item: WorkflowItem;
  steps: Step[];
}) {
  return (
    <div className="space-y-4">
      <StepList steps={steps} />

      <SVG src={item.imageUri} className={`icon-${item.slug} w-16 h-16`} />

      <h1
        className={`text-4xl font-bold border-b border-${item.slug} pb-4 inline-block`}
      >
        {item.name}
      </h1>

      <p className="md:max-w-lg">{item.description}</p>
    </div>
  );
}
