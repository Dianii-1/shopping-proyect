export const revalidate = 604800; // revalidacion cada 7 dias
import { getProductBySlug } from "@/actions";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  QuantitySelector,
  SizeSelector,
} from "@/components";
import { titleFont } from "@/config/fonts";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ({ params }: Props) {
  const { slug } = await params;

  const product = await getProductBySlug(slug);
  console.log(product);
  if (!product) {
    notFound();
  }
  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      {/*slideShow */}
      <div className="col-span-1 md:col-span-2 ">
        {/*Desktop slideShow */}
        <ProductSlideshow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />

        {/*Mobile slideShow */}
        <ProductMobileSlideshow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
      </div>

      {/* Detalles */}

      <div className="col-span-1 px-5 ">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">{product.price}</p>

        {/* selector de tallas */}

        <SizeSelector
          avaliableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />
        {/* selector de cantidad */}

        <QuantitySelector quantity={2} />

        {/* boton */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Descripcion */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
}
