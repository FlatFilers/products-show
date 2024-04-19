import LoginForm from "@/app/(auth)/login/login-form";
import Link from "next/link";
import SVG from "react-inlinesvg";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-8">
        <SVG src="/images/plm-logo.svg" className="w-36" />
        <p className=" text-center text-xl">Sign in</p>
      </div>

      <LoginForm />

      <div className="flex justify-end">
        <Link href="/signup" className="text-gray-400 underline text-xs">
          Or signup for an account
        </Link>
      </div>
    </div>
  );
}
