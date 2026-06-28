"use client";

import { useEffect, useState } from "react";

export default function UsersAdmin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then(setUsers);
  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold mb-8">Users</h1>

      {users.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
          <p className="text-gray-400">No users registered yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left p-4 font-semibold text-gray-600">Name</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Email</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Role</th>
                  <th className="text-left p-4 font-semibold text-gray-600">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                    <td className="p-4 font-medium">{user.name}</td>
                    <td className="p-4 text-gray-500">{user.email}</td>
                    <td className="p-4">
                      <span className="bg-neutral-100 text-neutral-700 text-xs font-medium px-3 py-1 rounded-full capitalize">
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-gray-500">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
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
