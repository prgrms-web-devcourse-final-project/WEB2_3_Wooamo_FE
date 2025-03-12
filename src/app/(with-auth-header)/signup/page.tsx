"use client";

import Button from "@/components/common/Button";
import useInputValidation from "@/hooks/useInputValidation";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import { authApi } from "@/api/auth/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { debounce } from "@mui/material";
import Input from "@/components/common/Input";
import { useToastStore } from "@/store/toastStore";

export default function Signup() {
  const router = useRouter();
  const { showToast } = useToastStore();

  const [isVerifiedNickname, setIsVerifiedNickname] = useState(false);
  const [isVerifiedEmail, setIsVerifiedEmail] = useState(false);
  const [isSentVerificationEmail, setIsSentVerificationEmail] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  const { validate: nicknameValidate, ...nickname } = useInputValidation(
    "",
    (nickname) => {
      if (nickname === "") {
        return "닉네임을 입력해주세요";
      }
      if (!isVerifiedNickname) {
        return "닉네임 중복 체크를 해주세요";
      }
      return null;
    },
  );
  const { validate: emailValidate, ...email } = useInputValidation(
    "",
    (email) => {
      if (email === "") {
        return "이메일을 입력해주세요";
      }
      if (!isVerifiedEmail) {
        return "이메일 인증을 해주세요";
      }
      return null;
    },
  );
  const { validate: passwordValidate, ...password } = useInputValidation(
    "",
    (password) => {
      if (password === "") {
        return "비밀번호를 입력해주세요";
      }
      return null;
    },
  );
  const { validate: confirmPasswordValidate, ...confirmPassword } =
    useInputValidation("", (confirmPassword) => {
      if (confirmPassword === "") {
        return "비밀번호를 다시 입력해주세요";
      }
      if (confirmPassword !== password.value) {
        return "비밀번호가 일치하지 않습니다";
      }
      return null;
    });

  const checkIsDuplicatedNickname = async () => {
    if (nickname.value.trim() === "") {
      nicknameValidate();
      return;
    }

    const res = await authApi.checkIsDuplicatedNickname({
      nickname: nickname.value,
    });
    if (res?.status === "성공") {
      showToast("사용 가능한 닉네임입니다");
      setIsVerifiedNickname(true);
    } else {
      showToast("이미 사용중인 닉네임입니다");
      setIsVerifiedNickname(false);
    }
  };

  const sendVerificationEmail = async () => {
    if (email.value.trim() === "") {
      emailValidate();
      return;
    }

    const res = await authApi.sendVerificationEmail({ email: email.value });
    if (res?.status === "성공") {
      showToast("인증 메일을 발송했습니다");
      setIsSentVerificationEmail(true);
    } else {
      showToast("인증 메일 발송에 실패했습니다");
      setIsSentVerificationEmail(false);
    }
  };

  const verifyEmail = async () => {
    if (verificationCode.trim() === "") return;

    const res = await authApi.verifyEmail({
      email: email.value,
      code: verificationCode,
    });
    if (res?.status === "성공") {
      showToast("이메일 인증이 완료되었습니다");
      setIsVerifiedEmail(true);
    } else {
      showToast("인증번호가 일치하지 않습니다");
      setIsVerifiedEmail(false);
    }
  };

  const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      nicknameValidate() &&
      emailValidate() &&
      passwordValidate() &&
      confirmPasswordValidate()
    ) {
      const res = await authApi.signUp({
        email: email.value,
        password: password.value,
        nickname: nickname.value,
      });

      if (res?.status === "성공") {
        showToast("회원가입이 완료되었습니다");
        router.push("/signin");
      }
    }
  };

  return (
    <div className="w-full lg:w-150 flex flex-col gap-7 mx-auto mt-[52px] mb-7">
      <form onSubmit={signUp} className="flex flex-col gap-7">
        <div className="text-[28px] font-semibold flex justify-center">
          회원가입
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex flex-col w-full gap-3">
            <label htmlFor="nickname" className="text-xl font-semibold">
              닉네임
            </label>
            <div className="flex justify-between gap-3">
              <InputWithErrorMsg
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="bg-site-button-input w-full lg:w-114"
                value={nickname.value}
                onChange={(e) => {
                  setIsVerifiedNickname(false);
                  nickname.onChange(e);
                }}
                error={nickname.error}
              />
              <Button
                type="button"
                onClick={debounce(checkIsDuplicatedNickname, 500)}
                className="min-w-fit"
              >
                중복확인
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-xl font-semibold">
              이메일
            </label>
            <div className="flex justify-between gap-3">
              <InputWithErrorMsg
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요"
                className="bg-site-button-input w-full lg:w-114"
                value={email.value}
                onChange={(e) => {
                  setIsVerifiedEmail(false);
                  setIsSentVerificationEmail(false);
                  setVerificationCode("");
                  email.onChange(e);
                }}
                error={email.error}
              />
              <Button
                type="button"
                onClick={debounce(sendVerificationEmail, 500)}
                className="min-w-fit"
              >
                인증하기
              </Button>
            </div>
          </div>
          {isSentVerificationEmail && (
            <div className="flex flex-col gap-3 animate-slide-down">
              <label
                htmlFor="verification-code"
                className="text-xl font-semibold"
              >
                인증번호 확인
              </label>
              <div className="flex justify-between gap-3">
                <Input
                  id="verification-code"
                  placeholder="인증번호를 입력해주세요"
                  className="bg-site-button-input w-full lg:w-114"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  autoFocus
                />
                <Button
                  type="button"
                  onClick={debounce(verifyEmail, 500)}
                  className="min-w-fit"
                >
                  확인하기
                </Button>
              </div>
            </div>
          )}
          <div className="flex flex-col gap-3">
            <label htmlFor="password" className="text-xl font-semibold">
              비밀번호
            </label>
            <InputWithErrorMsg
              id="password"
              type="password"
              placeholder="비밀번호를 입력해주세요"
              className="bg-site-button-input"
              {...password}
            />
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="confirm-password" className="text-xl font-semibold">
              비밀번호 확인
            </label>
            <InputWithErrorMsg
              id="confirm-password"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              className="bg-site-button-input"
              {...confirmPassword}
            />
          </div>
        </div>
        <Button className="w-full">가입하기</Button>
      </form>
    </div>
  );
}
