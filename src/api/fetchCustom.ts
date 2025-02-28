import { getCookie } from "cookies-next";
import { getCookieAtServer } from "./cookie";

export const fetchCustom = {
  get: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const clientAccessToken = getCookie("accessToken");
    const serverAccessToken = await getCookieAtServer("accessToken");
    const accessToken = clientAccessToken || serverAccessToken;
    const baseUrl = isMockApi
      ? process.env.NEXT_PUBLIC_MOCK_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}${url}`, {
      ...init,
      headers: {
        access: String(accessToken),
      },
    });
    return response;
  },
  post: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const clientAccessToken = getCookie("accessToken");
    const serverAccessToken = await getCookieAtServer("accessToken");
    const accessToken = clientAccessToken || serverAccessToken;
    const baseUrl = isMockApi
      ? process.env.NEXT_PUBLIC_MOCK_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}${url}`, {
      ...init,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Access: String(accessToken) } : {}),
      },
    });
    return response;
  },
  put: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const clientAccessToken = getCookie("accessToken");
    const serverAccessToken = await getCookieAtServer("accessToken");
    const accessToken = clientAccessToken || serverAccessToken;
    const baseUrl = isMockApi
      ? process.env.NEXT_PUBLIC_MOCK_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}${url}`, {
      ...init,
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Access: String(accessToken) } : {}),
      },
    });
    return response;
  },
  patch: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const clientAccessToken = getCookie("accessToken");
    const serverAccessToken = await getCookieAtServer("accessToken");
    const accessToken = clientAccessToken || serverAccessToken;
    const baseUrl = isMockApi
      ? process.env.NEXT_PUBLIC_MOCK_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}${url}`, {
      ...init,
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Access: String(accessToken) } : {}),
      },
    });
    return response;
  },
  delete: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const clientAccessToken = getCookie("accessToken");
    const serverAccessToken = await getCookieAtServer("accessToken");
    const accessToken = clientAccessToken || serverAccessToken;
    const baseUrl = isMockApi
      ? process.env.NEXT_PUBLIC_MOCK_SERVER_URL
      : process.env.NEXT_PUBLIC_SERVER_URL;

    const response = await fetch(`${baseUrl}${url}`, {
      ...init,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...(accessToken ? { Access: String(accessToken) } : {}),
      },
    });
    return response;
  },
};
