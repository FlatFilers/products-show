import EmbeddedPortal from "@/app/(authenticated)/embedded-portal/embedded-portal";
import { FlatfileService } from "@/lib/services/flatfile";
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
  const space = await SpaceService.getSpace({
    id: spaceId,
  });
  if (!space) {
    redirect("/embedded-portal");
  }
  const flatfileSpace = await FlatfileService.getSpace({
    flatfileSpaceId: space.flatfileSpaceId,
  });

  return (
    <EmbeddedPortal
      flatfileSpaceId={flatfileSpace.id}
      flatfileSpaceAccessToken={flatfileSpace.accessToken as string}
    />
  );
}
