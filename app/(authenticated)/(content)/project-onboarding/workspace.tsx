"use client";

import HeaderContent from "@/components/shared/header-content";
import { Step } from "@/components/shared/step-list";
import VisitSpaceForm from "@/components/shared/visit-space-form";
import {
  PROJECT_ONBOARDING_INITIAL_STEPS,
  PROJECT_ONBOARDING_ITEM,
  SAMPLE_DATA_FILENAME,
} from "@/lib/workflow-constants";
import SVG from "react-inlinesvg";

export default function Workspace({ spaceId }: { spaceId: string }) {
  const steps: Step[] = [
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[0], status: "complete" },
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[1], status: "complete" },
  ];

  return (
    <div className="space-y-6">
      <HeaderContent item={PROJECT_ONBOARDING_ITEM} steps={steps} />

      <div className=" space-y-4">
        <p className="text-2xl">Your Flatfile space is configured. 🎉</p>

        <div className="flex flex-col md:flex-row justify-between lg:justify-start lg:space-x-12 space-y-12 md:space-y-0">
          <div className="md:max-w-md space-y-4">
            <p className="font-semibold">Upload Records in Flatfile</p>
            <p>
              Click the &ldquo;Visit Flatfile Space&rdquo; button below to
              access your dedicated space in Flatfile and receive a sign-in link
              via email.
            </p>
            <p>
              Upload the previously downloaded sample data after accessing the
              space.
            </p>
            <p>
              Once the data is uploaded and loaded into PLM Show, return to this
              page to review the data within the application.
            </p>

            <VisitSpaceForm spaceId={spaceId} />

            <p className="text-xs block text-gray-400">
              To download the sample data again{" "}
              <a
                className="underline text-gray-400"
                download={SAMPLE_DATA_FILENAME}
                href={SAMPLE_DATA_FILENAME}
              >
                click here.
              </a>
            </p>
          </div>
          <SVG
            src={PROJECT_ONBOARDING_ITEM.heroUri}
            className="w-full md:w-2/3 lg:w-1/2 md:mx-auto md:absolute md:left-[45%] md:top-[100%] lg:left-[30%] lg:top-[100%]"
          />
        </div>
      </div>
    </div>
  );
}
