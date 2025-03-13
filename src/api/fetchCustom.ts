import { getCookie } from "cookies-next";
import { getCookieAtServer } from "./cookie";
import { authApi } from "./auth/auth";

interface CustomRequestInit extends RequestInit {
  isTokenExclude?: boolean;
}

const fetchCustomBase = async (
  url: string,
  customInit?: CustomRequestInit,
  skipReissue?: boolean,
) => {
  let accessToken;
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const { isTokenExclude, ...init } = customInit || {};

  if (!isTokenExclude) {
    const clientAccessToken = await getCookie("accessToken");
    const serverAccessToken = await getCookieAtServer("accessToken");
    accessToken = clientAccessToken || serverAccessToken;
  }

  const response = await fetch(`${baseUrl}${url}`, {
    ...init,
    credentials: "include",
    headers: {
      ...init?.headers,
      ...(accessToken && { access: accessToken }),
    },
  });

  if (response.status === 401 && !skipReissue) {
    const newAccessToken = await authApi.reissue();
    if (newAccessToken) {
      return await fetchCustomBase(url, customInit, true);
    } else {
      return response;
    }
  }

  return response;
};

export const fetchCustom = {
  get: async (url: string, init?: CustomRequestInit) => {
    const response = await fetchCustomBase(url, init);
    return response;
  },
  post: async (url: string, init?: CustomRequestInit) => {
    const response = await fetchCustomBase(url, {
      ...init,
      method: "POST",
      headers: { ...init?.headers },
    });
    return response;
  },
  put: async (url: string, init?: CustomRequestInit) => {
    const response = await fetchCustomBase(url, {
      ...init,
      method: "PUT",
      headers: { ...init?.headers },
    });
    return response;
  },
  patch: async (url: string, init?: CustomRequestInit) => {
    const response = await fetchCustomBase(url, {
      ...init,
      method: "PATCH",
      headers: { ...init?.headers },
    });
    return response;
  },
  delete: async (url: string, init?: CustomRequestInit) => {
    const response = await fetchCustomBase(url, {
      ...init,
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
    return response;
  },
};
