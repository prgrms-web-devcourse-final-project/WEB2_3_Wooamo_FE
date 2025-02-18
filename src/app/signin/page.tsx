import Image from "next/image";
import Link from "next/link";

import Logo from "@/assets/images/Logo.svg";
import Divider from "@/assets/images/BlueDividerLong.svg";
import KakaoButton from "@/assets/images/kakaoLoginButton.png";

import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
export default function SignIn() {
  return (
    <div>
      <header className="sticky top-0 h-25 flex items-center justify-center bg-site-white-100 border-1 border-site-button drop-shadow-[0_4px_4px_rgba(207,236,250,0.25)]">
        <Link href={"/"}>
          <Image src={Logo} alt="STUV 로고" />
        </Link>
      </header>
      <div className="w-[600px] flex flex-col gap-7 mx-auto mt-[52px] mb-7">
        <form className="flex flex-col gap-7">
          <div className="text-[28px] font-semibold flex justify-center">
            로그인
          </div>
          <div className="flex flex-col gap-3">
            <div className="w-[600px] flex flex-col gap-4">
              <label htmlFor="email" className="text-xl font-semibold">
                이메일
              </label>
              <Input
                required
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요"
                className="bg-site-button-input"
              />
            </div>
            <div className="w-[600px] flex flex-col gap-4">
              <label htmlFor="password" className="text-xl font-semibold">
                비밀번호
              </label>
              <Input
                required
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="bg-site-button-input"
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
          <Button className="w-[600px]">로그인</Button>
          <p className="text-site-darkgray-02 underline flex justify-center">
            <Link href={"/signup"}>회원이 아니신가요? 회원가입 하러가기</Link>
          </p>
        </form>
        <div className="flex justify-center">
          <Image src={Divider} alt="구분선" className="" />
        </div>
        <button className="w-[600px]">
          <Image src={KakaoButton} alt="카카오 로그인 버튼" />
        </button>
      </div>
    </div>
  );
}
