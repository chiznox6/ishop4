import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchCart, updateCartItemQuantity, removeCartItem, API_BASE } from '../services/api';
import { AuthContext } from '../App';

// Quantity validation component
const QuantityFormik = ({ productId, currentQuantity, onUpdate }) => {
  const formik = useFormik({
    initialValues: {
      quantity: currentQuantity,
    },
    validationSchema: Yup.object({
      quantity: Yup.number()
        .required('Quantity is required')
        .min(1, 'Quantity must be at least 1')
        .max(100, 'Quantity cannot exceed 100')
        .integer('Quantity must be a whole number'),
    }),
    enableReinitialize: true,
    onSubmit: async (values) => {
      if (values.quantity !== currentQuantity) {
        await onUpdate(productId, values.quantity);
      }
    },
  });

  const handleIncrement = () => {
    const newQuantity = formik.values.quantity + 1;
    if (newQuantity <= 100) {
      formik.setFieldValue('quantity', newQuantity);
      onUpdate(productId, newQuantity);
    }
  };

  const handleDecrement = () => {
    const newQuantity = formik.values.quantity - 1;
    if (newQuantity >= 1) {
      formik.setFieldValue('quantity', newQuantity);
      onUpdate(productId, newQuantity);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <button 
        type="button"
        onClick={handleDecrement}
        disabled={formik.values.quantity <= 1}
        className="btn btn-sm btn-circle btn-outline text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-700"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        name="quantity"
        value={formik.values.quantity}
        onChange={formik.handleChange}
        onBlur={formik.handleSubmit}
        className={`input input-bordered w-16 text-center bg-gray-800 text-white border-gray-700 ${
          formik.touched.quantity && formik.errors.quantity ? 'input-error border-red-500' : ''
        }`}
      />
      <button 
        type="button"
        onClick={handleIncrement}
        disabled={formik.values.quantity >= 100}
        className="btn btn-sm btn-circle btn-outline text-gray-300 border-gray-600 hover:bg-gray-700 hover:border-gray-700"
      >
        <Plus size={16} />
      </button>
      {formik.touched.quantity && formik.errors.quantity && (
        <div className="text-red-500 text-xs ml-2">{formik.errors.quantity}</div>
      )}
    </div>
  );
};

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user, triggerCartRefresh } = useContext(AuthContext);

  useEffect(() => {
    loadCart();
  }, [user]);

  const loadCart = async () => {
    if (!user) {
      setCart(null);
      setLoading(false);
      return;
    }

    try {
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (error) {
      if (error.message.includes('Cart is empty')) {
        setCart(null);
      } else {
        setError('Failed to load cart');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const updatedCart = await updateCartItemQuantity(productId, quantity);
      setCart(updatedCart);
    } catch (error) {
      setError('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      await removeCartItem(productId);
      triggerCartRefresh(); // Trigger cart refresh in Layout
      await loadCart(); // Reload cart after removal
    } catch (error) {
      setError('Failed to remove item');
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4 text-white">Please log in to view your cart</h1>
          <Link to="/login" className="btn btn-primary hover:bg-primary-focus">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="text-gray-300 mt-4">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (!cart || !cart.order_items || cart.order_items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <div className="text-center bg-gray-800 p-8 rounded-lg shadow-xl">
          <h1 className="text-2xl font-bold mb-4 text-white">Your cart is empty</h1>
          <Link to="/shop" className="btn btn-primary hover:bg-primary-focus">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const subtotal = cart.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-8 text-gray-200">
      {error && (
        <div className="alert alert-error mb-4 bg-red-800 text-white border-red-700">
          <span>{error}</span>
          <button onClick={() => setError('')} className="btn btn-sm btn-ghost text-white hover:bg-red-700">
            ×
          </button>
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="card bg-gray-800 shadow-xl">
            <div className="card-body">
              <h1 className="text-2xl font-bold mb-4 text-white">Shopping Cart</h1>
              <p className="text-gray-400 mb-6">
                You have {cart.order_items.length} item{cart.order_items.length !== 1 ? 's' : ''} in your cart
              </p>
              
              <div className="space-y-4">
                {cart.order_items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 p-4 border border-gray-700 rounded-lg bg-gray-900">
                    <img 
                      src={`http://localhost:5555${item.product.image_url}`} 
                      alt={item.product.name}
                      crossOrigin="anonymous"
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{item.product.name}</h3>
                      <p className="text-sm text-gray-400">{item.product.description}</p>
                      <p className="text-sm font-medium mt-1 text-primary">${item.price.toFixed(2)}</p>
                    </div>
                    
                    <QuantityFormik
                      productId={item.product_id}
                      currentQuantity={item.quantity}
                      onUpdate={handleUpdateQuantity}
                    />
                    
                    <button 
                      onClick={() => handleRemoveItem(item.product_id)}
                      className="btn btn-sm btn-ghost btn-circle text-red-500 hover:bg-red-500/20"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="card bg-gray-800 shadow-xl">
            <div className="card-body">
              <h2 className="text-lg font-bold mb-4 text-white">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Subtotal</span>
                  <span className="font-medium text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Shipping</span>
                  <span className="font-medium text-white">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-300">Tax</span>
                  <span className="font-medium text-white">${tax.toFixed(2)}</span>
                </div>
                <div className="divider border-gray-700"></div>
                <div className="flex justify-between font-bold text-white">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link to="/checkout" className="btn btn-primary w-full hover:bg-primary-focus">
                  Proceed to Checkout
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"/>
                    <path d="m12 5 7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
