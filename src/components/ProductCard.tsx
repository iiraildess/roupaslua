import Link from "next/link";
import { Star } from "lucide-react";
import type { Product } from "@/lib/types";
import { categoryLabel, formatPrice } from "@/lib/types";
import { ProductVisual } from "./ProductVisual";
import { AddToCartQuick } from "./AddToCartQuick";

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-shadow hover:shadow-lg">
      <Link
        href={`/produtos/${product.id}`}
        className="relative block aspect-[19/20] overflow-hidden"
      >
        <ProductVisual
          kind={product.visual}
          gradient={product.gradient}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-cream">
              Novo
            </span>
          )}
          {product.oldPrice && (
            <span className="rounded-full bg-terra px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Promoção
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-ink-soft">
          {categoryLabel(product.category)}
        </p>
        <Link
          href={`/produtos/${product.id}`}
          className="mt-1 line-clamp-1 text-sm font-semibold hover:text-terra"
        >
          {product.name}
        </Link>
        <div className="mt-1 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(product.rating)
                    ? "fill-gold text-gold"
                    : "text-ink/20"
                }`}
              />
            ))}
          </div>
          <span className="text-[11px] text-ink-soft">({product.reviews})</span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-base font-bold">{formatPrice(product.price)}</span>
          {product.oldPrice && (
            <span className="text-xs text-ink-soft line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <div className="mt-3">
          <AddToCartQuick product={product} />
        </div>
      </div>
    </div>
  );
}
