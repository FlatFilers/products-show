import NextAuth from "next-auth";

export interface SessionUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
}

declare module "next-auth" {
  interface Session {
    user: SessionUser;
  }

  interface JWT {
    user: SessionUser;
  }

  interface User extends DefaultUser {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    companyName: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: SessionUser;
  }
}
