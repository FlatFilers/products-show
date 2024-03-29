import Workspace from "@/app/(authenticated)/project-onboarding/workspace";

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
