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
    <div className="h-full  flex flex-col lg:flex-row space-8 lg:space-0">
      <div className="lg:hidden">
        <MobileNav>
          <NavItems />
        </MobileNav>
      </div>

      <div
        className="hidden lg:flex flex-col"
        style={{
          background:
            "linear-gradient(0deg, #161A23, #161A23), linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1))",
        }}
      >
        <NavItems />
      </div>

      {children}
    </div>
  );
}
