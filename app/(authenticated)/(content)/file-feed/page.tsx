import { WorkflowType } from "@/lib/workflow-type";
import { SpaceService } from "@/lib/services/space";
import invariant from "ts-invariant";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";
import SetupSpace from "@/app/(authenticated)/(content)/file-feed/setup-space";

export default async function Page() {
  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");

  const space = await SpaceService.getSpaceForWorkflow({
    userId: session.user.id,
    workflowType: WorkflowType.FileFeed,
  });

  if (space) {
    redirect(`/file-feed/${space.id}`);
  }

  return <SetupSpace />;
}
