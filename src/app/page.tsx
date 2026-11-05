import Link from "next/link";
import { ArrowRight, Sparkles, Truck, ShieldCheck, RotateCcw } from "lucide-react";
import { getFeatured, getNewArrivals } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { ProductVisual } from "@/components/ProductVisual";

export default function HomePage() {
  const featured = getFeatured();
  const newArrivals = getNewArrivals();

  return (
    <div>
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-terra/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-terra">
              <Sparkles className="h-3.5 w-3.5" />
              Nova coleção 2026
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Vista-se com
              <br />
              <span className="text-terra">autenticidade</span>
              <br />
              e estilo.
            </h1>
            <p className="mt-5 max-w-md text-lg text-ink-soft">
              Descubra peças que combinam com você — de vestidos elegantes a
              looks casuais do dia a dia. Qualidade, conforto e preço justo.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/produtos"
                className="inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-terra-dark"
              >
                Ver produtos <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/sobre"
                className="inline-flex items-center rounded-full border border-ink/20 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-ink"
              >
                Conheça a loja
              </Link>
            </div>
            <div className="mt-10 flex gap-8 text-sm">
              <div>
                <p className="text-2xl font-extrabold">18+</p>
                <p className="text-ink-soft">peças exclusivas</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">4.7★</p>
                <p className="text-ink-soft">avaliação média</p>
              </div>
              <div>
                <p className="text-2xl font-extrabold">30d</p>
                <p className="text-ink-soft">troca fácil</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-8">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <ProductVisual
                    kind="dress"
                    gradient={["#E4572E", "#F4A261"]}
                    className="aspect-[3/4] w-full"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <ProductVisual
                    kind="shoes"
                    gradient={["#264653", "#E9C46A"]}
                    className="aspect-[3/4] w-full"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <ProductVisual
                    kind="blouse"
                    gradient={["#B5838D", "#6D6875"]}
                    className="aspect-[3/4] w-full"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl shadow-lg">
                  <ProductVisual
                    kind="jacket"
                    gradient={["#2A9D8F", "#264653"]}
                    className="aspect-[3/4] w-full"
                  />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream shadow-xl">
              Frete grátis acima de R$ 199
            </div>
          </div>
        </div>
      </section>

      {/* ===== BENEFÍCIOS ===== */}
      <section className="border-y border-ink/10 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:grid-cols-3 sm:px-6">
          {[
            { icon: Truck, title: "Frete grátis", desc: "Em compras acima de R$ 199" },
            { icon: RotateCcw, title: "Troca fácil", desc: "30 dias para trocar ou devolver" },
            { icon: ShieldCheck, title: "Compra segura", desc: "Pagamento protegido e criptografado" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-center gap-4">
              <div className="rounded-2xl bg-terra/10 p-3.5">
                <Icon className="h-6 w-6 text-terra" />
              </div>
              <div>
                <p className="font-semibold">{title}</p>
                <p className="text-sm text-ink-soft">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== CATEGORIAS ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-terra">
              Explore
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
              Compre por categoria
            </h2>
          </div>
          <Link
            href="/produtos"
            className="hidden items-center gap-1.5 text-sm font-semibold text-terra hover:underline sm:flex"
          >
            Ver tudo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { id: "vestidos", label: "Vestidos", visual: "dress" as const, g: ["#F4A261", "#E76F51"] as [string, string] },
            { id: "blusas", label: "Blusas", visual: "blouse" as const, g: ["#E8B4B8", "#B5838D"] as [string, string] },
            { id: "calcas", label: "Calças", visual: "pants" as const, g: ["#6D6875", "#B5838D"] as [string, string] },
            { id: "jaquetas", label: "Jaquetas", visual: "jacket" as const, g: ["#457B9D", "#1D3557"] as [string, string] },
            { id: "sapatos", label: "Sapatos", visual: "shoes" as const, g: ["#F4A261", "#BC6C25"] as [string, string] },
            { id: "acessorios", label: "Acessórios", visual: "bag" as const, g: ["#B08968", "#7F5539"] as [string, string] },
          ].map((cat) => (
            <Link
              key={cat.id}
              href={`/produtos?categoria=${cat.id}`}
              className="group overflow-hidden rounded-2xl border border-ink/10 bg-white text-center transition-shadow hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <ProductVisual
                  kind={cat.visual}
                  gradient={cat.g}
                  className="aspect-square w-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <p className="py-3 text-sm font-semibold">{cat.label}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ===== DESTAQUES ===== */}
      <section className="bg-sand/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-terra">
                Seleção da semana
              </p>
              <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
                Produtos em destaque
              </h2>
            </div>
            <Link
              href="/produtos"
              className="hidden items-center gap-1.5 text-sm font-semibold text-terra hover:underline sm:flex"
            >
              Ver tudo <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== NOVIDADES ===== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-terra">
              Acabou de chegar
            </p>
            <h2 className="mt-1 text-3xl font-extrabold tracking-tight">
              Novidades
            </h2>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="mx-auto max-w-7xl px-4 pb-8 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl bg-ink px-6 py-14 text-center text-cream sm:px-12">
          <div className="absolute -left-10 -top-10 h-48 w-48 rounded-full bg-terra/30 blur-3xl" />
          <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-gold/20 blur-3xl" />
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">
            Pronta para o próximo look?
          </h2>
          <p className="relative mx-auto mt-3 max-w-md text-cream/70">
            Garanta suas peças favoritas antes que acabem os tamanhos.
          </p>
          <Link
            href="/produtos"
            className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-terra px-8 py-3.5 text-sm font-bold text-white transition-colors hover:bg-terra-dark"
          >
            Explorar loja <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
