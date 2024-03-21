import { UserService } from "@/lib/services/user";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options

export const authOptions: NextAuthOptions = {
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        firstName: { label: "First name", type: "hidden" },
        lastName: { label: "Last name", type: "hidden" },
        companyName: { label: "Company name", type: "hidden" },
        isSignup: { label: "isSignup", type: "hidden" },
      },

      // @ts-ignore This requires some await call that we are bypassing
      async authorize(credentials, req) {
        if (!credentials) {
          throw new Error("Enter an email and password");
        }

        let user;

        if (credentials?.isSignup === "true") {
          // console.log("Creating user");

          user = await UserService.createUser(credentials);
        } else {
          // console.log("Trying to log in user");

          user = await UserService.findUser({
            email: credentials.email,
            password: credentials.password,
          });

          if (!user) {
            throw new Error(
              "Email or password did not match. Please try again."
            );
          }
        }

        return user;
      },
    }),
  ],
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: "/",
    error: "/",
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }: any) {
      // console.log("token", token);
      // console.log("user", user);
      // console.log("account", account);
      // console.log("profile", profile);
      // console.log("isNewUser", isNewUser);

      if (user) {
        token.user = user;
      }

      return token;
    },
    async session({ session, user, token }: any) {
      // console.log("user", user);
      // console.log("session", session);
      // console.log("token", token);

      session.user = token.user;

      return session;
    },
  },
};
