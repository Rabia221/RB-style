"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaChartBar, FaSignOutAlt, FaBars, FaTimes } from "react-icons/fa";

const sidebarLinks = [
  { href: "/admin", label: "Dashboard", icon: FaChartBar },
  { href: "/admin/products", label: "Products", icon: FaBox },
  { href: "/admin/orders", label: "Orders", icon: FaShoppingCart },
  { href: "/admin/users", label: "Users", icon: FaUsers },
];

export default function AdminLayout({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.message);
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setUser(data.user);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {!user && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-50 to-gray-100 px-4">
          <form onSubmit={handleLogin} className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 w-full max-w-sm">
            <h2 className="text-2xl font-bold text-center mb-2">Admin Login</h2>
            <p className="text-gray-500 text-sm text-center mb-6">Sign in to manage your store</p>

            {error && (
              <div className="bg-red-50 text-red-600 text-sm text-center px-4 py-3 rounded-lg mb-5">{error}</div>
            )}

            <div className="space-y-4">
              <input
                type="email"
                placeholder="Email"
                className="w-full border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full border border-gray-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-3 rounded-xl font-semibold text-sm hover:bg-neutral-800 transition mt-6"
            >
              Sign In
            </button>
          </form>
        </div>
      )}

      {user && (
        <div className="flex min-h-screen bg-gray-50">
          {/* Sidebar Overlay */}
          {sidebarOpen && (
            <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Sidebar */}
          <aside className={`fixed lg:sticky top-0 left-0 z-50 w-64 bg-white border-r border-gray-200 h-screen flex flex-col transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
          }`}>
<div className="p-6 border-b border-gray-100">
               <div className="flex items-center justify-between">
                 <button className="lg:hidden p-1 hover:bg-gray-100 rounded" onClick={() => setSidebarOpen(false)}>
                   <FaTimes />
                 </button>
               </div>
               <p className="text-xs text-gray-400 mt-2 truncate">{user.email}</p>
             </div>

            <nav className="flex-1 p-4 space-y-1">
              {sidebarLinks.map(({ href, label, icon: Icon }) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition ${
                      active
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100 hover:text-black"
                    }`}
                  >
                    <Icon className="text-sm" />
                    {label}
                  </Link>
                );
              })}
            </nav>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full px-4 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition"
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 flex flex-col min-h-screen">
            {/* Top Bar */}
            <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center gap-4">
              <button className="lg:hidden p-2 hover:bg-gray-100 rounded-lg" onClick={() => setSidebarOpen(true)}>
                <FaBars />
              </button>
              <h1 className="font-semibold text-sm text-gray-500">
                Welcome back, <span className="text-black">{user?.name || "Admin"}</span>
              </h1>
            </header>

            <main className="flex-1 p-4 md:p-6">
              {children}
            </main>
          </div>
        </div>
      )}
    </>
  );
}
