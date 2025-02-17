interface ChattingWithFriendProps {
  params: Promise<{ id: string }>;
}

export default async function ChattingWithFriend({
  params,
}: ChattingWithFriendProps) {
  const { id } = await params;

  return <h1>ChattingWithFriend {id}</h1>;
}
