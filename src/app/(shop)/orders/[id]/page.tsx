import { OrderStatus, PaypalButton, ProductImage, Title } from "@/components";
import { redirect } from "next/navigation";
import { currencyFormat } from "../../../../utils/currencyFormat";
import { getOrderById } from "@/actions";

interface Props {
  params: Promise<{
    id: string;
  }>;
}
export default async function ({ params }: Props) {
  const { id } = await params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Cart */}

          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}

            {order!.orderItem.map((item) => (
              <div key={item.product.slug + item.size} className="flex mb-5">
                <ProductImage
                  alt={item.product.title}
                  src={item.product.ProductImage[0].url}
                  width={100}
                  height={100}
                  className="rounded mr-5"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} X {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* Checkout */}

          <div className="bg-white shadow-xl rounded-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {order!.OrderAddress!.firstName} {order!.OrderAddress!.lastName}
              </p>
              <p>{order!.OrderAddress!.address}</p>
              <p>{order!.OrderAddress!.address2}</p>
              <p>{order!.OrderAddress!.postalCode}</p>
              <p>
                {order!.OrderAddress!.city}, {order!.OrderAddress!.countryId}
              </p>
              <p>{order!.OrderAddress!.phone}</p>
            </div>

            {/* divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order!.itemsOrder === 1
                  ? "1 articulo"
                  : `${order!.itemsOrder} articulos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subtotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="text-2xl mt-5">Total:</span>
              <span className="text-right text-2xl mt-5">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <PaypalButton amount={order!.total} orderId={order!.id} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
