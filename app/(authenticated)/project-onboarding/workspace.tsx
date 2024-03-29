"use client";

import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import VisitSpaceForm from "@/app/(authenticated)/project-onboarding/visit-space-form";
import { Step } from "@/components/shared/step-list";
import {
  PROJECT_ONBOARDING_INITIAL_STEPS,
  PROJECT_ONBOARDING_ITEM,
  SAMPLE_DATA_FILENAME,
} from "@/lib/workflow-constants";

export default function Workspace({ spaceId }: { spaceId: string }) {
  const steps: Step[] = [
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[0], status: "complete" },
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[1], status: "current" },
  ];

  return (
    <div className="space-y-6">
      <HeaderContent item={PROJECT_ONBOARDING_ITEM} steps={steps} />

      <div className="text-white space-y-4">
        <p className="text-2xl">Your Flatfile space is configured. 🎉</p>

        <div className="flex flex-col md:flex-row justify-between lg:justify-start lg:space-x-12 space-y-12 md:space-y-0">
          <div className="md:max-w-md space-y-2">
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
              Once the data is uploaded and loaded into HCM Show, return to this
              page to review the data within the application.
            </p>

            <div className="space-y-4">
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
          </div>
        </div>
      </div>
    </div>
  );
}
