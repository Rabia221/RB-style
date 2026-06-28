"use client";

import { useEffect, useState } from "react";
import { FaBox, FaShoppingCart, FaUsers, FaClock } from "react-icons/fa";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setStats);
  }, []);

  const cards = [
    { label: "Total Products", value: stats?.totalProducts ?? "—", icon: FaBox, color: "bg-blue-500" },
    { label: "Total Orders", value: stats?.totalOrders ?? "—", icon: FaShoppingCart, color: "bg-green-500" },
    { label: "Total Users", value: stats?.totalUsers ?? "—", icon: FaUsers, color: "bg-purple-500" },
    { label: "Pending Orders", value: stats?.pendingOrders ?? "—", icon: FaClock, color: "bg-amber-500" },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{card.label}</p>
                <p className="text-3xl font-bold mt-1">{card.value}</p>
              </div>
              <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center text-white`}>
                <card.icon />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="font-bold text-lg mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <a href="/admin/products" className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <FaBox className="text-neutral-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">Manage Products</p>
              <p className="text-xs text-gray-500">Add, edit or remove</p>
            </div>
          </a>
          <a href="/admin/orders" className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <FaShoppingCart className="text-neutral-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">View Orders</p>
              <p className="text-xs text-gray-500">Track and update</p>
            </div>
          </a>
          <a href="/admin/users" className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md transition flex items-center gap-4">
            <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
              <FaUsers className="text-neutral-600" />
            </div>
            <div>
              <p className="font-semibold text-sm">View Users</p>
              <p className="text-xs text-gray-500">Manage accounts</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
