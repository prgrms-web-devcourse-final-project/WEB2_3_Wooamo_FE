import ProfileSummary from "@/components/common/ProfileSummary";
import FriendRequestButton from "./FriendRequestButton";

export default async function SearchedUserItem({ user }: { user: userType }) {
  return (
    <article className="h-19 lg:h-25 flex justify-between items-center">
      <ProfileSummary
        userId={user.userId}
        costume={user.profile}
        nickname={user.nickname}
        description={user.context}
      />
      <FriendRequestButton user={user} />
    </article>
  );
}
