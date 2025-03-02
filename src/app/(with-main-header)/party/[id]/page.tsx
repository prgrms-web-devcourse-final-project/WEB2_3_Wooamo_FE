import Button from "@/components/common/Button";
import ParticipateButton from "./ParticipateButton";
import Input from "@/components/common/Input";
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import Icon from "@/components/common/Icon";
import ProfileSummary from "@/components/common/ProfileSummary";
import basic from "@/assets/images/costumes/basic.png";
import { partyApi } from "@/api/party/party";
import AfterParticipateButtons from "./AfterParticipateButtons";

interface PartyDetailProps {
  params: Promise<{ id: number }>;
}

export default async function PartyDetail({ params }: PartyDetailProps) {
  const { id } = await params;

  const fetchPartyDetail = await partyApi.getPartyDetail(id);
  const partyDetail = fetchPartyDetail?.data;

  const fetchPartyParticipantList = await partyApi.getPartyParticipantList(id);
  const partyParticipantList = fetchPartyParticipantList?.data?.contents;

  if (!partyDetail) return;
  if (!partyParticipantList) return;

  return (
    <>
      <div className="flex flex-col gap-7.5 lg:gap-13 px-5 lg:px-0">
        {partyDetail.isJoined ? (
          <div className="flex justify-end gap-2">
            <AfterParticipateButtons partyId={id} />
          </div>
        ) : (
          <ParticipateButton
            partyId={id}
            bettingPoint={partyDetail.bettingPointCap}
          />
        )}
        <div className="flex items-center w-full h-12.5 lg:h-20 border-b border-site-darkgray-02">
          <Input
            value={partyDetail.name}
            className="w-full bg-transparent font-semibold"
            disabled
          />
        </div>
        <p className="min-h-50 bg-site-white-70 px-6 py-5 resize-none">
          {partyDetail.context}
        </p>
        <div className="flex flex-col lg:flex-row gap-7.5 lg:gap-13">
          <div className="flex items-center gap-5">
            <label
              htmlFor="max-people"
              className="min-w-fit font-semibold lg:text-xl"
            >
              인원
            </label>
            <Button
              className="justify-start px-4 lg:px-6 w-80 text-sm lg:text-base font-pretendard bg-site-white-70"
              disabled
            >
              {partyDetail.recruitCnt} / {partyDetail.recruitCap}
            </Button>
          </div>

          <div className="flex items-center gap-5">
            <label
              htmlFor="date"
              className="min-w-fit font-semibold lg:text-xl"
            >
              기간
            </label>
            <div className="flex items-center min-w-fit gap-1">
              <Button
                className="gap-4 px-4 lg:px-6 text-sm lg:text-base font-pretendard bg-site-white-70"
                disabled
              >
                <span>{partyDetail.startDate}</span>
                <Icon MuiIcon={CalendarMonthRoundedIcon} />
              </Button>
              <span>-</span>
              <Button
                className="gap-4 px-4 lg:px-6 text-sm lg:text-base font-pretendard bg-site-white-70"
                disabled
              >
                <span>{partyDetail.endDate}</span>
                <Icon MuiIcon={CalendarMonthRoundedIcon} />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <label
              htmlFor="min-betting"
              className="min-w-fit font-semibold lg:text-xl"
            >
              배팅
            </label>
            <Button
              className="justify-start px-4 lg:px-6 w-80 text-sm lg:text-base font-pretendard bg-site-white-70"
              disabled
            >
              최소 {partyDetail.bettingPointCap} 포인트부터
            </Button>
          </div>
        </div>
      </div>

      {/* 참여자 목록 (참여 후에만 보임) */}
      {partyDetail.isJoined && (
        <section className="flex flex-col gap-8 mt-13 px-5 lg:px-0">
          <p className="font-semibold text-xl">참여자 목록</p>
          <div className="flex flex-col gap-6">
            {partyParticipantList.map((participant) => (
              <article
                key={participant.userId}
                className="flex justify-between items-center"
              >
                <ProfileSummary
                  userId={participant.userId}
                  costume={participant.profile}
                  nickname={participant.userName}
                  description={participant.context}
                />
                <div>{participant.isFriend || <Button>친구신청</Button>}</div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
