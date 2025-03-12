"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";
import Icon from "@/components/common/Icon";
import { useState, useRef, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import NotificationList from "../../components/common/NotificationList";
import { useNotification } from "@/hooks/useNotification";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { userApi } from "@/api/user/user";
import Avatar from "@/components/common/Avatar";
import { authApi } from "@/api/auth/auth";
import { useNewNotification } from "@/hooks/useNewNotification";
import { useUserStore } from "@/store/userStore";
import { useToastStore } from "@/store/toastStore";

const routes = {
  "/": "홈",
  "/boards": "게시판",
  "/shop": "상점",
  "/party": "팟 페이지",
} as const;

export default function MobileHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const userStore = useUserStore();
  const { showToast } = useToastStore();
  const currentPathname = pathname.match(/\/\w+/)?.[0] ?? "/";

  const [user, setUser] = useState<userType | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    isOpen: isNotificationOpen,
    toggleNotification,
    handleMarkAllAsRead,
    handleMarkAsRead,
    hasUnreadNotifications,
  } = useNotification({ buttonRef, dropdownRef });

  const hasNewNotification = useNewNotification(
    notifications.length,
    isNotificationOpen,
  );

  const handleLogout = async () => {
    const res = await authApi.logout();
    if (res?.status === "성공") {
      setIsLoggedIn(false);
      userStore.setUser(null);
      closeSidebar();
      showToast("로그아웃 되었습니다");
      router.push("/");
    }
  };

  const openSidebar = () => {
    setIsVisible(true);
    setTimeout(() => setIsOpen(true), 0);
  };

  const closeSidebar = () => {
    setIsOpen(false);
    setTimeout(() => setIsVisible(false), 200);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userApi.getCurrentUserInfo();
      if (user?.status === "성공") {
        setUser(user.data);
      }
    };
    const checkIsLoggedIn = async () => {
      const isLoggedIn = await userApi.checkIsLoggedIn();
      if (isLoggedIn?.status === "성공") {
        setIsLoggedIn(isLoggedIn.data);
      }
    };

    fetchUser();
    checkIsLoggedIn();
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isVisible]);

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
        {isLoggedIn && (
          <div className="flex gap-2.5">
            <Link href="/chatting">
              <Icon MuiIcon={SendRoundedIcon} className="cursor-pointer" />
            </Link>
            <div className="relative">
              <div ref={buttonRef}>
                <button
                  onClick={toggleNotification}
                  className="cursor-pointer relative"
                >
                  <Icon
                    MuiIcon={NotificationsNoneRoundedIcon}
                    className="cursor-pointer"
                  />
                  {hasUnreadNotifications() && (
                    <div className="absolute top-1.5 right-1">
                      <div className="relative w-1.5 h-1.5">
                        {hasNewNotification && (
                          <span className="absolute inset-0 bg-site-alarm rounded-full animate-ping" />
                        )}
                        <span className="absolute inset-0 bg-site-alarm rounded-full" />
                      </div>
                    </div>
                  )}
                </button>
              </div>
              {isNotificationOpen && (
                <NotificationList
                  notifications={notifications}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onMarkAsRead={handleMarkAsRead}
                  buttonRef={buttonRef}
                  dropdownRef={dropdownRef}
                  className="w-[18.75rem]"
                />
              )}
            </div>
          </div>
        )}
      </header>
      {isVisible && (
        <aside
          ref={sidebarRef}
          className={twMerge(
            "fixed -top-15 left-0 w-65 h-screen px-6 mt-15 bg-site-button backdrop:blur-lg transition-transform duration-200 ease-out z-50",
            isOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <button onClick={closeSidebar} className="absolute top-3 right-2.5">
            <Icon MuiIcon={CloseRoundedIcon} />
          </button>

          <div className="flex flex-col gap-10 mt-27 font-semibold">
            {isLoggedIn ? (
              <Link
                href={`/users/${user?.userId}`}
                onClick={closeSidebar}
                className="flex items-center gap-2.5"
              >
                <Avatar
                  className="w-12.5 h-12.5"
                  costumeSrc={user?.profile || ""}
                />
                <div className="flex flex-col gap-1">
                  <p className="font-semibold">{user?.nickname}</p>
                  <p className="text-sm text-site-darkgray-02 line-clamp-1">
                    {user?.context}
                  </p>
                </div>
              </Link>
            ) : (
              <Link onClick={closeSidebar} href={"/signin"}>
                로그인
              </Link>
            )}
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
          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="absolute bottom-5 right-5"
            >
              <Icon MuiIcon={LogoutRoundedIcon} />
            </button>
          )}
        </aside>
      )}
    </>
  );
}
