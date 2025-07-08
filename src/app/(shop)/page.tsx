import { ProductGrid } from "@/components";
import { Title } from "@/components/ui/title/Title";
import { initialData } from "@/seed/seed";

export default function () {
  const products = initialData.products
  return (
    <>
      <Title title="Tienda de productos" subtitle="todos los productos"/>
      <ProductGrid products={products}/>
    </>
  );
}
