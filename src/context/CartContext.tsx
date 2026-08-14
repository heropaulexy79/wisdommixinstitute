"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export type BookFormat = 'digital' | 'physical';

export interface CartItem {
  id: string; // unique item id (e.g. "leading-minds-digital" or "leading-minds-physical")
  bookId: string;
  title: string;
  author: string;
  price: number;
  image: string;
  description: string;
  format: BookFormat;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "format"> & { format?: BookFormat }) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  isInCart: (bookId: string, format?: BookFormat) => boolean;
  totalPrice: number;
  itemCount: number;
  hasPhysicalItems: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const addToCart = (rawItem: Omit<CartItem, "format"> & { format?: BookFormat }) => {
    const format = rawItem.format || 'digital';
    const bookId = rawItem.bookId || rawItem.id.replace(/-(digital|physical)$/, '');
    const uniqueId = `${bookId}-${format}`;

    const newItem: CartItem = {
      ...rawItem,
      id: uniqueId,
      bookId,
      format,
    };

    setItems((prev) => {
      if (prev.find((i) => i.id === uniqueId)) return prev;
      return [...prev, newItem];
    });
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id && i.bookId !== id));
  };

  const clearCart = () => setItems([]);

  const isInCart = (bookId: string, format?: BookFormat) => {
    if (format) {
      return items.some((i) => (i.bookId === bookId || i.id === bookId) && i.format === format);
    }
    return items.some((i) => i.bookId === bookId || i.id === bookId);
  };

  const totalPrice = items.reduce((sum, i) => sum + i.price, 0);
  const hasPhysicalItems = items.some((i) => i.format === 'physical');

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        totalPrice,
        itemCount: items.length,
        hasPhysicalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
