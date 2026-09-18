# Abhishek Kumar

Personal site for writing and tech projects.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Add your own writing

Copy `content/writing/_template.md`, rename it to something like `my-note.md`, and write. You do not set tags by hand. The site reads the title and body and assigns Tech, ML, Sports, or Personal life. Add `areas:` in the file only if you want to override that.

## Add a tech project

Copy `content/projects/_template.md` and rename it.

```md
---
title: Project name
date: 2026-09-18
kind: project
status: now
areas: [tech]
summary: Short summary visitors see first.
github: https://github.com/you/repo
live: https://your-app.example
stack: [TypeScript]
---

Optional longer write-up.
```

Leave `github` or `live` out if you do not have them. Those buttons will not appear. Leave the body empty if there is nothing more to say — then there is no Read more link.

`status` is `now`, `shipped`, or `paused`.

## Edit your name and bio

`src/lib/site.ts` holds the name, one-liner, email, Now line, and profile links (GitHub, LinkedIn, resume). Leave a link's `href` empty and it will not show. For a resume file, put `resume.pdf` in `public/` and set the href to `/resume.pdf`. The About page is `src/app/about/page.tsx`.

The contact form emails you at the address in `site.email`. The first time someone sends a message after deploy, FormSubmit will ask you to confirm that inbox.
