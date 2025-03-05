import ChattingInput from "../../ChattingInput";
import ProfileSummary from "@/components/common/ProfileSummary";
import { userApi } from "@/api/user/user";
import ChattingList from "./ChattingList";

interface ChattingWithFriendProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ roomId: string }>;
}

export default async function ChattingWithFriend({
  params,
  searchParams,
}: ChattingWithFriendProps) {
  const { id } = await params;
  const { roomId } = await searchParams;
  const currentUser = await userApi.getCurrentUserInfo();
  const user = await userApi.getUserInfo(Number(id));
  if (!currentUser || !user) return;
  return (
    <div className="relative">
      <div className="fixed w-full top-15 lg:top-25 left-0 bg-site-button py-2 lg:py-5 px-5 lg:px-8">
        <ProfileSummary
          nickname={user.data.nickname}
          description={user.data.context}
          userId={user.data.userId}
          costume={user.data.profile ?? ""}
        />
      </div>
      <div className="px-5 lg-px:0 pt-12 pb-5">
        <ChattingList userId={currentUser.data.userId} />
      </div>
      <div>
        <ChattingInput currentUser={currentUser.data} roomId={roomId} />
      </div>
    </div>
  );
}
