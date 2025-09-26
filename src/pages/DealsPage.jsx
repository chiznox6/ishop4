import React, { useState, useEffect, useContext } from 'react';
import { fetchDeals, addToCart, API_BASE } from '../services/api'; // Import fetchDeals and API_BASE
import { AuthContext } from '../App';
import { ShoppingCart, Star } from 'lucide-react'; // Import icons for product display

const DealsPage = () => {
  const { user, triggerCartRefresh } = useContext(AuthContext);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addingToCart, setAddingToCart] = useState(null);

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      const data = await fetchDeals();
      setDeals(data);
      setError('');
    } catch (err) {
      setError(err.message || 'Failed to fetch deals');
      console.error('Error fetching deals:', err);
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
      triggerCartRefresh();
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add item to cart');
    } finally {
      setAddingToCart(null);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-gray-200">
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-300 mt-4">Loading deals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Today's Hot Deals!</h1>
      {error && (
        <div className="alert alert-error mb-6 bg-red-800 text-white border-red-700">
          <span>{error}</span>
          <button onClick={() => setError('')} className="btn btn-sm btn-ghost text-white hover:bg-red-700">
            ×
          </button>
        </div>
      )}

      {deals.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deals.map((product) => {
            const discountedPrice = product.price * (1 - product.deal_percentage / 100);
            return (
              <div key={product.id} className="card bg-gray-800 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
                <figure className="px-4 pt-4 relative">
                  <img
                    src={`${API_BASE}${product.image_url}`}
                    alt={product.name}
                    crossOrigin="anonymous"
                    className="rounded-xl h-48 w-full object-cover"
                  />
                  {product.deal_percentage > 0 && (
                    <span className="badge badge-lg badge-accent absolute top-6 right-6 font-bold text-white">
                      -{product.deal_percentage}%
                    </span>
                  )}
                </figure>
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
                    <div>
                      {product.deal_percentage > 0 && (
                        <span className="text-sm text-gray-500 line-through mr-2">${product.price.toFixed(2)}</span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        ${discountedPrice.toFixed(2)}
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
            );
          })}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg shadow-xl">
          <div className="text-6xl mb-4">✨</div>
          <h3 className="text-xl font-semibold mb-2 text-white">No deals found</h3>
          <p className="text-gray-400 mb-4">Check back later for amazing offers!</p>
        </div>
      )}
    </div>
  );
};

export default DealsPage;