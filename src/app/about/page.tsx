import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";
import { publicLinks, site } from "@/lib/site";

export const metadata = {
  title: "About",
  description: `Who ${site.name} is and what this site is for.`,
};

export default function AboutPage() {
  const links = publicLinks();

  return (
    <article className="article">
      <header className="article-head">
        <p className="kicker">About</p>
        <h1>Hi there! 👋</h1>
      </header>
      <div className="prose">
        <p>I&apos;m Abhishek. I share my work and personal stories here.</p>
        <p>
          In tech with more than 2 years of experience as Software Engineer in
          backend. Skilled software engineer with expertise in collaborative
          development of scalable systems and distributed architectures
          developed for UK based Ecommerce company.
        </p>
        <p>
          Experienced in implementing innovative design patterns and delivering
          high-quality, well-tested code using Java and Python. Proficient in
          CI/CD pipelines, cloud-based development, and automated testing
          methodologies.
        </p>
        <p>
          I like to read lot of books from different genre currently reading
          DDIA and platform engineering.
        </p>
        <p>
          Currently, I&apos;m Open for Full-time opportunity in Software
          development. Feel free to reach out to me at{" "}
          <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      </div>

      {links.length > 0 ? (
        <section className="about-block">
          <h2>Socials</h2>
          <SocialLinks className="profile-links" />
        </section>
      ) : null}

      <section className="about-block" id="message">
        <h2>Send a message</h2>
        <ContactForm />
      </section>
    </article>
  );
}
