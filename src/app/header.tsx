import Image from "next/image";
import Logo from "@/assets/images/Logo.svg";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex font-semibold text-2xl gap-0 justify-between px-12 h-25 items-center bg-site-white-10">
      <div className="flex gap-20 items-center">
        <Link href={"/"}>
          <Image src={Logo} alt="STUV 로고" />
        </Link>
        <nav>
          <ul className="flex gap-16 items-center">
            <li>
              <Link href={"/boards"}>게시판</Link>
            </li>
            <li>
              <Link href={"/shop"}>상점</Link>
            </li>
            <li>
              <Link href={"/party"}>팟 페이지</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <Link href={"/signin"}>로그인</Link>
      </div>
    </header>
  );
}
