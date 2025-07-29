export const revalidate = 60; // 60 segundos va a realizar la revalidacion de resto se mantiene en cache

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductGrid, Title } from "@/components";
import { Gender } from "@/generated/prisma";
import { redirect } from "next/navigation";

interface Props {
  params: {
    gender: string;
  };
  searchParams: {
    page: string;
  };
}

export default async function ({ params, searchParams }: Props) {
  const { gender } = params;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
    gender: gender as Gender,
  });

  if (products.length === 0) {
    redirect("/");
  }
  const labels: Record<string, string> = {
    men: "Hombres",
    women: "Mujeres",
    kid: "Niños",
    unisex: "Todos",
  };

  // if(id === 'kids'){
  //   notFound();
  // }

  return (
    <div>
      <Title
        title={`Productos para ${labels[gender]}`}
        subtitle={`Productos para ${labels[gender]}`}
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  );
}
