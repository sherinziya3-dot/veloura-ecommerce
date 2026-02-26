const BASE_URL = "http://localhost:3001";

export const fetchProducts = async () => {
  const res = await fetch(`${BASE_URL}/products`);
  return res.json();
};

export const addProduct = async (product) => {
  await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
};

export const updateProduct = async (id, data) => {
  await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
};
