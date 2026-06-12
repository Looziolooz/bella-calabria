"use client";

import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", topic: "Vacanze", message: "" });

  const update = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  function onSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl border border-gold/40 bg-gold/10 p-8 text-center">
        <div className="text-2xl">✓</div>
        <h3 className="mt-2 text-xl font-semibold text-white">Grazie, {form.name || "viaggiatore"}!</h3>
        <p className="mt-2 text-white/70">
          Abbiamo ricevuto il tuo messaggio su “{form.topic}”. Ti rispondiamo
          entro 24 ore. <span className="text-white/50">(demo)</span>
        </p>
        <button
          onClick={() => setSent(false)}
          className="mt-5 rounded-full border border-white/20 px-5 py-2 text-sm text-white hover:bg-white/10"
        >
          Invia un altro messaggio
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/12 bg-white/5 p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Nome</span>
          <input
            required
            value={form.name}
            onChange={update("name")}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
            placeholder="Il tuo nome"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Email</span>
          <input
            required
            type="email"
            value={form.email}
            onChange={update("email")}
            className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
            placeholder="tu@email.it"
          />
        </label>
      </div>
      <label className="mt-4 block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Argomento</span>
        <select
          value={form.topic}
          onChange={update("topic")}
          className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
        >
          {["Vacanze", "Voli", "Offerte", "Gruppi", "Altro"].map((t) => (
            <option className="text-ink" key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="mt-4 block">
        <span className="mb-1 block text-[11px] font-semibold uppercase tracking-wide text-white/50">Messaggio</span>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={update("message")}
          className="w-full resize-none rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-gold"
          placeholder="Raccontaci il viaggio che sogni…"
        />
      </label>
      <button
        type="submit"
        className="mt-5 w-full rounded-xl bg-gold py-3 text-sm font-semibold uppercase tracking-wide text-ink transition hover:-translate-y-0.5"
      >
        Invia messaggio
      </button>
    </form>
  );
}
