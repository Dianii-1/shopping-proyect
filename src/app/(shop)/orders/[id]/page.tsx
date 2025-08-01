import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import clsx from "clsx";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";

const productsInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function ({ params }: Props) {
  const { id } = await params;

  // Todo: Verificar Id

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Cart */}

          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex gap-2 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span>Pagado</span>
            </div>

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
                  <p>${product.price} X 3</p>
                  <p className="font-bold">Subtotal: {product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}

          <div className="bg-white shadow-xl rounded-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Diana Pinilla</p>
              <p>Av. Siempre viva 123</p>
              <p>Col. centro</p>
              <p>Alcaldia centro mayor</p>
              <p>Ciudad de mexico</p>
              <p>CP. 231233</p>
              <p>3003003030</p>
            </div>

            {/* divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

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
              <div
                className={clsx(
                  "flex gap-2 items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span>Pagado</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
