"use client";

import { useState } from "react";
import { ISpace, initializeFlatfile } from "@flatfile/react";
import { Button } from "@/components/ui/button";
import {
  ArrowsPointingInIcon,
  ArrowsPointingOutIcon,
} from "@heroicons/react/24/outline";

export default function EmbeddedPortal({
  flatfileSpaceId,
  flatfileSpaceAccessToken,
}: {
  flatfileSpaceId: string;
  flatfileSpaceAccessToken: string;
}) {
  const [showSpace, setShowSpace] = useState(false);

  const spaceProps: ISpace = {
    space: {
      id: flatfileSpaceId,
      accessToken: flatfileSpaceAccessToken,
    },
    namespace: process.env.NEXT_PUBLIC_FLATFILE_NAMESPACE as string,
    environmentId: process.env.NEXT_PUBLIC_FLATFILE_ENVIRONMENT_ID as string,
  };
  const { Space, OpenEmbed } = initializeFlatfile({
    ...spaceProps,
    closeSpace: {
      operation: "contacts:submit",
      onClose: () => setShowSpace(false),
    },
  });

  const onOpenSpace = async () => {
    setShowSpace(!showSpace);
    OpenEmbed();
  };

  return (
    <div className="content">
      <div>
        <Button className="contrast" onClick={onOpenSpace}>
          {showSpace ? "Close Portal" : "Import Data"}
          {showSpace ? (
            <ArrowsPointingInIcon className="w-4 h-4 ml-2" />
          ) : (
            <ArrowsPointingOutIcon className="w-4 h-4 ml-2" />
          )}
        </Button>
        {showSpace && <Space />}
      </div>
    </div>
  );
}
