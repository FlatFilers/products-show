import { WorkflowType } from "@/lib/workflow-type";
import CreateSpaceForm from "@/components/shared/create-space-form";

export default function Page() {
  return (
    <div>
      <CreateSpaceForm
        workflowType={WorkflowType.FileFeed}
        spaceName={"File Feed"}
      />
    </div>
  );
}
