import { z } from "zod";

import Product from "@/models/Product";

export const checkoutSchema = z.object({
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().min(1), selectedSize: z.string().trim().min(1).optional(), message: z.string().trim().max(250).optional() })).min(1),
});

type CheckoutItem = z.infer<typeof checkoutSchema>["items"][number];

export async function priceCheckout(items: CheckoutItem[]) {
  const products = await Product.find({ _id: { $in: items.map((item) => item.productId) }, isActive: true }).lean();
  const productsById = new Map(products.map((product) => [product._id.toString(), product]));
  const quantities = new Map<string, number>();
  for (const item of items) quantities.set(item.productId, (quantities.get(item.productId) ?? 0) + item.quantity);

  const orderItems = items.map((item) => {
    const product = productsById.get(item.productId);
    if (!product) throw new Error("One or more products are no longer available.");
    if ((quantities.get(item.productId) ?? 0) > product.stock) throw new Error(`${product.name} no longer has enough stock.`);
    const size = product.sizes.find((candidate: { label: string; price: number }) => candidate.label === item.selectedSize);
    if (product.sizes.length && !size) throw new Error(`Choose a valid size for ${product.name}.`);
    if (!product.sizes.length && item.selectedSize) throw new Error(`${product.name} does not have selectable sizes.`);
    if (item.message && !product.allowMessage) throw new Error(`${product.name} does not accept a message.`);
    const unitPrice = size ? size.price : product.price;
    return { product: product._id, name: product.name, slug: product.slug, image: product.images[0] ?? "", selectedSize: item.selectedSize, message: item.message, quantity: item.quantity, unitPrice, lineTotal: unitPrice * item.quantity };
  });

  const subtotal = orderItems.reduce((total, item) => total + item.lineTotal, 0);
  const deliveryFee = 0;
  return { items: orderItems, pricing: { subtotal, deliveryFee, total: subtotal + deliveryFee } };
}
