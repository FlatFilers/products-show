import LoginForm from "@/app/(auth)/login/login-form";
import Link from "next/link";
import SVG from "react-inlinesvg";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center space-y-8">
        <span className="text-5xl">📦</span>
        <p className=" text-center text-xl">Sign in to plm.show</p>
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
