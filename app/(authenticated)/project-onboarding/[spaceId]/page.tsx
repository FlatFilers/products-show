import VisitSpaceForm from "../visit-space-form";

export default async function Page({
  params,
}: {
  params: {
    spaceId: string;
  };
}) {
  const spaceId = params.spaceId;

  return (
    <div>
      <VisitSpaceForm spaceId={spaceId} />
    </div>
  );
}
