"use server";

import prisma from "@/lib/prisma";

export const setTransactionId = async (
  orderId: string,
  transactionId: string
) => {
  try {
    const updateOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        transactionId: transactionId,
      },
    });

    if (!updateOrder) {
      return {
        ok: false,
        message: `No se encontro la orden ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    return {
      ok: false,
      message: "Ocurrio un error al intentar crear la transacción",
    };
  }
};
