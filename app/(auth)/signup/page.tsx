import SignupForm from "@/app/(auth)/signup/signup-form";
import SVG from "react-inlinesvg";

export default function Page() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center w-full">
        <SVG src="/images/hcm-logo.svg" />
        <p className="mt-8 text-white text-center text-xl">
          Create your account
        </p>
      </div>

      <SignupForm />
    </div>
  );
}
