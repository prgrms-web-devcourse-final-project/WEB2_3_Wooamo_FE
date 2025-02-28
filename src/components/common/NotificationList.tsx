import { useRef, useEffect, RefObject, useState } from "react";
import { twMerge } from "tailwind-merge";
import { boardApi } from "@/api/board/board";

interface NotificationListProps {
  notifications: notificationItem[];
  onMarkAllAsRead: () => void;
  onMarkAsRead: (notification: notificationItem) => void;
  onClose: () => void;
  buttonRef: RefObject<HTMLDivElement | null>;
  dropdownRef: RefObject<HTMLDivElement | null>;
  className?: string;
  listClassName?: string;
  itemClassName?: string;
}

interface BoardTitles {
  [key: number]: string;
}

export default function NotificationList({
  notifications,
  onMarkAllAsRead,
  onMarkAsRead,
  onClose,
  buttonRef,
  dropdownRef,
  listClassName,
  itemClassName,
}: NotificationListProps) {
  const [boardTitles, setBoardTitles] = useState<BoardTitles>({});

  useEffect(() => {
    const fetchBoardTitles = async () => {
      const titlePromises = notifications
        .filter(
          (notification) =>
            notification.typeId !== null &&
            (notification.type === "COMMENT" ||
              notification.type === "CONFIRM"),
        )
        .map(async (notification) => {
          try {
            const response = await boardApi.getBoardByBoardId(
              notification.typeId!,
            );
            return { id: notification.typeId!, title: response.data.title };
          } catch (error) {
            console.error(
              `게시글 정보 조회 실패 (ID: ${notification.typeId}):`,
              error,
            );
            return { id: notification.typeId!, title: "삭제된 게시글" };
          }
        });

      const titles = await Promise.all(titlePromises);
      const titleMap = titles.reduce((acc, { id, title }) => {
        acc[id] = title;
        return acc;
      }, {} as BoardTitles);

      setBoardTitles(titleMap);
    };

    if (notifications.length > 0) {
      fetchBoardTitles();
    }
  }, [notifications]);

  const getNotificationMessage = (notification: notificationItem) => {
    const boardTitle = notification.typeId
      ? boardTitles[notification.typeId] || ""
      : "";

    const truncatedTitle =
      boardTitle.length > 5
        ? `[${boardTitle.slice(0, 5)}...]`
        : `[${boardTitle}]`;

    switch (notification.type) {
      case "COMMENT":
        return (
          <>
            님이 <span className="font-semibold">{truncatedTitle}</span>에
            댓글을 남겼습니다
          </>
        );
      case "FOLLOW":
        return "님이 친구를 요청했습니다";
      case "CONFIRM":
        return (
          <>
            <span className="font-semibold">{truncatedTitle}</span>의 댓글이
            채택되었습니다
          </>
        );
      default:
        return "";
    }
  };

  return (
    <div
      ref={dropdownRef}
      className={`absolute top-9 right-0 bg-white rounded-2xl w-75 lg:w-110`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4 flex justify-between items-center">
        <h3 className="text-xl font-semibold py-1">알림 목록</h3>
        <button
          className="text-sm font-semibold text-site-darkgray-02 hover:text-black"
          onClick={(e) => {
            e.preventDefault();
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
              key={notification.alertId}
              className={twMerge(
                "cursor-pointer",
                itemClassName,
                "p-4",
                notification.isRead
                  ? "hover:bg-gray-50"
                  : "bg-site-button hover:bg-site-sub",
              )}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onMarkAsRead(notification);
              }}
            >
              <p className="text-base my-3 text-black line-clamp-2 overflow-hidden">
                {notification.type !== "CONFIRM" && (
                  <span className="font-semibold">{notification.nickname}</span>
                )}
                <span className="font-normal">
                  {getNotificationMessage(notification)}
                </span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
