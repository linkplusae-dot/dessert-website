export type CartItem = {
  id: string;
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

export type SavedAddress = {
  id: string;
  label: string;
  recipientName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  area: string;
  emirate: string;
  notes?: string;
  isDefault: boolean;
};

export type NewAddress = Omit<SavedAddress, "id" | "isDefault" | "addressLine2" | "notes"> & { addressLine2: string; notes: string };
