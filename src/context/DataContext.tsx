"use client"
import React, { useState, useEffect, createContext, useContext } from "react";
import GlobalApi from "@/lib/global-api";




interface DataContextType {
    products: any;
    loading: boolean;
}

const DataContext = createContext<DataContextType | null>(null);




export const DataProvider= ({ children }: { children: React.ReactNode }) => {
     const [products, setProducts] = useState<any>([]);
     const [loading, setLoading] = useState(true);

     const fetchData = async () => {
        try {
            setLoading(true);
            const res = await GlobalApi.get("/products");
            setProducts(res.data);
            console.log(res.data)

        } catch (error) {
            console.log(error)
            
        } finally {
            setLoading(false);
          }
     }


     useEffect(() => {
        fetchData();
      }, []);
    


    return(
        <DataContext.Provider value={{products, loading}}>
            {children}
        </DataContext.Provider>
    )
}



export const useDataContext = () => {
    const context = useContext(DataContext);
    if (!context) {
      throw new Error('useCartContext must be used within a CartProvider');
    }
    return context;
  }