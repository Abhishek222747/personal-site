"use client";

import { FormEvent, useEffect, useState } from "react";
import { site } from "@/lib/site";

type Status = "idle" | "sending" | "sent" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);
    const company = String(data.get("company") ?? "").trim();
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (company.length > 0) {
      setStatus("sent");
      return;
    }
    if (name.length < 1) {
      setError("Please add your name.");
      setStatus("error");
      return;
    }
    if (!EMAIL.test(email)) {
      setError("Please add a valid email.");
      setStatus("error");
      return;
    }
    if (message.length < 4) {
      setError("Please add a message.");
      setStatus("error");
      return;
    }

    const payload = {
      name,
      email,
      message,
      _subject: `Message from ${name} — ${site.name}`,
      _template: "table",
      _captcha: "false",
      _replyto: email,
    };

    try {
      const response = await fetch(
        `https://formsubmit.co/ajax/${site.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        },
      );
      const result = (await response.json().catch(() => null)) as {
        success?: string | boolean;
        message?: string;
      } | null;

      const failed =
        !response.ok ||
        result?.success === false ||
        result?.success === "false";

      if (failed) {
        const hint = result?.message?.toLowerCase() ?? "";
        if (hint.includes("activat") || hint.includes("confirm")) {
          setError(
            "Check Gmail for a confirmation from FormSubmit and click it once. Then send again.",
          );
        } else {
          window.location.href = mailtoLink(name, email, message);
          return;
        }
        setStatus("error");
        return;
      }
    } catch {
      window.location.href = mailtoLink(name, email, message);
      return;
    }

    form.reset();
    setStatus("sent");
  }

  if (!ready) {
    return <div className="contact-form" />;
  }

  if (status === "sent") {
    return (
      <p className="form-success" role="status">
        Message sent. I will get back to you.
      </p>
    );
  }

  return (
    <form className="contact-form" onSubmit={onSubmit}>
      <label className="honeypot">
        Company
        <input type="text" name="company" tabIndex={-1} autoComplete="off" />
      </label>
      <label>
        Name
        <input name="name" type="text" required maxLength={80} autoComplete="name" />
      </label>
      <label>
        Email
        <input
          name="email"
          type="email"
          required
          maxLength={120}
          autoComplete="email"
        />
      </label>
      <label>
        Message
        <textarea name="message" required minLength={4} maxLength={2000} rows={6} />
      </label>
      {status === "error" ? (
        <p className="form-error" role="alert">
          {error}
        </p>
      ) : null}
      <button type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}

function mailtoLink(name: string, email: string, message: string) {
  const subject = encodeURIComponent(`Message from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  return `mailto:${site.email}?subject=${subject}&body=${body}`;
}
