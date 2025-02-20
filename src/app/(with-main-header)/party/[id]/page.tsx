import Button from "@/components/common/Button";
import ParticipateButton from "./ParticipateButton";
import Input from "@/components/common/Input";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Icon from "@/components/common/Icon";
import formatDateToKR from "@/utils/formatDateToKR";
import ProfileSummary from "@/components/common/ProfileSummary";

interface PartyDetailProps {
  params: Promise<{ id: string }>;
}

export default async function PartyDetail({ params }: PartyDetailProps) {
  const { id } = await params;

  return (
    <>
      <div className="flex flex-col gap-13">
        <ParticipateButton />
        <div className="flex items-center w-full h-20 border-b border-site-darkgray-02">
          <Input
            value={"한 입크기로 잘라먹는 Next.js"}
            className="w-full bg-transparent"
            disabled
          />
        </div>
        <p className="min-h-50 bg-site-white-70 px-6 py-5 resize-none">
          인프런 한 입 크기로 잘라먹는 Next.js 매일매일 강의 하나씩 들을 팟
          구합니다!
        </p>
        <div className="flex items-center gap-13">
          <div className="flex items-center gap-5">
            <label htmlFor="max-people" className="font-semibold text-xl">
              인원
            </label>
            <Button
              className="justify-start px-6 w-80 text-base font-pretendard bg-site-white-70"
              disabled
            >
              1 / 20
            </Button>
          </div>

          <div className="flex items-center gap-13">
            <div className="flex items-center gap-5">
              <label htmlFor="date" className="font-semibold text-xl">
                기간
              </label>
              <div className="flex items-center gap-1">
                <Button
                  className="w-fit gap-4 px-6 text-base font-pretendard bg-site-white-70"
                  disabled
                >
                  <span>{formatDateToKR(new Date())}</span>
                  <Icon MuiIcon={CalendarMonthRoundedIcon} />
                </Button>
                <span>-</span>
                <Button
                  className="w-fit gap-4 px-6 text-base font-pretendard bg-site-white-70"
                  disabled
                >
                  <span>{formatDateToKR(new Date())}</span>
                  <Icon MuiIcon={CalendarMonthRoundedIcon} />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <label htmlFor="min-betting" className="font-semibold text-xl">
              배팅
            </label>
            <Button
              className="justify-start px-6 w-80 text-base font-pretendard bg-site-white-70"
              disabled
            >
              최소 100 포인트부터
            </Button>
          </div>
        </div>
      </div>

      {/* 참여자 목록 (참여 후에만 보임) */}
      <section className="flex flex-col gap-8 mt-13">
        <p className="font-semibold text-xl">참여자 목록</p>
        <div className="flex flex-col gap-6">
          {[1, 2, 3, 4].map((_, index) => (
            <article key={index} className="flex justify-between items-center">
              <ProfileSummary
                nickname={"@sooya"}
                description={"수쌤 아니고 수현이 :)"}
              />
              <div>
                <Button>친구신청</Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
