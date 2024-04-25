"use client";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useLanguage } from "@/components/shared/language-context";

const formSchema = z.object({
  spaceId: z.string(),
  language: z.string(),
});

export default function VisitSpaceForm({ spaceId }: { spaceId: string }) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");
  const { toast } = useToast();
  const language = useLanguage();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      spaceId,
      language,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit", values);

    setIsPending(true);

    try {
      const result = await fetch(
        `/api/visit-space/${spaceId}?language=${language}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Visiting space", result);

      if (!result.ok) {
        throw new Error("Error visiting space");
      }

      const json = await result.json();
      const guestLink = json.guestLink;

      window.open(guestLink, "_blank");
    } catch (e) {
      console.error(e);

      toast({
        title: "Error visiting space",
        description: (e as Error).message,
      });
      setError((e as Error).message);
    }

    setIsPending(false);
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
          {isPending ? "Loading..." : "Visit Flatfile Space"}
        </Button>
      </form>
    </Form>
  );
}
