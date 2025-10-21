"use server";

import { PaypalOrderStatusResponse } from "@/interfaces";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const paypalCheckPayment = async (transactionId: string) => {
  const authToken = await getPaypalBearerToken();

  if (!authToken) {
    return {
      ok: false,
      message: "No se pudo obtener el token de verificación",
    };
  }

  const resp = await verifyPaypalPayment(transactionId, authToken);

  if (!resp) {
    return {
      ok: false,
      message: "Error al verificar el pago",
    };
  }

  const { status, purchase_units } = resp;

  const { invoice_id: orderId } = purchase_units[0];

  if (status !== "COMPLETED") {
    return {
      ok: false,
      message: "Aún no se ha pagado en PayPal",
    };
  }

  // Realizar la actualización del pago en la base de datos

  try {
    await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        isPaid: true,
        paidAt: new Date(),
      },
    });

    //revalidar path

    revalidatePath(`/orders/${orderId}`);

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "500 - el pago no swe pudo realizar",
    };
  }
};

const getPaypalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
  const authUrl = process.env.PAYPAL_OAUTH_URL ?? "";

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    "utf-8"
  ).toString("base64");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${base64Token}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }),
  };

  try {
    const response = await fetch(authUrl, {
      ...options,
      cache: "no-store",
    }).then((r) => r.json());

    return response.access_token;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const verifyPaypalPayment = async (
  paypalTransactionId: string,
  bearerToken: string
): Promise<PaypalOrderStatusResponse | null> => {
  const verificationPaypalUrl = process.env.PAYPAL_ORDERS_URL;

  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  try {
    const response = await fetch(
      `${verificationPaypalUrl}/${paypalTransactionId}`,
      {
        ...options,
        cache: "no-store",
      }
    ).then((r) => r.json());

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};
