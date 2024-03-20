"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { signIn } from "next-auth/react";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("onSubmit", values);

    setIsPending(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      console.log("Sign in result", result);

      if (!result) {
        throw new Error("No result from sign in");
      } else if (result.error) {
        throw new Error(result.error);
      }

      toast({
        title: "Signup successful!",
        description: "Logging you in...",
      });

      router.replace("/home");
    } catch (e) {
      console.error(e);

      toast({
        title: "Error creating account",
        description: (e as Error).message,
      });
      // TODO: make sure we show form errors
      setIsPending(false);
      setError((e as Error).message);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <p>{error}</p>

        <div className="flex mb-4">
          <div className="flex-1">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder="email@address.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          <div className="flex-1 ml-2">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="···············"
                        disabled={isPending}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
        </div>

        <Button
          disabled={isPending}
          type="submit"
          className="w-full md:block md:max-w-xs md:mx-auto"
        >
          {isPending ? "Signing in..." : "Sign in"}
        </Button>
      </form>
    </Form>
  );
}
