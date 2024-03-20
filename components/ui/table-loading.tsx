"use client";

import { Skeleton } from "./skeleton";

export default function TableLoading() {
  return (
    <div className="w-100 h-28">
      <Skeleton className="h-14 mb-6 bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
      <Skeleton className="bg-gray-300" />
    </div>
  );
}
