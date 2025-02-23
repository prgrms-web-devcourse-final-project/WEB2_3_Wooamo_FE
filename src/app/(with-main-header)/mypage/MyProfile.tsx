import Avatar from "@/components/common/Avatar";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import basic from "@/assets/images/costumes/basic.png";
import Icon from "@/components/common/Icon";
import Link from "next/link";
import ProfileEditButton from "./ProfileEditButton";

export default function MyProfile() {
  return (
    <section className="flex flex-col min-w-full lg:min-w-92 gap-2.5 lg:gap-7 px-2.5">
      <p className="font-bitbitv2 text-2xl lg:text-[28px]">@binnie</p>
      <div className="flex items-center lg:items-end gap-13">
        <Avatar costumeSrc={basic} className="w-32.5 lg:w-40 h-32.5 lg:h-40" />
        <div className="flex flex-col justify-end items-center gap-6 lg:gap-7.5">
          <div className="flex flex-col gap-2">
            <p className="font-galmuri text-xl lg:text-2xl">
              <span className="mr-3">포인트</span>
              <span className="text-site-darkgray-02">100p</span>
            </p>
            <p className="font-galmuri text-xl lg:text-2xl">
              <Link href={"/friends"} className="mr-3">
                친구
              </Link>
              <span className="text-site-darkgray-02">16</span>
            </p>
          </div>
          <ProfileEditButton />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="font-semibold">비니의열공기록🐢</p>
        <Link
          href={"https://github.com/binnie"}
          className="flex items-center"
          target="_blank"
        >
          <Icon MuiIcon={LinkRoundedIcon} />
          <span className="font-semibold ml-1.5">
            https://github.com/binnie
          </span>
        </Link>
      </div>
    </section>
  );
}
