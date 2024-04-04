"use client";

import { useState } from "react";
import { ISpace, initializeFlatfile } from "@flatfile/react";
import { Button } from "@/components/ui/button";

export default function EmbeddedPortal() {
  const spaceProps: ISpace = {
    space: {
      id: "",
      accessToken: "",
    },
    namespace: "",
    environmentId: "",
  };

  const [showSpace, setShowSpace] = useState(false);

  const { Space, OpenEmbed } = initializeFlatfile({
    ...spaceProps,
    closeSpace: {
      operation: "submitActionFg",
      onClose: () => setShowSpace(false),
    },
  });

  const onOpenSpace = async () => {
    setShowSpace(!showSpace);
    await fetch("/api/get-embedded-space/get-embedded-space", {
      method: "GET",
    });
  };

  return (
    <div className="content">
      <div>
        <Button className="contrast" onClick={onOpenSpace}>
          {showSpace === true ? "Close" : "Open"} Space
        </Button>
        {showSpace && <Space />}
      </div>
    </div>
  );
}
