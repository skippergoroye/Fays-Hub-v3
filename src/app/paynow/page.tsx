"use client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import GlobalApi from "@/lib/global-api";
import { useCartContext } from "@/context/cartContext";
// import GlobalApi from "@/utils/GlobalApi"; // adjust import path as needed

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PayNowPage({ email }: { email: string }) {
  const [clientSecret, setClientSecret] = useState("");
  const { cartItems } = useCartContext()
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");

  useEffect(() => {
    // const cart = [
    //   {
    //     id: 1,
    //     name: "Test Product",
    //     price: 2000, // in cents
    //     quantity: 1,
    //     imageUrl: "https://via.placeholder.com/100",
    //   },
    // ];

    GlobalApi.post("/products/checkout", {
      items: cartItems,
      email: email,
      // email: "giftomos93@gmail.com",
    })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error("Failed to create payment intent:", err);
      });
  }, []);


  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="w-full mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-500">Pay Skipper ${totalAmount}</h2>
        <PaymentForm clientSecret={clientSecret} />
      </div>
    </Elements>
  );
}
