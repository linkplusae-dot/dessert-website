"use client";

import { useEffect, useState } from "react";

import Header from "@/components/layout/Header";
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import BestSellers from "@/components/home/BestSellers";
import MobileBottomNav from "@/components/layout/MobileBottomNav";
import Moments from "@/components/home/Moments";
import OrderCTA from "@/components/home/OrderCTA";
import Footer from "@/components/layout/Footer";
import Products from "@/components/home/Products";
import type { Category } from "@/types/category";
import type { Product } from "@/types/product";

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    Promise.all([fetch("/api/categories"), fetch("/api/products")])
      .then(async ([categoryResponse, productResponse]) => {
        const [categoryData, productData] = await Promise.all([categoryResponse.json(), productResponse.json()]);
        if (categoryResponse.ok) setCategories(categoryData.categories);
        if (productResponse.ok) setProducts(productData.products);
      })
      .catch(() => {});
  }, []);

  return <><Header /><main className="w-full pb-[80px] lg:pb-0"><Hero /><Categories categories={categories} /><BestSellers products={products.filter((product) => product.featured)} /><Products products={products} /><Moments /><OrderCTA /><Footer /></main><MobileBottomNav /></>;
}
