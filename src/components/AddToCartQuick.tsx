"use client";

import { useState } from "react";
import { ShoppingBag, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/types";

export function AddToCartQuick({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      visual: product.visual,
      gradient: product.gradient,
      size: product.sizes[Math.floor(product.sizes.length / 2)],
      color: product.colors[0],
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={handleAdd}
      className={`flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-xs font-semibold transition-all ${
        added
          ? "bg-sage text-white"
          : "bg-ink text-cream hover:bg-terra"
      }`}
    >
      {added ? (
        <>
          <Check className="h-4 w-4" /> Adicionado!
        </>
      ) : (
        <>
          <ShoppingBag className="h-4 w-4" /> Adicionar
        </>
      )}
    </button>
  );
}
