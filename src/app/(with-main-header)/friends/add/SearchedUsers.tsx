import { delay } from "@/utils/delay";
import SearchedUserItem from "./SearchedUserItem";
import { friendApi } from "@/api/friend/friend";

export default async function SearchedUsers({ keyword }: { keyword: string }) {
  await delay(5000);
  const searchedUsers = await friendApi.search(keyword);

  if (!searchedUsers) return;
  return (
    <div className="flex flex-col">
      {searchedUsers.data.map((user) => (
        <SearchedUserItem key={`search-${user.userId}`} user={user} />
      ))}
    </div>
  );
}
