"use client";

import { useSearchParams } from "next/navigation";

const PaymentSuccessClient = () => {
  const searchParams = useSearchParams();
  const amount = searchParams.get("amount");

  if (!amount) {
    return <div className="text-center text-white">No amount provided</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">Thank you!</h1>
        <h2 className="text-2xl">You have successfully sent</h2>
        <div className="bg-white p-2 rounded-md mt-5 text-purple-500 text-4xl font-bold">
          ${amount}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessClient;
