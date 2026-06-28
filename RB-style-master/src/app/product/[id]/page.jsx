"use client";

import { useEffect, useState, use } from "react";
import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FaShoppingBag, FaCheck } from "react-icons/fa";

export default function ProductDetail({ params }) {
  const { id } = use(params);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    if (!id) return;
    fetch(`/api/products/${id}`)
      .then((res) => res.json())
      .then((p) => { setProduct(p); const sizes = p.sizes?.length > 0 ? p.sizes : ["XS", "S", "M", "L", "XL"]; setSelectedSize(sizes[0]); });
  }, [id]);

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-xs text-gray-400 mb-8">
        <Link href="/" className="hover:text-black transition">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/shop" className="hover:text-black transition">Shop</Link>
        <span className="mx-2">/</span>
        <span className="text-black font-medium">{product.title}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Image */}
        <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100">
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition duration-700"
          />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-xs uppercase tracking-widest text-gray-400 mb-2">{product.category || "Fashion"}</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.title}</h1>

          <p className="text-2xl font-bold mt-4">Rs {product.price}</p>

          {product.description && (
            <p className="text-gray-600 mt-6 leading-relaxed text-sm">{product.description}</p>
          )}

          {/* Sizes */}
          <div className="mt-8">
            <p className="text-sm font-semibold mb-3">
              Size <span className="text-gray-400 font-normal">— {selectedSize || "Select"}</span>
            </p>
            <div className="flex gap-2 flex-wrap">
              {(product.sizes?.length > 0 ? product.sizes : ["XS", "S", "M", "L", "XL"]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSelectedSize(s)}
                  className={`w-12 h-12 rounded-lg border text-sm font-medium transition ${
                    selectedSize === s
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-black hover:bg-gray-50"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-6">
            <p className="text-sm font-semibold mb-3">Quantity</p>
            <div className="flex items-center border border-gray-200 rounded-lg w-fit">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-50 transition text-lg"
              >
                −
              </button>
              <span className="px-6 py-2 font-medium text-sm min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 hover:bg-gray-50 transition text-lg"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={!selectedSize}
            className={`mt-8 w-full py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition ${
              added
                ? "bg-green-600 text-white"
                : "bg-black text-white hover:bg-neutral-800 disabled:bg-gray-300 disabled:cursor-not-allowed"
            }`}
          >
            {added ? (
              <><FaCheck /> Added to Cart</>
            ) : (
              <><FaShoppingBag /> {selectedSize ? "Add to Cart" : "Select a Size"}</>
            )}
          </button>

          {/* Trust */}
          <div className="mt-8 pt-6 border-t border-gray-100 grid grid-cols-3 gap-4 text-center text-xs text-gray-500">
            <div>
              <p className="font-semibold text-black">Free Shipping</p>
              <p>On orders over Rs 5,000</p>
            </div>
            <div>
              <p className="font-semibold text-black">Easy Returns</p>
              <p>30-day return policy</p>
            </div>
            <div>
              <p className="font-semibold text-black">Secure Checkout</p>
              <p>SSL encrypted</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
