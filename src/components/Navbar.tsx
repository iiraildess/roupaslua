"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { ShoppingBag, Menu, X, Moon, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";

const LINKS = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { itemCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setMobileOpen(false);
    setSearchOpen(false);
    router.push(`/produtos?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Moon className="h-6 w-6 text-terra" strokeWidth={2.5} />
          <span className="text-xl font-bold tracking-tight">
            Roupa<span className="text-terra">Lua</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors hover:text-terra ${
                pathname === l.href ? "text-terra" : "text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen((v) => !v)}
            className="rounded-full p-2 transition-colors hover:bg-sand"
            aria-label="Buscar"
          >
            <Search className="h-5 w-5" />
          </button>
          <button
            onClick={openCart}
            className="relative rounded-full p-2 transition-colors hover:bg-sand"
            aria-label="Abrir carrinho"
          >
            <ShoppingBag className="h-5 w-5" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-terra text-[10px] font-bold text-white">
                {itemCount}
              </span>
            )}
          </button>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="rounded-full p-2 transition-colors hover:bg-sand md:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-ink/10 bg-cream px-4 py-3">
          <form
            onSubmit={submitSearch}
            className="mx-auto flex max-w-7xl gap-2"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar produtos..."
              className="flex-1 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm outline-none focus:border-terra"
            />
            <button
              type="submit"
              className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-cream transition-colors hover:bg-terra"
            >
              Buscar
            </button>
          </form>
        </div>
      )}

      {mobileOpen && (
        <nav className="border-t border-ink/10 bg-cream px-4 py-3 md:hidden">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname === l.href
                  ? "bg-sand text-terra"
                  : "text-ink hover:bg-sand"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
