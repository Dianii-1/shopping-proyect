"use server";

import { auth } from "@/auth";
import { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}
export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  // Verificar sesión de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay sesión de usuario",
    };
  }

  // Obtener la información de los productos
  // Recordar que se pueden llevar 2 o mas productos con el mismo Id

  // Aca se buscan todos los productos en la tabla de base de datos cuyo id exista en los productIds que estoy comprando

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // calcular montos // encabezado
  // el reduce ayuda a devolver un valor realizando el calculo, primero se inicia en 0 y se toma el count que en el primer momento es 0
  // luego se toma el producto(p) y se realiza la suma

  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // calcular los totales de tax, subtotal t total
  const { subtotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((prod) => prod.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subtotal = product.price * productQuantity;

      totals.subtotal += subtotal;
      totals.tax += subtotal * 0.15;
      totals.total += subtotal * 1.15;

      return totals;
    },
    { subtotal: 0, tax: 0, total: 0 }
  );

  // Crear la transacción de base de datos

  const prismaTx = await prisma.$transaction(async (tsx) => {
    // 1. Actualizar el stock de los productos
    // 2. Crear la orden - Encabezado -detalles
    // 3. Crear la dirección de la orden
  });
};
