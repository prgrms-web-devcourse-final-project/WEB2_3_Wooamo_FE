"use client";

import Image from "next/image";
import Link from "next/link";

import Divider from "@/assets/images/BlueDividerLong.svg";
import KakaoButton from "@/assets/images/kakaoLoginButton.png";
import KakaoMobileButton from "@/assets/images/MobilekakaoLoginButton.png";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Button from "@/components/common/Button";
import { useIsMobile } from "@/hooks/useIsMobile";
import useInputValidation from "@/hooks/useInputValidation";
import { FormEvent } from "react";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";

export default function SignIn() {
  const isMobile = useIsMobile();
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

  const signIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailValidate() && passwordValidate()) {
      console.log("로그인");
    }
  };

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
              type="text"
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
        <div className="flex items-center gap-3 relative">
          <input
            id="auto-signin"
            type="checkbox"
            className="appearance-none w-6 h-6 bg-site-button rounded-[3px]"
          />
          <CheckRoundedIcon className="absolute" />
          <label htmlFor="auto-signin">자동 로그인</label>
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
      <button className="w-full lg:w-150 ">
        {isMobile ? (
          <Image
            src={KakaoMobileButton}
            alt="카카오 로그인 버튼"
            className="w-full"
          />
        ) : (
          <Image
            src={KakaoButton}
            alt="카카오 로그인 버튼"
            className="w-full"
          />
        )}
      </button>
    </div>
  );
}
