import Link from "next/link";
import { Moon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col items-center px-4 py-28 text-center sm:px-6">
      <Moon className="h-14 w-14 text-terra" />
      <p className="mt-4 text-7xl font-extrabold tracking-tight">404</p>
      <h1 className="mt-2 text-2xl font-bold">Página não encontrada</h1>
      <p className="mt-2 max-w-sm text-ink-soft">
        O endereço que você tentou acessar não existe ou foi movido. Que tal
        voltar para a loja?
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-terra px-7 py-3.5 text-sm font-bold text-white hover:bg-terra-dark"
      >
        Voltar ao início
      </Link>
    </div>
  );
}
