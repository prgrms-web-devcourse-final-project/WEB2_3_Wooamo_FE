import StudyTimeJandy from "./StudyTimeJandy";
import PostsByUser from "./PostsByUser";
import UserProfile from "./UserProfile";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserDetail({ params }: UserProfileProps) {
  const { id } = await params;

  return (
    <div className="flex justify-center gap-20 px-8">
      <UserProfile />
      <section className="flex flex-col w-206 gap-13">
        <StudyTimeJandy />
        <PostsByUser />
      </section>
    </div>
  );
}
