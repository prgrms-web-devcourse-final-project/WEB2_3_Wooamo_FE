import PostItem from "./PostItem";
import BoardsHeader from "./BoardsHeader";

export default function Boards() {
  return (
    <div className="flex flex-col gap-13">
      <BoardsHeader />
      <section className="flex flex-col gap-5">
        {[1, 2, 3].map((_, idx) => (
          <PostItem key={idx} />
        ))}
      </section>
    </div>
  );
}
