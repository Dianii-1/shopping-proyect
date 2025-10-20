"use client";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { CreateOrderData, CreateOrderActions } from "@paypal/paypal-js";

interface Props {
  amount: number;
  orderId: string;
}
export const PaypalButton = ({ amount, orderId }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();
  const roundedAmount = Math.round(amount * 100) / 100;

  if (isPending) {
    return (
      <div className="flex flex-col gap-4 animate-pulse mb-12">
        <div className="h-11 bg-gray-300 rounded" />
        <div className="h-11 bg-gray-300 rounded" />
      </div>
    );
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            value: `${roundedAmount}`,
            currency_code: "USD",
          },
        },
      ],
    });

    console.log({ transactionId });
    return transactionId;
  };

  return <PayPalButtons createOrder={createOrder} />;
};
