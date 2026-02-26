const API_URL = "http://localhost:3001/products";

export async function getProducts() {
  const res = await fetch(API_URL);
  return res.json();
}

export async function addProduct(product) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(id, product) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id) {
  return fetch(`${API_URL}/${id}`, { method: "DELETE" });
}
