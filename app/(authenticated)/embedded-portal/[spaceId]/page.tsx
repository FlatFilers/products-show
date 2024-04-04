import EmbeddedPortal from "@/app/(authenticated)/embedded-portal/embedded-portal";
import { FlatfileService } from "@/lib/services/flatfile";
import { SpaceService } from "@/lib/services/space";
import {
  EMBEDDED_PORTAL_ITEM,
  PROJECT_ONBOARDING_INITIAL_STEPS,
} from "@/lib/workflow-constants";
import { redirect } from "next/navigation";
import HeaderContent from "@/app/(authenticated)/project-onboarding/header-content";
import { Step } from "@/components/shared/step-list";

export default async function Page({
  params,
}: {
  params: {
    spaceId: string;
  };
}) {
  const steps: Step[] = [
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[0], status: "complete" },
    { ...PROJECT_ONBOARDING_INITIAL_STEPS[1], status: "current" },
  ];

  const spaceId = params.spaceId;
  const space = await SpaceService.getSpace({
    id: spaceId,
  });
  if (!space) {
    redirect("/embedded-portal");
  }
  const flatfileSpace = await FlatfileService.getSpace({
    flatfileSpaceId: space.flatfileSpaceId,
  });

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
            <p>
              Launch Flatfile via the “Import Benefit Elections” button below.
            </p>
            <p>
              Use the Sidebar in the embedded application to guide you through
              the import process!
            </p>
            <EmbeddedPortal
              flatfileSpaceId={flatfileSpace.id}
              flatfileSpaceAccessToken={flatfileSpace.accessToken as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
