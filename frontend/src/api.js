const BASE = '/api/products';

async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || Object.values(body.errors || {}).join(', ') || message;
    } catch {
      /* response had no JSON body */
    }
    throw new Error(message);
  }
  return res.status === 204 ? null : res.json();
}

export const getProducts = ({ category, lowStockOnly }) => {
  if (lowStockOnly) return request(`${BASE}/low-stock?threshold=10`);
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return request(`${BASE}${query}`);
};

export const createProduct = (product) =>
  request(BASE, { method: 'POST', body: JSON.stringify(product) });

export const updateProduct = (id, product) =>
  request(`${BASE}/${id}`, { method: 'PUT', body: JSON.stringify(product) });

export const deleteProduct = (id) => request(`${BASE}/${id}`, { method: 'DELETE' });
