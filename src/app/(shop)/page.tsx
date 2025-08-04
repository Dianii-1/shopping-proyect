export const revalidate = 60; // 60 segundos va a realizar la revalidacion de resto se mantiene en cache
export const dynamic = "force-dynamic";

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid } from "@/components";
import { Title } from "@/components/ui/title/Title";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page: string;
  }>;
}

export default async function ({ searchParams }: Props) {
  const { page: pageParams } = await searchParams;
  const page = pageParams ? parseInt(pageParams) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  });

  if (products.length === 0) {
    redirect("/");
  }

  return (
    <>
      <Title title="Tienda de productos" subtitle="todos los productos" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </>
  );
}
