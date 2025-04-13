"use client";

import React, { useState } from 'react';
import { Category, Price, Brand, Arrival } from "@/constants";
import { X, ShoppingCart } from "lucide-react";
import { useAppDispatch } from "../redux/app/hooks";
import { addToCart } from "../redux/features/cart/cartSlice";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useDataContext } from '@/context/DataContext';
import { LoaderIcon } from 'lucide-react'
import Loading from './Loading';

const ITEMS_PER_PAGE = 10; // Number of items per page

export default function CategorySection() {
  const router = useRouter(); 
  const dispatch = useAppDispatch();
  const { products, loading } = useDataContext()

  const handleAddToCart = (item: any) => {
    dispatch(addToCart(item));
  };


  const [currentPage, setCurrentPage] = useState(1);





  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const currentProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
  };

  return (
    <section className="px-6 lg:px-16 py-2 lg:py-8">
      <div>
        <h1 className="text-black font-opensans text-16 lg:text-[30px] font-bold">
          Fashion Category
        </h1>
        <div className="flex flex-col lg:flex-row">
          <div className="mt-20 w-1/4">
            <div className="mb-10">
              <h1 className="text-black font-opensans font-semibold capitalize">
                Category
              </h1>
              <div className="flex gap-3 flex-wrap w-[250px] mt-5">
                {Category.map((item, index) => (
                  <div
                    key={index}
                    className={`border border-[#D9D9D9] p-2 rounded-lg font-opensans font-normal text-[15px] ${
                      index === 0 || index === 1 || index === 7
                        ? "bg-blue-500 text-white"
                        : ""
                    }`}
                  >
                    {item.category}
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-10">
              <h1 className="text-black font-opensans font-semibold capitalize">
                Price Range
              </h1>
              <div className="flex gap-3 flex-wrap w-[100px] mt-5">
                {Price.map((item, index) => (
                  <div
                    key={index}
                    className={`border border-[#D9D9D9] p-2 rounded-lg font-opensans font-normal text-[15px] ${
                      index === 2 ? "text-blue-500" : ""
                    }`}
                  >
                    {item.price}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-10">
              <h1 className="text-black font-opensans font-semibold capitalize">
                Brand
              </h1>
              <div className="flex gap-3 flex-wrap w-[200px] mt-5">
                {Brand.map((item, index) => (
                  <div
                    key={index}
                    className={`border border-[#D9D9D9] p-2 rounded-lg font-opensans font-normal text-[15px] ${
                      index === 1 || index === 7 ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    {item.category}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h1 className="text-black font-opensans font-semibold capitalize">
                Ratings
              </h1>
              <div>
                <Image
                  src="/svg/rating.svg"
                  alt="ratings"
                  width={100}
                  height={20}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
          <div className="lg:mt-2 mt-10">
            <div className="flex flex-wrap">
              <div className="flex flex-1 flex-wrap gap-4 w-full lg:w-auto">
                {Arrival.map((item, index) => (
                  <div
                    key={index}
                    className="flex gap-2 items-center justify-center border p-2 rounded-lg font-opensans text-[#767676] w-full sm:w-auto"
                  >
                    {item.category}
                    <X color="#374957" />
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-4 lg:mt-0 lg:ml-[240px] w-full lg:w-auto">
                <p className="font-opensans text-[#767676]">Sort by</p>
                <div className="flex gap-2 border p-2 rounded-lg font-opensans text-[#767676]">
                  Relevance <X color="#374957" />
                </div>
              </div>
            </div>
            <div className="mt-8">
              {loading ? (
                // <div className="flex justify-center items-center">
                //   <div className="loader flex gap-2"><LoaderIcon className='animate-spin'/> Loading...</div>
                // </div>
                <Loading />
              ) : (
                <>
                  <div className="gap-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                    {currentProducts.map((product, index) => (
                      <div
                        key={index}
                        className="mt-2 flex flex-col gap-3 border border-[#D9D9D9] p-3 rounded-lg cursor-pointer"
                        onClick={() => handleProductClick(product.id)} // Add onClick handler
                      >
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          width={200}
                          height={200}
                        />
                        <div className="flex flex-col gap-2">
                          <p>{product.name}</p>
                          <p>${product.price || 'N/A'}</p>
                          <button
                            className="flex bg-[#536EFD] hover:bg-blue-800 text-white items-center justify-center p-2 rounded-lg w-30 lg:w-40 transition-all duration-500"
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent event from bubbling up to the parent div
                              handleAddToCart(product);
                            }}
                          >
                            <ShoppingCart />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-center mt-4">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-4 py-2 mx-1 border rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : ''}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="px-4 py-2 mx-1 border rounded disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

