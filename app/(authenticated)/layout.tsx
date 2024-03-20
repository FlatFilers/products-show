import SignOut from "@/app/(authenticated)/sign-out";
import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex flex-row space-x-8">
      <div>
        Sidebar
        <SignOut />
      </div>
      <div>{children}</div>
    </div>
  );
}
