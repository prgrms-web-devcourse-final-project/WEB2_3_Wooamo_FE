"use client";

import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import Avatar from "@/components/common/Avatar";
import { useState, useRef, useEffect } from "react";
import NotificationList from "../../components/common/NotificationList";
import { useNotification } from "@/hooks/useNotification";
import Dropdown from "@/components/common/Dropdown";
import Button from "../../components/common/Button";
import { hasCookie } from "cookies-next";
import dynamic from "next/dynamic";
import { userApi } from "@/api/user/user";
import { authApi } from "@/api/auth/auth";

const Icon = dynamic(() => import("@/components/common/Icon"), { ssr: false });

const routes = {
  "/boards": "게시판",
  "/shop": "상점",
  "/party": "팟 페이지",
} as const;

interface DesktopHeaderProps {
  serverIsLoggedIn: boolean;
}

export default function DesktopHeader({
  serverIsLoggedIn,
}: DesktopHeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const currentPathname = pathname.match(/\/\w+/)?.[0];
  const clientIsLoggedIn = hasCookie("accessToken");
  const isLoggedIn = clientIsLoggedIn || serverIsLoggedIn;

  const [user, setUser] = useState<userType | null>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    isOpen,
    toggleNotification,
    closeNotification,
    handleMarkAllAsRead,
    handleMarkAsRead,
    hasUnreadNotifications,
  } = useNotification({ buttonRef, dropdownRef });

  const handleLogout = async () => {
    await authApi.logout();
    setIsOpenDropdown(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      const user = await userApi.getCurrentUserInfo();
      if (user?.status === "성공") {
        setUser(user.data);
      }
    };
    fetchUser();
  }, [pathname]);
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
              <button
                onClick={toggleNotification}
                className="cursor-pointer relative"
              >
                <Icon
                  MuiIcon={NotificationsNoneRoundedIcon}
                  className="cursor-pointer"
                />
                {hasUnreadNotifications() && (
                  <div className="absolute top-2 right-1 w-2 h-2 bg-site-alarm rounded-full" />
                )}
              </button>
            </div>
            {isOpen && (
              <NotificationList
                notifications={notifications}
                onMarkAllAsRead={handleMarkAllAsRead}
                onMarkAsRead={handleMarkAsRead}
                buttonRef={buttonRef}
                dropdownRef={dropdownRef}
                className="w-[27.5rem]"
              />
            )}
          </div>
          <button onClick={() => setIsOpenDropdown(true)}>
            <Avatar costumeSrc={user?.profile ?? ""} className="w-14 h-14" />
          </button>
          {isOpenDropdown && (
            <Dropdown
              className="lg:top-22 lg:right-12 font-galmuri text-xl font-normal"
              onClose={() => setIsOpenDropdown(false)}
            >
              <Link
                href={"/friends"}
                onClick={() => setIsOpenDropdown(false)}
                className="flex justify-center items-center px-6 py-4 hover:opacity-50 transition-colors"
              >
                친구
              </Link>
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
