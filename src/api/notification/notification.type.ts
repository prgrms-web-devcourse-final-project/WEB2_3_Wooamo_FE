/* eslint-disable @typescript-eslint/no-unused-vars */
type notificationType = "COMMENT" | "CONFIRM" | "FOLLOW";

interface notificationItem {
  alertId: number;
  typeId: number | null;
  type: notificationType;
  nickname: string;
  isRead: boolean;
}

interface MarkAsReadResponse {
  status: statusType;
}
