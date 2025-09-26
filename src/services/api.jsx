// src/services/api.jsx
export const API_BASE = "http://localhost:5555"; // Changed to local Flask backend URL

// --- Authentication API functions ---
export async function loginUser(loginIdentifier, password) {
  const payload = { password };
  if (loginIdentifier.includes('@')) {
    payload.email = loginIdentifier;
  } else {
    payload.username = loginIdentifier;
  }

  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Login failed");
  }
  return res.json();
}

export async function signupUser(username, email, password) {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Signup failed");
  }
  return res.json();
}

export const logoutUser = async () => {
    try {
        const response = await fetch(`${API_BASE}/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
        });
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        return await response.json();
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
};

export const fetchProducts = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        if (filters.search) params.append('search', filters.search);
        if (filters.category && filters.category !== 'All') params.append('category', filters.category);
        if (filters.min_price) params.append('min_price', filters.min_price);
        if (filters.max_price) params.append('max_price', filters.max_price);
        if (filters.min_rating) params.append('min_rating', filters.min_rating);

        const url = `${API_BASE}/products?${params.toString()}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export async function checkSession() {
  const res = await fetch(`${API_BASE}/check_session`, {
    credentials: 'include',
  });
  return res.json();
}

export async function searchAmazon(query, page = 1, country = "US") {
  const res = await fetch(
    `${API_BASE}/amazon/search?query=${encodeURIComponent(query)}`
  );
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to search Amazon products");
  }
  return res.json();
}

export async function getAmazonProduct(asin, country = "US") {
  const res = await fetch(`${API_BASE}/amazon/product/${asin}`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch Amazon product details");
  }
  return res.json();
}

export async function getAmazonReviews(asin, page = 1, sort_by = "TOP_REVIEWS", country = "US") {
  const res = await fetch(`${API_BASE}/amazon/product/${asin}/reviews`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch Amazon product reviews");
  }
  return res.json();
}

// --- Cart API functions ---
export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`, {
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch cart");
  }
  return res.json();
}

export async function addToCart(productId, quantity = 1) {
  const res = await fetch(`${API_BASE}/cart/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ product_id: productId, quantity }),
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to add to cart");
  }
  return res.json();
}

export async function updateCartItemQuantity(productId, quantity) {
  const res = await fetch(`${API_BASE}/cart/update/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ quantity }),
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to update cart item");
  }
  return res.json();
}

export async function removeCartItem(productId) {
  const res = await fetch(`${API_BASE}/cart/remove/${productId}`, {
    method: "DELETE",
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to remove cart item");
  }
  return res.json();
}

// --- Checkout API function ---
export async function checkoutCart() {
  const res = await fetch(`${API_BASE}/cart/checkout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: 'include',
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Checkout failed");
  }
  return res.json();
}

// --- New Product API functions for our Flask backend ---
export async function getProducts() {
  const res = await fetch(`${API_BASE}/products`);
  return res.json();
}

export async function getProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  return res.json();
}

export async function createProduct(productData) {
  const res = await fetch(`${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return res.json();
}

export async function updateProduct(id, productData) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return res.json();
}

export async function deleteProduct(id) {
  const res = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

// --- Business Overview API functions ---
export async function fetchSalesData() {
  const res = await fetch(`${API_BASE}/sales-data`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch sales data");
  }
  return res.json();
}

export async function fetchProductCategories() {
  const res = await fetch(`${API_BASE}/product-categories`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch product categories");
  }
  return res.json();
}

export async function fetchShipmentSummary() {
  const res = await fetch(`${API_BASE}/shipment-summary`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch shipment summary");
  }
  return res.json();
}

export async function fetchTotalSales() {
  const res = await fetch(`${API_BASE}/total-sales`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch total sales data");
  }
  return res.json();
}

export async function fetchBrands() {
  const res = await fetch(`${API_BASE}/brands`);
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to fetch brands data");
  }
  return res.json();
}

export async function fetchDeals() {
  try {
    const params = new URLSearchParams();
    params.append('min_deal_percentage', 1); // Fetch products with at least 1% deal

    const url = `${API_BASE}/products?${params.toString()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to fetch deals');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching deals:', error);
    throw error;
  }
}

export async function seedBrands() {
  const res = await fetch(`${API_BASE}/brands/seed`, {
    method: "POST",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to seed brands");
  }
  return res.json();
}

export async function applyDeals() {
  const res = await fetch(`${API_BASE}/products/apply_deals`, {
    method: "POST",
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.error || "Failed to apply deals");
  }
  return res.json();
}

