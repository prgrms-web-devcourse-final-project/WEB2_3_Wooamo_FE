"use client";

import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";

const routes = {
  "/boards": "게시판",
  "/shop": "상점",
  "/party": "팟 페이지",
} as const;

export default function Header() {
  const pathname = usePathname();
  const currentPathname = pathname.match(/\/\w+/)?.[0];
  return (
    <header className="sticky top-0 flex font-semibold text-2xl gap-0 justify-between px-12 h-25 items-center bg-site-white-10 backdrop-blur-md">
      <div className="flex gap-20 items-center">
        <Link href={"/"}>
          <Image
            src={Logo}
            alt="STUV 로고"
            placeholder="blur"
            blurDataURL={"../assets/images/Logo.svg"}
          />
        </Link>
        <nav>
          <ul className="flex gap-4 items-center">
            {Object.keys(routes).map((path) => (
              <li
                key={path}
                className={twMerge(
                  "flex justify-center items-center w-34 h-15 rounded-full",
                  currentPathname === path && "bg-white",
                )}
              >
                <Link href={path}>{routes[path as keyof typeof routes]}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div>
        <Link href={"/signin"}>로그인</Link>
      </div>
    </header>
  );
}
