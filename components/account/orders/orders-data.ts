export type OrderStatus =
  | "Confirmed"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type OrderItem = {
  id: number;
  name: string;
  image: string;
  quantity: number;
};

export type CustomerOrder = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  itemCount: number;
  items: OrderItem[];
};

export const orders: CustomerOrder[] = [
  {
    id: "DS24092201",
    date: "22 Sep 2026",
    status: "Confirmed",
    total: 250,
    itemCount: 3,
    items: [
      {
        id: 1,
        name: "Chocolate Dream Cake",
        image:
          "/images/products/chocolate-cake.webp",
        quantity: 1,
      },
      {
        id: 3,
        name: "Chocolate Brownies",
        image:
          "/images/products/brownies.webp",
        quantity: 2,
      },
    ],
  },
  {
    id: "DS18092202",
    date: "18 Sep 2026",
    status: "Delivered",
    total: 110,
    itemCount: 1,
    items: [
      {
        id: 5,
        name: "Lotus Cheesecake",
        image:
          "/images/products/lotus-cheesecake.webp",
        quantity: 1,
      },
    ],
  },
];