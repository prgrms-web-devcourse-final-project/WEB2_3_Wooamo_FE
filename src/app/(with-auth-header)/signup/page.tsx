"use client";

import Button from "@/components/common/Button";
import useInputValidation from "@/hooks/useInputValidation";
import InputWithErrorMsg from "@/components/common/InputWithErrorMsg";

export default function Signup() {
  const { validate: nicknameValidate, ...nickname } = useInputValidation(
    "",
    (nickname) => {
      if (nickname === "") {
        return "닉네임을 입력해주세요";
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
    useInputValidation("", (password) => {
      if (password === "") {
        return "비밀번호를 다시 입력해주세요";
      }
      return null;
    });

  const signUp = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      nicknameValidate() &&
      emailValidate() &&
      passwordValidate() &&
      confirmPasswordValidate()
    ) {
      console.log("회원가입");
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
            <div className="flex justify-between">
              <InputWithErrorMsg
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="bg-site-button-input w-65 lg:w-114"
                {...nickname}
              />
              <Button type="button" className="min-w-fit">
                중복확인
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-xl font-semibold">
              이메일
            </label>
            <div className="flex justify-between">
              <InputWithErrorMsg
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요"
                className="bg-site-button-input w-65 lg:w-114"
                {...email}
              />
              <Button type="button" className="min-w-fit">
                인증하기
              </Button>
            </div>
          </div>
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
