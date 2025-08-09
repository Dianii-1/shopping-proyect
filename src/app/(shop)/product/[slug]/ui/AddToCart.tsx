"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import type { CartProduct, Product, Size } from "@/interfaces";
import { useCartStore } from "@/store";
import { useState } from "react";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [posted, setPosted] = useState<boolean>(false);

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    setPosted(true);

    if (!size) return;

    const cartProduct: CartProduct = {
      id: product.id,
      image: product.images[0],
      price: product.price,
      size: size,
      slug: product.slug,
      title: product.title,
      quantity: quantity,
    };

    addProductToCart(cartProduct);
    setPosted(false);
    setQuantity(1);
    setSize(undefined);
  };

  return (
    <>
      {posted && !size && (
        <span className="mt-2 text-red-500 fade-in">
          Debe seleccionar una talla*
        </span>
      )}
      {/* selector de tallas */}

      <SizeSelector
        avaliableSizes={product.sizes}
        selectedSize={size}
        onSizeChange={setSize}
      />
      {/* selector de cantidad */}

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* boton */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};
