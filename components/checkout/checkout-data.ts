import type {
  CartItem,
  Customer,
} from "./checkout-types";

export const emirates = [
  "Abu Dhabi",
  "Dubai",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export const customer: Customer = {
  fullName: "Ahmed Daniyal",
  email: "ahmed@example.com",
  phone: "+971 50 000 0000",
};

export const cartItems: CartItem[] = [
  {
    id: 1,
    name: "Chocolate Dream Cake",
    category: "Cakes",
    image:
      "/images/products/chocolate-cake.webp",
    size: "Medium",
    message: "Happy Birthday!",
    quantity: 1,
    price: 120,
  },
  {
    id: 3,
    name: "Chocolate Brownies",
    category: "Brownies",
    image:
      "/images/products/brownies.webp",
    size: null,
    message: null,
    quantity: 2,
    price: 55,
  },
];