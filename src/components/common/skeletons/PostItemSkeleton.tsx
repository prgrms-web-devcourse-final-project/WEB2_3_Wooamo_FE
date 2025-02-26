import { Skeleton } from "@/components/ui/skeleton";

export default function PostItemSkeleton({ count }: { count: number }) {
  return new Array(count).fill(0).map((_, idx) => (
    <article
      key={`PostItemSkeleton-${idx}`}
      className="flex justify-between items-center h-24 lg:h-40 p-2.5 bg-site-white-70"
    >
      <div className="flex flex-col gap-1 lg:px-5">
        <Skeleton className="w-50 lg:w-100 h-5" />
        <Skeleton className="w-30 lg:w-60 h-5" />
        <Skeleton className="w-15 lg:w-20 h-5" />
      </div>
      <Skeleton className="w-20 h-20 lg:w-35 lg:h-35 object-cover" />
    </article>
  ));
}
