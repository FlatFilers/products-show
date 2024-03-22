import NextAuth from "next-auth";

declare module "next-auth" {
  type SessionUser = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  } & DefaultSession["user"];
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: SessionUser;
  }
}
