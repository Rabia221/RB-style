import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/productData";
import Link from "next/link";

export default async function ShopPage() {
  let products = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.log("Shop API Error:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Shop All</span>
      </nav>

      {/* Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shop All</h1>
          <p className="text-gray-500 text-sm mt-1">{products.length} products</p>
        </div>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-400">No products found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((p) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
