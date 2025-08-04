"use client";
import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts";
import React, { useEffect, useState } from "react";

interface Props {
  slug: string;
}
export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getStock = async () => {
    const stockProduct = await getStockBySlug(slug);
    setStock(stockProduct);
    setIsLoading(false);
  };

  useEffect(() => {
    getStock();
  }, []);

  console.log(stock);
  return (
    <>
      {isLoading ? (
        <h1
          className={`${titleFont.className} antialiased font-bold text-xl bg-gray-200 animate-pulse`}
        >
          &nbsp;
        </h1>
      ) : (
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          Stock: {stock}
        </h1>
      )}
    </>
  );
};
