import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/productData";
import Link from "next/link";

export default async function Page() {

  let products = [];

  try {
    const allProducts = await getAllProducts();

    // bridal products filter
    products = allProducts.filter(
      (p) => p.category?.toLowerCase() === "bridal"
    );

  } catch (error) {
    console.log("Error fetching bridal products:", error);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-black transition">
          Home
        </Link>

        <span className="mx-2">/</span>

        <span className="font-semibold text-black">
          Bridal Collection
        </span>
      </nav>

      {/* Heading */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">
          Bridal Collection
        </h1>

        <p className="text-gray-500 mt-2">
          Make your special day unforgettable ✨
        </p>
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
            />
          ))}

        </div>

      ) : (

        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-400">
            No Bridal Products Found
          </h2>
        </div>

      )}
    </div>
  );
}