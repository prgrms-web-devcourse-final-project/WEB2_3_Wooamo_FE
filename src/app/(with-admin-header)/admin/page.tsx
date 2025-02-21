import Image from "next/image";
import PaymentList from "./PaymentList";
import OrangeTurtle from "@/assets/images/costumes/orangeTurtle.png";

export default function Admin() {
  return (
    <div className="w-full">
      <div>
        <div className="flex justify-center gap-15">
          <div className="flex flex-col gap-3 font-semibold text-xl items-center">
            <div className="w-40 h-40 bg-site-white-100 rounded-full flex items-center justify-center">
              <div className="text-3xl font-bitbitv2">100명</div>
            </div>
            <div>주간 신규 회원 수</div>
          </div>
          <div className="flex flex-col gap-3 font-semibold text-xl items-center">
            <div className="w-40 h-40 bg-site-white-100 rounded-full ">
              <Image
                src={OrangeTurtle}
                alt="인기 아바타 이미지"
                className="-translate-y-4"
              />
            </div>
            <div>인기 아바타</div>
          </div>
          <div className="flex flex-col gap-3 font-semibold text-xl items-center">
            <div className="w-40 h-40 bg-site-white-100 rounded-full flex items-center justify-center">
              <div className="text-3xl font-bitbitv2">10,000</div>
            </div>
            <div>주간 포인트 판매량</div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-15">최근 포인트 결제 이력</h2>
          <div className="flex mt-5 font-semibold px-5">
            <div className="flex-3">결제 시간</div>
            <div className="flex-1">구매자</div>
            <div className="flex-1">구매 포인트</div>
            <div className="flex-1">결제 금액</div>
          </div>
          <div className="mt-2">
            <div className="flex flex-col gap-5">
              {new Array(8).fill(0).map((_, idx) => (
                <PaymentList
                  key={idx}
                  paymentTime={"2025-00-00 hh:mm:ss"}
                  name={"홍길동"}
                  point={`1,000`}
                  value={`5,500원`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
