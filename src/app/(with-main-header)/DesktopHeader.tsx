"use client";

import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Avatar from "@/components/common/Avatar";
import basic from "@/assets/images/costumes/basic.png";
import { useState, useRef, useEffect } from "react";
import NotificationList from "../../components/common/NotificationList";
import { Notification } from "@/types/notification";
import Dropdown from "@/components/common/Dropdown";
import Button from "../../components/common/Button";
import { deleteCookie, hasCookie } from "cookies-next";
import dynamic from "next/dynamic";

const Icon = dynamic(() => import("@/components/common/Icon"), { ssr: false });

const routes = {
  "/boards": "게시판",
  "/shop": "상점",
  "/party": "팟 페이지",
} as const;

export default function DesktopHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const currentPathname = pathname.match(/\/\w+/)?.[0];
  const isLoggedIn = hasCookie("accessToken");

  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  const handleLogout = async () => {
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setIsOpenDropdown(false);
    router.push("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        buttonRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  //임시
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1,
      nickName: "사용자1",
      message: "님이 회원님의 게시글에 댓글을 남겼습니다.",
      isRead: false,
    },
    {
      id: 2,
      nickName: "사용자2",
      message: "님이 회원님을 팔로우했습니다.",
      isRead: true,
    },
  ]);

  const toggle = () => setIsOpen((prev) => !prev);
  const markAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    );
  };

  return (
    <header className="fixed w-full top-0 z-50 flex font-semibold text-2xl gap-0 justify-between px-12 h-25 items-center bg-[#8CCDF3]">
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

      {isLoggedIn ? (
        <div className="flex items-center gap-2.5">
          <Link href="/chatting">
            <Icon MuiIcon={SendRoundedIcon} className="cursor-pointer" />
          </Link>
          <div className="relative">
            <div ref={buttonRef}>
              <button onClick={toggle} className="cursor-pointer">
                <Icon
                  MuiIcon={NotificationsNoneRoundedIcon}
                  className="cursor-pointer"
                />
              </button>
            </div>
            {isOpen && (
              <NotificationList
                notifications={notifications}
                onMarkAllAsRead={markAllAsRead}
                onClose={() => setIsOpen(false)} // 이 prop이 빠져있었음
                className="w-[27.5rem]"
                buttonRef={buttonRef}
              />
            )}
          </div>
          <button onClick={() => setIsOpenDropdown(true)}>
            <Avatar costumeSrc={basic} className="w-14 h-14" />
          </button>
          {isOpenDropdown && (
            <Dropdown
              className="lg:top-22 lg:right-12 font-galmuri text-xl font-normal"
              onClose={() => setIsOpenDropdown(false)}
            >
              <Link
                href={"/mypage"}
                onClick={() => setIsOpenDropdown(false)}
                className="flex justify-center items-center px-6 py-4 hover:opacity-50 transition-colors"
              >
                마이페이지
              </Link>
              <Button
                onClick={handleLogout}
                className="w-full rounded-none px-6 py-4 hover:opacity-50 transition-colors"
              >
                로그아웃
              </Button>
            </Dropdown>
          )}
        </div>
      ) : (
        <div>
          <Link href={"/signin"}>로그인</Link>
        </div>
      )}
    </header>
  );
}
