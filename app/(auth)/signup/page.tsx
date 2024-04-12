import SignupForm from "@/app/(auth)/signup/signup-form";
import Link from "next/link";
import SVG from "react-inlinesvg";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center w-full">
        <span className="text-5xl">📦</span>
        <p className="mt-8 text-white text-center text-xl">
          Create your account
        </p>
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
