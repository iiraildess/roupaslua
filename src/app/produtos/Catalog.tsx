"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal } from "lucide-react";
import { products } from "@/lib/products";
import { CATEGORIES, type Category } from "@/lib/types";
import { ProductCard } from "@/components/ProductCard";

type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "avaliacao";

export function Catalog() {
  const params = useSearchParams();
  const initialCategory = (params.get("categoria") as Category) || "";
  const initialQuery = params.get("q") || "";

  const [category, setCategory] = useState<Category | "">(initialCategory);
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category) list = list.filter((p) => p.category === category);

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.colors.some((c) => c.toLowerCase().includes(q))
      );
    }

    switch (sort) {
      case "menor-preco":
        list.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        list.sort((a, b) => b.price - a.price);
        break;
      case "avaliacao":
        list.sort((a, b) => b.rating - a.rating);
        break;
    }

    return list;
  }, [category, query, sort]);

  return (
    <div>
      {/* Barra de filtros */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory("")}
            className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
              category === ""
                ? "border-ink bg-ink text-cream"
                : "border-ink/20 hover:border-ink"
            }`}
          >
            Todos
          </button>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(category === c.id ? "" : c.id)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold transition-colors ${
                category === c.id
                  ? "border-ink bg-ink text-cream"
                  : "border-ink/20 hover:border-ink"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-soft" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar..."
              className="w-full rounded-full border border-ink/20 bg-white py-2 pl-9 pr-4 text-sm outline-none focus:border-terra"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="rounded-full border border-ink/20 bg-white px-4 py-2 text-sm outline-none focus:border-terra"
          >
            <option value="relevancia">Relevância</option>
            <option value="menor-preco">Menor preço</option>
            <option value="maior-preco">Maior preço</option>
            <option value="avaliacao">Melhor avaliados</option>
          </select>
          <button
            onClick={() => setFiltersOpen((v) => !v)}
            className="rounded-full border border-ink/20 p-2 lg:hidden"
            aria-label="Filtros"
          >
            <SlidersHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {filtersOpen && (
        <div className="mt-3 rounded-xl border border-ink/10 bg-white p-4 lg:hidden">
          <p className="mb-2 text-xs font-semibold uppercase text-ink-soft">Categoria</p>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={`rounded-full border px-3 py-1.5 text-xs ${
                  category === c.id
                    ? "border-ink bg-ink text-cream"
                    : "border-ink/20"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Contagem + grid */}
      <p className="mt-6 text-sm text-ink-soft">
        {filtered.length}{" "}
        {filtered.length === 1 ? "produto encontrado" : "produtos encontrados"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-ink/20 bg-white p-14 text-center">
          <p className="text-lg font-semibold">Nenhum produto encontrado</p>
          <p className="mt-1 text-sm text-ink-soft">
            Tente buscar por outro termo ou remover os filtros.
          </p>
          <button
            onClick={() => {
              setCategory("");
              setQuery("");
            }}
            className="mt-5 rounded-full bg-ink px-6 py-2.5 text-sm font-medium text-cream hover:bg-terra"
          >
            Limpar filtros
          </button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
