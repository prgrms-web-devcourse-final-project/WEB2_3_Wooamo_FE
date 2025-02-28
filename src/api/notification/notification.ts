const getNotificationList = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/alert`,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch notification list");
    }

    const data: notificationResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching notification list:", error);
    return null;
  }
};

const markAllAsRead = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/alert`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to mark all notifications as read");
    }

    const data: markAllAsReadResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    return null;
  }
};

const markAsRead = async (alertId: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_MOCK_SERVER_URL}/alert/${alertId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );

    if (!response.ok) {
      throw new Error("Failed to mark notification as read");
    }

    const data: MarkAsReadResponse = await response.json();
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
