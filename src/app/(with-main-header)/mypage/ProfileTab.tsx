import PostsByUser from "../users/[id]/PostsByUser";
import StudyTimeJandy from "../users/[id]/StudyTimeJandy";
import MyProfile from "./MyProfile";

export default function ProfileTab() {
  return (
    <div className="flex justify-center gap-20 px-8">
      <MyProfile />
      <section className="flex flex-col w-206 gap-13">
        <StudyTimeJandy />
        <PostsByUser />
      </section>
    </div>
  );
}
