import SearchedUserItem from "./SearchedUserItem";
import { friendApi } from "@/api/friend/friend";

export default async function SearchedUsers({ keyword }: { keyword: string }) {
  const searchedUsers = await friendApi.search(keyword);

  if (!searchedUsers) return;
  return (
    <div className="flex flex-col">
      {searchedUsers.data.contents.length === 0 ? (
        <div className="h-19 lg:h-25 flex justify-center items-center">
          <p className="text-site-darkgray-02">검색 결과가 없습니다.</p>
        </div>
      ) : (
        searchedUsers.data.contents.map((user) => (
          <SearchedUserItem key={`search-${user.userId}`} user={user} />
        ))
      )}
    </div>
  );
}
