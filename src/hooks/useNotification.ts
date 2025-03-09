import { useState, useEffect, useCallback, RefObject } from "react";
import { notificationApi } from "@/api/notification/notification";
import { useRouter } from "next/navigation";
import { useSSE } from "./useSSE";
import { getCookie } from "cookies-next";

interface UseNotificationProps {
  buttonRef: RefObject<HTMLDivElement | null>;
  dropdownRef: RefObject<HTMLDivElement | null>;
}

export function useNotification({
  buttonRef,
  dropdownRef,
}: UseNotificationProps) {
  const [notifications, setNotifications] = useState<notificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleNewNotification = useCallback(
    (newNotification: notificationItem) => {
      setNotifications((prev) => {
        const isDuplicate = prev.some(
          (notification) => notification.alertId === newNotification.alertId,
        );

        if (isDuplicate) {
          return prev;
        }

        return [newNotification, ...prev];
      });
    },
    [],
  );

  useSSE(handleNewNotification);

  const hasUnreadNotifications = useCallback(() => {
    return notifications.some((notification) => !notification.isRead);
  }, [notifications]);

  const fetchNotifications = useCallback(async () => {
    // 토큰 존재 여부 확인
    const accessToken = getCookie("accessToken");
    if (!accessToken) return;

    const response = await notificationApi.getNotificationList();
    if (response?.data) {
      setNotifications(response.data);
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    const allRead = notifications.every((notification) => notification.isRead);
    if (allRead) {
      console.log("이미 전체 읽음");
      return;
    }

    const response = await notificationApi.markAllAsRead();
    if (response) {
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    }
  }, [notifications]);

  const navigateToNotification = useCallback(
    (notification: notificationItem) => {
      switch (notification.type) {
        case "COMMENT":
        case "CONFIRM":
          if (notification.typeId) {
            router.push(`/boards/${notification.typeId}`);
          }
          break;
        case "FOLLOW":
          router.push("/friends");
          break;
      }
      closeNotification();
    },
    [router],
  );

  const handleMarkAsRead = useCallback(
    async (notification: notificationItem) => {
      try {
        if (!notification.isRead) {
          const response = await notificationApi.markAsRead(
            notification.alertId,
          );
          if (response) {
            setNotifications((prev) =>
              prev.map((item) =>
                item.alertId === notification.alertId
                  ? { ...item, isRead: true }
                  : item,
              ),
            );
          }
        }
        navigateToNotification(notification);
      } catch (error) {
        console.error("Error handling notification:", error);
        navigateToNotification(notification);
      }
    },
    [navigateToNotification],
  );

  const toggleNotification = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeNotification = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        closeNotification();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, buttonRef, closeNotification]);

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (accessToken) {
      fetchNotifications();
    }
  }, [fetchNotifications]);

  return {
    notifications,
    isOpen,
    toggleNotification,
    closeNotification,
    handleMarkAllAsRead,
    handleMarkAsRead,
    fetchNotifications,
    hasUnreadNotifications,
  };
}
