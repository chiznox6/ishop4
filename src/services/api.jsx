// src/services/api.jsx
const API_BASE = "http://127.0.0.1:5555"; // Changed to local Flask backend URL

// --- Authentication API functions ---
export async function loginUser(username, password) {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
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

export const fetchProducts = async () => {
    try {
        const response = await fetch(`${API_BASE}/products`);
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
  const res = await fetch(`${API_BASE}/check_session`);
  return res.json();
}

// --- Amazon API functions (keeping existing for now, but they might not be relevant to our Flask backend) ---
export async function searchAmazon(query, page = 1, country = "US") {
  const res = await fetch(
    `${API_BASE}/amazon/search?query=${encodeURIComponent(query)}&page=${page}&country=${country}`
  );
  return res.json();
}

export async function getAmazonProduct(asin, country = "US") {
  const res = await fetch(`${API_BASE}/amazon/product/${asin}?country=${country}`);
  return res.json();
}

export async function getAmazonReviews(asin, page = 1, sort_by = "TOP_REVIEWS", country = "US") {
  const res = await fetch(
    `${API_BASE}/amazon/product/${asin}/reviews?page=${page}&sort_by=${sort_by}&country=${country}`
  );
  return res.json();
}

// --- Cart API functions ---
export async function fetchCart() {
  const res = await fetch(`${API_BASE}/cart`);
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
  // Mock sales data for demonstration
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { date: "Jan", amount: 1200 },
        { date: "Feb", amount: 1900 },
        { date: "Mar", amount: 3000 },
        { date: "Apr", amount: 2500 },
        { date: "May", amount: 3200 },
        { date: "Jun", amount: 4000 },
        { date: "Jul", amount: 3500 },
        { date: "Aug", amount: 4200 },
        { date: "Sep", amount: 5000 },
        { date: "Oct", amount: 4800 },
        { date: "Nov", amount: 5500 },
        { date: "Dec", amount: 6000 },
      ]);
    }, 500);
  });
}

export async function fetchProductCategories() {
  // Mock product categories data for demonstration
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { name: "Electronics", product_count: 40 },
        { name: "Apparel", product_count: 75 },
        { name: "Home Goods", product_count: 30 },
        { name: "Books", product_count: 50 },
        { name: "Sports", product_count: 25 },
        { name: "Beauty", product_count: 60 },
        { name: "Automotive", product_count: 15 },
        { name: "Toys", product_count: 45 },
      ]);
    }, 500);
  });
}

export async function fetchShipmentSummary() {
  // Mock shipment summary data for demonstration
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        {
          label: 'Total Shipments',
          value: '1.2K',
          change: '+10% from last month',
          color: 'text-blue-600',
          icon: 'Package'
        },
        {
          label: 'Pending Orders',
          value: '50',
          change: '-5% from last month',
          color: 'text-orange-600',
          icon: 'ShoppingCart'
        },
        {
          label: 'Delivered Items',
          value: '980',
          change: '+15% from last month',
          color: 'text-green-600',
          icon: 'Gift'
        },
        {
          label: 'New Returns',
          value: '12',
          change: '+2% from last month',
          color: 'text-red-600',
          icon: 'TrendingDown'
        },
        {
          label: 'In Transit',
          value: '150',
          change: '+8% from last month',
          color: 'text-yellow-600',
          icon: 'Truck'
        },
        {
          label: 'Failed Deliveries',
          value: '5',
          change: '+1% from last month',
          color: 'text-red-700',
          icon: 'XCircle'
        }
      ]);
    }, 500);
  });
}
