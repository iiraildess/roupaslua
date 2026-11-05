import Link from "next/link";
import { Moon, Mail, MapPin, Phone } from "lucide-react";

function InstagramIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

const CURRENT_YEAR = new Date().getFullYear();

function FacebookIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <Moon className="h-6 w-6 text-terra" strokeWidth={2.5} />
            <span className="text-xl font-bold">
              Roupa<span className="text-terra">Lua</span>
            </span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-cream/70">
            Moda acessível e autêntica. Cada peça é escolhida para durar,
            combinar e fazer você se sentir bem — porque estilo é uma forma
            de se expressar.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: FacebookIcon, label: "Facebook" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                className="rounded-full bg-cream/10 p-2.5 transition-colors hover:bg-terra"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Loja
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
            <li><Link href="/produtos" className="hover:text-terra">Todos os produtos</Link></li>
            <li><Link href="/produtos?categoria=vestidos" className="hover:text-terra">Vestidos</Link></li>
            <li><Link href="/produtos?categoria=blusas" className="hover:text-terra">Blusas</Link></li>
            <li><Link href="/produtos?categoria=calcas" className="hover:text-terra">Calças</Link></li>
            <li><Link href="/carrinho" className="hover:text-terra">Carrinho</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Institucional
          </h3>
          <ul className="mt-4 space-y-2.5 text-sm text-cream/80">
            <li><Link href="/sobre" className="hover:text-terra">Sobre nós</Link></li>
            <li><Link href="/contato" className="hover:text-terra">Contato</Link></li>
            <li><a href="#" className="hover:text-terra">Trocas e devoluções</a></li>
            <li><a href="#" className="hover:text-terra">Política de privacidade</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-gold">
            Contato
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/80">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-terra" />
              Rua das Flores, 123 — Centro
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-terra" />
              (11) 99999-0000
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-terra" />
              oi@roupalua.com.br
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {CURRENT_YEAR} RoupaLua — Todos os direitos reservados.
        <span className="mt-1 block">Feito por José Cipriano</span>
      </div>
    </footer>
  );
}
