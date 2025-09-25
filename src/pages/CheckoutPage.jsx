import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, CreditCard, Truck, Shield } from 'lucide-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { fetchCart, checkoutCart } from '../services/api';
import { AuthContext } from '../App';

const validationSchema = Yup.object({
  // Shipping Information
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name must be at least 2 characters'),
  address: Yup.string()
    .required('Address is required')
    .min(5, 'Address must be at least 5 characters'),
  city: Yup.string()
    .required('City is required')
    .min(2, 'City must be at least 2 characters'),
  state: Yup.string()
    .required('State is required')
    .matches(/^[A-Z]{2}$/, 'State must be 2 uppercase letters (e.g., CA)'),
  zipCode: Yup.string()
    .required('Zip code is required')
    .matches(/^\d{5}(-\d{4})?$/, 'Invalid zip code format'),
  
  // Payment Information
  cardNumber: Yup.string()
    .required('Card number is required')
    .matches(/^\d{16}$/, 'Card number must be 16 digits'),
  expiryDate: Yup.string()
    .required('Expiry date is required')
    .matches(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Invalid expiry date format (MM/YY)'),
  cvv: Yup.string()
    .required('CVV is required')
    .matches(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

function CheckoutPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        await checkoutCart();
        navigate('/order-confirmation');
      } catch (error) {
        setError('Failed to place order. Please try again.');
      }
    },
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await fetchCart();
      setCart(cartData);
    } catch (error) {
      setError('Failed to load cart');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-gray-200">
        <div className="flex justify-center items-center h-64 bg-gray-800 p-8 rounded-lg shadow-xl">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      </div>
    );
  }

  if (!cart || !cart.order_items || cart.order_items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <Link to="/shop" className="btn btn-primary">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const subtotal = cart.order_items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 5.00;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const steps = [
    { number: 1, title: 'Shipping', icon: Truck },
    { number: 2, title: 'Payment', icon: CreditCard },
    { number: 3, title: 'Review', icon: Shield },
  ];

  return (
    <div className="container mx-auto px-4 py-8 text-gray-200">
      {error && (
        <div className="alert alert-error mb-6">
          <span>{error}</span>
        </div>
      )}
      
      {/* Breadcrumb */}
      <div className="breadcrumbs text-sm mb-8">
        <ul>
          <li><Link to="/cart">Shopping Cart</Link></li>
          <li>Checkout</li>
        </ul>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <ul className="steps steps-horizontal">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <li 
                key={step.number}
                className={`step ${
                  currentStep >= step.number ? 'step-primary' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon size={16} />
                  {step.title}
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              {/* Step 1: Shipping Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Truck size={24} />
                    Shipping Information
                  </h2>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Full Name</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      className={`input input-bordered ${
                        formik.touched.fullName && formik.errors.fullName ? 'input-error' : ''
                      }`}
                      {...formik.getFieldProps('fullName')}
                    />
                    {formik.touched.fullName && formik.errors.fullName && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formik.errors.fullName}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Address</span>
                    </label>
                    <input
                      type="text"
                      name="address"
                      className={`input input-bordered ${
                        formik.touched.address && formik.errors.address ? 'input-error' : ''
                      }`}
                      {...formik.getFieldProps('address')}
                    />
                    {formik.touched.address && formik.errors.address && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formik.errors.address}</span>
                      </label>
                    )}
                  </div>

                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">City</span>
                    </label>
                    <input
                      type="text"
                      name="city"
                      className={`input input-bordered ${
                        formik.touched.city && formik.errors.city ? 'input-error' : ''
                      }`}
                      {...formik.getFieldProps('city')}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formik.errors.city}</span>
                      </label>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">State</span>
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="CA"
                        className={`input input-bordered ${
                          formik.touched.state && formik.errors.state ? 'input-error' : ''
                        }`}
                        {...formik.getFieldProps('state')}
                      />
                      {formik.touched.state && formik.errors.state && (
                        <label className="label">
                          <span className="label-text-alt text-error">{formik.errors.state}</span>
                        </label>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Zip Code</span>
                      </label>
                      <input
                        type="text"
                        name="zipCode"
                        placeholder="12345"
                        className={`input input-bordered ${
                          formik.touched.zipCode && formik.errors.zipCode ? 'input-error' : ''
                        }`}
                        {...formik.getFieldProps('zipCode')}
                      />
                      {formik.touched.zipCode && formik.errors.zipCode && (
                        <label className="label">
                          <span className="label-text-alt text-error">{formik.errors.zipCode}</span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="card-actions justify-end">
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-primary"
                    >
                      Continue to Payment
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Information */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <CreditCard size={24} />
                    Payment Information
                  </h2>
                  
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text">Card Number</span>
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234567890123456"
                      className={`input input-bordered ${
                        formik.touched.cardNumber && formik.errors.cardNumber ? 'input-error' : ''
                      }`}
                      {...formik.getFieldProps('cardNumber')}
                    />
                    {formik.touched.cardNumber && formik.errors.cardNumber && (
                      <label className="label">
                        <span className="label-text-alt text-error">{formik.errors.cardNumber}</span>
                      </label>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">Expiry Date (MM/YY)</span>
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="12/25"
                        className={`input input-bordered ${
                          formik.touched.expiryDate && formik.errors.expiryDate ? 'input-error' : ''
                        }`}
                        {...formik.getFieldProps('expiryDate')}
                      />
                      {formik.touched.expiryDate && formik.errors.expiryDate && (
                        <label className="label">
                          <span className="label-text-alt text-error">{formik.errors.expiryDate}</span>
                        </label>
                      )}
                    </div>
                    
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">CVV</span>
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        className={`input input-bordered ${
                          formik.touched.cvv && formik.errors.cvv ? 'input-error' : ''
                        }`}
                        {...formik.getFieldProps('cvv')}
                      />
                      {formik.touched.cvv && formik.errors.cvv && (
                        <label className="label">
                          <span className="label-text-alt text-error">{formik.errors.cvv}</span>
                        </label>
                      )}
                    </div>
                  </div>

                  <div className="card-actions justify-between">
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(1)}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(3)}
                      className="btn btn-primary"
                    >
                      Review Order
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold flex items-center gap-2">
                    <Shield size={24} />
                    Review Your Order
                  </h2>
                  
                  {/* Order Summary */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <h3 className="font-semibold">Order Details</h3>
                    {cart.order_items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">
                        <img 
                          src={item.product.image_url || 'https://via.placeholder.com/60'}
                          alt={item.product.name}
                          className="w-15 h-15 object-cover rounded"
                        />
                        <div className="flex-1">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-base-content/70">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="card-actions justify-between">
                    <button 
                      type="button" 
                      onClick={() => setCurrentStep(2)}
                      className="btn btn-outline"
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary"
                      disabled={formik.isSubmitting}
                    >
                      {formik.isSubmitting ? (
                        <span className="loading loading-spinner loading-sm"></span>
                      ) : (
                        'Place Order'
                      )}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            
            <div className="space-y-4">
              {cart.order_items.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img 
                    src={item.product.image_url || 'https://via.placeholder.com/50'}
                    alt={item.product.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.product.name}</p>
                    <p className="text-xs text-base-content/70">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            
            <div className="divider"></div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="divider"></div>
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;
