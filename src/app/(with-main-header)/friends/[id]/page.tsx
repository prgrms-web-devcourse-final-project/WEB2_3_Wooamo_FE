import FriendsItem from "../FriendsItem";

export default function UserFriends() {
  return (
    <section className="flex flex-col w-full gap-5 lg:gap-8">
      <p className="flex items-center gap-2.5 font-galmuri text-xl lg:text-2xl">
        <span>친구</span>
        <span>16</span>
      </p>
      <div className="flex flex-col">
        {[1, 2, 3, 4].map((_, index) => (
          <FriendsItem
            key={index}
            friend={{
              friendId: index,
              userId: index,
              nickname: "nickname",
              context: "context",
              profile: "",
            }}
          />
        ))}
      </div>
    </section>
  );
}
