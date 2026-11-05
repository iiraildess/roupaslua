"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem } from "@/lib/types";

interface AddItemInput {
  productId: string;
  name: string;
  price: number;
  visual: CartItem["visual"];
  gradient: [string, string];
  size: string;
  color: string;
  qty?: number;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (input: AddItemInput) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQty: (
    productId: string,
    size: string,
    color: string,
    qty: number
  ) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "roupalua-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- hydration from localStorage requires an effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore corrupted storage
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((input: AddItemInput) => {
    setItems((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.productId === input.productId &&
          i.size === input.size &&
          i.color === input.color
      );
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + (input.qty ?? 1) };
        return next;
      }
      return [
        ...prev,
        {
          productId: input.productId,
          name: input.name,
          price: input.price,
          visual: input.visual,
          gradient: input.gradient,
          size: input.size,
          color: input.color,
          qty: input.qty ?? 1,
        },
      ];
    });
    setIsCartOpen(true);
  }, []);

  const removeItem = useCallback(
    (productId: string, size: string, color: string) => {
      setItems((prev) =>
        prev.filter(
          (i) =>
            !(
              i.productId === productId &&
              i.size === size &&
              i.color === color
            )
        )
      );
    },
    []
  );

  const updateQty = useCallback(
    (productId: string, size: string, color: string, qty: number) => {
      setItems((prev) =>
        qty <= 0
          ? prev.filter(
              (i) =>
                !(
                  i.productId === productId &&
                  i.size === size &&
                  i.color === color
                )
            )
          : prev.map((i) =>
              i.productId === productId &&
              i.size === size &&
              i.color === color
                ? { ...i, qty }
                : i
            )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((sum, i) => sum + i.qty, 0);
    const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
    return {
      items,
      itemCount,
      subtotal,
      isCartOpen,
      openCart,
      closeCart,
      addItem,
      removeItem,
      updateQty,
      clearCart,
    };
  }, [
    items,
    isCartOpen,
    openCart,
    closeCart,
    addItem,
    removeItem,
    updateQty,
    clearCart,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
