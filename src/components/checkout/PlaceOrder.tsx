"use client";

import { placeOrder } from "@/actions";
import { useCartStore, useStateAddress } from "@/store";
import { currencyFormat } from "@/utils";
import clsx from "clsx";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useShallow } from "zustand/shallow";

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlaceOrder, setIsPlaceOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { address } = useStateAddress();
  const { itemsInCart, subTotal, tax, total } = useCartStore(
    useShallow((state) => state.getSumaryInformation())
  );

  const { cart, clearCar } = useCartStore();

  const onPlaceOrder = async () => {
    setIsPlaceOrder(true);

    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    console.log({ address, productsToOrder });

    // server action
    const res = await placeOrder(productsToOrder, address);
    if (!res.ok) {
      setIsPlaceOrder(false);
      setErrorMessage(res.message);
      return;
    }

    // Aca todo salio bien
    // se limpia el carrito y se redirecciona
    clearCar();
    router.replace("/orders/" + res.order?.id);
  };

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return <p>Cragando...</p>;
  }

  if (cart.length === 0 && loaded) {
    redirect("/empty");
  }

  return (
    <div className="bg-white shadow-xl rounded-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/* divider */}

      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2">Resumen de orden</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Impuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="text-2xl mt-5">Total:</span>
        <span className="text-right text-2xl mt-5">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-5">
          {/* Disclaimer */}
          <span className="text-xs">
            Al hacer clic en "Colocar orden", aceptas nuestros{" "}
            <a href="#" className="underline">
              términos y condiciones
            </a>{" "}
            y{" "}
            <a href="#" className="underline">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500 text-sm mb-1">{errorMessage}</p>

        <button
          // href={"/orders/123"}
          onClick={onPlaceOrder}
          className={clsx({
            "flex btn-primary justify-center": !isPlaceOrder,
            "bg-gay-600 text-gray-600 py-2 px-4 rounded transition-all border border-gray-600 cursor-not-allowed":
              isPlaceOrder,
          })}
        >
          Colocar orden
        </button>
      </div>
    </div>
  );
};
