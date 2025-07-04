import { QuantitySelector, Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import Link from "next/link";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

export default function AdminPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Cart */}

          <div className="flex flex-col mt-5">
            <span className="text-xl">Agregar más items</span>
            <Link href={"/"} className="underline mb-5">
              Continúa comprando
            </Link>

            {/* Items */}

            {productsInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  alt={product.title}
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  className="rounded mr-5"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price}</p>
                  <QuantitySelector quantity={2} />
                  <button className="underline mr-3">Remover</button>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}

          <div className="bg-white shadow-xl rounded-xl p-7 h-fit">
            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">$100</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$100</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <Link className="flex btn-primary justify-center" href={'/checkout/address'}>Checkout</Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
