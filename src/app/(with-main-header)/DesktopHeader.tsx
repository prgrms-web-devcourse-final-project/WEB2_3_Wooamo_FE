"use client";

import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { twMerge } from "tailwind-merge";
import Icon from "@/components/common/Icon";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Avatar from "@/components/common/Avatar";
import basic from "@/assets/images/costumes/basic.png";
import { useState, useRef, useEffect } from "react";

const routes = {
  "/boards": "게시판",
  "/shop": "상점",
  "/party": "팟 페이지",
} as const;

export default function DesktopHeader() {
  const pathname = usePathname();
  const currentPathname = pathname.match(/\/\w+/)?.[0];
  const isLoggedIn = true;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

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
  const [notifications, setNotifications] = useState([
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

  const toggle = () => setIsOpen(!isOpen);
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
        <div className="flex items-center gap-8">
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
              <div
                ref={dropdownRef}
                className="absolute top-9 right-0 bg-white rounded-[10px] w-[440px]"
              >
                <div className="p-4 flex justify-between items-center">
                  <h3 className="text-xl font-semibold py-1">알림 목록</h3>
                  <button
                    className="text-sm font-semibold text-site-darkgray-02 hover:text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      markAllAsRead();
                    }}
                  >
                    전체 읽음
                  </button>
                </div>
                {notifications.length === 0 ? (
                  <div className="p-4 text-center text-site-darkgray-02">
                    알림이 없습니다
                  </div>
                ) : (
                  <ul className="mx-2.5 mb-2.5">
                    {notifications.map((notification) => (
                      <li
                        key={notification.id}
                        className={`p-4 cursor-pointer ${
                          !notification.isRead
                            ? "bg-site-button hover:bg-site-sub"
                            : " hover:bg-gray-50"
                        }`}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p className="text-[16px] my-3 text-black line-clamp-2 overflow-hidden">
                          <span className="font-semibold">
                            {notification.nickName}
                          </span>
                          <span className="font-normal">
                            {notification.message}
                          </span>
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
          <Link href="/users/1">
            <Avatar costumeSrc={basic} className="w-14 h-14" />
          </Link>
        </div>
      ) : (
        <div>
          <Link href={"/signin"}>로그인</Link>
        </div>
      )}
    </header>
  );
}
