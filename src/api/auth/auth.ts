import { deleteCookie, setCookie } from "cookies-next";
import { fetchCustom } from "../fetchCustom";

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
    deleteCookie("accessToken");
    const response = await fetchCustom.post(`/user/login`, {
      headers: {
        // "X-Remember-Me": isAutoLogin ? "true" : "false",
      },
      body: JSON.stringify(body),
    });

    const accessToken = response.headers.get("Access");
    if (accessToken) {
      setCookie("accessToken", accessToken);
    }

    if (!response.ok) throw new Error(response.statusText);

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
};
