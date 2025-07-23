import {
  CountUnreadNotificationsResponse,
  NotificationInput,
  NotificationsResponse,
} from "@/types/notification";
import { api } from "./api";
import { getServerToken, serverApi } from "./serverApi";

export const createNotification = async (
  isServer: false,
  input: NotificationInput
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.post("/auth/notifications", input);
    return response.data;
  } else {
    const response = await api.post("/auth/notifications", input);
    return response.data;
  }
};

export const markNotificationAsRead = async (
  isServer: boolean,
  notificationId: number,
  input: { is_read: boolean }
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.put(
      `/auth/notifications/${notificationId}/read`,
      input
    );
    return response.data;
  } else {
    const response = await api.put(
      `/auth/notifications/${notificationId}/read`,
      input
    );
    return response.data;
  }
};

export const deleteReadNotification = async (
  isServer: boolean,
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(
      `/auth/notifications`
    );
    return response.data;
  } else {
    const response = await api.delete(`/auth/notifications`);
    return response.data;
  }
};

export const deleteNotification = async (
  isServer: boolean,
  notificationId: number
) => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.delete(
      `/auth/notifications/${notificationId}`
    );
    return response.data;
  } else {
    const response = await api.delete(`/auth/notifications/${notificationId}`);
    return response.data;
  }
};

export const getNotifications = async (
  isServer: boolean,
  params: { page?: number; limit?: number }
): Promise<NotificationsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/notifications", { params });
    return response.data;
  } else {
    const response = await api.get("/auth/notifications", { params });
    return response.data;
  }
};

export const countUnreadNotifications = async (
  isServer: boolean,
  params: { customerId?: string }
): Promise<CountUnreadNotificationsResponse> => {
  if (isServer) {
    await getServerToken();
    const response = await serverApi.get("/auth/notifications/unread-count", {
      params,
    });
    return response.data;
  } else {
    const response = await api.get("/auth/notifications/unread-count", {
      params,
    });
    return response.data;
  }
};
