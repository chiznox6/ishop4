import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { fetchCart, checkoutCart } from '../services/api';
import { AuthContext } from '../App';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessingOrder, setIsProcessingOrder] = useState(false);

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

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Full Name is required'),
    address: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    zipCode: Yup.string().required('Zip Code is required').matches(/^[0-9]{5}(?:-[0-9]{4})?$/, 'Invalid Zip Code'),
    country: Yup.string().required('Country is required'),
    cardNumber: Yup.string().required('Card Number is required').matches(/^[0-9]{16}$/, 'Card Number must be 16 digits'),
    expiryDate: Yup.string().required('Expiry Date is required').matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Invalid Expiry Date (MM/YY)'),
    cvv: Yup.string().required('CVV is required').matches(/^[0-9]{3,4}$/, 'Invalid CVV (3 or 4 digits)'),
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      city: '',
      zipCode: '',
      country: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      if (!cart || cart.order_items.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
      }

      setIsProcessingOrder(true);
      try {
        await checkoutCart();
        alert('Order Placed Successfully!');
        navigate('/order-confirmation');
      } catch (err) {
        console.error('Checkout failed:', err);
        alert(`Checkout failed: ${err.message}`);
      } finally {
        setIsProcessingOrder(false);
      }
    },
  });

  if (loading) {
    return <div className="text-center text-gray-600">Loading checkout information...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!user) {
    return (
      <div className="container mx-auto p-6 text-center">
        <p className="text-lg mb-4">Please log in to proceed to checkout.</p>
        <Link to="/login" className="btn btn-primary">Go to Login</Link>
      </div>
    );
  }

  const cartItems = cart?.order_items || [];
  const subtotal = cart?.total_amount || 0;
  const shipping = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-base-content">Checkout</h2>

      <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Shipping Information */}
        <div className="card bg-base-100 shadow-xl p-6 lg:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Shipping Information</h3>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Full Name</span></label>
            <input type="text" {...formik.getFieldProps('fullName')} placeholder="John Doe" className={`input input-bordered ${formik.touched.fullName && formik.errors.fullName ? 'input-error' : ''}`} />
            {formik.touched.fullName && formik.errors.fullName && <p className="text-error text-sm mt-1">{formik.errors.fullName}</p>}
          </div>
          <div className="form-control mb-4">
            <label className="label"><span className="label-text">Address</span></label>
            <input type="text" {...formik.getFieldProps('address')} placeholder="123 Main St" className={`input input-bordered ${formik.touched.address && formik.errors.address ? 'input-error' : ''}`} />
            {formik.touched.address && formik.errors.address && <p className="text-error text-sm mt-1">{formik.errors.address}</p>}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">City</span></label>
              <input type="text" {...formik.getFieldProps('city')} placeholder="New York" className={`input input-bordered ${formik.touched.city && formik.errors.city ? 'input-error' : ''}`} />
              {formik.touched.city && formik.errors.city && <p className="text-error text-sm mt-1">{formik.errors.city}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Zip Code</span></label>
              <input type="text" {...formik.getFieldProps('zipCode')} placeholder="10001" className={`input input-bordered ${formik.touched.zipCode && formik.errors.zipCode ? 'input-error' : ''}`} />
              {formik.touched.zipCode && formik.errors.zipCode && <p className="text-error text-sm mt-1">{formik.errors.zipCode}</p>}
            </div>
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Country</span></label>
              <input type="text" {...formik.getFieldProps('country')} placeholder="USA" className={`input input-bordered ${formik.touched.country && formik.errors.country ? 'input-error' : ''}`} />
              {formik.touched.country && formik.errors.country && <p className="text-error text-sm mt-1">{formik.errors.country}</p>}
            </div>
          </div>
        </div>

        {/* Order Summary & Payment Information */}
        <div className="lg:col-span-1">
          <div className="card bg-base-100 shadow-xl p-6 mb-6">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            {cartItems.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-2 mb-4">
                {cartItems.map(item => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span>{item.product.name} x {item.quantity}</span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-base-200 pt-2 mt-2">
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
            )}
          </div>

          <div className="card bg-base-100 shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-4">Payment Information</h3>
            <div className="form-control mb-4">
              <label className="label"><span className="label-text">Card Number</span></label>
              <input type="text" {...formik.getFieldProps('cardNumber')} placeholder="**** **** **** ****" className={`input input-bordered ${formik.touched.cardNumber && formik.errors.cardNumber ? 'input-error' : ''}`} />
              {formik.touched.cardNumber && formik.errors.cardNumber && <p className="text-error text-sm mt-1">{formik.errors.cardNumber}</p>}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">Expiry Date</span></label>
                <input type="text" {...formik.getFieldProps('expiryDate')} placeholder="MM/YY" className={`input input-bordered ${formik.touched.expiryDate && formik.errors.expiryDate ? 'input-error' : ''}`} />
                {formik.touched.expiryDate && formik.errors.expiryDate && <p className="text-error text-sm mt-1">{formik.errors.expiryDate}</p>}
              </div>
              <div className="form-control mb-4">
                <label className="label"><span className="label-text">CVV</span></label>
                <input type="text" {...formik.getFieldProps('cvv')} placeholder="123" className={`input input-bordered ${formik.touched.cvv && formik.errors.cvv ? 'input-error' : ''}`} />
                {formik.touched.cvv && formik.errors.cvv && <p className="text-error text-sm mt-1">{formik.errors.cvv}</p>}
              </div>
            </div>
            <button type="submit" className="btn btn-primary w-full" disabled={formik.isSubmitting || isProcessingOrder || cartItems.length === 0}>
              {isProcessingOrder ? 'Processing...' : 'Place Order'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;