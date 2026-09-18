import { ProjectCard } from "@/components/Cards";
import { getProjects } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Tech projects with optional GitHub, live links, and write-ups.",
};

export default function ProjectsPage() {
  const projects = getProjects();
  const now = projects.filter((project) => project.status === "now");
  const rest = projects.filter((project) => project.status !== "now");

  return (
    <div className="site-wrap">
      <header className="page-head">
        <p className="kicker">Projects</p>
        <h1>Tech work</h1>
      </header>
      {projects.length === 0 ? (
        <p className="empty">
          No projects yet. Add a markdown file in content/projects when you are
          ready.
        </p>
      ) : (
        <div style={{ paddingBottom: "4rem" }}>
          {now.length > 0 ? (
            <section>
              <p className="section-title">In progress</p>
              {now.map((post) => (
                <ProjectCard key={post.slug} post={post} />
              ))}
            </section>
          ) : null}
          {rest.length > 0 ? (
            <section style={{ marginTop: now.length > 0 ? "2rem" : 0 }}>
              <p className="section-title">Shipped and paused</p>
              {rest.map((post) => (
                <ProjectCard key={post.slug} post={post} />
              ))}
            </section>
          ) : null}
        </div>
      )}
    </div>
  );
}
