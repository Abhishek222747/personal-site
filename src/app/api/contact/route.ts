import { site } from "@/lib/site";

const EMAIL =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: {
    name?: unknown;
    email?: unknown;
    message?: unknown;
    company?: unknown;
  };

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof body.company === "string" && body.company.trim().length > 0) {
    return Response.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 1 || name.length > 80) {
    return Response.json({ error: "Please add your name." }, { status: 400 });
  }
  if (!EMAIL.test(email) || email.length > 120) {
    return Response.json({ error: "Please add a valid email." }, { status: 400 });
  }
  if (message.length < 4 || message.length > 2000) {
    return Response.json({ error: "Please add a message." }, { status: 400 });
  }

  const forwarded = await fetch(
    `https://formsubmit.co/ajax/${encodeURIComponent(site.email)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Message from ${name} — ${site.name}`,
        _template: "table",
        _captcha: "false",
        _replyto: email,
      }),
    },
  );

  if (!forwarded.ok) {
    return Response.json(
      { error: "Could not send the message. Email me directly instead." },
      { status: 502 },
    );
  }

  return Response.json({ ok: true });
}
