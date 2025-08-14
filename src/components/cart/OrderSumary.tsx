"use client";

import { useCartStore } from "@/store";
import { currencyFormat } from "@/utils";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const OrderSumary = () => {
  const [loading, setLoading] = useState(false);
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSumaryInformation())
  );

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid grid-cols-2">
      <span>No. Productos</span>
      <span className="text-right">{itemsInCart}</span>

      <span>Subtotal</span>
      <span className="text-right">{currencyFormat(subTotal)}</span>

      <span>Impuestos (15%)</span>
      <span className="text-right">{currencyFormat(tax)}</span>

      <span className="text-2xl mt-5">Total:</span>
      <span className="text-right text-2xl mt-5">{currencyFormat(total)}</span>
    </div>
  );
};
