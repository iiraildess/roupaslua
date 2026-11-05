# 👗 RoupaLua

Loja de roupas online desenvolvida como trabalho escolar, construída com **Next.js 16**, **TypeScript** e **Tailwind CSS**.

> *"Moda que te faz brilhar"* — Vestidos, blusas, calças, jaquetas, sapatos e acessórios com estilo, qualidade e preço justo.

## ✨ Funcionalidades

- 🏠 **Página inicial** com hero, categorias, produtos em destaque e novidades
- 🛍️ **Catálogo de produtos** com busca, filtro por categoria e ordenação (preço, avaliação)
- 📦 **Página de produto** com seleção de tamanho, cor e quantidade
- 🛒 **Carrinho de compras** funcional com drawer lateral e persistência em `localStorage`
- ✅ **Checkout completo** com dados de entrega, formas de pagamento (Pix, Cartão, Boleto) e tela de confirmação de pedido
- 📄 **Páginas institucionais**: Sobre nós e Contato
- 📱 **Design responsivo** e totalmente em português
- 🖼️ **Ilustrações SVG** dos produtos (sem dependência de imagens externas)
- 🚚 **Frete grátis** acima de R$ 199 e desconto de 5% no Pix

## 🛠️ Tecnologias

- [Next.js 16](https://nextjs.org/) (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React (ícones)

## 📁 Estrutura do projeto

```
src/
├── app/
│   ├── page.tsx                  # Home
│   ├── produtos/
│   │   ├── page.tsx              # Catálogo
│   │   ├── Catalog.tsx           # Filtros e grid (client)
│   │   └── [id]/page.tsx         # Detalhe do produto
│   ├── carrinho/page.tsx         # Carrinho
│   ├── checkout/page.tsx         # Checkout
│   ├── sobre/page.tsx            # Sobre
│   ├── contato/page.tsx          # Contato
│   └── not-found.tsx             # Página 404
├── components/
│   ├── Navbar.tsx / Footer.tsx
│   ├── ProductCard.tsx
│   ├── ProductVisual.tsx         # Ilustrações SVG
│   ├── ProductPurchase.tsx       # Seletor tamanho/cor
│   ├── CartDrawer.tsx            # Carrinho lateral
│   └── AddToCartQuick.tsx
├── context/
│   └── CartContext.tsx           # Estado global do carrinho
└── lib/
    ├── products.ts               # Base de dados (18 produtos)
    └── types.ts                  # Tipos e constantes
```

## 🚀 Como rodar

```bash
# Instalar dependências
npm install

# Desenvolvimento
npm run dev

# Build estático (gera a pasta "out/")
npm run build

# Visualizar o build de produção localmente
npx serve out

# Lint
npm run lint
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🌐 Deploy na Netlify

O projeto está configurado para **static export** (`output: "export"` no `next.config.ts`), gerando a pasta `out/` com HTML, CSS e JS puros — sem necessidade de servidor Node.

O arquivo `netlify.toml` já define:

```toml
[build]
  command = "npm run build"
  publish = "out"
```

Para publicar:

1. Envie o código para um repositório Git (GitHub, GitLab, etc.)
2. Na Netlify, clique em **Add new site → Import an existing project**
3. Selecione o repositório — a Netlify detecta o `netlify.toml` automaticamente
4. Clique em **Deploy site**

> Dica: se o deploy foi feito antes por drag-and-drop da pasta errada, apague o site na Netlify e faça um novo deploy via Git para garantir que o build rode corretamente.

## 🗺️ Rotas

| Rota | Descrição |
|---|---|
| `/` | Página inicial |
| `/produtos` | Catálogo com filtros |
| `/produtos/[id]` | Detalhe do produto |
| `/carrinho` | Carrinho de compras |
| `/checkout` | Finalizar compra |
| `/sobre` | Sobre a loja |
| `/contato` | Formulário de contato |

---

**Feito por José Cipriano**
