import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileItemSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((_, idx) => (
    <div key={`ProfileItemSkeleton-${idx}`} className="flex gap-2.5">
      <Skeleton className="w-11 lg:w-14 h-11 lg:h-14 rounded-full" />
      <div className="flex flex-col lg:gap-1">
        <Skeleton className="h-4 lg:5 w-40" />
        <Skeleton className="h-4 lg:5 w-100" />
      </div>
    </div>
  ));
}
