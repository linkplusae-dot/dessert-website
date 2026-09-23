export type ProductCategory = {
  _id: string;
  name: string;
  slug: string;
  image: string;
};

export type ProductSize = {
  label: string;
  price: number;
};

export type Product = {
  _id: string;
  name: string;
  slug: string;

  category: ProductCategory;

  description: string;

  price: number;

  images: string[];

  sizes: ProductSize[];

  allowMessage: boolean;

  details: string[];

  storage: string;

  stock: number;

  featured: boolean;

  isActive: boolean;

  createdAt: string;
  updatedAt: string;
};