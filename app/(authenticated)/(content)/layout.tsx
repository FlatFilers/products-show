import { LanguageProvider } from "@/components/shared/language-context";
import LanguageSwitcher from "@/components/shared/language-switcher";
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
    <div className="p-6 md:p-16 lg:p-24 w-full overflow-auto">
      <LanguageProvider>
        <div className="flex justify-end mb-10">
          <LanguageSwitcher />
        </div>
        {children}
      </LanguageProvider>
    </div>
  );
}
