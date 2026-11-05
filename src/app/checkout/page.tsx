"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Landmark,
  QrCode,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/types";
import { ProductVisual } from "@/components/ProductVisual";

const FREE_SHIPPING = 199;
const SHIPPING_COST = 19.9;

type PaymentMethod = "pix" | "cartao" | "boleto";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<"form" | "success">("form");
  const [orderId, setOrderId] = useState("");
  const [orderItems, setOrderItems] = useState<typeof items>([]);
  const [orderTotal, setOrderTotal] = useState(0);
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    cidade: "",
    estado: "",
    cartaoNumero: "",
    cartaoNome: "",
    cartaoValidade: "",
    cartaoCvv: "",
  });

  const shipping =
    items.length === 0 || subtotal >= FREE_SHIPPING ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderId(`RL-${Math.floor(100000 + Math.random() * 900000)}`);
    setOrderItems(items);
    setOrderTotal(
      items.reduce((s, i) => s + i.price * i.qty, 0) + shipping
    );
    setStep("success");
    clearCart();
  };

  if (items.length === 0 && step === "form") {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-extrabold">Seu carrinho está vazio</h1>
        <p className="mt-2 text-ink-soft">
          Adicione produtos antes de finalizar a compra.
        </p>
        <Link
          href="/produtos"
          className="mt-7 rounded-full bg-terra px-7 py-3.5 text-sm font-bold text-white hover:bg-terra-dark"
        >
          Ver produtos
        </Link>
      </div>
    );
  }

  if (step === "success") {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center sm:px-6">
        <div className="rounded-full bg-sage/15 p-6">
          <CheckCircle2 className="h-16 w-16 text-sage" />
        </div>
        <h1 className="mt-6 text-3xl font-extrabold">Pedido confirmado!</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Obrigada pela compra! Seu pedido{" "}
          <span className="font-bold text-ink">{orderId}</span> foi recebido e
          está sendo preparado. Você receberá os detalhes por e-mail.
        </p>
        <div className="mt-6 w-full rounded-2xl border border-ink/10 bg-white p-5 text-left">
          <p className="text-sm font-semibold">Resumo do pedido</p>
          <div className="mt-3 space-y-2 text-sm">
            {orderItems.map((item) => (
              <div
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex justify-between text-ink-soft"
              >
                <span>
                  {item.name} — {item.color}, Tam. {item.size} × {item.qty}
                </span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="flex justify-between border-t border-ink/10 pt-2 font-bold text-ink">
              <span>Total pago</span>
              <span>
                {formatPrice(payment === "pix" ? orderTotal * 0.95 : orderTotal)}
              </span>
            </div>
          </div>
        </div>
        <Link
          href="/produtos"
          className="mt-7 rounded-full bg-terra px-7 py-3.5 text-sm font-bold text-white hover:bg-terra-dark"
        >
          Continuar comprando
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <Link
        href="/carrinho"
        className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink-soft hover:text-terra"
      >
        <ArrowLeft className="h-4 w-4" /> Voltar ao carrinho
      </Link>
      <h1 className="mt-4 text-3xl font-extrabold tracking-tight">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Entrega */}
          <section className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <Truck className="h-5 w-5 text-terra" /> Dados de entrega
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <input required placeholder="Nome completo" value={form.nome} onChange={set("nome")} className="input" />
              <input required type="email" placeholder="E-mail" value={form.email} onChange={set("email")} className="input" />
              <input required placeholder="Telefone" value={form.telefone} onChange={set("telefone")} className="input" />
              <input required placeholder="CEP" value={form.cep} onChange={set("cep")} className="input" />
              <input required placeholder="Endereço" value={form.endereco} onChange={set("endereco")} className="input sm:col-span-2" />
              <input required placeholder="Número" value={form.numero} onChange={set("numero")} className="input" />
              <input placeholder="Complemento" value={form.complemento} onChange={set("complemento")} className="input" />
              <input required placeholder="Cidade" value={form.cidade} onChange={set("cidade")} className="input" />
              <input required placeholder="UF" maxLength={2} value={form.estado} onChange={set("estado")} className="input" />
            </div>
          </section>

          {/* Pagamento */}
          <section className="rounded-2xl border border-ink/10 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-bold">
              <CreditCard className="h-5 w-5 text-terra" /> Pagamento
            </h2>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {(
                [
                  { id: "pix", label: "Pix", icon: QrCode },
                  { id: "cartao", label: "Cartão", icon: CreditCard },
                  { id: "boleto", label: "Boleto", icon: Landmark },
                ] as const
              ).map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setPayment(id)}
                  className={`flex flex-col items-center gap-1.5 rounded-xl border py-3.5 text-sm font-semibold transition-colors ${
                    payment === id
                      ? "border-terra bg-terra/10 text-terra"
                      : "border-ink/15 hover:border-ink"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              ))}
            </div>

            {payment === "pix" && (
              <p className="mt-4 rounded-xl bg-sage/10 p-4 text-sm text-ink-soft">
                Após confirmar, geraremos um QR Code Pix com 5% de desconto.
                É só escanear com o app do seu banco!
              </p>
            )}

            {payment === "cartao" && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <input required placeholder="Número do cartão" value={form.cartaoNumero} onChange={set("cartaoNumero")} className="input sm:col-span-2" />
                <input required placeholder="Nome no cartão" value={form.cartaoNome} onChange={set("cartaoNome")} className="input sm:col-span-2" />
                <input required placeholder="Validade (MM/AA)" value={form.cartaoValidade} onChange={set("cartaoValidade")} className="input" />
                <input required placeholder="CVV" maxLength={4} value={form.cartaoCvv} onChange={set("cartaoCvv")} className="input" />
              </div>
            )}

            {payment === "boleto" && (
              <p className="mt-4 rounded-xl bg-sage/10 p-4 text-sm text-ink-soft">
                O boleto será gerado após a confirmação e o pedido será enviado
                assim que o pagamento compensar (até 3 dias úteis).
              </p>
            )}
          </section>
        </div>

        {/* Resumo */}
        <aside className="h-fit rounded-2xl border border-ink/10 bg-white p-6 lg:sticky lg:top-24">
          <h2 className="text-lg font-bold">Seu pedido</h2>
          <ul className="mt-4 max-h-72 space-y-3 overflow-y-auto">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.size}-${item.color}`}
                className="flex items-center gap-3"
              >
                <div className="h-14 w-12 shrink-0 overflow-hidden rounded-lg">
                  <ProductVisual kind={item.visual} gradient={item.gradient} className="h-full w-full" />
                </div>
                <div className="flex-1 text-sm">
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-ink-soft">
                    {item.color} · Tam. {item.size} × {item.qty}
                  </p>
                </div>
                <span className="text-sm font-semibold">
                  {formatPrice(item.price * item.qty)}
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Subtotal</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Frete</dt>
              <dd>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</dd>
            </div>
            {payment === "pix" && (
              <div className="flex justify-between text-sage">
                <dt>Desconto Pix (5%)</dt>
                <dd>-{formatPrice(total * 0.05)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-extrabold">
              <dt>Total</dt>
              <dd>
                {formatPrice(payment === "pix" ? total * 0.95 : total)}
              </dd>
            </div>
          </dl>
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-terra py-3.5 text-sm font-bold text-white transition-colors hover:bg-terra-dark"
          >
            Confirmar pedido
          </button>
          <p className="mt-3 text-center text-xs text-ink-soft">
            Ambiente de demonstração — nenhum pagamento real é processado.
          </p>
        </aside>
      </form>
    </div>
  );
}
