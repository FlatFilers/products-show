import { Step } from "@/components/shared/step-list";
import { WorkflowType } from "@/lib/workflow-type";

export const SAMPLE_DATA_FILENAME = "/products-sample-data.csv";

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

export const EMBEDDED_PORTAL_INITIAL_STEPS: Step[] = [
  {
    name: "Download Sample Data",
    status: "current",
  },
  {
    name: "Setup Flatfile",
    status: "upcoming",
  },
];

export const FILE_FEED_INITIAL_STEPS: Step[] = [
  {
    name: "Setup Flatfile",
    status: "current",
  },
  {
    name: "Listen for File Uploads",
    status: "upcoming",
  },
];

export const PROJECT_ONBOARDING_STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_ID}-project-onboarding-downloaded`;
export const EMBEDDED_PORTAL_STORAGE_KEY = `${process.env.NEXT_PUBLIC_APP_ID}-embedded-portal-downloaded`;

type NavItem = {
  name: string;
  href: string;
  imageUri: string;
};

export type WorkflowItem = NavItem & {
  slug: string;
  color: string;
  highlightColor: string;
  description: string;
  steps?: Step[];
  heroUri: string;
};

export const HOME_ITEM: NavItem = {
  name: "Home",
  href: "/home",
  imageUri: "/images/home.svg",
};

export const WORKFLOW_ITEMS: {
  [key in WorkflowType]: WorkflowItem;
} = {
  [WorkflowType.ProjectOnboarding]: {
    slug: "project-onboarding",
    name: "Project Onboarding",
    href: "/project-onboarding",
    imageUri: "/images/project-onboarding.svg",
    heroUri: "/images/project-onboarding-hero.svg",
    color: "border-project-onboarding text-project-onboarding",
    // hoverColor:
    //   "group-hover:border-project-onboarding group-hover:text-project-onboarding",
    highlightColor: "hover:border-project-onboarding",
    description:
      "Flatfile enables multiple team members to collaborate over the course of a project in real-time, validating, transforming, and loading data into PLM Show while ensuring everyone is on the same page.",
    steps: PROJECT_ONBOARDING_INITIAL_STEPS,
  },
  [WorkflowType.Embed]: {
    slug: "embedded-portal",
    name: "Embedded Portal",
    href: "/embedded-portal",
    imageUri: "/images/embedded-portal.svg",
    heroUri: "/images/embedded-portal-hero.svg",
    color: "border-embedded-portal text-embedded-portal",
    // hoverColor:
    //   "group-hover:border-embedded-portal group-hover:text-embedded-portal",
    highlightColor: "hover:border-embedded-portal",
    description:
      "Flatfile's deeply configurable import experience is available right inside PLM Show. See how Flatfile simplifies the data onboarding process, eliminating the need for manual data mapping and significantly reducing errors.",
    steps: EMBEDDED_PORTAL_INITIAL_STEPS,
  },
  [WorkflowType.FileFeed]: {
    slug: "file-feed",
    name: "File Feed",
    href: "/file-feed",
    imageUri: "/images/file-feed.svg",
    heroUri: "/images/file-feed-hero.svg",
    color: "border-file-feed text-file-feed",
    // hoverColor: "group-hover:border-file-feed group-hover:text-file-feed",
    highlightColor: "hover:border-file-feed",
    description:
      "Flatfile automatically picks up a file from an external source and initiates data onboarding on behalf of users. After the file is retrieved, users can take advantage of Flatfile's mapping engine and data table to provide them with a streamlined import experience.",
  },
  [WorkflowType.Dynamic]: {
    slug: "dynamic-portal",
    name: "Dynamic Portal",
    href: "/dynamic-portal",
    imageUri: "/images/dynamic-portal.svg",
    heroUri: "",
    color: "border-dynamic-portal text-dynamic-portal",
    // hoverColor:
    //   "group-hover:border-dynamic-portal group-hover:text-dynamic-portal",
    highlightColor: "hover:border-dynamic-portal",
    description:
      "Flatfile’s configuration can be updated based on the settings from within the PLM Show application, allowing for fields to be added and picklist values to be updated. These changes are then reflected in an embedded iFrame modal.",
  },
};

export const PROJECT_ONBOARDING_ITEM =
  WORKFLOW_ITEMS[WorkflowType.ProjectOnboarding];
export const FILE_FEED_ITEM = WORKFLOW_ITEMS[WorkflowType.FileFeed];

export const EMBEDDED_PORTAL_ITEM = WORKFLOW_ITEMS[WorkflowType.Embed];

export const RESOURCE_ITEMS: NavItem[] = [
  {
    name: "Suppliers",
    href: "/suppliers",
    imageUri: "/images/employees.svg",
  },
  {
    name: "Products",
    href: "/products",
    imageUri: "/images/jobs.svg",
  },
  {
    name: "Attributes",
    href: "/attributes",
    imageUri: "/images/departments.svg",
  },
  {
    name: "Categories",
    href: "/categories",
    imageUri: "/images/benefit-plans.svg",
  },
];
