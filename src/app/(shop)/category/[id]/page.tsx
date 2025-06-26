import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

interface Props {
  params: {
    id: Category;
  };
}

export default function ({ params }: Props) {
  const { id } = params;

  const labels: Record<Category,string> = {
    'men': 'Hombres',
    'women':'Mujeres',
    'kid':'Niños',
    'unisex':'Todos'
  }

  const productsByCategory = initialData.products.filter(
    (item) => item.gender === id
  );

  // if(id === 'kids'){
  //   notFound();
  // }

  return (
    <div>
      <Title title={`Productos para ${labels[id]}`} subtitle={`Productos para ${labels[id]}`} />
      <ProductGrid products={productsByCategory} />
    </div>
  );
}
