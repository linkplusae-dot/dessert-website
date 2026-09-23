export type CartItem = {
  cartItemId: string;

  productId: string;

  name: string;

  slug: string;

  image: string;

  price: number;

  quantity: number;

  stock: number;

  selectedSize?: string;

  message?: string;
};

export type AddToCartItem = {
  productId: string;

  name: string;

  slug: string;

  image: string;

  price: number;

  quantity?: number;

  stock: number;

  selectedSize?: string;

  message?: string;
};