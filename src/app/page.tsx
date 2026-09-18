import Link from "next/link";
import { ProjectCard, WritingRow } from "@/components/Cards";
import { getProjects, getWriting } from "@/lib/content";
import { site } from "@/lib/site";

export default function Home() {
  const writing = getWriting().slice(0, 4);
  const work = getProjects().slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="site-wrap">
          <p className="kicker">Personal site</p>
          <h1>{site.oneLiner}</h1>
          <p className="lede">
            I share my work and personal stories here. Read the latest notes,
            or look at the projects.
          </p>
          <div className="now-box">
            <strong>Now</strong>
            <span>{site.now}</span>
          </div>
        </div>
      </section>

      <div className="site-wrap grid-2">
        <section>
          <p className="section-title">
            Latest writing
            <Link href="/writing">All notes</Link>
          </p>
          {writing.length === 0 ? (
            <p className="muted">Nothing published yet. Add a file in content/writing.</p>
          ) : (
            writing.map((post) => <WritingRow key={post.slug} post={post} />)
          )}
        </section>
        <section>
          <p className="section-title">
            Projects
            <Link href="/projects">All projects</Link>
          </p>
          {work.length === 0 ? (
            <p className="muted">
              Nothing published yet. Add a file in content/projects.
            </p>
          ) : (
            work.map((post) => <ProjectCard key={post.slug} post={post} />)
          )}
        </section>
      </div>
    </>
  );
}
