type notificationType = "COMMENT" | "CONFIRM" | "FOLLOW";

interface notificationItem {
  alertId: number;
  typeId: number | null;
  type: notificationType;
  nickname: string;
  isRead: boolean;
}

interface notificationResponse {
  status: statusType;
  data: notificationItem[];
}

interface markAllAsReadResponse {
  status: statusType;
}

interface MarkAsReadResponse {
  status: statusType;
}
