import { Suspense } from "react";
import type { Metadata } from "next";
import { Catalog } from "./Catalog";

export const metadata: Metadata = {
  title: "Produtos",
  description: "Explore todos os produtos da RoupaLua: vestidos, blusas, calças, jaquetas, sapatos e acessórios.",
};

export default function ProdutosPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-terra">
          Catálogo completo
        </p>
        <h1 className="mt-1 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Todos os produtos
        </h1>
        <p className="mt-2 text-ink-soft">
          Filtre por categoria, ordene por preço e encontre sua próxima peça favorita.
        </p>
      </div>
      <Suspense>
        <Catalog />
      </Suspense>
    </div>
  );
}
