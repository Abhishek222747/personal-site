import type { Post } from "@/lib/content";

export function ProjectLinks({ post }: { post: Post }) {
  if (!post.github && !post.live) return null;

  return (
    <p className="project-links">
      {post.github ? (
        <a href={post.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
      ) : null}
      {post.live ? (
        <a href={post.live} target="_blank" rel="noreferrer">
          Live
        </a>
      ) : null}
    </p>
  );
}
