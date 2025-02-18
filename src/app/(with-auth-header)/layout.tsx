import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/Logo.svg";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 h-25 flex items-center justify-center bg-site-white-100 border-b border-site-button drop-shadow-[0_4px_4px_rgba(207,236,250,0.25)]">
        <Link href={"/"}>
          <Image src={Logo} alt="STUV 로고" />
        </Link>
      </header>
      {children}
    </div>
  );
}
