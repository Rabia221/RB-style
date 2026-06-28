const API = "/api/products";

// GET
export const getAllProducts = async () => {
  const base = typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
  const res = await fetch(`${base}${API}`);
  return await res.json();
};

// CREATE
export const createProduct = async (data) => {
  const base = typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
  const res = await fetch(`${base}${API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};

// DELETE
export const deleteProduct = async (id) => {
  const base = typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
  const res = await fetch(`${base}${API}/${id}`, {
    method: "DELETE",
  });

  return await res.json();
};

// UPDATE
export const updateProduct = async (id, data) => {
  const base = typeof window === "undefined" ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000" : "";
  const res = await fetch(`${base}${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
};