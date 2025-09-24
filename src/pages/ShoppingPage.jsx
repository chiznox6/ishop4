import React, { useState, useEffect, useContext } from 'react';
import { getProducts, addToCart as apiAddToCart } from '../services/api';
import { AuthContext } from '../App'; // Import AuthContext
import { Search } from 'lucide-react';

const ShoppingPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useContext(AuthContext); // Get user from AuthContext

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products.");
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert("Please log in to add items to your cart.");
      return;
    }
    try {
      const response = await apiAddToCart(productId, 1); // Assuming quantity 1
      if (response.message) {
        alert(response.message);
      } else if (response.error) {
        alert(response.error);
      } else {
        alert("Product added to cart!");
      }
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert("Failed to add product to cart.");
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.category && product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-base-content">Our Products</h2>

      {/* Search Bar */}
      <div className="form-control mb-6">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search products by name, description, or category..."
            className="input input-bordered w-full"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="btn btn-square btn-primary">
            <Search size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <div key={product.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
            <figure className="h-48 overflow-hidden">
              <img src={product.image_url || 'https://via.placeholder.com/300x200?text=No+Image'} alt={product.name} className="w-full h-full object-cover" />
            </figure>
            <div className="card-body">
              <h3 className="card-title text-base-content">{product.name}</h3>
              {product.category && <div className="badge badge-secondary">{product.category}</div>}
              <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</span>
                {product.stock > 0 ? (
                  <span className="text-success text-sm">In Stock ({product.stock})</span>
                ) : (
                  <span className="text-error text-sm">Out of Stock</span>
                )}
              </div>
              <div className="card-actions justify-end mt-4">
                <button
                  onClick={() => handleAddToCart(product.id)}
                  className="btn btn-primary"
                  disabled={product.stock === 0}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingPage;
