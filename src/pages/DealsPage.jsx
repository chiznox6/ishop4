import React, { useState, useEffect } from 'react';
import { API_BASE } from '../services/api';

const DealsPage = () => {
  const [deals, setDeals] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await fetch(`${API_BASE}/deals`);
        const data = await response.json();
        if (response.ok) {
          setDeals(data.deals);
          setMessage(data.message);
        } else {
          setMessage(data.error || 'Failed to fetch deals');
        }
      } catch (error) {
        setMessage('Error connecting to the server.');
        console.error('Error fetching deals:', error);
      }
    };
    fetchDeals();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Deals</h1>
      {message && <p className="mb-4">{message}</p>}
      {deals.length > 0 ? (
        <ul>
          {deals.map((deal, index) => (
            <li key={index}>{deal}</li>
          ))}
        </ul>
      ) : (
        <div>
          <p>No deals to display. Here are some placeholder deals:</p>
          <ul>
            <li>Deal 1: 20% off all electronics</li>
            <li>Deal 2: Buy one get one free on selected fashion items</li>
            <li>Deal 3: Free shipping on orders over $50</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DealsPage;