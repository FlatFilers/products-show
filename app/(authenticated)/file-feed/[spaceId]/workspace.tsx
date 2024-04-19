"use client";

import HeaderContent from "@/components/shared/header-content";
import { Step } from "@/components/shared/step-list";
import VisitSpaceForm from "@/components/shared/visit-space-form";
import { FilefeedEvent } from "@/lib/action";
import { Event } from "@/app/(authenticated)/file-feed/[spaceId]/event";
import {
  FILE_FEED_INITIAL_STEPS,
  FILE_FEED_ITEM,
} from "@/lib/workflow-constants";
import { useState, useEffect } from "react";
import SVG from "react-inlinesvg";

export default function Workspace({
  spaceId,
  initialEvents,
}: {
  spaceId: string;
  initialEvents: FilefeedEvent[];
}) {
  const steps: Step[] = [
    { ...FILE_FEED_INITIAL_STEPS[0], status: "complete" },
    { ...FILE_FEED_INITIAL_STEPS[1], status: "current" },
  ];

  const [events, setEvents] = useState<FilefeedEvent[]>(initialEvents);

  useEffect(() => {
    const timer = setInterval(() => {
      fetch("/api/filefeed-events").then((res) => {
        res.json().then((res: { actions: FilefeedEvent[] }) => {
          console.log("actions", res.actions);

          setEvents(res.actions);
        });
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8 md:relative">
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
                href={`https://drive.google.com/file/d/${process.env.NEXT_PUBLIC_GOOGLE_DRIVE_FILE_ID}/view?usp=sharing`}
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
        <table className="min-w-full divide-y divide-gray-300 ">
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
                return <tr key={i}>{<Event event={a} />}</tr>;
              })}
          </tbody>
        </table>
      </div>
      <SVG
        src={FILE_FEED_ITEM.heroUri}
        className="w-full md:w-2/3 lg:w-1/2 md:mx-auto md:absolute md:left-[35%] md:top-[100%] lg:left-[40%] lg:top-[60%]"
      />
    </div>
  );
}
