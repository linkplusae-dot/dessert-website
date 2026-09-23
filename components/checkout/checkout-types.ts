export type AddressForm = {
  emirate: string;
  area: string;
  street: string;
  building: string;
  apartment: string;
  landmark: string;
  instructions: string;
};

export type CartItem = {
  id: number;
  name: string;
  category: string;
  image: string;
  size: string | null;
  message: string | null;
  quantity: number;
  price: number;
};

export type Customer = {
  fullName: string;
  email: string;
  phone: string;
};