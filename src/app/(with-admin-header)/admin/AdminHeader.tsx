import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default async function AdminHeader() {
  return (
    <div className="fixed z-10 w-full pl-22 pr-15 h-25 bg-site-button flex justify-between items-center">
      <div>
        <div className="flex gap-5 items-center">
          <Link href={"/admin"}>
            <Image
              width={97}
              height={45}
              src={"/images/Logo.svg"}
              alt={`STUV 로고`}
            />
          </Link>
        </div>
      </div>
      <div className="flex gap-5 font-semibold">
        <Link href={`http://52.78.48.112:3000/`} target="_blank">
          <button className="px-4 py-3 bg-site-white-70 rounded-lg cursor-pointer">
            Grapana
          </button>
        </Link>
        <LogoutButton />
      </div>
    </div>
  );
}
