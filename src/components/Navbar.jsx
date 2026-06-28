"use client";

import { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaSearch,
  FaShoppingBag,
  FaChevronDown,
} from "react-icons/fa";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

const navItems = [
  { name: "Home", path: "/" },

  {
    name: "Shop",
    path: "/shop",
    dropdown: [
      { name: "New Arrivals", path: "/new-arrivals" },
      { name: "Ready to Wear", path: "/ready-to-wear" },
      { name: "Unstitched Fabric", path: "/unstitched-fabric" },
      { name: "SS Wesst", path: "/ss-wesst" },
      { name: "Sale", path: "/sale" },
    ],
  },

  { name: "Bridal", path: "/bridal" },
  { name: "Couture", path: "/couture" },
  { name: "Accessories", path: "/accessories" },
  { name: "Eid Edit '26", path: "/eid-edit" },
];

export default function Navbar() {
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [searchOpen, setSearchOpen] = useState(false);


  // USER STATE
  const [user, setUser] = useState(null);

  const navRef = useRef(null);

  // SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GET USER FROM TOKEN
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const payload = token.split(".")[1];
        const decoded = JSON.parse(
          atob(payload.replace(/-/g, "+").replace(/_/g, "/"))
        );

        // Check token expiration
        const currentTime = Math.floor(Date.now() / 1000);
        if (decoded.exp && decoded.exp < currentTime) {
          throw new Error("Token expired");
        }

        // Check admin role
        if (decoded.role !== "admin") {
          throw new Error("Not an admin");
        }

        setUser(decoded);
      } catch (error) {
        console.log("Invalid Token:", error.message);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  }, []);

  // CLOSE DROPDOWN
  const handleClickOutside = (e) => {
    if (navRef.current && !navRef.current.contains(e.target)) {
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm"
          : "bg-white"
      }`}
    >
      {/* TOP BAR */}
      <div className="hidden md:flex justify-between items-center px-6 py-2 border-b border-gray-100 text-xs text-gray-500">
        <span>
          Free shipping on orders over Rs 5,000
        </span>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="text-black font-medium">{user.email}</span>

              <button
                onClick={handleLogout}
                className="hover:text-red-500 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-black transition">
                Sign In
              </Link>
              <Link href="/register" className="hover:text-black transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="flex items-center justify-between px-4 md:px-8 h-16">
        {/* MOBILE MENU BUTTON */}
        <button
          aria-label="Open menu"
          className="md:hidden text-xl p-2 hover:bg-gray-100 rounded-lg"
          onClick={() => {
            setMenuOpen((v) => !v);
            setOpenDropdown(null);
          }}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* LOGO */}
        <Link href="/" className="text-2xl md:text-3xl font-black tracking-[0.15em]">
          RB STORE
        </Link>

        {/* DESKTOP NAV */}
        <nav ref={navRef} className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <div key={item.name} className="relative">
              {item.dropdown ? (
                <>
                  <button
                    onClick={() =>
                      setOpenDropdown(
                        openDropdown === item.name ? null : item.name
                      )
                    }
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
                  >
                    {item.name}
                    <FaChevronDown
                      className={`text-[10px] transition-transform ${
                        openDropdown === item.name ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {openDropdown === item.name && (
                    <div className="absolute top-full left-0 bg-white shadow-xl rounded-xl border py-2 min-w-[200px] z-50">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.path}
                          className="block px-4 py-2 text-sm hover:bg-gray-50"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link
                  href={item.path}
                  className="px-3 py-2 text-sm font-medium rounded-lg hover:bg-gray-100 transition"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-3">
          {/* SEARCH */}
          <button
            aria-label="Open search"
            onClick={() => setSearchOpen((v) => !v)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <FaSearch className="text-gray-700" />
          </button>

          {/* USER ICON */}
          <Link
            href={user ? "/profile" : "/login"}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="User"
          >
            <FaUser className="text-gray-700" />
          </Link>

          {/* CART */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-lg transition"
            aria-label="Cart"
          >
            <FaShoppingBag className="text-gray-700" />

            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden">
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => {
              setMenuOpen(false);
              setOpenDropdown(null);
            }}
          />

          <div className="fixed top-16 left-0 right-0 bg-white z-50 shadow-lg border-b">
            <div className="px-4 py-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">Menu</p>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg"
                  onClick={() => {
                    setMenuOpen(false);
                    setOpenDropdown(null);
                  }}
                  aria-label="Close menu"
                >
                  <FaTimes />
                </button>
              </div>

              <nav className="mt-3 space-y-1">
                {navItems.map((item) => (
                  <div key={item.name} className="border border-gray-100 rounded-xl overflow-hidden">
                    {item.dropdown ? (
                      <button
                        className="w-full flex items-center justify-between px-3 py-3 text-sm font-medium"
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.name ? null : item.name
                          )
                        }
                      >
                        <span>{item.name}</span>
                        <FaChevronDown
                          className={`text-[12px] transition-transform ${
                            openDropdown === item.name ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    ) : (
                      <Link
                        href={item.path}
                        className="block px-3 py-3 text-sm font-medium"
                        onClick={() => {
                          setMenuOpen(false);
                          setOpenDropdown(null);
                        }}
                      >
                        {item.name}
                      </Link>
                    )}

                    {openDropdown === item.name && item.dropdown && (
                      <div className="bg-gray-50">
                        {item.dropdown.map((sub) => (
                          <Link
                            key={sub.name}
                            href={sub.path}
                            className="block px-4 py-3 text-sm hover:bg-white"
                            onClick={() => {
                              setMenuOpen(false);
                              setOpenDropdown(null);
                            }}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <div className="pt-2">
                  {user ? (
                    <button
                      onClick={() => {
                        setMenuOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-3 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl"
                    >
                      Logout
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-2">
                      <Link
                        href="/login"
                        className="px-3 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl border border-gray-100 text-center"
                        onClick={() => setMenuOpen(false)}
                      >
                        Sign In
                      </Link>
                      <Link
                        href="/register"
                        className="px-3 py-3 text-sm font-medium hover:bg-gray-50 rounded-xl border border-gray-100 text-center"
                        onClick={() => setMenuOpen(false)}
                      >
                        Register
                      </Link>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH BAR */}
      {searchOpen && (
        <div className="border-t border-gray-100 px-4 md:px-8 py-3 bg-gray-50">
          <div className="max-w-2xl mx-auto flex items-center bg-white rounded-full border shadow-sm">
            <FaSearch className="ml-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2.5 outline-none text-sm bg-transparent"
            />
          </div>
        </div>
      )}
    </header>
  );
}