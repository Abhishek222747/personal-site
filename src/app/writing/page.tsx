import { WritingRow } from "@/components/Cards";
import { getWriting } from "@/lib/content";

export const metadata = {
  title: "Writing",
  description: "Articles and shorter thoughts.",
};

export default function WritingPage() {
  const posts = getWriting();

  return (
    <div className="site-wrap">
      <header className="page-head">
        <p className="kicker">Writing</p>
        <h1>Articles and thoughts</h1>
      </header>
      {posts.length === 0 ? (
        <p className="empty">No writing yet. Add a file in content/writing.</p>
      ) : (
        <div style={{ paddingBottom: "4rem" }}>
          {posts.map((post) => (
            <WritingRow key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
