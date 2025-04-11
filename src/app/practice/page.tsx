"use client"
// import React from 'react'
// import getProducts from '@/lib/get-products'
// import { ProductInterface } from '@/types'



// export default async function Practice() {
//     const productData: Promise<ProductInterface> = await getProducts()



//     console.log(productData)
//   return (
//     <div>Practice</div>
//   )
// }




import React, { useState, useEffect } from 'react';
import getProducts from '@/lib/get-products';
import { ProductInterface } from '@/types';
import Image from 'next/image';

export default function Practice() {
  const [products, setProducts] = useState<ProductInterface[]>([]);
  const [cart, setCart] = useState<ProductInterface[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productData = await getProducts();
      setProducts(productData.items);
    };
    fetchProducts();
  }, []);

  const addToCart = (product: ProductInterface) => {
    setCart((prevCart) => [...prevCart, product]);
  };


  console.log(products)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <Image
              src={`https://api.timbu.cloud/images/${product.photos[0]?.url}`}
              alt={product.name ?? ""}
              width={500}
              height={500}
              className="w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-lg text-gray-700 mb-2">
            ${product.current_price?.[0]?.USD?.[0] || 'N/A'}
              {/* ${product.current_price[0].USD[0]} */}
            </p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold">Cart</h2>
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="border-b py-2">
              {item.name} - ${item.current_price[0]?.USD[0]}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}






