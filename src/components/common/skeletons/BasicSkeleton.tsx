import { Skeleton } from "@/components/ui/skeleton";

export default function BasicSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => (
      <Skeleton
        key={`BasicSkeleton-${idx}`}
        className="w-full h-15 lg:h-25 rounded-lg"
      />
    ));
}
