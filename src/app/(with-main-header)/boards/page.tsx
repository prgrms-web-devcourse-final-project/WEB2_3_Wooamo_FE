import PostItem from "./PostItem";
import BoardsHeader from "./BoardsHeader";

export default function Boards() {
  return (
    <div className="flex flex-col gap-10 lg:gap-13 px-5 lg:px-0">
      <BoardsHeader />
      <section className="flex flex-col gap-2 lg:gap-5">
        {[1, 2, 3].map((_, idx) => (
          <PostItem key={idx} />
        ))}
      </section>
    </div>
  );
}
