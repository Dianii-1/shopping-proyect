import { initialData } from "./seed";
import prisma from "../lib/prisma";

// se crea esto para que al ejecutar el comando npm run seed se obtengan todos los productos
//  se le crea su propio tsconfig para que se pueda ejecutar el comando y funcione
// para crear el archivo tsconfig se realiza (cd src/seed) para entrar a esta carpeta
//  luego se ejecuta el comando npx tsc --init

async function main() {
  // 1. borrar registros previos
  Promise.all([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  console.log("seed ejecutado correctamente");
}

// se crea una funcion anonima para ejecutar el main
// esto solo debe correrse en modo desarrollo ya que si se realiza en produccion borra la base de datos
(() => {
  if (process.env.NODE_ENV === "production") return;
  main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      // 5
      await prisma.$disconnect();
      process.exit(1);
    });
})();
