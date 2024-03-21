import { getServerSession } from "@/lib/get-server-session";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (session) {
    redirect("/home");
  }

  return (
    <div className="flex flex-row h-full py-16">
      <div className="w-full px-8 md:max-w-md md:mx-auto">{children}</div>
    </div>
  );
}
