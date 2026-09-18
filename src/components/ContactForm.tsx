"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.get("name"),
        email: data.get("email"),
        message: data.get("message"),
        company: data.get("company"),
      }),
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as
        | { error?: string }
        | null;
      setError(payload?.error ?? "Could not send the message. Try again.");
      setStatus("error");
      return;
    }

    form.reset();
    setStatus("sent");
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
