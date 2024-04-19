import { MobileNav } from "@/app/(authenticated)/mobile-nav";
import { NavItems } from "@/app/(authenticated)/nav-items";
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
    <div className="p-6 md:p-16 lg:p-24 w-full overflow-auto">{children}</div>
  );
}
