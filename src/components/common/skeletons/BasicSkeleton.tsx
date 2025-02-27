import { Skeleton } from "@/components/ui/skeleton";
import { twMerge } from "tailwind-merge";

interface BasicSkeletonProps {
  count: number;
  className?: string;
}

export default function BasicSkeleton({
  count,
  className,
}: BasicSkeletonProps) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <Skeleton
        key={`BasicSkeleton-${idx}`}
        className={twMerge("w-full h-15 lg:h-25 rounded-lg", className)}
      />
    ));
}
