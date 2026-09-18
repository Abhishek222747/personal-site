import { notFound } from "next/navigation";
import { PostAreas } from "@/components/Areas";
import { MarkdownBody } from "@/components/MarkdownBody";
import { ProjectLinks } from "@/components/ProjectLinks";
import { formatDate, getProjectBySlug, getProjects } from "@/lib/content";
import { statusLabel } from "@/lib/kind";

export function generateStaticParams() {
  return getProjects().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getProjectBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getProjectBySlug(slug);
  if (!post) notFound();

  return (
    <article className="article">
      <header className="article-head">
        <p className="meta">
          <span className={`status status-${post.status ?? "shipped"}`}>
            {statusLabel(post.status)}
          </span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          {post.areas.length > 0 ? (
            <>
              <span aria-hidden="true">·</span>
              <PostAreas values={post.areas} />
            </>
          ) : null}
        </p>
        <h1>{post.title}</h1>
        {post.summary ? <p className="lede">{post.summary}</p> : null}
        {post.stack?.length ? (
          <p className="muted">{post.stack.join(" · ")}</p>
        ) : null}
        <ProjectLinks post={post} />
      </header>
      {post.hasWriteup ? <MarkdownBody content={post.content} /> : null}
    </article>
  );
}
