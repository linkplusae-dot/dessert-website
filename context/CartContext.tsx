"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type {
  AddToCartItem,
  CartItem,
} from "@/types/cart";

type CartContextType = {
  items: CartItem[];

  isLoaded: boolean;

  cartCount: number;

  cartTotal: number;

  addItem: (
    item: AddToCartItem
  ) => void;

  removeItem: (
    cartItemId: string
  ) => void;

  updateQuantity: (
    cartItemId: string,
    quantity: number
  ) => void;

  clearCart: () => void;

  isInCart: (
    productId: string
  ) => boolean;
};

const CartContext =
  createContext<
    CartContextType | undefined
  >(undefined);

const STORAGE_KEY =
  "desserts-cart";

type CartProviderProps = {
  children: ReactNode;
};

/* Create unique cart item ID */

function createCartItemId(
  item: AddToCartItem
) {
  const size =
    item.selectedSize
      ?.trim()
      .toLowerCase() || "default";

  const message =
    item.message
      ?.trim()
      .toLowerCase() || "no-message";

  return [
    item.productId,
    size,
    message,
  ].join("__");
}

export function CartProvider({
  children,
}: CartProviderProps) {
  const [items, setItems] =
    useState<CartItem[]>([]);

  const [isLoaded, setIsLoaded] =
    useState(false);

  /* Load cart */

  useEffect(() => {
    try {
      const storedCart =
        localStorage.getItem(
          STORAGE_KEY
        );

      if (storedCart) {
        const parsed =
          JSON.parse(
            storedCart
          );

        if (
          Array.isArray(parsed)
        ) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error(
        "Failed to load cart:",
        error
      );

      localStorage.removeItem(
        STORAGE_KEY
      );
    } finally {
      setIsLoaded(true);
    }
  }, []);

  /* Save cart */

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error(
        "Failed to save cart:",
        error
      );
    }
  }, [items, isLoaded]);

  /* Add item */

  const addItem = (
    item: AddToCartItem
  ) => {
    const cartItemId =
      createCartItemId(item);

    const quantity =
      Math.max(
        1,
        item.quantity ?? 1
      );

    setItems(
      (currentItems) => {
        const existingItem =
          currentItems.find(
            (cartItem) =>
              cartItem.cartItemId ===
              cartItemId
          );

        if (existingItem) {
          return currentItems.map(
            (cartItem) => {
              if (
                cartItem.cartItemId !==
                cartItemId
              ) {
                return cartItem;
              }

              const newQuantity =
                Math.min(
                  cartItem.quantity +
                    quantity,
                  cartItem.stock
                );

              return {
                ...cartItem,
                quantity:
                  newQuantity,
              };
            }
          );
        }

        return [
          ...currentItems,
          {
            cartItemId,

            productId:
              item.productId,

            name: item.name,

            slug: item.slug,

            image: item.image,

            price: item.price,

            quantity:
              Math.min(
                quantity,
                item.stock
              ),

            stock: item.stock,

            selectedSize:
              item.selectedSize,

            message:
              item.message?.trim() ||
              undefined,
          },
        ];
      }
    );
  };

  /* Remove item */

  const removeItem = (
    cartItemId: string
  ) => {
    setItems(
      (currentItems) =>
        currentItems.filter(
          (item) =>
            item.cartItemId !==
            cartItemId
        )
    );
  };

  /* Update quantity */

  const updateQuantity = (
    cartItemId: string,
    quantity: number
  ) => {
    setItems(
      (currentItems) =>
        currentItems.map(
          (item) => {
            if (
              item.cartItemId !==
              cartItemId
            ) {
              return item;
            }

            const safeQuantity =
              Math.max(
                1,
                Math.min(
                  quantity,
                  item.stock
                )
              );

            return {
              ...item,
              quantity:
                safeQuantity,
            };
          }
        )
    );
  };

  /* Clear cart */

  const clearCart = () => {
    setItems([]);
  };

  /* Check product */

  const isInCart = (
    productId: string
  ) => {
    return items.some(
      (item) =>
        item.productId ===
        productId
    );
  };

  /* Cart count */

  const cartCount =
    useMemo(() => {
      return items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.quantity,
        0
      );
    }, [items]);

  /* Cart total */

  const cartTotal =
    useMemo(() => {
      return items.reduce(
        (
          total,
          item
        ) =>
          total +
          item.price *
            item.quantity,
        0
      );
    }, [items]);

  const value =
    useMemo(
      () => ({
        items,

        isLoaded,

        cartCount,

        cartTotal,

        addItem,

        removeItem,

        updateQuantity,

        clearCart,

        isInCart,
      }),
      [
        items,
        isLoaded,
        cartCount,
        cartTotal,
      ]
    );

  return (
    <CartContext.Provider
      value={value}
    >
      {children}
    </CartContext.Provider>
  );
}

/* Cart hook */

export function useCart() {
  const context =
    useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}