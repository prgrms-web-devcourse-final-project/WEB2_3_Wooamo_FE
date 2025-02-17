import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <Image
        src={"/images/avatar.png"}
        className="h-auto"
        alt={"내 아바타"}
        width={186}
        height={144}
        priority
      />
    </div>
  );
}
