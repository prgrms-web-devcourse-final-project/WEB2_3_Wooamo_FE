import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

export default function Signup() {
  return (
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
              <Input
                required
                id="nickname"
                type="text"
                placeholder="닉네임을 입력해주세요"
                className="bg-site-button-input w-[462px]"
              />
              <Button type="button" className="w-32">
                중복확인
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <label htmlFor="email" className="text-xl font-semibold">
              이메일
            </label>
            <div className="flex gap-3">
              <Input
                required
                id="email"
                type="text"
                placeholder="이메일을 입력해주세요"
                className="bg-site-button-input w-[462px]"
              />
              <Button type="button" className="w-32">
                인증하기
              </Button>
            </div>
          </div>
          <div className="flex flex-col gap-3">
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
          <div className="flex flex-col gap-3">
            <label htmlFor="confirm-password" className="text-xl font-semibold">
              비밀번호 확인
            </label>
            <Input
              required
              id="confirm-password"
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              className="bg-site-button-input"
            />
          </div>
        </div>
        <Button className="w-full">가입하기</Button>
      </form>
    </div>
  );
}
