"use client";
import React, { useState, useEffect, createContext, useContext } from "react";
import GlobalApi from "@/lib/global-api";
import { Product } from "@/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

interface DataContextType {
  products: Product[];
  loading: boolean;
  deleteProduct: (id: string) => void;
  //   loadingDelete: boolean;
  deletingProductId: string | null;
  addProduct: (data: any) => Promise<void>;
  router: ReturnType<typeof useRouter>;
}

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: { children: React.ReactNode }) => {
  // Add Products
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );
  const deleteProduct = async (id: string) => {
    try {
      setDeletingProductId(id);

      const res = await GlobalApi.delete(`/products/${id}`);
      toast.info("Product deleted sucessfully");
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  // Add Products
  const addProduct = async (data: {
    name: string;
    title: string;
    price: string;
  }) => {
    try {
      await GlobalApi.post("/products", data);
      toast.success("Product added successfully");
      fetchData(); // Refresh list after adding
    } catch (error) {
      console.error("Add Product Error:", error);
      toast.error("Failed to add product");
    }
  };

  const value = {
    router,
    products,
    loading,
    deleteProduct,
    deletingProductId,
    addProduct,
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
