"use client";

import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <a href="#" onClick={() => signOut()}>
      Sign Out
    </a>
  );
}
