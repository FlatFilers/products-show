import Workspace from "@/app/(authenticated)/file-feed/[spaceId]/workspace";
import { getServerSession } from "@/lib/get-server-session";
import { serializeFilefeedEvents } from "@/lib/serializers/filefeed-event";
import { ActionService } from "@/lib/services/action";
import { SpaceService } from "@/lib/services/space";
import { redirect } from "next/navigation";
import invariant from "ts-invariant";

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

  const session = await getServerSession();
  invariant(session?.user, "User must be logged in");

  const actions = await ActionService.getFilefeedEvents({
    userId: session.user.id,
  });
  const events = serializeFilefeedEvents(actions);

  return <Workspace spaceId={spaceId} initialEvents={events} />;
}
