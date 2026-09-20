import Link from "next/link";
import { ContactForm } from "@/components/ContactForm";
import { ProjectCard, WritingRow } from "@/components/Cards";
import { SocialLinks } from "@/components/SocialLinks";
import { getProjects, getWriting } from "@/lib/content";
import { publicLinks, site } from "@/lib/site";

export default function Home() {
  const writing = getWriting().slice(0, 4);
  const work = getProjects().slice(0, 6);
  const links = publicLinks();

  return (
    <>
      <section className="front">
        <video
          className="vidbg"
          autoPlay
          loop
          muted
          playsInline
          poster="/hero-poster.png"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>
        <div className="front-copy">
          <p className="mhello">HELLO WORLD,</p>
          <div className="front-intro site-wrap">
            <h1>I&apos;m Abhishek</h1>
            <hr className="front-rule" />
            <p className="mdesc">
              Backend software engineer. I share work and personal stories here.
            </p>
            {links.length > 0 ? <SocialLinks className="hero-socials" /> : null}
          </div>
        </div>
      </section>

      <section className="home-block" id="about">
        <div className="site-wrap about-split">
          <div>
            <h2>About Me</h2>
            <p>
              I&apos;m Abhishek. In tech with more than 2 years of experience as
              Software Engineer in backend. Skilled software engineer with
              expertise in collaborative development of scalable systems and
              distributed architectures developed for UK based Ecommerce
              company.
            </p>
            <p>
              Experienced in implementing innovative design patterns and
              delivering high-quality, well-tested code using Java and Python.
              Proficient in CI/CD pipelines, cloud-based development, and
              automated testing methodologies.
            </p>
            <p>
              I like to read lot of books from different genre currently reading
              DDIA and platform engineering. Currently, I&apos;m Open for
              Full-time opportunity in Software development.
            </p>
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
            <p className="muted">Nothing published yet.</p>
          ) : (
            writing.map((post) => <WritingRow key={post.slug} post={post} />)
          )}
        </section>
        <section id="projects">
          <p className="section-title">
            Projects
            <Link href="/projects">All projects</Link>
          </p>
          {work.length === 0 ? (
            <p className="muted">Nothing published yet.</p>
          ) : (
            work.map((post) => <ProjectCard key={post.slug} post={post} />)
          )}
        </section>
      </div>

      <section className="home-block contact-band" id="contact">
        <div className="site-wrap article">
          <h2>Contact Me</h2>
          <p className="muted">
            Write to {site.email}, or send a message below.
          </p>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
