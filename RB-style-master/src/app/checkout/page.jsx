"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaLock, FaArrowLeft, FaShoppingBag, FaCreditCard } from "react-icons/fa";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = stripePublicKey ? loadStripe(stripePublicKey) : null;

function CheckoutForm() {
  const router = useRouter();
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ userName: "", email: "", address: "", phone: "" });
  const [submitting, setSubmitting] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod"); // 'stripe' or 'cod'
  const [error, setError] = useState(null);
  const [processingPayment, setProcessingPayment] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * (item.quantity || 1), 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validate form
    if (!form.userName || !form.email || !form.address || !form.phone) {
      setError("Please fill in all fields");
      return;
    }

    if (paymentMethod === "stripe") {
      if (!stripe || !elements) {
        setError("Stripe is not initialized");
        return;
      }

      setProcessingPayment(true);
      try {
        // Create payment intent
        const res = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ total }),
        });

        if (!res.ok) {
          throw new Error("Failed to create payment intent");
        }

        const { clientSecret } = await res.json();
        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
          throw new Error("Card details are missing");
        }

        // Confirm payment
        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: form.userName,
                email: form.email,
                address: {
                  line1: form.address,
                },
              },
            },
          }
        );

        if (stripeError) {
          throw stripeError;
        }

        if (paymentIntent.status === "succeeded") {
          // Payment successful, create order
          await createOrder();
        } else {
          throw new Error("Payment not completed");
        }
      } catch (err) {
        setError(err.message || "Payment failed");
        setProcessingPayment(false);
      }
    } else {
      // COD - directly create order
      await createOrder();
    }
  };

  const createOrder = async () => {
    try {
      setSubmitting(true);
      const payload = {
        ...form,
        products: cart.map((item) => ({
          product: item._id,
          title: item.title,
          price: item.price,
        })),
        totalPrice: total,
        paymentMethod: paymentMethod,
        paymentStatus: paymentMethod === "stripe" ? "paid" : "pending",
      };

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        clearCart();
        router.push("/?order=success");
      } else {
        throw new Error("Failed to create order");
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
      setProcessingPayment(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <FaShoppingBag className="text-5xl text-gray-300" />
        <h1 className="text-2xl font-bold">Your Cart is Empty</h1>
        <p className="text-gray-500 text-sm">Add items to your cart before checking out.</p>
        <Link href="/shop" className="mt-2 bg-black text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-neutral-800 transition">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-lg transition">
          <FaArrowLeft className="text-sm" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Billing Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-5">Shipping Information</h2>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Full Name</label>
                <input
                  name="userName"
                  placeholder="John Doe"
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
                  value={form.userName}
                  onChange={(e) => setForm({ ...form, userName: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Email</label>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Shipping Address</label>
                <input
                  name="address"
                  placeholder="123 Main Street, City"
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="text-xs font-medium text-gray-500 mb-1.5 block">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+92 300 1234567"
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black text-sm"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </div>
            </div>
          </div>

          {/* Payment Method Selection */}
          <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
            <h2 className="font-bold text-lg mb-5">Payment Method</h2>
            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-black focus:ring-black"
                />
                <span>Cash on Delivery</span>
                {paymentMethod === "cod" && (
                  <span className="ml-auto text-xs text-gray-500">Pay when you receive your order</span>
                )}
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="h-4 w-4 text-black focus:ring-black"
                />
                <span>
                  <FaCreditCard className="mr-2" /> Card Payment (Stripe)
                </span>
                {paymentMethod === "stripe" && (
                  <span className="ml-auto text-xs text-gray-500">
                    Secure online payment with credit/debit card
                  </span>
                )}
              </label>
            </div>
          </div>

          {/* Stripe Card Element */}
          {paymentMethod === "stripe" && (
            <div className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm">
              <h2 className="font-bold text-lg mb-5">Card Details</h2>
              <div className="space-y-4">
                <CardElement
                  className="w-full border border-gray-200 px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-black"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#4a4a4a",
                        "::placeholder": {
                          color: "#a0aec0",
                        },
                      },
                      invalid: {
                        color: "#e53e3e",
                        "::placeholder": {
                          color: "#ffcdcd",
                        },
                      },
                    },
                  }}
                />
                {error && (
                  <p className="text-sm text-red-600">{error}</p>
                )}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || processingPayment}
            className="w-full bg-black text-white py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting || processingPayment ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {processingPayment ? "Processing Payment..." : "Placing Order..."}
              </>
            ) : (
              <><FaLock /> Place Order — Rs {total.toLocaleString()}</>
            )}
          </button>

          <p className="text-center text-xs text-gray-400 flex items-center justify-center gap-1">
            <FaLock /> Your payment info is secure and encrypted
          </p>
        </form>

        {/* Order Summary */}
        <div className="lg:col-span-2">
          <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
            <h3 className="font-bold text-lg mb-4">Order Summary</h3>

            <div className="space-y-3 max-h-64 overflow-y-auto">
              {cart.map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 shrink-0">
                    <img src={item.image || "/placeholder.jpg"} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-500">Qty: {item.quantity || 1}</p>
                  </div>
                  <p className="text-sm font-medium">Rs {item.price}</p>
                </div>
              ))}
            </div>

            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Subtotal</span>
                <span>Rs {total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Shipping</span>
                <span className="text-green-600 font-medium">Free</span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>Rs {total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
}
