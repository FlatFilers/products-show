import { WorkflowType } from "@/lib/workflow-type";
import CreateSpaceForm from "./create-space-form";

export default function Page() {
  return (
    <div>
      <CreateSpaceForm
        workflowType={WorkflowType.ProjectOnboarding}
        spaceName={"Project Onboarding"}
      />
    </div>
  );
}
