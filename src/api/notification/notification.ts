import { fetchCustom } from "../fetchCustom";

const getNotificationList = async () => {
  try {
    const response = await fetchCustom.get("/alert");

    if (!response.ok) {
      throw new Error("Failed to fetch notification list");
    }

    const data: responseType<notificationItem[]> = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notification list:", error);
    return null;
  }
};

const markAllAsRead = async () => {
  try {
    const response = await fetchCustom.patch("/alert");

    if (!response.ok) {
      throw new Error("Failed to mark all notifications as read");
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return null;
  }
};

const markAsRead = async (alertId: string) => {
  try {
    const response = await fetchCustom.patch(`/alert/${alertId}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to mark notification as read",
      );
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    return null;
  }
};

export const notificationApi = {
  getNotificationList,
  markAllAsRead,
  markAsRead,
};
