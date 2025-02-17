interface BoardDetailProps {
  params: Promise<{ id: string }>;
}

export default async function BoardDetail({ params }: BoardDetailProps) {
  const { id } = await params;

  return <h1>BoardDetail {id}</h1>;
}
