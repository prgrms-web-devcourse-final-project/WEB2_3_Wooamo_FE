"use client";

import Image from "next/image";
import Link from "next/link";

import Divider from "@/assets/images/BlueDividerLong.svg";
import KakaoButton from "@/assets/images/kakaoLoginButton.png";
import KakaoMobileButton from "@/assets/images/MobilekakaoLoginButton.png";

import Button from "@/components/common/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import useInputValidation from "@/hooks/useInputValidation";
import { FormEvent, useEffect } from "react";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";
import { authApi } from "@/api/auth/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteCookie } from "cookies-next";
import { deleteCookieAtServer } from "@/api/cookie";
import { useToastStore } from "@/store/toastStore";

export default function SignIn() {
  const isMobile = useIsMobile();
  const { showToast } = useToastStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const { validate: emailValidate, ...email } = useInputValidation(
    "",
    (email) => {
      if (email === "") {
        return "이메일을 입력해주세요";
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

  const signIn = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailValidate() && passwordValidate()) {
      const res = await authApi.signIn({
        email: email.value,
        password: password.value,
      });
      if (res?.status === "성공") {
        if (res.data.role === "관리자") {
          showToast("관리자로 로그인에 성공했습니다");
          router.replace("/admin");
        } else {
          showToast("로그인에 성공했습니다");
          router.replace("/");
        }
      } else {
        showToast("로그인에 실패했습니다");
      }
    }
  };

  useEffect(() => {
    const kakaoLogin = async () => {
      if (code) {
        await deleteCookie("accessToken");
        await deleteCookieAtServer("accessToken");
        await authApi.kakaoLogin(code);
        router.replace("/");
      }
    };

    kakaoLogin();
  }, [code, router]);

  return (
    <div className="w-full lg:w-150 flex flex-col gap-7 mx-auto mt-[52px] mb-7">
      <form onSubmit={signIn} className="flex flex-col gap-7">
        <div className="text-xl lg:text-[28px] font-semibold flex justify-center">
          로그인
        </div>
        <div className="flex flex-col gap-7.5 lg:gap-8">
          <div className="w-full lg:w-150 flex flex-col gap-2.5 lg:gap-4">
            <label htmlFor="email" className="lg:text-xl font-semibold">
              이메일
            </label>
            <InputWithErrorMsg
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요"
              className="bg-site-button-input"
              {...email}
            />
          </div>
          <div className="w-full lg:w-150 flex flex-col gap-2.5 lg:gap-4">
            <label htmlFor="password" className="lg:text-xl font-semibold">
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
        </div>
        <Button className="w-full lg:w-150">로그인</Button>
        <p className="text-site-darkgray-02 underline flex justify-center">
          <Link href={"/signup"} className="text-sm lg-text-base">
            회원이 아니신가요? 회원가입 하러가기
          </Link>
        </p>
      </form>
      <div className="flex justify-center">
        <Image src={Divider} alt="구분선" className="" />
      </div>
      <Link
        href={`https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_CLIENT_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_CLIENT_URL}/api/kakaoLogin`}
        className="lg:w-150"
      >
        {isMobile ? (
          <Image
            src={KakaoMobileButton}
            alt="카카오 로그인 버튼"
            className="max-h-11 mx-auto"
          />
        ) : (
          <Image
            src={KakaoButton}
            alt="카카오 로그인 버튼"
            className="w-full"
          />
        )}
      </Link>
    </div>
  );
}
