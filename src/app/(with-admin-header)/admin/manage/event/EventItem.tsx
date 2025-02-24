import Image from "next/image";

interface EventProps {
  image: string;
  name: string;
  point: number;
}

export default function EventItem({ image, name, point }: EventProps) {
  return (
    <div className="flex flex-col gap-5 px-5 py-7 bg-site-white-100 rounded-xl">
      <div className="w-80 h-50 bg-site-lightgray flex justify-center items-center">
        <Image src={image} width={320} height={200} alt="이벤트 이미지" />
      </div>
      <div className="flex justify-between items-center">
        <div className="font-semibold">{name}</div>
        <div className="flex gap-5 items-center">
          <div>포인트</div>
          <div className="px-4 py-2 bg-site-lightgray rounded-xl">{point}p</div>
        </div>
      </div>
    </div>
  );
}
