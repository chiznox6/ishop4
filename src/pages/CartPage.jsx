import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { fetchCart, updateCartItemQuantity, removeCartItem } from '../services/api';
import { AuthContext } from '../App';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  const getCart = async () => {
    if (!user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await fetchCart();
      setCart(data);
    } catch (err) {
      setError("Failed to fetch cart.");
      console.error("Error fetching cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCart();
  }, [user]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 0) return;
    try {
      const updatedCart = await updateCartItemQuantity(productId, newQuantity);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update item quantity.");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await removeCartItem(productId);
      setCart(updatedCart);
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item from cart.");
    }
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading cart...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-lg mb-4">Please log in to view your cart.</p>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  const cartItems = cart?.order_items || [];
  const subtotal = cart?.total_amount || 0;
  const shipping = subtotal > 0 ? 5.00 : 0; // Only charge shipping if there are items
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-base-content">Your Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-lg mb-4">Your cart is empty.</p>
          <Link to="/shop" className="btn btn-primary">Continue Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Items in Cart</h3>
              {cartItems.map(item => (
                <div key={item.product.id} className="flex items-center justify-between border-b border-base-200 py-4 last:border-b-0">
                  <div className="flex items-center gap-4">
                    <img src={item.product.image_url || 'https://via.placeholder.com/100'} alt={item.product.name} className="w-20 h-20 object-cover rounded-lg" />
                    <div>
                      <h4 className="font-bold text-lg">{item.product.name}</h4>
                      <p className="text-gray-600">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <input
                      type="number"
                      value={item.quantity}
                      min="0"
                      onChange={(e) => handleUpdateQuantity(item.product.id, parseInt(e.target.value))}
                      className="input input-bordered w-20"
                    />
                    <button
                      onClick={() => handleRemoveItem(item.product.id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl p-6">
              <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t border-base-200 pt-2 mt-2">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn btn-primary w-full" disabled={cartItems.length === 0}>Proceed to Checkout</Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;