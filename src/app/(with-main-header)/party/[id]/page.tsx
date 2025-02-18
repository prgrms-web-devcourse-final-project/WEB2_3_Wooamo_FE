interface PartyDetailProps {
  params: Promise<{ id: string }>;
}

export default async function PartyDetail({ params }: PartyDetailProps) {
  const { id } = await params;

  return <h1>PartyDetail {id}</h1>;
}
