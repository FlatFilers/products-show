"use client";

import { Orbit } from "@uiball/loaders";

export default function LoadingCompo() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Orbit size={35} color="#231F20" />
    </div>
  );
}
