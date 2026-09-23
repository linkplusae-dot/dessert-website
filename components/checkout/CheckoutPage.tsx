"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { useCart } from "@/context/CartContext";

import CheckoutHeader from "./CheckoutHeader";
import ContactInformation from "./ContactInformation";
import DeliveryAddressForm from "./DeliveryAddressForm";
import OrderSummary from "./OrderSummary";
import type { CartItem, Customer, NewAddress, SavedAddress } from "./checkout-types";

type Props = { customer: Customer; addresses: SavedAddress[] };
type Preview = { subtotal: number; deliveryFee: number; total: number };

export default function CheckoutPage({ customer, addresses }: Props) {
  const router = useRouter();
  const { items, isLoaded, selectedIds } = useCart();
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id ?? "");
  const [addressMode, setAddressMode] = useState<"saved" | "new">(addresses.length ? "saved" : "new");
  const [newAddress, setNewAddress] = useState<NewAddress>({ label: "Home", recipientName: "", phone: "", addressLine1: "", addressLine2: "", area: "", emirate: "", notes: "" });
  const [saveAddress, setSaveAddress] = useState(!addresses.length);
  const [preview, setPreview] = useState<Preview>({ subtotal: 0, deliveryFee: 0, total: 0 });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartItems = useMemo<CartItem[]>(() => {
    const selected = selectedIds.length ? items.filter((item) => selectedIds.includes(item.cartItemId)) : items;
    return selected.map((item) => ({ id: item.cartItemId, name: item.name, category: "Dessert", image: item.image, size: item.selectedSize ?? null, message: item.message ?? null, quantity: item.quantity, price: item.price }));
  }, [items, selectedIds]);

  useEffect(() => {
    if (!isLoaded || !cartItems.length) return;
    const controller = new AbortController();
    fetch("/api/checkout/preview", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: cartItems.map(toRequestItem) }), signal: controller.signal })
      .then(async (response) => { const data = await response.json(); if (!response.ok) throw new Error(data.message); setPreview(data.pricing); setError(""); })
      .catch((reason) => { if (reason.name !== "AbortError") setError(reason.message || "Unable to calculate your order."); });
    return () => controller.abort();
  }, [cartItems, isLoaded]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if ((addressMode === "saved" && !selectedAddressId) || !cartItems.length || isSubmitting) return;
    setIsSubmitting(true); setError("");
    try {
      const response = await fetch("/api/checkout/order", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(addressMode === "saved" ? { addressMode, addressId: selectedAddressId, items: cartItems.map(toRequestItem) } : { addressMode, address: newAddress, saveAddress, items: cartItems.map(toRequestItem) }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      router.push(`/payment?order=${encodeURIComponent(data.order.id)}`);
    } catch (reason) { setError(reason instanceof Error ? reason.message : "Unable to prepare your order."); }
    finally { setIsSubmitting(false); }
  };

  const hasAddress = addressMode === "saved" ? !!selectedAddressId : !!(newAddress.recipientName && newAddress.phone && newAddress.addressLine1 && newAddress.area && newAddress.emirate);
  const updateAddress = (field: keyof NewAddress, value: string) => setNewAddress((current) => ({ ...current, [field]: value }));
  return <main className="min-h-screen bg-[var(--background)] pb-[120px] lg:pb-16"><CheckoutHeader /><form onSubmit={handleSubmit} className="mx-auto grid max-w-[1280px] gap-5 px-3 py-5 sm:px-6 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-start lg:gap-8 lg:px-8 lg:py-8 xl:grid-cols-[minmax(0,1fr)_420px]"><div className="space-y-5"><ContactInformation customer={customer} /><DeliveryAddressForm addresses={addresses} mode={addressMode} selectedAddressId={selectedAddressId} address={newAddress} saveAddress={saveAddress} onUseNew={() => setAddressMode("new")} onSelect={(id) => { setSelectedAddressId(id); setAddressMode("saved"); }} onChange={updateAddress} onSaveAddressChange={setSaveAddress} />{error && <p role="alert" className="text-center text-[10px] text-red-600">{error}</p>}<div className="lg:hidden"><OrderSummary subtotal={preview.subtotal} deliveryFee={preview.deliveryFee} total={preview.total} hasEmirate={hasAddress} items={cartItems} isSubmitting={isSubmitting} /></div><Link href="/cart" className="flex justify-center py-2 text-[10px] font-semibold text-[var(--primary)] underline underline-offset-4 sm:hidden">Back to Cart</Link></div><aside className="hidden lg:sticky lg:top-6 lg:block"><OrderSummary subtotal={preview.subtotal} deliveryFee={preview.deliveryFee} total={preview.total} hasEmirate={hasAddress} items={cartItems} isSubmitting={isSubmitting} /></aside></form></main>;
}

function toRequestItem(item: CartItem) {
  return { cartItemId: item.id, productId: item.id.split("__")[0], quantity: item.quantity, selectedSize: item.size ?? undefined, message: item.message ?? undefined };
}
