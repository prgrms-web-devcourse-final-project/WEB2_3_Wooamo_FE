import Button from "../../../components/common/Button";
export default function ClosedParties() {
  return (
    <section className="flex flex-col gap-7 mt-15">
      <p className="font-galmuri text-xl lg:text-2xl px-5 lg:px-0">
        <span>마감된 팟</span>
        <span className="ml-3">3</span>
      </p>
      <div className="flex flex-col gap-2.5 lg:gap-3">
        {[1, 2, 3].map((_, index) => (
          <article
            key={index}
            className="flex justify-between items-center h-14 lg:h-25 bg-site-button px-5"
          >
            <div className="flex gap-2.5 items-end">
              <p className="font-semibold text-xl">팟 이름</p>
              <p className="font-semibold">+500p</p>
            </div>
            <Button className="bg-site-main text-white">보상받기</Button>
          </article>
        ))}
      </div>
    </section>
  );
}
