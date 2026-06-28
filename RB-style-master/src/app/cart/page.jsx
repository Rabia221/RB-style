"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";
import { FaTrash, FaArrowLeft, FaShoppingBag } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCart();

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <FaShoppingBag className="text-5xl text-gray-300" />
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm">Looks like you haven&apos;t added anything yet.</p>
        <Link href="/shop" className="mt-2 bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Shopping Cart</h1>
        <span className="text-sm text-gray-500">{cart.length} {cart.length === 1 ? "item" : "items"}</span>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, index) => (
            <div key={item._id || index} className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm hover:shadow-md transition">
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden bg-neutral-100 shrink-0">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm md:text-base truncate">{item.title}</h3>
                <p className="text-xs text-gray-400 mt-0.5 capitalize">{item.category}</p>
                <p className="font-bold mt-2">Rs {item.price}</p>
                {item.quantity > 1 && (
                  <p className="text-xs text-gray-500 mt-1">Qty: {item.quantity}</p>
                )}
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                className="self-start p-2 hover:bg-red-50 rounded-lg transition text-gray-400 hover:text-red-500"
                aria-label="Remove item"
              >
                <FaTrash className="text-sm" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 rounded-xl p-6 h-fit sticky top-24">
          <h3 className="font-bold text-lg mb-4">Order Summary</h3>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-medium">Rs {total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Shipping</span>
              <span className="text-green-600 font-medium">Free</span>
            </div>
            <div className="border-t pt-3 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>Rs {total}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 w-full bg-black text-white py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition"
          >
            Proceed to Checkout
          </Link>

          <Link href="/shop" className="mt-3 w-full flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-black transition py-2">
            <FaArrowLeft className="text-xs" /> Continue Shopping
          </Link>

          <button
            onClick={clearCart}
            className="mt-2 w-full text-xs text-red-400 hover:text-red-600 transition py-1"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}
