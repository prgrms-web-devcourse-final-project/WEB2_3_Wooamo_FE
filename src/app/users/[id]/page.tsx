import Header from "@/app/header";
import Noise from "@/components/common/Noise";

interface UserProfileProps {
  params: Promise<{ id: string }>;
}

export default async function UserProfile({ params }: UserProfileProps) {
  const { id } = await params;

  return (
    <div className="w-full h-screen bg-site-bg">
      <Noise />
      <Header />
    </div>
  );
}
