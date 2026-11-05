export type Category =
  | "vestidos"
  | "blusas"
  | "calcas"
  | "jaquetas"
  | "sapatos"
  | "acessorios";

export type VisualKind =
  | "dress"
  | "blouse"
  | "pants"
  | "jacket"
  | "shoes"
  | "bag"
  | "hat"
  | "sunglasses";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  category: Category;
  sizes: string[];
  colors: string[];
  visual: VisualKind;
  gradient: [string, string];
  rating: number;
  reviews: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  visual: VisualKind;
  gradient: [string, string];
  size: string;
  color: string;
  qty: number;
}

export const CATEGORIES: { id: Category; label: string }[] = [
  { id: "vestidos", label: "Vestidos" },
  { id: "blusas", label: "Blusas" },
  { id: "calcas", label: "Calças" },
  { id: "jaquetas", label: "Jaquetas" },
  { id: "sapatos", label: "Sapatos" },
  { id: "acessorios", label: "Acessórios" },
];

export const categoryLabel = (id: Category) =>
  CATEGORIES.find((c) => c.id === id)?.label ?? id;

export const formatPrice = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
