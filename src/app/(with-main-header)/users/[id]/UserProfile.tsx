import Avatar from "@/components/common/Avatar";
import Button from "@/components/common/Button";
import LinkRoundedIcon from "@mui/icons-material/LinkRounded";
import basic from "@/assets/images/costumes/basic.png";
import Icon from "@/components/common/Icon";
import Link from "next/link";

export default function UserProfile() {
  return (
    <section className="flex flex-col min-w-92 gap-7">
      <p className="font-bitbitv2 text-[28px]">@binnie</p>
      <div className="flex gap-13">
        <Avatar costumeSrc={basic} className="w-40 h-40" />
        <div className="flex flex-col justify-end items-center gap-7.5">
          <p className="font-galmuri text-2xl">
            <Link href={"/friends/1"} className="mr-3">친구</Link>
            <span className="text-site-darkgray-02">16</span>
          </p>
          <Button>친구신청</Button>
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
