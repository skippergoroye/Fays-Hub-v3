// components/PaymentForm.tsx
import { CardElement,PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useCartContext } from "@/context/cartContext";

interface Props {
  clientSecret: string;
}

export default function PaymentForm({ clientSecret }: Props) {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems } = useCartContext();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState("");

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!stripe || !elements) return;

  setIsProcessing(true);

  const result = await stripe.confirmPayment({
    elements,
    confirmParams: {
      return_url: window.location.origin + "/payment-success", // optional
    },
  });

  if (result.error) {
    setPaymentStatus(`Payment failed: ${result.error.message}`);
  } else {
    setPaymentStatus("Payment submitted! Awaiting confirmation...");
  }

  setIsProcessing(false);
};


  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* <CardElement /> */}
      {clientSecret && <PaymentElement />}
      <button
        type="submit"
        disabled={!stripe || isProcessing}
        className="mt-4 bg-green-600 hover:bg-green-800 text-white py-2 px-4 rounded"
      >
        {isProcessing ? "Processing..." : "Confirm Payment"}
      </button>
      {paymentStatus && <p>{paymentStatus}</p>}
    </form>
  );
}
