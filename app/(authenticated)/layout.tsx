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
    <div className="bg-dark h-full text-white flex flex-row space-x-8">
      <div className="flex flex-grow flex-col overflow-y-auto pt-5 bg-[#292D36]">
        Sidebar
        <SignOut />
      </div>
      <div>{children}</div>
    </div>
  );
}
