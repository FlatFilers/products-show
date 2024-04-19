import { WorkflowType } from "@/lib/workflow-type";
import { SpaceService } from "@/lib/services/space";
import invariant from "ts-invariant";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import SetupSpace from "@/components/shared/setup-space";
import {
  PROJECT_ONBOARDING_ITEM,
  PROJECT_ONBOARDING_STORAGE_KEY,
} from "@/lib/workflow-constants";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");

  const space = await SpaceService.getSpaceForWorkflow({
    userId: session.user.id,
    workflowType: WorkflowType.ProjectOnboarding,
  });

  if (space) {
    redirect(`/project-onboarding/${space.id}`);
  }

  return (
    <SetupSpace
      workflowType={WorkflowType.ProjectOnboarding}
      storageKey={PROJECT_ONBOARDING_STORAGE_KEY}
      item={PROJECT_ONBOARDING_ITEM}
    />
  );
}
