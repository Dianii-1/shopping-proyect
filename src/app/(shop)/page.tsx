import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid } from "@/components";
import { Title } from "@/components/ui/title/Title";

export default async function () {
  const { products } = await getPaginatedProductsWithImages();
  return (
    <>
      <Title title="Tienda de productos" subtitle="todos los productos" />
      <ProductGrid products={products} />
    </>
  );
}
