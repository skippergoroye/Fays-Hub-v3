import dynamic from "next/dynamic";
import { Suspense } from "react";

// Lazy-load the client component
const PaymentSuccessClient = dynamic(() => import("@/components/PaymentSuccessClient"), { ssr: false });

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div className="text-center text-white">Loading...</div>}>
      <PaymentSuccessClient />
    </Suspense>
  );
}
