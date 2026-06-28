"use client";

import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

export default function ProductCard({ product }) {
  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
      <Link href={`/product/${product._id}`} className="block relative aspect-[3/4] overflow-hidden bg-neutral-100">
        <img
          loading="lazy"
          decoding="async"
          src={product.image || "/placeholder.jpg"}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
        />


        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition duration-300" />

        {/* Quick add button */}
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          <span className="flex items-center justify-center gap-2 w-full bg-white/90 backdrop-blur-sm text-black py-2.5 rounded-lg text-xs font-semibold hover:bg-white transition shadow-lg">
            <FaShoppingBag className="text-xs" /> Quick Add
          </span>
        </div>
      </Link>

      <div className="p-3 md:p-4">
        <h3 className="text-sm font-semibold truncate">{product.title}</h3>
        <p className="text-xs text-gray-400 mt-0.5 capitalize">{product.category || "Fashion"}</p>
        <div className="flex items-center justify-between mt-2">
          <span className="text-sm font-bold">Rs {product.price}</span>
          <span className="text-[10px] text-gray-400 hover:text-black transition cursor-pointer">
            View Details
          </span>
        </div>
      </div>
    </div>
  );
}
