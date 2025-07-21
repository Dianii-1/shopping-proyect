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

  //2. crear las categorias

  const { categories, products } = initialData;

  const categoritesDataSend = categories.map((name) => ({ name }));

  // esto se realiza para poder hacer la relacion entre categorias y productos para saber el id de la categoria
  await prisma.category.createMany({ data: categoritesDataSend });

  const categoriesDB = await prisma.category.findMany();

  const categoriesMap = categoriesDB.reduce((map, category) => {
    map[category.name.toLowerCase()] = category.id;

    return map;
  }, {} as Record<string, string>); // <string= categoryName, string= categoriId>

  //3. se crean los productos, se saca el type y las images por que estas no hacen parte de la base de datos,
  // pero se le agrega categoryId

  products.forEach(async (product) => {
    const { type, images, ...restProduct } = product;

    const dbProduct = await prisma.product.create({
      data: {
        ...restProduct,
        categoryId: categoriesMap[type],
      },
    });
  });

  // 4. se crea las images con la relacion
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
