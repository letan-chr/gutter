import { getAllProducts } from "@/api/Api";
import Breadcrump from "@/components/layouts/Breadcrump";
import ProductDetails from "@/components/pages/products/ProductDetails";
import { Product } from "@/types/types";

/**
 * Pre-generate product slugs
 */
export async function generateStaticParams() {
  const res = await getAllProducts();

  return res.data.map((product: Product) => ({
    slug: product.slug,
  }));
}

/**
 * SERVER PAGE
 */
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const normalizedSlug = slug;

  // 🔹 Fetch ALL products (same as your client code)
  const productsRes = await getAllProducts();
  const products = productsRes.data;

  // 🔹 Filter by slug (same logic)
  const product = products.find((p: Product) => p.slug === normalizedSlug);
  const relatedProducts = products
    .filter((p: Product) => p.slug !== normalizedSlug)
    .slice(0, 4);

  if (!product) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500 dark:text-gray-400">Product not found</p>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb can be static or resolved later */}
      <Breadcrump
        backgroundImage="/assets/images/breadcrump.jpg"
        title={product.name}
        subtitle="Premium quality gutter solutions for your home"
      />

      {/* ⬇️ Pass RAW DATA */}
      <ProductDetails
        unResolvedProduct={product}
        unResolvedRelatedProducts={relatedProducts}
      />
    </>
  );
}
