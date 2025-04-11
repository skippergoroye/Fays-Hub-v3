import React from "react";
import { CartProvider } from '../context/cartContext';



const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
};

export default Providers;
