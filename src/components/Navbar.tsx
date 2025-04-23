"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useAppSelector } from "../redux/app/hooks";
import Link from "next/link";
import { RootState } from "../redux/app/store";
import { MenuList } from "../constants";
import { useRouter } from "next/navigation";
import { useCartContext } from "@/context/cartContext";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const { cartItems } = useCartContext()

  useEffect(() => {
    // Check if the cart is empty and perform a reload or any necessary action
    if (cartItems.length === 0) {
      // Assuming there's a function to reload the cart items
      // reloadCartItems();
      console.log("Cart is empty, perform necessary actions to reload cart items.");
    }
  }, [cartItems]); 

  return (
    <section className="px-6 lg:px-16 py-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-1">
          <Image
            src="/svg/fays-hub.svg"
            alt="fay-hub"
            width={100}
            height={50}
          />
        </div>

        <div className="lg:hidden flex items-center">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden lg:flex mr-10 gap-20">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for styles here"
              className="border border-gray-500 focus:outline-none focus-visible:ring-0 rounded-lg p-2 pr-8"
            />
            <Search className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 w-4" />
          </div>
          <div>
            <ul className="flex gap-8 cursor-pointer mt-2">
              {MenuList.map((item, index) => (
                <Link href={item.link} key={index}>
                <li
                  key={index}
                  className="capitalize font-opensans font-light text-black text-[18px]"
                >
                  {item.category}
                </li>
                </Link>
                
              ))}
            </ul>
          </div>
         
          <div className="flex items-center gap-6">
          <p onClick={() => router.push("/admin/product-list")} className=" border rounded-full p-2 text-center text-[12px] cursor-pointer">
            Seller Dashboard
          </p>
            <Heart size="20" />
            <Link href="/cart">
              <div className="relative cursor-pointer">
                <ShoppingCart size="20" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>
            <Image
              src="/svg/header-icon.svg"
              alt="header-icon"
              width={40}
              height={20}
              className="-mt-3"
            />
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden mt-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search for styles here"
              className="border border-gray-500 focus:outline-none focus-visible:ring-0 rounded-lg p-2 pr-8 w-full"
            />
            <Search className="absolute top-1/2 right-2 transform -translate-y-1/2 text-gray-500 w-4" />
          </div>
          <ul className="flex flex-col gap-4">
            {MenuList.map((item, index) => (
              <li
                key={index}
                className="capitalize font-opensans font-light text-black text-[18px]"
              >
                {item.category}
              </li>
            ))}
          </ul>
          <div className="mt-4 flex gap-6 justify-center">
            <Heart size="20" />
            <Link href="/cart">
              <div className="relative cursor-pointer">
                <ShoppingCart size="20" />
                {cartItems.length > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>

            <Image
              src="/svg/header-icon.svg"
              alt="header-icon"
              width={40}
              height={20}
            />
          </div>
        </div>
      )}
    </section>
  );
}
