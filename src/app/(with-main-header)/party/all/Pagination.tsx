"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number | undefined;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 0;

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      {Array.from({ length: totalPages ?? 1 }, (_, i) => (
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded-full ${
            currentPage === i
              ? "bg-site-button text-site-black-100"
              : "hover:bg-site-darkgray-01"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
