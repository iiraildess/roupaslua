import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Star, Truck, ShieldCheck } from "lucide-react";
import { getProduct, getRelated, products } from "@/lib/products";
import { categoryLabel, formatPrice } from "@/lib/types";
import { ProductVisual } from "@/components/ProductVisual";
import { ProductPurchase } from "@/components/ProductPurchase";
import { ProductCard } from "@/components/ProductCard";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-ink-soft">
        <Link href="/" className="hover:text-terra">Início</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link href="/produtos" className="hover:text-terra">Produtos</Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="mt-8 grid gap-10 lg:grid-cols-2">
        {/* Imagem */}
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-lg">
            <ProductVisual
              kind={product.visual}
              gradient={product.gradient}
              className="aspect-[4/5] w-full"
            />
          </div>
          <div className="absolute left-4 top-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="w-fit rounded-full bg-ink px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
                Novo
              </span>
            )}
            {product.oldPrice && (
              <span className="w-fit rounded-full bg-terra px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                Promoção
              </span>
            )}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-terra">
            {categoryLabel(product.category)}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <div className="mt-3 flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(product.rating)
                      ? "fill-gold text-gold"
                      : "text-ink/20"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-ink-soft">
              {product.rating} ({product.reviews} avaliações)
            </span>
          </div>

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-3xl font-extrabold">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <>
                <span className="text-lg text-ink-soft line-through">
                  {formatPrice(product.oldPrice)}
                </span>
                <span className="rounded-full bg-terra/10 px-2.5 py-1 text-xs font-bold text-terra">
                  -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <p className="mt-5 leading-relaxed text-ink-soft">{product.description}</p>

          <div className="mt-7 border-t border-ink/10 pt-6">
            <ProductPurchase product={product} />
          </div>

          <div className="mt-6 grid gap-3 text-sm text-ink-soft sm:grid-cols-2">
            <div className="flex items-center gap-2.5 rounded-xl bg-sand/50 p-3.5">
              <Truck className="h-5 w-5 shrink-0 text-terra" />
              <span>Frete grátis acima de R$ 199</span>
            </div>
            <div className="flex items-center gap-2.5 rounded-xl bg-sand/50 p-3.5">
              <ShieldCheck className="h-5 w-5 shrink-0 text-terra" />
              <span>Troca em até 30 dias</span>
            </div>
          </div>
        </div>
      </div>

      {/* Relacionados */}
      {related.length > 0 && (
        <section className="mt-20">
          <h2 className="text-2xl font-extrabold tracking-tight">
            Você também pode gostar
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
