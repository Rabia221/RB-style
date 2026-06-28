"use client";

import Link from "next/link";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaHeart } from "react-icons/fa";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="w-full bg-neutral-900 text-white mt-16">
      {/* Newsletter */}
      <div className="border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-10 md:py-14 text-center">
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
            Join the RB Family
          </h3>
          <p className="text-neutral-400 mt-2 text-sm max-w-md mx-auto">
            Subscribe for exclusive access to new drops, sales & style inspiration.
          </p>
          <form onSubmit={handleSubscribe} className="mt-6 max-w-md mx-auto flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full sm:flex-1 px-4 py-3 rounded-lg bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 outline-none focus:ring-2 focus:ring-white/20 text-sm"
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-white text-black rounded-lg font-semibold text-sm hover:bg-neutral-200 transition whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
          {subscribed && (
            <p className="text-green-400 text-sm mt-3 animate-fadeIn">
              Thanks for subscribing! 🎉
            </p>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <h4 className="text-lg font-bold tracking-widest">RB STORE</h4>
          <p className="text-sm text-neutral-400 mt-3 leading-relaxed">
            Premium fashion destination. Curated collections for those who dare to stand out.
          </p>
          <div className="flex gap-3 mt-5">
            {[FaFacebook, FaInstagram, FaTwitter, FaYoutube].map((Icon, i) => (
              <span key={i} className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center hover:bg-white hover:text-black transition cursor-pointer">
                <Icon />
              </span>
            ))}
          </div>
        </div>

        <div>
          <h5 className="font-semibold text-sm tracking-wide mb-4">Quick Links</h5>
          <ul className="space-y-2.5 text-sm text-neutral-400">
            {[{ name: "Home", path: "/" }, { name: "Shop All", path: "/shop" }, { name: "New Arrivals", path: "/new-arrivals" }, { name: "Sale", path: "/sale" }, { name: "Cart", path: "/cart" }].map((link) => (
              <li key={link.name}>
                <Link href={link.path} className="hover:text-white transition">{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-sm tracking-wide mb-4">Categories</h5>
          <ul className="space-y-2.5 text-sm text-neutral-400">
            {["Ready to Wear", "Unstitched Fabric", "Bridal", "Couture", "Kids", "Accessories"].map((cat) => (
              <li key={cat}>
                <Link href={`/${cat.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-white transition">{cat}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="font-semibold text-sm tracking-wide mb-4">Support</h5>
          <ul className="space-y-2.5 text-sm text-neutral-400">
            <li><span className="hover:text-white transition cursor-pointer">Contact Us</span></li>
            <li><span className="hover:text-white transition cursor-pointer">Shipping Info</span></li>
            <li><span className="hover:text-white transition cursor-pointer">Returns & Exchanges</span></li>
            <li><span className="hover:text-white transition cursor-pointer">Size Guide</span></li>
            <li><span className="hover:text-white transition cursor-pointer">FAQs</span></li>
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 py-5 flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-neutral-500">
          <p>&copy; {new Date().getFullYear()} RB STORE. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <FaHeart className="text-red-500" /> for fashion lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
