import Image from "next/image";
import Link from "next/link";
import { ReactNode, Suspense } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="sticky top-0 h-15 lg:h-25 flex items-center justify-center bg-site-white-100 border-b border-site-button drop-shadow-[0_4px_4px_rgba(207,236,250,0.25)] backdrop-blur-md px-5">
        <Link href={"/"}>
          <Image
            width={97}
            height={45}
            src={"/images/Logo.svg"}
            alt="STUV 로고"
          />
        </Link>
      </header>
      <main className="w-full h-full px-5">
        <Suspense>{children}</Suspense>
      </main>
    </div>
  );
}
