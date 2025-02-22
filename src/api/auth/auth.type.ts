/* eslint-disable @typescript-eslint/no-unused-vars */
interface checkIsDuplicatedNicknameReq {
  nickname: string;
}

interface sendVerificationEmailReq {
  email: string;
}

interface verifyEmailReq {
  email: string;
  code: string;
}

interface signUpReq {
  email: string;
  password: string;
  nickname: string;
}
