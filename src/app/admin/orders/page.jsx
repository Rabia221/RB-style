"use client";

import { useEffect, useState } from "react";

export default function OrdersAdmin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then(setOrders);
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setOrders((prev) => prev.map((o) => (o._id === id ? { ...o, status } : o)));
  };

  const statusColors = {
    Pending: "bg-amber-100 text-amber-800",
    Shipped: "bg-blue-100 text-blue-800",
    Delivered: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800",
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Orders</h1>

      {orders.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400">No orders yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-600">Customer</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Total</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Status</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Date</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4 font-medium">{order.userName || "—"}</td>
                    <td className="p-4 text-gray-500">{order.email}</td>
                    <td className="p-4 font-semibold">Rs {order.totalPrice?.toLocaleString()}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500 text-sm">
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "—"}
                    </td>
                    <td className="p-4">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-black bg-white"
                      >
                        <option>Pending</option>
                        <option>Shipped</option>
                        <option>Delivered</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
