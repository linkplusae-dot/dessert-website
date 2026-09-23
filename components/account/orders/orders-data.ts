export type OrderStatus =
  | "Awaiting Payment"
  | "Confirmed"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

export type OrderItem = {
  id: string;
  name: string;
  image: string;
  quantity: number;
};

export type CustomerOrder = {
  id: string;
  orderNumber: string;
  createdAt: string;
  status: OrderStatus;
  total: number;
  items: OrderItem[];
};
