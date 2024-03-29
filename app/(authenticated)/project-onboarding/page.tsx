import { WorkflowType } from "@/lib/workflow-type";
import CreateSpaceForm from "./create-space-form";
import { SpaceService } from "@/lib/services/space";
import invariant from "ts-invariant";
import { getServerSession } from "@/lib/get-server-session";
import SetupSpace from "@/app/(authenticated)/project-onboarding/setup-space";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");

  const space = await SpaceService.getSpaceForWorkflow({
    userId: session.user.id,
    workflowType: WorkflowType.ProjectOnboarding,
  });

  return (
    <div>
      <SetupSpace />
    </div>
  );
}
