import EmbeddedPortal from "@/app/(authenticated)/(content)/embedded-portal/embedded-portal";
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

  let space;

  try {
    space = await SpaceService.getSpace({
      id: spaceId,
    });
  } catch (e) {
    console.warn(`Space not found: ${spaceId}`);
  }

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
