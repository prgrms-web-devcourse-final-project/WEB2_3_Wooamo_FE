"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";
import Icon from "@/components/common/Icon";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";

const routes = {
  "/": "홈",
  "/boards": "게시판",
  "/shop": "상점",
  "/party": "팟 페이지",
} as const;

export default function MobileHeader() {
  const pathname = usePathname();
  const currentPathname = pathname.match(/\/\w+/)?.[0] ?? "/";

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openSidebar = () => {
    setIsVisible(true);
    setTimeout(() => setIsOpen(true), 0);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 200);
  };

  return (
    <>
      <header className="fixed top-0 z-50 flex justify-between px-5 h-15 items-center bg-site-white-10 backdrop-blur-md">
        <button onClick={openSidebar}>
          <Icon MuiIcon={MenuRoundedIcon} />
        </button>
        <Link
          onClick={closeSidebar}
          href={"/"}
          className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
        >
          <Image
            src={Logo}
            alt="STUV 로고"
            placeholder="blur"
            blurDataURL={"../assets/images/Logo.svg"}
          />
        </Link>
        <div className="flex gap-2.5">
          <Link href={"/chatting"} onClick={closeSidebar}>
            <Icon MuiIcon={SendRoundedIcon} />
          </Link>
          <button>
            <Icon MuiIcon={NotificationsRoundedIcon} />
          </button>
        </div>
      </header>

      {isVisible && (
        <aside
          className={twMerge(
            "fixed -top-15 left-0 w-65 h-screen px-6 mt-15 bg-site-button backdrop:blur-lg transition-transform duration-200 ease-out z-50",
            isOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <button onClick={closeSidebar} className="absolute top-3 right-2.5">
            <Icon MuiIcon={CloseRoundedIcon} />
          </button>

          <div className="flex flex-col gap-10 mt-27 font-bold">
            <Link onClick={closeSidebar} href={"/signin"}>
              로그인
            </Link>
            <nav>
              <ul className="flex flex-col gap-4 items-start">
                {Object.keys(routes).map((path) => (
                  <li
                    key={path}
                    className={twMerge(
                      "flex items-center w-full h-15 rounded-full",
                      currentPathname === path && "bg-white"
                    )}
                  >
                    <Link
                      onClick={closeSidebar}
                      href={path}
                      className="w-full px-5 py-4"
                    >
                      {routes[path as keyof typeof routes]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      )}
    </>
  );
}
