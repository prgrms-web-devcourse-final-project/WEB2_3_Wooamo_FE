import { deleteCookie, setCookie } from "cookies-next";
import { fetchCustom } from "../fetchCustom";
import { useUserStore } from "@/store/userStore";
import { userApi } from "../user/user";

const checkIsDuplicatedNickname = async (
  body: checkIsDuplicatedNicknameReq,
) => {
  try {
    const response = await fetchCustom.post(`/user/nickname`, {
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      isTokenExclude: true,
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      isTokenExclude: true,
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      isTokenExclude: true,
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
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      isTokenExclude: true,
    });
    if (!response.ok) throw new Error(response.statusText);

    const data: responseType = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const signIn = async ({ ...body }: signInReq) => {
  try {
    deleteCookie("accessToken");
    const response = await fetchCustom.post(`/user/login`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      isTokenExclude: true,
    });

    if (response.status === 401) return null;
    if (!response.ok) throw new Error(response.statusText);

    const accessToken = response.headers.get("Access");
    if (accessToken) {
      await setCookie("accessToken", accessToken);
      const user = await userApi.getCurrentUserInfo();
      if (user?.status === "성공") {
        useUserStore.setState({ user: user.data });
      }
    }

    const data: responseType<{ role: "회원" | "관리자" }> =
      await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const kakaoLogin = async (code: string) => {
  try {
    deleteCookie("accessToken");
    const response = await fetchCustom.post(`/user/kakaoLogin`, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
      isTokenExclude: true,
    });
    if (!response.ok) throw new Error(response.statusText);

    const accessToken = response.headers.get("Access");
    if (accessToken) {
      await setCookie("accessToken", accessToken);
      const user = await userApi.getCurrentUserInfo();
      if (user?.status === "성공") {
        useUserStore.setState({ user: user.data });
      }
    }

    const data: responseType<{ role: "회원" | "관리자" }> =
      await response.json();
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
      await setCookie("accessToken", accessToken);
    }
    return accessToken;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const logout = async () => {
  try {
    const response = await fetchCustom.post(`/user/logout`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) throw new Error(response.statusText);

    await deleteCookie("accessToken");
    const data: responseType = await response.json();
    return data;
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
