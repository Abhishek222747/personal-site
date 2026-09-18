import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { inferAreas, parseManualAreas } from "./autoTag";
import { areas, type AreaSlug } from "./site";

export type Kind = "article" | "thought" | "project";
export type ProjectStatus = "now" | "shipped" | "paused";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  kind: Kind;
  areas: AreaSlug[];
  tags: string[];
  status?: ProjectStatus;
  stack?: string[];
  github?: string;
  live?: string;
  hasWriteup: boolean;
  content: string;
};

const CONTENT_ROOT = path.join(process.cwd(), "content");

function toIsoDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const year = value.getFullYear();
    const month = String(value.getMonth() + 1).padStart(2, "0");
    const day = String(value.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  return String(value);
}

function optionalText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function readDir(subdir: "writing" | "projects"): Post[] {
  const full = path.join(CONTENT_ROOT, subdir);
  if (!fs.existsSync(full)) return [];

  return fs
    .readdirSync(full)
    .filter((file) => file.endsWith(".md") && !file.startsWith("_"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(full, file), "utf8");
      const { data, content } = matter(raw);
      const body = content.trim();
      const title = String(data.title);
      const summary = String(data.summary ?? "");
      const kind = (data.kind as Kind) ?? "article";
      const manualAreas = parseManualAreas(data.areas);
      const postAreas =
        manualAreas.length > 0
          ? manualAreas
          : inferAreas({
              title,
              summary,
              content: body,
              kind,
            });

      return {
        slug,
        title,
        date: toIsoDate(data.date),
        summary,
        kind,
        areas: postAreas,
        tags: (data.tags as string[]) ?? [],
        status: data.status as ProjectStatus | undefined,
        stack: data.stack as string[] | undefined,
        github: optionalText(data.github),
        live: optionalText(data.live ?? data.demo),
        hasWriteup: body.length > 0,
        content,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getWriting(): Post[] {
  return readDir("writing");
}

export function getProjects(): Post[] {
  return readDir("projects");
}

export function getWritingBySlug(slug: string): Post | undefined {
  return getWriting().find((post) => post.slug === slug);
}

export function getProjectBySlug(slug: string): Post | undefined {
  return getProjects().find((post) => post.slug === slug);
}

export function getAllPosts(): Post[] {
  return [...getWriting(), ...getProjects()].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );
}

export function getPostsByArea(area: AreaSlug): Post[] {
  return getAllPosts().filter((post) => post.areas.includes(area));
}

export function isArea(value: string): value is AreaSlug {
  return areas.some((area) => area.slug === value);
}

export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
