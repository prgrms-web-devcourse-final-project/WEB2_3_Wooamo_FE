import Noise from "@/components/common/Noise";
import Header from "./header";

export default function Home() {
  return (
    <div className="w-full h-screen bg-site-bg">
      <Noise />
      <Header />
      <div>Home</div>
    </div>
  );
}
