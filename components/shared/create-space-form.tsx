"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, usePathname } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { WorkflowType } from "@/lib/workflow-type";

const formSchema = z.object({
  workflowType: z.nativeEnum(WorkflowType),
  spaceName: z.string(),
});

export default function CreateSpaceForm({
  workflowType,
  spaceName,
}: {
  workflowType: WorkflowType;
  spaceName: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const pathname = usePathname();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      workflowType,
      spaceName,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit", values);

    setIsPending(true);
    try {
      const result = await fetch("/api/create-space", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      console.log("Creating space", result);

      if (!result.ok) {
        throw new Error("Error creating space");
      }

      const json = await result.json();

      toast({
        title: "Space creation successful!",
      });

      router.push(`${pathname}/${json.spaceId}`);
    } catch (e) {
      console.error(e);

      toast({
        title: "Error creating space",
        description: (e as Error).message,
      });
      setIsPending(false);
      setError((e as Error).message);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative text-sm"
            role="alert"
          >
            {error}
          </div>
        )}

        <Button disabled={isPending} type="submit" className="w-full">
          {isPending ? "Creating space..." : "Create space"}
        </Button>
      </form>
    </Form>
  );
}
