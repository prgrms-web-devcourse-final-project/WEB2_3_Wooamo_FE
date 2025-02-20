"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const routes = {
  "/admin/manage/party": "팟 관리",
  "/admin/manage/event": "이벤트 관리",
  "/admin/manage/item": "아이템 페이지",
} as const;

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <ul className="fixed top-25 w-60 h-[calc(100%-100px)] px-5 py-12 bg-site-button flex flex-col gap-8">
      {Object.keys(routes).map((path) => (
        <li
          key={path}
          className={twMerge(
            "flex justify-center items-center px-auto py-3 rounded-full text-xl",
            pathname === path && "bg-site-white-70 font-semibold"
          )}
        >
          <Link href={path}>{routes[path as keyof typeof routes]}</Link>
        </li>
      ))}
    </ul>
  );
}
