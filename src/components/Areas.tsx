import Link from "next/link";
import { areas, type AreaSlug } from "@/lib/site";

export function PostAreas({ values }: { values: AreaSlug[] }) {
  if (values.length === 0) return null;

  return (
    <span className="inline-areas">
      {values.map((slug) => {
        const label = areas.find((area) => area.slug === slug)?.label ?? slug;
        return (
          <Link key={slug} href={`/areas/${slug}`}>
            {label}
          </Link>
        );
      })}
    </span>
  );
}
