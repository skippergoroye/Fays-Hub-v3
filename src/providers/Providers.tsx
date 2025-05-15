import React from "react";
import { CartProvider } from '../context/cartContext';
import { DataProvider } from "@/context/DataContext";
import StripeProvider from "./StripeProvider";



const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
        <StripeProvider>
    <DataProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </DataProvider>
       </StripeProvider>

  );
};

export default Providers;
