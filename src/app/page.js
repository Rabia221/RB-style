import Slider from "@/components/Slider";
import Banner from "@/components/Banner";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/productData";
import Link from "next/link";

const FeatureIcon = ({ type }) => {
  if (type === "truck") return <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>;
  if (type === "shield") return <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
  if (type === "undo") return <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>;
  if (type === "headset") return <svg className="w-6 h-6 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.242 0L8.464 15.536m0 0l-2.829-2.829m2.829 2.829L3 21m0 0l2.829-2.829M3 21h18" /></svg>;
  return null;
};

export default async function Home({ searchParams }) {
  const resolvedSearchParams = (await searchParams) || {};
  const orderStatus = Array.isArray(resolvedSearchParams.order)
    ? resolvedSearchParams.order[0]
    : resolvedSearchParams.order;

  let products = [];

  try {
    products = await getAllProducts();
  } catch (error) {
    console.log("API Error:", error);
  }

  const featured = products.slice(0, 8);
  const galleryImages = [
    "/images/bridal-2.jpg",
    "/images/bridal-3.jpg",
    "/images/bridal-4.jpg",
    "/images/bridal-5.jpg",
  ];

  return (
    <div>
      {orderStatus === "success" && (
        <div className="max-w-7xl mx-auto px-4 pt-6">
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800">
            Order confirm ho gaya. Shukriya, aap ka order successfully place ho chuka hai.
          </div>
        </div>
      )}
      <Slider />
      <Banner />

      {/* Features Bar */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-2 md:grid-cols-4 gap-4 border-b border-gray-100">
        {[
          { type: "truck", label: "Free Shipping", desc: "On orders over Rs 5,000" },
          { type: "shield", label: "Secure Payment", desc: "100% secure checkout" },
          { type: "undo", label: "Easy Returns", desc: "30-day return policy" },
          { type: "headset", label: "24/7 Support", desc: "Dedicated customer care" },
        ].map(({ type, label, desc }) => (
          <div key={label} className="flex items-center gap-3 text-sm">
            <FeatureIcon type={type} />
            <div>
              <p className="font-semibold">{label}</p>
              <p className="text-xs text-gray-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Featured Products</h2>
            <p className="text-gray-500 text-sm mt-1">Handpicked just for you</p>
          </div>
          <Link href="/shop" className="hidden md:inline-block text-sm font-semibold underline underline-offset-4 hover:text-neutral-600 transition">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {featured.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
          {featured.length === 0 && (
            <p className="col-span-full text-center text-gray-400 py-12">No products yet.</p>
          )}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/shop" className="inline-block bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition">
            View All Products
          </Link>
        </div>
      </section>

      {/* Scrolling Marquee */}
      <div className="border-y border-gray-200 py-4 overflow-hidden bg-neutral-50">
        <div className="animate-marquee text-sm font-medium tracking-wider text-neutral-600">
          <span className="mx-8">NEW COLLECTION</span>
          <span className="mx-8">•</span>
          <span className="mx-8">PREMIUM FABRIC</span>
          <span className="mx-8">•</span>
          <span className="mx-8">LUXURY DESIGN</span>
          <span className="mx-8">•</span>
          <span className="mx-8">TREND 2026</span>
          <span className="mx-8">•</span>
          <span className="mx-8">FREE SHIPPING</span>
          <span className="mx-8">•</span>
          <span className="mx-8">NEW COLLECTION</span>
          <span className="mx-8">•</span>
          <span className="mx-8">PREMIUM FABRIC</span>
          <span className="mx-8">•</span>
          <span className="mx-8">LUXURY DESIGN</span>
          <span className="mx-8">•</span>
          <span className="mx-8">TREND 2026</span>
          <span className="mx-8">•</span>
          <span className="mx-8">FREE SHIPPING</span>
          <span className="mx-8">•</span>
        </div>
      </div>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">Follow Your Style</h2>
        <p className="text-gray-500 mt-3 max-w-md mx-auto text-sm">
          Tag <span className="font-semibold text-black">@rbstore</span> on Instagram for a chance to be featured.
        </p>
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
          {galleryImages.map((imageSrc, index) => (
            <div key={imageSrc} className="aspect-square rounded-xl overflow-hidden bg-neutral-100">
              <img
                src={imageSrc}
                alt={`Style gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition duration-700"
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
