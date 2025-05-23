"use client";

import React, { useState } from "react";
import { useCartContext } from "@/context/cartContext";
import CustomModal from "@/components/shared/CustomModal";
import Image from "next/image";
import PayNow from "@/components/PayNow";


export default function Checkout() {
  const { cartItems } = useCartContext();
  const [email, setEmail] = useState("");
  const [openCheckoutModal, setOpenCheckoutModal] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  const handlePlaceOrder = () => {
    if (!email) {
      alert("Please enter your email address.");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cartItems));
    setOpenCheckoutModal(true);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full lg:w-1/2 xspace-y-6">
        <h1 className="text-2xl font-bold text-center">Enter Your Email to Checkout</h1>

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* <div className="flex justify-between text-lg font-medium">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </div> */}

<div className="p-6 w-full">
            <h1 className="text-2xl font-bold mb-4">Checkout</h1>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
              {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                <div>
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between mb-4 border-b pb-4"
                    >
                      <Image
                        src={item.imageUrl}
                        alt={item.name ?? ""}
                        width={100}
                        height={100}
                      />
                      <p>{item.name}</p>
                      <p>
                        {item.quantity} x{" "}
                        {item?.price || "N/A"}
                      </p>
                      <p>
                        $
                        {(
                          item?.price *
                          item.quantity
                        ).toFixed(2)}
                      </p>
                    </div>
                  ))}
                  <div className="flex justify-between mt-4 border-t pt-4">
                    <p className="text-xl font-semibold">Total</p>
                    <p className="text-xl font-semibold">
                      ${totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <button
                    onClick={handlePlaceOrder}
                    className="mt-6 bg-blue-500 hover:bg-blue-800 text-white py-2 px-4 rounded-lg w-full"
                  >
                    Pay Now
                  </button>
                </div>
              )}
            </div>
          </div>

       
      </div>

      <CustomModal isOpen={openCheckoutModal} onClose={() => setOpenCheckoutModal(false)}>
        <PayNow email={email} />
      </CustomModal>
    </div>
  );
}

