import { getCookie } from "cookies-next";
import { getCookieAtServer } from "./cookie";
import { authApi } from "./auth/auth";

const fetchCustomBase = async (
  url: string,
  init?: RequestInit,
  isMockApi?: boolean,
  skipReissue?: boolean,
) => {
  const clientAccessToken = await getCookie("accessToken");
  const serverAccessToken = await getCookieAtServer("accessToken");
  const accessToken = clientAccessToken || serverAccessToken;
  const baseUrl = isMockApi
    ? process.env.NEXT_PUBLIC_MOCK_SERVER_URL
    : process.env.NEXT_PUBLIC_SERVER_URL;

  const response = await fetch(`${baseUrl}${url}`, {
    ...init,
    ...(isMockApi ? {} : { credentials: "include" }),
    headers: {
      ...init?.headers,
      ...(accessToken && { access: accessToken }),
    },
  });

  if (response.status === 401 && !skipReissue) {
    const newAccessToken = await authApi.reissue();
    if (newAccessToken) {
      return await fetchCustomBase(url, init, isMockApi, true);
    } else {
      return response;
    }
  }

  return response;
};

export const fetchCustom = {
  get: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const response = await fetchCustomBase(url, init, isMockApi);
    return response;
  },
  post: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const response = await fetchCustomBase(
      url,
      {
        ...init,
        method: "POST",
        headers: { ...init?.headers },
      },
      isMockApi,
    );
    return response;
  },
  put: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const response = await fetchCustomBase(
      url,
      {
        ...init,
        method: "PUT",
        headers: { ...init?.headers },
      },
      isMockApi,
    );
    return response;
  },
  patch: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const response = await fetchCustomBase(
      url,
      {
        ...init,
        method: "PATCH",
        headers: { ...init?.headers },
      },
      isMockApi,
    );
    return response;
  },
  delete: async (url: string, init?: RequestInit, isMockApi?: boolean) => {
    const response = await fetchCustomBase(
      url,
      {
        ...init,
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...init?.headers,
        },
      },
      isMockApi,
    );
    return response;
  },
};
