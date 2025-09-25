import { PlaceOrder, ProductsInOrder, Title } from "@/components";
import Link from "next/link";

export default function () {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar orden" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Cart */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Ajustar elementos</span>
            <Link href={"/cart"} className="underline mb-5">
              Editar carrito
            </Link>

            {/* Items */}

            <ProductsInOrder />
          </div>
          {/* Checkout */}
          <PlaceOrder />
        </div>
      </div>
    </div>
  );
}
