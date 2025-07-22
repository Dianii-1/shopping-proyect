import { getPaginatedProductsWithImages } from "@/actions";
import { ProductGrid } from "@/components";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: {
    page: string;
  };
}

export default async function ({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products } = await getPaginatedProductsWithImages({ page });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda de productos" subtitle="todos los productos" />
      <ProductGrid products={products} />
    </>
  );
}
