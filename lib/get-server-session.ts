import { getServerSession as nextGetServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export function getServerSession(): Promise<Session | null> {
  return nextGetServerSession(authOptions);
}
