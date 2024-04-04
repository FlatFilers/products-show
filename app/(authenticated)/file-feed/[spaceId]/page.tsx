import Workspace from "@/app/(authenticated)/file-feed/[spaceId]/workspace";

export default async function Page({
  params,
}: {
  params: {
    spaceId: string;
  };
}) {
  const spaceId = params.spaceId;

  return <Workspace spaceId={spaceId} />;
}
