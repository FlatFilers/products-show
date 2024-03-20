import { getServerSession as nextGetServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/lib/next-auth-options";

export function getServerSession(): Promise<Session | null> {
  return nextGetServerSession(authOptions);
}
