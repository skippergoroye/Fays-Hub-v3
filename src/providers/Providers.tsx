import React from "react";
import { CartProvider } from '../context/cartContext';
import { DataProvider } from "@/context/DataContext";



const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <DataProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </DataProvider>

  );
};

export default Providers;
