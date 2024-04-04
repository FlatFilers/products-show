import EmbeddedPortal from "@/app/(authenticated)/embedded-portal/embedded-portal";

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
      <EmbeddedPortal />
    </div>
  );
}
