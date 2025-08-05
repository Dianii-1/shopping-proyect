"use client";
import { QuantitySelector, SizeSelector } from "@/components";
import { Product, Size } from "@/interfaces";
import { useState } from "react";

interface Props {
  product: Product;
}
export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  return (
    <>
      {/* selector de tallas */}

      <SizeSelector
        avaliableSizes={product.sizes}
        selectedSize={size}
        onSizeChange={setSize}
      />
      {/* selector de cantidad */}

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* boton */}
      <button className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};
