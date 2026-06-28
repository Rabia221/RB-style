import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/productData";
import Link from "next/link";

export default async function Page() {
  let products = [];
  try { products = await getAllProducts(); } catch (e) { console.log(e); }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-400 mb-6">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">Sale</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Sale</h1>
        <p className="text-gray-500 text-sm mt-2">Amazing deals on your favorites.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {products.map((p) => <ProductCard key={p._id} product={p} />)}
        {products.length === 0 && <p className="col-span-full text-center text-gray-400 py-12">No products yet.</p>}
      </div>
    </div>
  );
}
