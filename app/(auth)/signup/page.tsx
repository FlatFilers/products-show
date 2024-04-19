import SignupForm from "@/app/(auth)/signup/signup-form";
import Link from "next/link";
import SVG from "react-inlinesvg";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center w-full">
        <SVG src="/images/plm-logo.svg" className="w-36" />
        <p className="mt-8  text-center text-xl">Create your account</p>
      </div>

      <SignupForm />

      <p className="flex justify-end text-gray-400 text-xs space-x-1">
        <span>Already have an account?</span>
        <Link href="/login" className="underline">
          Login here
        </Link>
      </p>
    </div>
  );
}
