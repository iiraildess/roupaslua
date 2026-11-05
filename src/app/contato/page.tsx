"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";

export default function ContatoPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nome: "", email: "", assunto: "", mensagem: "" });

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-terra">
          Fale conosco
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight">
          Estamos aqui para ajudar
        </h1>
        <p className="mt-3 text-ink-soft">
          Dúvidas sobre pedidos, tamanhos ou produtos? Envie sua mensagem que
          respondemos em até 24h úteis.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        {/* Informações */}
        <div className="space-y-4">
          {[
            {
              icon: MapPin,
              title: "Endereço",
              lines: ["Rua das Flores, 123 — Centro", "São Paulo, SP"],
            },
            {
              icon: Phone,
              title: "Telefone / WhatsApp",
              lines: ["(11) 99999-0000"],
            },
            {
              icon: Mail,
              title: "E-mail",
              lines: ["oi@roupalua.com.br"],
            },
          ].map(({ icon: Icon, title, lines }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-5"
            >
              <div className="rounded-xl bg-terra/10 p-3">
                <Icon className="h-5 w-5 text-terra" />
              </div>
              <div>
                <h3 className="font-semibold">{title}</h3>
                {lines.map((l) => (
                  <p key={l} className="text-sm text-ink-soft">{l}</p>
                ))}
              </div>
            </div>
          ))}
          <div className="rounded-2xl bg-ink p-5 text-cream">
            <p className="text-sm font-semibold">Horário de atendimento</p>
            <p className="mt-1 text-sm text-cream/70">
              Segunda a sexta, das 9h às 18h
            </p>
          </div>
        </div>

        {/* Formulário */}
        <div className="rounded-2xl border border-ink/10 bg-white p-6 sm:p-8">
          {sent ? (
            <div className="flex h-full flex-col items-center justify-center py-10 text-center">
              <CheckCircle2 className="h-14 w-14 text-sage" />
              <h2 className="mt-4 text-xl font-bold">Mensagem enviada!</h2>
              <p className="mt-2 max-w-xs text-sm text-ink-soft">
                Obrigada pelo contato, {form.nome.split(" ")[0] || "cliente"}!
                Retornaremos em breve.
              </p>
              <button
                onClick={() => {
                  setSent(false);
                  setForm({ nome: "", email: "", assunto: "", mensagem: "" });
                }}
                className="mt-6 rounded-full border border-ink/20 px-6 py-2.5 text-sm font-semibold hover:border-ink"
              >
                Enviar outra mensagem
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-lg font-bold">Envie uma mensagem</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="Seu nome" value={form.nome} onChange={set("nome")} className="input" />
                <input required type="email" placeholder="Seu e-mail" value={form.email} onChange={set("email")} className="input" />
              </div>
              <input required placeholder="Assunto" value={form.assunto} onChange={set("assunto")} className="input" />
              <textarea
                required
                rows={5}
                placeholder="Como podemos ajudar?"
                value={form.mensagem}
                onChange={set("mensagem")}
                className="input resize-none"
              />
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-terra py-3.5 text-sm font-bold text-white transition-colors hover:bg-terra-dark"
              >
                <Send className="h-4 w-4" /> Enviar mensagem
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
