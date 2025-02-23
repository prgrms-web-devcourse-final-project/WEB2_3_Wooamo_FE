const checkIsDuplicatedNickname = async (
  body: checkIsDuplicatedNicknameReq,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/nickname`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const sendVerificationEmail = async (body: sendVerificationEmailReq) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const verifyEmail = async (body: verifyEmailReq) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/auth/check`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserInfoRes = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const signUp = async (body: signUpReq) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const data: getUserInfoRes = await response.json();
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
};
