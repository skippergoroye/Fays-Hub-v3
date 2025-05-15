"use client";
import { useEffect, useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "@/components/PaymentForm";
import GlobalApi from "@/lib/global-api";
// import GlobalApi from "@/utils/GlobalApi"; // adjust import path as needed

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export default function PayNowPage() {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const cart = [
      {
        id: 1,
        name: "Test Product",
        price: 2000, // in cents
        quantity: 1,
        imageUrl: "https://via.placeholder.com/100",
      },
    ];

    GlobalApi.post("/products/checkout", {
      items: cart,
      email: "giftomos93@gmail.com",
    })
      .then((res) => setClientSecret(res.data.clientSecret))
      .catch((err) => {
        console.error("Failed to create payment intent:", err);
      });
  }, []);

  if (!clientSecret) return <p>Loading payment...</p>;

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Complete Your Payment</h2>
        <PaymentForm clientSecret={clientSecret} />
      </div>
    </Elements>
  );
}
