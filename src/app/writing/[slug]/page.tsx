import { notFound } from "next/navigation";
import { PostAreas } from "@/components/Areas";
import { MarkdownBody } from "@/components/MarkdownBody";
import { formatDate, getWriting, getWritingBySlug } from "@/lib/content";
import { kindLabel } from "@/lib/kind";

export function generateStaticParams() {
  return getWriting().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getWritingBySlug(slug);
  if (!post) notFound();

  return (
    <article className="article">
      <header className="article-head">
        <p className="meta">
          <span>{kindLabel(post.kind)}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden="true">·</span>
          <PostAreas values={post.areas} />
        </p>
        <h1>{post.title}</h1>
        <p className="lede">{post.summary}</p>
      </header>
      <MarkdownBody content={post.content} />
    </article>
  );
}
