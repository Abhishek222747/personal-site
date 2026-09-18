import Link from "next/link";
import { PostAreas } from "@/components/Areas";
import { ProjectLinks } from "@/components/ProjectLinks";
import type { Post } from "@/lib/content";
import { formatDate } from "@/lib/content";
import { kindLabel, statusLabel } from "@/lib/kind";

export function WritingRow({ post }: { post: Post }) {
  return (
    <article className="row">
      <p className="meta">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span aria-hidden="true">·</span>
        <span>{kindLabel(post.kind)}</span>
        {post.areas.length > 0 ? (
          <>
            <span aria-hidden="true">·</span>
            <PostAreas values={post.areas} />
          </>
        ) : null}
      </p>
      <h3>
        <Link href={`/writing/${post.slug}`}>{post.title}</Link>
      </h3>
      {post.summary ? <p>{post.summary}</p> : null}
    </article>
  );
}

export function ProjectCard({ post }: { post: Post }) {
  return (
    <article className="project-card">
      <p className="meta">
        <span className={`status status-${post.status ?? "shipped"}`}>
          {statusLabel(post.status)}
        </span>
        {post.areas.length > 0 ? <PostAreas values={post.areas} /> : null}
      </p>
      <h3>
        {post.hasWriteup ? (
          <Link href={`/projects/${post.slug}`}>{post.title}</Link>
        ) : (
          post.title
        )}
      </h3>
      {post.summary ? <p>{post.summary}</p> : null}
      {post.stack && post.stack.length > 0 ? (
        <p className="stack">{post.stack.join(" · ")}</p>
      ) : null}
      <ProjectLinks post={post} />
      {post.hasWriteup ? (
        <p className="read-more">
          <Link href={`/projects/${post.slug}`}>Read more</Link>
        </p>
      ) : null}
    </article>
  );
}
