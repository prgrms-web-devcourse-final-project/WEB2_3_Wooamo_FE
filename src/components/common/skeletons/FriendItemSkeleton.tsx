import { Skeleton } from "@/components/ui/skeleton";

export default function FriendItemSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((_, idx) => (
    <div
      key={`ProfileRowSkeleton-${idx}`}
      className="flex items-center h-19 lg:h-25 gap-2.5 lg:gap-4"
    >
      <Skeleton className="w-11 lg:w-14 h-11 lg:h-14 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  ));
}
