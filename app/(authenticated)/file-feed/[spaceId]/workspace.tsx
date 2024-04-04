"use client";

import HeaderContent from "@/components/shared/header-content";
import { Step } from "@/components/shared/step-list";
import VisitSpaceForm from "@/components/shared/visit-space-form";
import {
  FILE_FEED_INITIAL_STEPS,
  FILE_FEED_ITEM,
} from "@/lib/workflow-constants";

export default function Workspace({ spaceId }: { spaceId: string }) {
  const steps: Step[] = [
    { ...FILE_FEED_INITIAL_STEPS[0], status: "complete" },
    { ...FILE_FEED_INITIAL_STEPS[1], status: "current" },
  ];

  const events: any = [];

  return (
    <div className="space-y-6">
      <HeaderContent item={FILE_FEED_ITEM} steps={steps} />

      <div className="flex flex-row justify-between lg:justify-start lg:space-x-12 items-start">
        <div className="space-y-2 md:max-w-md">
          <p className="text-2xl">Ready and listening for events.&nbsp;🎉</p>
          <p>
            Congratulations! A Flatfile space has been configured and we’ve been
            able to pick up a file from a vendor for you!
          </p>
          <p>
            Click the &rdquo;Visit Flatfile Space&rdquo; button below to access
            your dedicated space in Flatfile.
          </p>
          <p>
            As new records are created or updated in Flatfile, events will
            appear in real-time on this page. These events will include
            information such as the event type, description, and when the event
            occurred.
          </p>

          <div className="space-y-4">
            <p className="text-xs">
              You can view the file uploaded to your space from Google Drive{" "}
              <a
                className="underline text-gray-400"
                target="_blank"
                href="https://drive.google.com/file/d/1Y9-rnoDuqxrvV9JIpDYoXq-nt3cdAJQ3/view?usp=sharing"
              >
                here.
              </a>
            </p>

            <VisitSpaceForm spaceId={spaceId} />
          </div>
        </div>
      </div>

      <div className="md:max-w-lg">
        <div className="border-1 border border-gray-100 mt-6"></div>
        <table className="min-w-full divide-y divide-gray-300 text-white">
          <thead>
            <tr>
              <th
                scope="col"
                className="w-64 py-3.5 pl-6 pr-3 text-left text-sm font-semibold"
              >
                Event
              </th>
              <th
                scope="col"
                className="w-64 px-6 py-3.5 text-left text-sm font-semibold"
              >
                When
              </th>
            </tr>
          </thead>
          <tbody>
            {!events ||
              (events.length === 0 && (
                <tr>
                  <td
                    colSpan={3}
                    className="text-gray-400 text-sm py-4 text-center"
                  >
                    No events yet
                  </td>
                </tr>
              ))}

            {events &&
              events.length > 0 &&
              events.map((a, i) => {
                return <tr key={i}>{/* <Event event={a} /> */}</tr>;
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
