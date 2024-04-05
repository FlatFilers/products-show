"use client";

import { useState } from "react";
import { ISpace, initializeFlatfile } from "@flatfile/react";
import { Button } from "@/components/ui/button";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";
import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import {
  EMBEDDED_PORTAL_ITEM,
  EMBEDDED_PORTAL_INITIAL_STEPS,
} from "@/lib/workflow-constants";
import { Step } from "@/components/shared/step-list";

export default function EmbeddedPortal({
  flatfileSpaceId,
  flatfileSpaceAccessToken,
}: {
  flatfileSpaceId: string;
  flatfileSpaceAccessToken: string;
}) {
  const [showSpace, setShowSpace] = useState(false);
  const steps: Step[] = [
    { ...EMBEDDED_PORTAL_INITIAL_STEPS[0], status: "complete" },
    { ...EMBEDDED_PORTAL_INITIAL_STEPS[1], status: "current" },
  ];

  const spaceProps: ISpace = {
    space: {
      id: flatfileSpaceId,
      accessToken: flatfileSpaceAccessToken,
    },
    namespace: process.env.NEXT_PUBLIC_FLATFILE_NAMESPACE as string,
    environmentId: process.env.NEXT_PUBLIC_FLATFILE_ENVIRONMENT_ID as string,
  };
  const { Space, OpenEmbed } = initializeFlatfile({
    ...spaceProps,
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => setShowSpace(false),
    },
  });

  const onOpenSpace = async () => {
    setShowSpace(!showSpace);
    OpenEmbed();
  };

  return (
    <div className="space-y-6">
      <HeaderContent item={EMBEDDED_PORTAL_ITEM} steps={steps} />
      <div className="text-white">
        <p className="text-2xl mb-8 md:max-w-lg">
          Your embedded Flatfile space is configured and ready for import. 🎉
        </p>
        <div className="flex flex-col md:flex-row justify-between lg:justify-start lg:space-x-12 space-y-12 md:space-y-0">
          <div className="md:max-w-md">
            <p className="font-semibold mb-4">Launch Flatfile</p>
            <p>Launch Flatfile via the “Import" button below.</p>
            <p>
              Use the Sidebar in the embedded application to guide you through
              the import process!
            </p>
            <div className="mt-8">
              <div className="content">
                <div>
                  <Button className="contrast" onClick={onOpenSpace}>
                    {showSpace ? "Close Portal" : "Import Data"}
                    {showSpace ? (
                      <ArrowsPointingInIcon className="w-4 h-4 ml-2" />
                    ) : (
                      <ArrowsPointingOutIcon className="w-4 h-4 ml-2" />
                    )}
                  </Button>
                  {showSpace && <Space />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
