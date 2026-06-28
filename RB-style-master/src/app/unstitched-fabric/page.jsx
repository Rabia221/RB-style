import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/productData";
import Link from "next/link";

export default async function Page() {

  let products = [];

  try {
    products = await getAllProducts();
  } catch (e) {
    console.log(e);
  }

  // Unstitched Fabric Products
  const unstitchedProducts = products.filter(
    (p) => p.category?.toLowerCase() === "unstitched fabric"
  );

  // Other Products
  const otherProducts = products.filter(
    (p) => p.category?.toLowerCase() !== "unstitched fabric"
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">

      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-6">

        <Link
          href="/"
          className="hover:text-black transition"
        >
          Home
        </Link>

        <span className="mx-2">/</span>

        <span className="text-black font-medium">
          Unstitched Fabric
        </span>

      </nav>

      {/* Heading */}
      <div className="mb-10">

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Unstitched Fabric
        </h1>

        <p className="text-gray-500 text-sm mt-2">
          Create your perfect ensemble.
        </p>

      </div>

      {/* UNSTITCHED FABRIC */}
      <div className="mb-14">

        <h2 className="text-2xl font-bold mb-6">
          Unstitched Fabric Collection
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {unstitchedProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
            />
          ))}

        </div>

      </div>

      {/* OTHER PRODUCTS */}
      <div>

        <h2 className="text-2xl font-bold mb-6">
          More Collections
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">

          {otherProducts.map((p) => (
            <ProductCard
              key={p._id}
              product={p}
            />
          ))}

        </div>

      </div>

    </div>
  );
}