"use client";

import { useCartStore } from "@/store";
import Image from "next/image";
import { useEffect, useState } from "react";
import { currencyFormat } from "../../utils/currencyFormat";

export const ProductsInOrder = () => {
  const productsInCart = useCartStore((state) => state.cart);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
  }, []);

  if (!loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div key={`${product.slug}-${product.size}`} className="flex mb-5">
          <Image
            alt={product.title}
            src={`/products/${product.image}`}
            width={100}
            height={100}
            className="rounded mr-5"
          />
          <div>
            <span>
              {product.title} ({product.quantity})
            </span>
            <p>Talla: {product.size}</p>
            <p className="font-bold">
              Subtotal: {currencyFormat(product.price * product.quantity)}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};
