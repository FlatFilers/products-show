import { Step } from "@/components/shared/step-list";
import { WORKFLOW_ITEMS } from "@/lib/workflow-items";
import { WorkflowType } from "@/lib/workflow-type";

export const PROJECT_ONBOARDING_ITEM =
  WORKFLOW_ITEMS[WorkflowType.ProjectOnboarding];
export const SAMPLE_DATA_FILENAME = "/jobs_employees.xlsx";

export const PROJECT_ONBOARDING_INITIAL_STEPS: Step[] = [
  {
    name: "Download Sample Data",
    status: "current",
  },
  {
    name: "Setup Flatfile",
    status: "upcoming",
  },
];
