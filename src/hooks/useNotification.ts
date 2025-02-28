import { useState, useEffect, useCallback, RefObject } from "react";
import { notificationApi } from "@/api/notification/notification";

interface UseNotificationProps {
  buttonRef: RefObject<HTMLDivElement | null>;
}

export function useNotification({ buttonRef }: UseNotificationProps) {
  const [notifications, setNotifications] = useState<notificationItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchNotifications = useCallback(async () => {
    try {
      const response = await notificationApi.getNotificationList();
      if (response?.data) {
        setNotifications(response.data);
      }
    } catch (error) {
      console.error("알림 목록 조회 실패:", error);
    }
  }, []);

  const handleMarkAllAsRead = useCallback(async () => {
    try {
      await notificationApi.markAllAsRead();
      setNotifications((prev) =>
        prev.map((notification) => ({
          ...notification,
          isRead: true,
        })),
      );
    } catch (error) {
      console.error("전체 알림 읽음 처리 실패:", error);
    }
  }, []);

  const handleMarkAsRead = useCallback(async (alertId: number) => {
    try {
      await notificationApi.markAsRead(alertId);
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.alertId === alertId
            ? { ...notification, isRead: true }
            : notification,
        ),
      );
    } catch (error) {
      console.error("알림 읽음 처리 실패:", error);
    }
  }, []);

  const toggleNotification = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeNotification = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !buttonRef.current?.contains(event.target as Node)) {
        closeNotification();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, buttonRef, closeNotification]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  return {
    notifications,
    isOpen,
    toggleNotification,
    closeNotification,
    handleMarkAllAsRead,
    handleMarkAsRead,
    fetchNotifications,
  };
}
