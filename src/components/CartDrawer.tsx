"use client";

import Link from "next/link";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/types";
import { ProductVisual } from "./ProductVisual";

export function CartDrawer() {
  const { items, isCartOpen, closeCart, updateQty, removeItem, subtotal } =
    useCart();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 z-50 bg-ink/50 transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      {/* Panel */}
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-terra" />
            Seu carrinho
            {items.length > 0 && (
              <span className="rounded-full bg-terra px-2 py-0.5 text-xs font-bold text-white">
                {items.length}
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="rounded-full p-2 hover:bg-sand"
            aria-label="Fechar carrinho"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <ShoppingBag className="h-12 w-12 text-ink/20" />
              <p className="mt-4 font-medium">Seu carrinho está vazio</p>
              <p className="mt-1 text-sm text-ink-soft">
                Explore nossos produtos e encontre seu próximo look.
              </p>
              <Link
                href="/produtos"
                onClick={closeCart}
                className="mt-5 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terra"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.size}-${item.color}`}
                  className="flex gap-3 rounded-xl border border-ink/10 bg-white p-3"
                >
                  <Link
                    href={`/produtos/${item.productId}`}
                    onClick={closeCart}
                    className="h-24 w-20 shrink-0 overflow-hidden rounded-lg"
                  >
                    <ProductVisual
                      kind={item.visual}
                      gradient={item.gradient}
                      className="h-full w-full"
                    />
                  </Link>
                  <div className="flex flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <Link
                          href={`/produtos/${item.productId}`}
                          onClick={closeCart}
                          className="text-sm font-semibold hover:text-terra"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-0.5 text-xs text-ink-soft">
                          {item.color} · Tam. {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          removeItem(item.productId, item.size, item.color)
                        }
                        className="rounded-full p-1.5 text-ink-soft hover:bg-sand hover:text-terra"
                        aria-label="Remover item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 rounded-full border border-ink/15">
                        <button
                          onClick={() =>
                            updateQty(
                              item.productId,
                              item.size,
                              item.color,
                              item.qty - 1
                            )
                          }
                          className="p-1.5 hover:text-terra"
                          aria-label="Diminuir quantidade"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">
                          {item.qty}
                        </span>
                        <button
                          onClick={() =>
                            updateQty(
                              item.productId,
                              item.size,
                              item.color,
                              item.qty + 1
                            )
                          }
                          className="p-1.5 hover:text-terra"
                          aria-label="Aumentar quantidade"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="text-sm font-bold">
                        {formatPrice(item.price * item.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-ink/10 bg-white px-5 py-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-ink-soft">Subtotal</span>
              <span className="text-lg font-bold">{formatPrice(subtotal)}</span>
            </div>
            <p className="mt-1 text-xs text-ink-soft">
              Frete calculado no checkout
            </p>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="mt-3 block rounded-full bg-terra py-3 text-center text-sm font-bold text-white transition-colors hover:bg-terra-dark"
            >
              Finalizar compra
            </Link>
            <button
              onClick={closeCart}
              className="mt-2 w-full rounded-full py-2.5 text-center text-sm font-medium text-ink-soft hover:text-ink"
            >
              Continuar comprando
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
