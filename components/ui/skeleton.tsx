import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted w-full h-5 my-3",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
