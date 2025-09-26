import React, { useState, useEffect } from 'react';
import { fetchBrands, seedBrands } from '../services/api'; // Import fetchBrands and seedBrands

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const data = await fetchBrands();
      setBrands(data);
      setMessage('');
    } catch (error) {
      setMessage(error.message || 'Failed to fetch brands');
      console.error('Error fetching brands:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedBrands = async () => {
    try {
      await seedBrands();
      loadBrands(); // Reload brands after seeding
    } catch (error) {
      setMessage(error.message || 'Failed to seed brands');
      console.error('Error seeding brands:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4 text-gray-200">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-300 mt-4">Loading brands...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-white text-center">Our Brands</h1>
      {message && <p className="mb-4 text-red-400 text-center">{message}</p>}

      <div className="flex justify-center mb-8">
        <button onClick={handleSeedBrands} className="btn btn-secondary">
          Seed Brands (for testing)
        </button>
      </div>

      {brands.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {brands.map((brand) => (
            <div key={brand.id} className="card bg-gray-800 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
              <figure className="px-6 pt-6">
                <img 
                  src={brand.logo_url || 'https://via.placeholder.com/150/CCCCCC/FFFFFF?text=Brand+Logo'} 
                  alt={brand.name}
                  className="rounded-xl h-32 w-32 object-contain mx-auto"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl text-white">{brand.name}</h2>
                <p className="text-gray-400 text-sm">{brand.description}</p>
                <div className="card-actions justify-end mt-4">
                  <button className="btn btn-primary btn-sm">View Products</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-800 rounded-lg shadow-xl">
          <div className="text-6xl mb-4">🛍️</div>
          <h3 className="text-xl font-semibold mb-2 text-white">No brands to display</h3>
          <p className="text-gray-400 mb-4">Click "Seed Brands" to add some placeholder brands.</p>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;