"use client";

import Link from "next/link";
import { ShoppingBag, Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/types";
import { ProductVisual } from "@/components/ProductVisual";

const FREE_SHIPPING = 199;
const SHIPPING_COST = 19.9;

export default function CarrinhoPage() {
  const { items, updateQty, removeItem, subtotal, clearCart } = useCart();

  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <ShoppingBag className="h-16 w-16 text-ink/20" />
        <h1 className="mt-6 text-3xl font-extrabold">Seu carrinho está vazio</h1>
        <p className="mt-2 max-w-sm text-ink-soft">
          Que tal dar uma olhada em nossos produtos? Temos novidades esperando
          por você!
        </p>
        <Link
          href="/produtos"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-terra px-7 py-3.5 text-sm font-bold text-white transition-colors hover:bg-terra-dark"
        >
          Explorar produtos <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
        Carrinho de compras
      </h1>
      <p className="mt-2 text-ink-soft">
        Revise seus itens antes de finalizar a compra.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        {/* Itens */}
        <div>
          <ul className="space-y-4">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex gap-4 rounded-2xl border border-ink/10 bg-white p-4"
              >
                <Link
                  href={`/produtos/${item.productId}`}
                  className="h-28 w-24 shrink-0 overflow-hidden rounded-xl"
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
                        className="font-semibold hover:text-terra"
                      >
                        {item.name}
                      </Link>
                      <p className="mt-1 text-sm text-ink-soft">
                        {item.color} · Tam. {item.size}
                      </p>
                    </div>
                    <button
                      onClick={() =>
                        removeItem(item.productId, item.size, item.color)
                      }
                      className="rounded-full p-2 text-ink-soft hover:bg-sand hover:text-terra"
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4.5 w-4.5" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-3">
                    <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1">
                      <button
                        onClick={() =>
                          updateQty(
                            item.productId,
                            item.size,
                            item.color,
                            item.qty - 1
                          )
                        }
                        className="p-1 hover:text-terra"
                        aria-label="Diminuir"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-6 text-center font-semibold">
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
                        className="p-1 hover:text-terra"
                        aria-label="Aumentar"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <span className="font-bold">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/produtos"
              className="text-sm font-semibold text-terra hover:underline"
            >
              ← Continuar comprando
            </Link>
            <button
              onClick={clearCart}
              className="text-sm text-ink-soft hover:text-terra"
            >
              Limpar carrinho
            </button>
          </div>
        </div>

        {/* Resumo */}
        <aside className="h-fit rounded-2xl border border-ink/10 bg-white p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Resumo do pedido</h2>
          <dl className="mt-4 space-y-2.5 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd className="font-medium">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Frete</dt>
              <dd className="font-medium">
                {shipping === 0 ? (
                  <span className="text-sage">Grátis</span>
                ) : (
                  formatPrice(shipping)
                )}
              </dd>
            </div>
            {shipping > 0 && (
              <p className="rounded-lg bg-terra/10 px-3 py-2 text-xs text-terra">
                Faltam {formatPrice(FREE_SHIPPING - subtotal)} para o frete grátis!
              </p>
            )}
            <div className="flex justify-between border-t border-ink/10 pt-3">
              <dt className="font-bold">Total</dt>
              <dd className="text-lg font-extrabold">{formatPrice(total)}</dd>
            </div>
          </dl>
          <Link
            href="/checkout"
            className="mt-5 block rounded-full bg-terra py-3.5 text-center text-sm font-bold text-white transition-colors hover:bg-terra-dark"
          >
            Finalizar compra
          </Link>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Pagamento seguro · Troca em 30 dias
          </p>
        </aside>
      </div>
    </div>
  );
}
