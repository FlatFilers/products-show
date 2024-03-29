"use client";

import Link from "next/link";
import SVG from "react-inlinesvg";
import SignOut from "@/app/(authenticated)/sign-out";
import { NextRouter } from "next/router";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

const workflowItems = (router?: NextRouter) => {
  return [
    {
      slug: "project-onboarding",
      name: "Project Onboarding",
      href: "/project-onboarding",
      imageUri: "/images/project-onboarding.svg",
      // heroUri: "/images/project-onboarding-hero.svg",
      // color: "border-project-onboarding text-project-onboarding",
      // hoverColor:
      //   "group-hover:border-project-onboarding group-hover:text-project-onboarding",
      // highlightColor: "hover:border-project-onboarding",
      // description:
      //   "Flatfile enables multiple team members to collaborate over the course of a project in real-time, validating, transforming, and loading data into HCM.Show while ensuring everyone is on the same page.",
    },
    {
      slug: "embedded-portal",
      name: "Embedded Portal",
      href: "/embedded-portal",
      imageUri: "/images/embedded-portal.svg",
      // heroUri: "/images/embedded-portal-hero.svg",
      // color: "border-embedded-portal text-embedded-portal",
      // hoverColor:
      //   "group-hover:border-embedded-portal group-hover:text-embedded-portal",
      // highlightColor: "hover:border-embedded-portal",
      // description:
      //   "Flatfile's deeply configurable import experience is available right inside HCM Show. See how Flatfile simplifies the data onboarding process, eliminating the need for manual data mapping and significantly reducing errors.",
    },
    {
      slug: "file-feed",
      name: "File Feed",
      href: "/file-feed",
      imageUri: "/images/file-feed.svg",
      // heroUri: "/images/file-feed-hero.svg",
      // color: "border-file-feed text-file-feed",
      // hoverColor: "group-hover:border-file-feed group-hover:text-file-feed",
      // highlightColor: "hover:border-file-feed",
      // description:
      //   "Flatfile automatically picks up a file from an external source and initiates data onboarding on behalf of users. After the file is retrieved, users can take advantage of Flatfile's mapping engine and data table to provide them with a streamlined import experience.",
    },
    {
      slug: "dynamic-portal",
      name: "Dynamic Portal",
      href: "/dynamic-portal",
      imageUri: "/images/dynamic-portal.svg",
      // heroUri: "/images/dynamic-portal-hero.svg",
      // color: "border-dynamic-portal text-dynamic-portal",
      // hoverColor:
      //   "group-hover:border-dynamic-portal group-hover:text-dynamic-portal",
      // highlightColor: "hover:border-dynamic-portal",
      // description:
      //   "Flatfile’s configuration can be updated based on the settings from within the HCM Show application, allowing for fields to be added and picklist values to be updated. These changes are then reflected in an embedded iFrame modal.",
    },
  ];
};

export const NavItems = () => {
  const path = usePathname();

  return (
    <div className="h-full bg-dark-gray p-6 flex flex-col justify-between">
      <div className="space-y-8">
        <div className="flex justify-center items-center">
          <Link href="/home">
            <SVG src="/images/hcm-logo.svg" className="px-4" />
          </Link>
        </div>

        <div className="flex flex-col space-y-8">
          {workflowItems().map((item) => {
            return (
              <Link
                key={item.slug}
                href={item.href}
                className={clsx({
                  "bg-[#2E323C] text-[#FFFFFFCC]": path.includes(item.href),
                  "flex flex-row items-center space-x-2 hover:bg-[#2E323C] text-[#FFFFFF60] hover:text-[#FFFFFFCC] px-3 py-2 text-sm font-light rounded-md":
                    true,
                })}
              >
                <SVG
                  src={item.imageUri}
                  className="group-hover:fill-white w-[20px] h-[20px] mr-3"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <SignOut />
    </div>
  );
};
