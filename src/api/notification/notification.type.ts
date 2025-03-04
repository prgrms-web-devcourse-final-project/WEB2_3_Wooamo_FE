/* eslint-disable @typescript-eslint/no-unused-vars */
type notificationType = "COMMENT" | "CONFIRM" | "FOLLOW";

interface notificationItem {
  alertId: string;
  typeId: number;
  type: notificationType;
  title: string;
  nickname: string;
  isRead: boolean;
  createdAt: string;
}
