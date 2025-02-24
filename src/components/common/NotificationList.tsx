import { Notification } from "@/types/notification";
import { useRef, useEffect, RefObject } from "react";
import { twMerge } from "tailwind-merge";

interface NotificationListProps {
  notifications: Notification[];
  onMarkAllAsRead: () => void;
  onClose: () => void;
  buttonRef: RefObject<HTMLDivElement | null>;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
}

export default function NotificationList({
  notifications,
  onMarkAllAsRead,
  onClose,
  buttonRef,
  listClassName,
  itemClassName,
}: NotificationListProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, buttonRef]);

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-9 right-0 bg-white rounded-2xl w-[27.5rem]`}
    >
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold py-1">알림 목록</h3>
        <button
          className="text-sm font-semibold text-site-darkgray-02 hover:text-black"
          onClick={(e) => {
            e.stopPropagation();
            onMarkAllAsRead();
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
        <ul className={twMerge("mx-2.5 mb-2.5", listClassName)}>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={twMerge(
                "cursor-pointer",
                itemClassName,
                "p-4",
                notification.isRead
                  ? "hover:bg-gray-50"
                  : "bg-site-button hover:bg-site-sub",
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="text-base my-3 text-black line-clamp-2 overflow-hidden">
                <span className="font-semibold">{notification.nickName}</span>
                <span className="font-normal">{notification.message}</span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
