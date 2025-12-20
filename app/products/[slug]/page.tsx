"use client";

import React, { useEffect, useState } from "react";
import Breadcrump from "@/components/layouts/Breadcrump";
import ProductDetails from "@/components/pages/products/ProductDetails";
import { useParams } from "next/navigation";
import { Product } from "@/types/types";
import { getAllProducts } from "@/api/Api";
import { resolveProduct } from "@/lib/resolvers/productResolver";
import { useLanguage } from "@/components/providers/LanguageProvider";

const page = () => {
  const { slug } = useParams();
  const { language: lang } = useLanguage();
  const [products, setProducts] = useState<Product[]>([]);
  console.log(slug);

  useEffect(() => {
    async function fetchData() {
      try {
        // 🔹 Products & Categories
        const [productsRes] = await Promise.all([getAllProducts()]);

        // Resolve products
        const resolvedProducts = productsRes.data.map((product) =>
          resolveProduct(product, lang)
        );
        setProducts(resolvedProducts);
      } catch (err) {
        console.error(err);
      }
    }

    fetchData();
  }, [lang]);

  const normalizedSlug = Array.isArray(slug) ? slug[0] : slug;

  const product = products.find((p) => p.slug === normalizedSlug);
  const relatedProducts = products
    .filter((p) => p.slug !== normalizedSlug)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">
          {lang === "en" ? "Product not found" : "ምርት አልተገኘም"}
        </p>
      </div>
    );
  }

  return (
    <>
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title={product.name}
        subtitle="Premium quality gutter solutions for your home"
      />
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </>
  );
};

export default page;
