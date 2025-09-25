import React, { useState, useEffect, useContext } from 'react';
import { Search, ShoppingCart, Filter, Star } from 'lucide-react';
import { fetchProducts, addToCart } from '../services/api';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ShopPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minRating, setMinRating] = useState(''); // Assuming rating is 1-5
  const [addingToCart, setAddingToCart] = useState(null);
  const { user, triggerCartRefresh } = useContext(AuthContext); // Get triggerCartRefresh from context
  const navigate = useNavigate(); // Initialize useNavigate

  const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Sports', 'Books', 'Beauty'];

  // Debounce function
  const debounce = (func, delay) => {
    let timeout;
    return function executed(...args) {
      const context = this;
      const later = () => {
        timeout = null;
        func.apply(context, args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  };

  // Debounced version of loadProducts
  const debouncedLoadProducts = React.useCallback(
    debounce((filters) => loadProducts(filters), 500),
    []
  );

  useEffect(() => {
    const filters = {
      search: searchTerm,
      category: selectedCategory,
      min_price: minPrice,
      max_price: maxPrice,
      min_rating: minRating,
    };
    debouncedLoadProducts(filters); // Use debounced version
  }, [searchTerm, selectedCategory, minPrice, maxPrice, minRating, debouncedLoadProducts]); // Depend on all filter states and debouncedLoadProducts

  const loadProducts = async (filters) => {
    setLoading(true); // Set loading to true when fetching new data
    try {
      const productsData = await fetchProducts(filters); // Pass filters to API call
      setProducts(productsData);
    } catch (error) {
      setError('Failed to load products');
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (productId) => {
    if (!user) {
      alert('Please login to add items to cart');
      return;
    }
    
    setAddingToCart(productId);
    try {
      await addToCart(productId, 1);
      triggerCartRefresh(); // Trigger cart refresh in Layout
      navigate('/cart'); // Redirect to cart page
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 text-gray-200">
      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-white">Shop All Products</h1>
        <p className="text-gray-400">Discover amazing products at great prices</p>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              className="input input-bordered w-full pl-10 bg-gray-800 text-white border-gray-700 placeholder-gray-500 focus:border-primary focus:ring-primary"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {/* Category Filter */}
          <div className="flex gap-2 overflow-x-auto">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`btn btn-sm flex-shrink-0 ${
                  selectedCategory === category 
                    ? 'btn-primary hover:bg-primary-focus' 
                    : 'btn-outline text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Price and Rating Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 flex gap-4">
            <input
              type="number"
              placeholder="Min Price"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700 placeholder-gray-500 focus:border-primary focus:ring-primary"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max Price"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700 placeholder-gray-500 focus:border-primary focus:ring-primary"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <input
              type="number"
              placeholder="Min Rating (1-5)"
              min="1"
              max="5"
              step="0.1"
              className="input input-bordered w-full bg-gray-800 text-white border-gray-700 placeholder-gray-500 focus:border-primary focus:ring-primary"
              value={minRating}
              onChange={(e) => setMinRating(e.target.value)}
            />
          </div>
        </div>
        <button
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setMinPrice('');
            setMaxPrice('');
            setMinRating('');
          }}
          className="btn btn-secondary hover:bg-secondary-focus"
        >
          Clear All Filters
        </button>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-sm text-gray-400">
          Showing {products.length} products
        </p>
      </div>

      {/* Products Grid */}
      {products.length === 0 ? (
        <div className="text-center py-12 bg-gray-800 rounded-lg shadow-xl">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold mb-2 text-white">No products found</h3>
          <p className="text-gray-400 mb-4">Try adjusting your search or filters</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedCategory('All');
              setMinPrice('');
              setMaxPrice('');
              setMinRating('');
            }}
            className="btn btn-primary hover:bg-primary-focus"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="card bg-gray-800 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
              <figure className="px-4 pt-4">
                                  <img
                                    src={product.image_url || 'https://via.placeholder.com/300x300/0000FF/FFFFFF?text=No+Image'}
                                    alt={product.name}
                                    className="rounded-xl h-48 w-full object-cover"
                                  />              </figure>
              <div className="card-body">
                <h2 className="card-title text-lg text-white">{product.name}</h2>
                {product.description && (
                  <p className="text-sm text-gray-400 line-clamp-2">
                    {product.description}
                  </p>
                )}
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-400">({product.rating ? product.rating.toFixed(1) : 'N/A'})</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex-shrink-0">
                    <span className="text-2xl font-bold text-primary">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  {product.stock > 0 ? (
                    <div className="flex-shrink-0">
                      <span className="badge badge-success badge-md bg-green-500 text-white border-none whitespace-nowrap">
                        In Stock ({product.stock})
                      </span>
                    </div>
                  ) : (
                    <div className="flex-shrink-0">
                      <span className="badge badge-error badge-md bg-red-500 text-white border-none whitespace-nowrap">
                        Out of Stock
                      </span>
                    </div>
                  )}
                </div>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleAddToCart(product.id)}
                    disabled={product.stock === 0 || addingToCart === product.id}
                    className="btn btn-primary btn-sm w-full hover:bg-primary-focus hover:shadow-lg transition-all duration-300"
                  >
                    {addingToCart === product.id ? (
                      <span className="loading loading-spinner loading-xs"></span>
                    ) : (
                      <>
                        <ShoppingCart size={16} />
                        Add to Cart
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShopPage;