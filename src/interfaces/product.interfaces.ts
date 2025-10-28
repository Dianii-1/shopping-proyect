export interface Product {
  id: string;
  description: string;
  images: string[];
  inStock: number;
  price: number;
  sizes: Size[];
  slug: string;
  tags: string[];
  title: string;
  // todo type: Type;
  gender: Category;
}

export interface CartProduct {
  id: string;
  image: string;
  price: number;
  size: Size;
  slug: string;
  title: string;
  quantity: number;
}

type Category = "men" | "women" | "kid" | "unisex";
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL" | "XXXL";
export type Type = "shirts" | "pants" | "hoodies" | "hats";
