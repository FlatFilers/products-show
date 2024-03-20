import LoginForm from "@/app/(auth)/login/login-form";
import Link from "next/link";
import SVG from "react-inlinesvg";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-8">
        <SVG src="/images/hcm-logo.svg" />
        <p className="text-white text-center text-xl">Sign in to HCM.show</p>
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
