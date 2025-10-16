"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";

export const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 animate-pulse mb-12">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded" />
      </div>
    );
  }
  return <PayPalButtons />;
};
