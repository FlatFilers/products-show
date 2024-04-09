import Workspace from "@/app/(authenticated)/file-feed/[spaceId]/workspace";
import { SpaceService } from "@/lib/services/space";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: {
    spaceId: string;
  };
}) {
  const spaceId = params.spaceId;

  let space;
  try {
    space = await SpaceService.getSpace({ id: spaceId });
  } catch (e) {
    console.warn(`Space not found: ${spaceId}`);
  }

  if (!space) {
    redirect("/file-feed");
  }

  return <Workspace spaceId={spaceId} />;
}
