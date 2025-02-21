import Logo from "@/assets/images/Logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function AdminHeader() {
  return (
    <div className="fixed z-10 w-full pl-22 pr-15 h-25 bg-site-button flex justify-between items-center">
      <div>
        <div className="flex gap-5 items-center">
          <Link href={"/admin"}>
            <Image src={Logo} alt={`STUV 로고`} />
          </Link>
        </div>
      </div>
      <div className="flex gap-5 font-semibold">
        <div className="px-4 py-3 bg-site-white-70 rounded-lg">Grapana</div>
        <div className="px-4 py-3 bg-site-white-70 rounded-lg">Logout</div>
      </div>
    </div>
  );
}
