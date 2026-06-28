export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="bg-white p-4 rounded shadow">Products</div>
        <div className="bg-white p-4 rounded shadow">Orders</div>
        <div className="bg-white p-4 rounded shadow">Users</div>
      </div>
    </div>
  );
}