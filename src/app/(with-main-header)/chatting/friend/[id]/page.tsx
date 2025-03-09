import ChattingInput from "../../ChattingInput";
import { userApi } from "@/api/user/user";
import ChattingList from "./ChattingList";

interface ChattingWithFriendProps {
  params: Promise<{ id: string }>;
}

export default async function ChattingWithFriend({
  params,
}: ChattingWithFriendProps) {
  const { id } = await params;
  const currentUser = await userApi.getCurrentUserInfo();
  const user = await userApi.getUserInfo(Number(id));
  if (!currentUser || !user) return;
  return (
    <div className="relative">
      <div className="px-5 lg-px:0 pt-12 pb-5">
        <ChattingList userId={currentUser.data.userId} />
      </div>
      <div>
        <ChattingInput currentUser={currentUser.data} />
      </div>
    </div>
  );
}
