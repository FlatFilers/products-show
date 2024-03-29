import VisitSpaceForm from "@/components/shared/visit-space-form";

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
