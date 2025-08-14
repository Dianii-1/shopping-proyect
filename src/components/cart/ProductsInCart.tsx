"use client";

import { useCartStore } from "@/store";
import { QuantitySelector } from "../product/quantity-selector/QuantitySelector";
import Image from "next/image";
import { Value } from "../../generated/prisma/runtime/library";
import { useEffect, useState } from "react";
import Link from "next/link";

export const ProductsInCart = () => {
  const productsInCart = useCartStore((state) => state.cart);
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity
  );

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
            <Link
              className="hover:underline cursor-pointer"
              href={`/product/${product.slug}`}
            >
              {product.title}
            </Link>
            <p>{product.size}</p>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(value) =>
                updateProductQuantity(product, value)
              }
            />
            <button className="underline mr-3">Remover</button>
          </div>
        </div>
      ))}
    </>
  );
};
