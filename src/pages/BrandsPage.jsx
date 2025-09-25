import React, { useState, useEffect } from 'react';
import { API_BASE } from '../services/api';

const BrandsPage = () => {
  const [brands, setBrands] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${API_BASE}/brands`);
        const data = await response.json();
        if (response.ok) {
          setBrands(data.brands);
          setMessage(data.message);
        } else {
          setMessage(data.error || 'Failed to fetch brands');
        }
      } catch (error) {
        setMessage('Error connecting to the server.');
        console.error('Error fetching brands:', error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Brands</h1>
      {message && <p className="mb-4">{message}</p>}
      {brands.length > 0 ? (
        <ul>
          {brands.map((brand, index) => (
            <li key={index}>{brand}</li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No brands to display. Here are some placeholder brands:</p>
          <ul>
            <li>Brand A</li>
            <li>Brand B</li>
            <li>Brand C</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default BrandsPage;