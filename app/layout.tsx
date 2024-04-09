import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";

const raleway = Raleway({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "plm.show",
  description: "plm.show by Flatfile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-dark">
      <body className={`${raleway.className} h-full bg-dark`}>
        {children}

        <Toaster />
      </body>
    </html>
  );
}
