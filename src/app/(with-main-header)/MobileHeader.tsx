"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";
import Icon from "@/components/common/Icon";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
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
  const isLoggedIn = true;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

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
      <header className="fixed w-full top-0 z-50 flex justify-between px-5 h-15 items-center bg-[#8CCDF3]">
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
        {isLoggedIn ? (
          <div className="flex gap-2.5">
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
                  className="absolute top-9 right-0 bg-white rounded-2xl w-[18.75rem]"
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
          </div>
        ) : null}
      </header>
      {isVisible && (
        <aside
          className={twMerge(
            "fixed -top-15 left-0 w-65 h-screen px-6 mt-15 bg-site-button backdrop:blur-lg transition-transform duration-200 ease-out z-50",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <button onClick={closeSidebar} className="absolute top-3 right-2.5">
            <Icon MuiIcon={CloseRoundedIcon} />
          </button>

          <div className="flex flex-col gap-10 mt-27 font-semibold">
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
                      currentPathname === path && "bg-white",
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
