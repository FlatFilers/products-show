"use client";

import Link from "next/link";
import SVG from "react-inlinesvg";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import {
  HOME_ITEM,
  RESOURCE_ITEMS,
  WORKFLOW_ITEMS,
} from "@/lib/workflow-constants";
import { signOut } from "next-auth/react";

export const NavItems = () => {
  const path = usePathname();

  return (
    <div className="h-full bg-bg-primary-light flex flex-col justify-between">
      <div className="flex justify-center items-center p-6 lg:p-4 ">
        <Link href="/home" className="flex flex-col items-center space-y-2">
          <SVG src="/images/plm-logo.svg" />
        </Link>
      </div>

      <div className="bg-bg-primary-light flex flex-col justify-between space-y-3 p-6 lg:p-4 h-full">
        <div className="space-y-6">
          <Link
            href={HOME_ITEM.href}
            className={clsx({
              active: path.includes(HOME_ITEM.href),
              "nav-item": true,
            })}
          >
            <SVG src={HOME_ITEM.imageUri} />
            {HOME_ITEM.name}
          </Link>

          <div className="space-y-3">
            <p className="nav-separator">Workflows</p>

            <div className="space-y-3">
              {Object.keys(WORKFLOW_ITEMS).map((key) => {
                const item = WORKFLOW_ITEMS[key as keyof typeof WORKFLOW_ITEMS];

                return (
                  <Link
                    key={item.slug}
                    href={item.href}
                    className={clsx({
                      active: path.includes(item.href),
                      "nav-item": true,
                    })}
                  >
                    <SVG src={item.imageUri} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="space-y-3">
            <p className="nav-separator">Data Tables</p>

            <div className="space-y-3">
              {RESOURCE_ITEMS.map((item) => {
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx({
                      active: path.includes(item.href),
                      "nav-item": true,
                    })}
                  >
                    <SVG src={item.imageUri} />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-3">
          <a
            key="Activity Log"
            href="/activity-log"
            className={`
            ${path === "/activity-log" ? "active" : ""} nav-item group`}
          >
            <SVG src={"/images/activity-log.svg"} />
            Activity Log
          </a>

          <a
            key="api-docs"
            href="/api-docs"
            target="_blank"
            className={`
            ${path === "/api-docs" ? "active" : ""} nav-item group`}
          >
            <SVG src={"/images/api-doc.svg"} />
            Products.Show API Docs
          </a>

          <div className="flex flex-col w-full border-t-2 border-[#FFFFFF25] pt-2 mt-2">
            <a
              href="#"
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="nav-item group"
            >
              <SVG src={"/images/logout.svg"} />
              Sign Out
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
