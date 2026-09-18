import { notFound } from "next/navigation";
import { ProjectCard, WritingRow } from "@/components/Cards";
import { getPostsByArea, isArea } from "@/lib/content";
import { areas } from "@/lib/site";

export function generateStaticParams() {
  return areas.map((area) => ({ tag: area.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const area = areas.find((item) => item.slug === tag);
  if (!area) return {};
  return { title: area.label, description: area.blurb };
}

export default async function AreaPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  if (!isArea(tag)) notFound();

  const area = areas.find((item) => item.slug === tag)!;
  const posts = getPostsByArea(tag);
  const writing = posts.filter((post) => post.kind !== "project");
  const work = posts.filter((post) => post.kind === "project");

  return (
    <div className="site-wrap">
      <header className="page-head">
        <p className="kicker">Tagged</p>
        <h1>{area.label}</h1>
        <p>{area.blurb}</p>
      </header>
      {posts.length === 0 ? (
        <p className="empty">Nothing tagged here yet.</p>
      ) : (
        <div className="grid-2">
          <section>
            <p className="section-title">Writing</p>
            {writing.length === 0 ? (
              <p className="muted">No writing with this tag yet.</p>
            ) : (
              writing.map((post) => <WritingRow key={post.slug} post={post} />)
            )}
          </section>
          <section>
            <p className="section-title">Projects</p>
            {work.length === 0 ? (
              <p className="muted">No projects with this tag yet.</p>
            ) : (
              work.map((post) => <ProjectCard key={post.slug} post={post} />)
            )}
          </section>
        </div>
      )}
    </div>
  );
}
