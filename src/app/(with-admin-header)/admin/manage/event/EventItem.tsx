export default function EventItem() {
  return (
    <div className="flex flex-col gap-5 px-5 py-7 bg-site-white-100 rounded-xl">
      <div className="w-80 h-50 bg-site-lightgray flex justify-center items-center">
        이미지 영역
      </div>
      <div className="flex justify-between items-center">
        <div className="font-semibold">팟 이름</div>
        <div className="flex gap-5 items-center">
          <div>포인트</div>
          <div className="px-4 py-2 bg-site-lightgray rounded-xl">20p</div>
        </div>
      </div>
    </div>
  );
}
