import { deleteCookie, setCookie } from "cookies-next";
import { fetchCustom } from "../fetchCustom";
import { deleteCookieAtServer, setCookieAtServer } from "../cookie";
import { redirect } from "next/navigation";
import { revalidatePathAction } from "@/actions";

const checkIsDuplicatedNickname = async (
  body: checkIsDuplicatedNicknameReq,
) => {
  try {
    const response = await fetchCustom.post(`/user/nickname`, {
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const sendVerificationEmail = async (body: sendVerificationEmailReq) => {
  try {
    const response = await fetchCustom.post(`/user/auth/send`, {
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const verifyEmail = async (body: verifyEmailReq) => {
  try {
    const response = await fetchCustom.post(`/user/auth/check`, {
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (body: signUpReq) => {
  try {
    const response = await fetchCustom.post(`/user/register`, {
      body: JSON.stringify(body),
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const signIn = async ({ isAutoLogin, ...body }: signInReq) => {
  try {
    const response = await fetchCustom.post(`/user/login`, {
      headers: {
        // "X-Remember-Me": isAutoLogin ? "true" : "false",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) throw new Error(response.statusText);

    const accessToken = response.headers.get("Access");
    if (accessToken) {
      setCookie("accessToken", accessToken);
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const kakaoLogin = async (code: string) => {
  try {
    const response = await fetchCustom.post(`/user/kakaoLogin`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) throw new Error(response.statusText);

    const accessToken = response.headers.get("Access");
    if (accessToken) {
      setCookie("accessToken", accessToken);
      redirect("/");
    }

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const reissue = async () => {
  try {
    const response = await fetchCustom.post(`/user/reissue`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 400) return null;
    if (response.status === 401) return null;
    if (response.status === 500) return null;
    if (!response.ok) throw new Error(response.statusText);

    const accessToken: string | null = response.headers.get("Access");
    if (accessToken) {
      setCookie("accessToken", accessToken);
      setCookieAtServer("accessToken", accessToken);
    }
    return accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const logout = async () => {
  try {
    await deleteCookieAtServer("accessToken");
    await deleteCookie("accessToken");

    const response = await fetchCustom.post(`/user/logout`);
    if (response.status === 401) return await revalidatePathAction("/");
    if (!response.ok) throw new Error(response.statusText);

    await revalidatePathAction("/");
  } catch (error) {
    console.error(error);
  }
};

export const authApi = {
  checkIsDuplicatedNickname,
  sendVerificationEmail,
  verifyEmail,
  signUp,
  signIn,
  kakaoLogin,
  reissue,
  logout,
};
