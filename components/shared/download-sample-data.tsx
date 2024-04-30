"use client";

import { Button } from "@/components/ui/button";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function DownloadSampleData({
  fileName,
  onClick,
}: {
  fileName: string;
  onClick: () => void;
}) {
  return (
    <div className=" space-y-4">
      <h2 className="text-xl font-semibold">
        Let&apos;s get ready to upload data into Flatfile.
      </h2>

      <p className="">First, download the sample data. 👇</p>

      <Link download={fileName} href={fileName} onClick={onClick}>
        <Button className="space-x-2 mt-4 h-14 w-full md:w-1/3">
          <span>Download sample data</span>
          <ArrowDownTrayIcon className="w-4 h-4 stroke-white" />
        </Button>
      </Link>

      <div className="flex text-xs text-gray-400 w-fit space-x-1">
        <div className="block">Already have example data?</div>
        <div
          className="block underline text-xs hover:cursor-pointer"
          onClick={onClick}
        >
          Click here.
        </div>
      </div>
    </div>
  );
}
