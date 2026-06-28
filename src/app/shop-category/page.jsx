import { getAllProducts } from "@/lib/productData";
import Link from "next/link";

const icons = {
  "ready-to-wear": "👗",
  "bridal": "💍",
  "kids": "👶",
  "couture": "💎",
  "unstitched-fabric": "✂️",
  "accessories": "👜",
};

export default async function ShopCategoryPage() {
  let products = [];
  try { products = await getAllProducts(); } catch (e) { console.log(e); }

  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Shop by Category</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Shop by Category</h1>
        <p className="text-gray-500 text-sm mt-2">Browse our curated collections.</p>
      </div>

      {categories.length === 0 ? (
        <p className="text-center text-gray-400 py-12">No categories yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/category/${cat}`}
              className="group bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm hover:shadow-lg transition-all"
            >
              <div className="w-16 h-16 mx-auto bg-neutral-100 rounded-2xl flex items-center justify-center group-hover:bg-black transition-colors mb-4 text-2xl">
                {icons[cat] || "📦"}
              </div>
              <h2 className="text-xl font-bold capitalize">{cat.replace(/-/g, " ")}</h2>
              <p className="text-sm text-gray-500 mt-2">
                {products.filter((p) => p.category === cat).length} products
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
