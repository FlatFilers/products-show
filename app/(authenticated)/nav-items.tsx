import Link from "next/link";
import SVG from "react-inlinesvg";
import SignOut from "@/app/(authenticated)/sign-out";

export const NavItems = () => {
  return (
    <div className="h-full bg-dark-gray p-6 flex flex-col justify-between">
      <div className="space-y-8">
        <div className="flex justify-center items-center">
          <Link href="/home">
            <SVG src="/images/hcm-logo.svg" className="px-4" />
          </Link>
        </div>

        <div className="flex flex-col space-y-8">
          <Link href="/dummy-page">Dummy Page</Link>
          <Link href="/dummy-page">Dummy Page</Link>
          <Link href="/dummy-page">Dummy Page</Link>
          <Link href="/dummy-page">Dummy Page</Link>
          <Link href="/dummy-page">Dummy Page</Link>
        </div>
      </div>

      <SignOut />
    </div>
  );
};
