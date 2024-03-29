"use client";

import Link from "next/link";
import SVG from "react-inlinesvg";
import SignOut from "@/app/(authenticated)/sign-out";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { WORKFLOW_ITEMS } from "@/lib/workflow-items";

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

        <div className="flex flex-col space-y-3">
          {Object.keys(WORKFLOW_ITEMS).map((key) => {
            const item = WORKFLOW_ITEMS[key as keyof typeof WORKFLOW_ITEMS];

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
