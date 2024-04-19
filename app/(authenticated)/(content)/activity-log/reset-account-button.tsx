"use client";

import { Button } from "@/components/ui/button";
import { ArrowPathRoundedSquareIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  async function onSubmit() {
    if (confirm("Are you sure you want to reset your account?")) {
      setIsSubmitting(true);
      localStorage.clear();
      try {
        await fetch("/api/reset-account", {
          method: "POST",
        });

        toast({
          title: "Account Reset",
        });
      } catch (error) {
        console.error("Error resetting account", error);
      }
    }

    setIsSubmitting(false);

    router.refresh();
  }

  return (
    <div>
      <Button
        disabled={isSubmitting}
        onClick={onSubmit}
        className={`rounded-xl text-base focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 sm:w-auto}`}
      >
        {isSubmitting ? "Resetting Account..." : "Reset Account"}
        <ArrowPathRoundedSquareIcon className="w-5 h-5 ml-2 stroke-white" />
      </Button>
    </div>
  );
}
