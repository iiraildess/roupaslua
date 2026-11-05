import type { Metadata } from "next";
import { Heart, Leaf, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Sobre nós",
  description: "Conheça a história da RoupaLua e nossa missão de democratizar a moda.",
};

export default function SobrePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-wider text-terra">
          Nossa história
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
          RoupaLua nasceu de um sonho simples
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Acreditamos que todo mundo merece se vestir bem sem gastar uma fortuna.
          A RoupaLua começou em 2024 como uma pequena loja de bairro e cresceu
          para se tornar a loja online que você conhece hoje — com curadoria
          cuidadosa, peças de qualidade e preços que cabem no seu bolso.
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-3">
        {[
          {
            icon: Heart,
            title: "Feito com amor",
            desc: "Cada peça é escolhida a dedo pela nossa equipe, pensando em você.",
          },
          {
            icon: Leaf,
            title: "Moda consciente",
            desc: "Priorizamos tecidos duráveis e práticas sustentáveis sempre que possível.",
          },
          {
            icon: Users,
            title: "Comunidade",
            desc: "Mais de 50 mil clientes confiam na RoupaLua para montar seus looks.",
          },
        ].map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="rounded-2xl border border-ink/10 bg-white p-6 text-center"
          >
            <div className="mx-auto w-fit rounded-2xl bg-terra/10 p-3.5">
              <Icon className="h-6 w-6 text-terra" />
            </div>
            <h3 className="mt-4 font-bold">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">{desc}</p>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-16 max-w-3xl rounded-3xl bg-sand/50 p-8 sm:p-10">
        <h2 className="text-2xl font-extrabold">Nossa missão</h2>
        <p className="mt-3 leading-relaxed text-ink-soft">
          Democratizar o acesso à moda de qualidade, mostrando que estilo não
          depende de grife — depende de atitude. Queremos que cada pessoa que
          compra na RoupaLua saia se sentindo confiante, bonita e autêntica.
          Porque o melhor look é aquele que é 100% você.
        </p>
      </div>
    </div>
  );
}
