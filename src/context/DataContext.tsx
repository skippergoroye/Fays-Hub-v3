"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import GlobalApi from "@/lib/global-api";
import { Product } from "@/types";
import { toast } from "react-toastify";

interface DataContextType {
  products: Product[];
  loading: boolean;
  deleteProduct: (id: string) => void;
//   loadingDelete: boolean;
  deletingProductId: string | null;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  // Add Products
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);


  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await GlobalApi.get("/products");
      setProducts(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Delete Products

  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);
  const deleteProduct = async (id: string) => {
    try {
        setDeletingProductId(id);

    
      const res = await GlobalApi.delete(`/products/${id}`);
      toast.info("Product deleted sucessfully");
      fetchData()
    } catch (error) {
      console.log(error);
    } 
  };

  const value = {
    products,
    loading,
    deleteProduct,
    deletingProductId
  
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};
