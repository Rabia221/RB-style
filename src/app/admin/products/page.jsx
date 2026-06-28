"use client";

import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaPlus, FaTimes, FaSpinner } from "react-icons/fa";
import { getAllProducts, createProduct, deleteProduct, updateProduct } from "@/services/productService";

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];

export default function ProductsAdmin() {
  const [editingId, setEditingId] = useState(null);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [product, setProduct] = useState({
    title: "", price: "", category: "", image: "", description: "", sizes: [],
  });

  useEffect(() => { fetchProducts(); }, []);

  const fetchProducts = async () => {
    try {
      const data = await getAllProducts();
      setProducts(data);
    } catch (err) {
      setError("Failed to load products");
    }
  };

  const handleChange = (e) => setProduct({ ...product, [e.target.name]: e.target.value });

  const handleSize = (size) => {
    setProduct((prev) => ({
      ...prev,
      sizes: prev.sizes.includes(size) ? prev.sizes.filter((s) => s !== size) : [...prev.sizes, size],
    }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) {
        setProduct((prev) => ({ ...prev, image: data.url }));
      } else {
        alert("Upload failed: " + (data.error || "Unknown error"));
      }
    } catch (err) {
      alert("Upload error");
    }
    setUploading(false);
  };

  const resetForm = () => {
    setEditingId(null);
    setProduct({ title: "", price: "", category: "", image: "", description: "", sizes: [] });
    setShowForm(false);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!product.title || !product.price || !product.category) {
      setError("Title, Price, and Category are required");
      return;
    }

    if (!product.image) {
      setError("Please upload an image");
      return;
    }

    setSubmitting(true);
    const payload = { ...product, price: Number(product.price) };

    try {
      if (editingId) {
        await updateProduct(editingId, payload);
      } else {
        await createProduct(payload);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      setError("Operation failed. Check console for details.");
    }
    setSubmitting(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      fetchProducts();
    } catch (err) {
      setError("Delete failed");
    }
  };

  const handleEdit = (item) => {
    setProduct({
      title: item.title || "", price: item.price?.toString() || "",
      category: item.category || "", image: item.image || "",
      description: item.description || "", sizes: item.sizes || [],
    });
    setEditingId(item._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">Products</h1>
        <button
          onClick={() => { resetForm(); setShowForm(!showForm); }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition"
        >
          {showForm ? <FaTimes /> : <FaPlus />}
          {showForm ? "Cancel" : "Add Product"}
        </button>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">{error}</div>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm mb-8">
          <h2 className="text-lg font-bold mb-5">{editingId ? "Edit Product" : "New Product"}</h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Title</label>
              <input name="title" value={product.title} onChange={handleChange} placeholder="Product title" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Price (Rs)</label>
              <input name="price" type="number" value={product.price} onChange={handleChange} placeholder="0" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Category</label>
              <input name="category" value={product.category} onChange={handleChange} placeholder="e.g. ready-to-wear" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-500 mb-1.5 block">Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full border border-gray-200 p-2.5 rounded-xl text-sm file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-black file:text-white file:text-xs file:font-semibold hover:file:bg-neutral-800" />
              {uploading && <p className="text-xs text-blue-500 mt-1 flex items-center gap-1"><FaSpinner className="animate-spin" /> Uploading...</p>}
            </div>
          </div>

          {product.image && (
            <div className="mt-4 flex items-center gap-3">
              <img src={product.image} alt="" className="w-16 h-16 object-cover rounded-lg border" />
              <span className="text-xs text-gray-400 truncate">{product.image}</span>
            </div>
          )}

          <div className="mt-4">
            <label className="text-xs font-medium text-gray-500 mb-1.5 block">Description</label>
            <textarea name="description" value={product.description} onChange={handleChange} placeholder="Description (optional)" rows="3" className="w-full border border-gray-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-black text-sm" />
          </div>

          <div className="flex flex-wrap gap-2 mt-4 items-center">
            <span className="text-sm font-medium text-gray-500">Sizes:</span>
            {sizeOptions.map((s) => (
              <button key={s} type="button" onClick={() => handleSize(s)}
                className={`px-4 py-1.5 border rounded-lg text-sm transition ${
                  product.sizes.includes(s) ? "bg-black text-white border-black" : "border-gray-200 hover:border-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <div className="flex gap-3 mt-6">
            <button type="submit" disabled={submitting || uploading}
              className="bg-black text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-neutral-800 transition disabled:opacity-50 flex items-center gap-2"
            >
              {submitting ? <><FaSpinner className="animate-spin" /> Processing...</> : editingId ? "Update Product" : "Add Product"}
            </button>
            <button type="button" onClick={resetForm} className="border border-gray-200 px-6 py-2.5 rounded-xl text-sm hover:bg-gray-50 transition">
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="text-left p-4 font-semibold text-gray-600">Image</th>
                <th className="text-left p-4 font-semibold text-gray-600">Title</th>
                <th className="text-left p-4 font-semibold text-gray-600">Price</th>
                <th className="text-left p-4 font-semibold text-gray-600">Category</th>
                <th className="text-left p-4 font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                  <td className="p-4">
                    <img src={p.image || "/placeholder.jpg"} className="w-12 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="p-4 font-medium">{p.title}</td>
                  <td className="p-4">Rs {p.price}</td>
                  <td className="p-4 text-gray-500 text-sm capitalize">{p.category}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button onClick={() => handleEdit(p)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600 transition" title="Edit">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(p._id)} className="p-2 hover:bg-red-50 rounded-lg text-red-500 transition" title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {products.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-12 text-center text-gray-400">No products yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
