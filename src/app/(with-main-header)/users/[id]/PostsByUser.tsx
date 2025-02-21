import PostItem from "../../boards/PostItem";

export default function PostsByUser() {
  return (
    <section className="flex flex-col gap-2 lg:gap-8">
      <p className="flex gap-1.5 font-semibold">
        <span>게시글</span>
        <span>6</span>
      </p>
      <div className="flex flex-col gap-5">
        {[1, 2, 3].map((_, index) => (
          <PostItem key={`post${index}`} />
        ))}
      </div>
    </section>
  );
}
