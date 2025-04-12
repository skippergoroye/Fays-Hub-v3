"use client"
import React, { useContext, createContext, useState } from "react";

interface CartContextType {
  id: string | null;
  setId: React.Dispatch<React.SetStateAction<string | null>>;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [id, setId] = useState<string | null>(null);

  return (
    <CartContext.Provider value={{ id, setId }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
