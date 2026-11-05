"use client";

import { useState } from "react";
import { ShoppingBag, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

export function ProductPurchase({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [size, setSize] = useState(product.sizes[Math.floor(product.sizes.length / 2)]);
  const [color, setColor] = useState(product.colors[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      visual: product.visual,
      gradient: product.gradient,
      size,
      color,
      qty,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="space-y-5">
      {/* Tamanho */}
      <div>
        <p className="text-sm font-semibold">
          Tamanho <span className="font-normal text-ink-soft">— {size}</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSize(s)}
              className={`min-w-11 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                size === s
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/20 hover:border-ink"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Cor */}
      <div>
        <p className="text-sm font-semibold">
          Cor <span className="font-normal text-ink-soft">— {color}</span>
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${
                color === c
                  ? "border-terra bg-terra/10 font-semibold text-terra"
                  : "border-ink/20 hover:border-ink"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Quantidade + ações */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-3 rounded-full border border-ink/20 px-2 py-1.5">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-2 font-bold hover:text-terra"
            aria-label="Diminuir"
          >
            −
          </button>
          <span className="w-6 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="px-2 font-bold hover:text-terra"
            aria-label="Aumentar"
          >
            +
          </button>
        </div>
        <button
          onClick={() => setFavorited((v) => !v)}
          className={`rounded-full border p-2.5 transition-colors ${
            favorited
              ? "border-terra bg-terra/10 text-terra"
              : "border-ink/20 hover:border-terra hover:text-terra"
          }`}
          aria-label="Favoritar"
        >
          <Heart className={`h-5 w-5 ${favorited ? "fill-terra" : ""}`} />
        </button>
      </div>

      <button
        onClick={handleAdd}
        className={`flex w-full items-center justify-center gap-2 rounded-full py-3.5 text-sm font-bold transition-colors ${
          added
            ? "bg-sage text-white"
            : "bg-ink text-cream hover:bg-terra"
        }`}
      >
        <ShoppingBag className="h-5 w-5" />
        {added ? "Adicionado ao carrinho!" : "Adicionar ao carrinho"}
      </button>

      <div className="rounded-xl bg-sand/60 p-4 text-xs leading-relaxed text-ink-soft">
        <p className="font-semibold text-ink">✓ Frete grátis acima de R$ 199</p>
        <p className="mt-1">✓ Troca em até 30 dias</p>
        <p className="mt-1">✓ Pagamento seguro</p>
      </div>
    </div>
  );
}
