import { useState, useEffect } from "react";

export const useNewNotification = (
  notificationCount: number,
  isOpen: boolean,
) => {
  const [prevNotificationCount, setPrevNotificationCount] = useState(0);
  const [hasNewNotification, setHasNewNotification] = useState(false);

  useEffect(() => {
    if (notificationCount > prevNotificationCount) {
      setHasNewNotification(true);
    }
    setPrevNotificationCount(notificationCount);
  }, [notificationCount, prevNotificationCount]);

  useEffect(() => {
    if (isOpen) {
      setHasNewNotification(false);
    }
  }, [isOpen]);

  return hasNewNotification;
};
