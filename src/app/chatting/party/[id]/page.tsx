interface ChattingWithPartyProps {
  params: Promise<{ id: string }>;
}

export default async function ChattingWithParty({
  params,
}: ChattingWithPartyProps) {
  const { id } = await params;

  return <h1>ChattingWithParty {id}</h1>;
}
