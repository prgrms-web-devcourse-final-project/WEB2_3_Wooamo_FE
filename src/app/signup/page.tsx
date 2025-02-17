import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";

export default function Signup() {
  return (
    <div>
      <header className="sticky top-0 h-25 flex items-center justify-center bg-site-white-100 border-b border-site-button drop-shadow-[0_4px_4px_rgba(207,236,250,0.25)]">
        <Link href={"/"}>
          <Image src={Logo} alt="STUV 로고" />
        </Link>
      </header>
      <div className="w-[600px] mx-auto mt-13 mb-7">
        <form className="flex flex-col gap-7">
          <div className="text-[28px] font-semibold flex justify-center">
            회원가입
          </div>
          <div className="flex flex-col gap-7">
            <div className="flex flex-col gap-3">
              <label htmlFor="nickname" className="text-xl font-semibold">
                닉네임
              </label>
              <div className="flex gap-3">
                <input
                  required
                  id="nickname"
                  type="text"
                  placeholder="닉네임을 입력해주세요"
                  className="bg-site-button-input rounded-full px-6 w-[462px]"
                />
                <button
                  type="button"
                  className="font-galmuri text-xl h-[60px] bg-site-button rounded-full w-32"
                >
                  중복확인
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-xl font-semibold">
                이메일
              </label>
              <div className="flex gap-3">
                <input
                  required
                  id="email"
                  type="text"
                  placeholder="이메일을 입력해주세요"
                  className="bg-site-button-input rounded-full px-6 w-[462px]"
                />
                <button
                  type="button"
                  className="font-galmuri text-xl h-[60px] bg-site-button rounded-full w-32"
                >
                  인증하기
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="password" className="text-xl font-semibold">
                비밀번호
              </label>
              <input
                required
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요"
                className="w-full h-[60px] px-6 bg-site-button-input rounded-full"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label
                htmlFor="confirm-password"
                className="text-xl font-semibold"
              >
                비밀번호 확인
              </label>
              <input
                required
                id="confirm-password"
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                className="w-full h-[60px] px-6 bg-site-button-input rounded-full"
              />
            </div>
          </div>
          <button className="w-full h-[60px] bg-site-button rounded-full font-galmuri text-xl">
            가입하기
          </button>
        </form>
      </div>
    </div>
  );
}
