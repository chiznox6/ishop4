import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, TrendingUp, Shield, Star, ArrowRight, Users, Heart, Play } from 'lucide-react';

function HomePage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { icon: ShoppingBag, number: '96+', label: 'Products' },
    { icon: Star, number: '5', label: 'Categories' },
    { icon: Shield, number: '100%', label: 'Security' },
    { icon: Users, number: '10K+', label: 'Happy Customers' },
  ];

  const features = [
    { icon: ShoppingBag, title: 'Smart Shopping', description: 'Browse 96+ premium products across multiple categories with intelligent search and filtering.', color: 'bg-blue-500/20 text-blue-600' },
    { icon: TrendingUp, title: 'Sales Analytics', description: 'Beautiful dashboard with real-time metrics, charts, and performance insights.', color: 'bg-purple-500/20 text-purple-600' },
    { icon: Shield, title: 'Secure & Fast', description: 'Enterprise-grade security with bcrypt encryption and lightning-fast performance.', color: 'bg-green-500/20 text-green-600' },
  ];
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="hero min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="hero-content text-center">
          <div className="max-w-4xl">
            {/* Brand Logo */}
            <div className="mb-8">
              <div className="avatar">
                <div className="w-24 rounded-full bg-primary text-primary-content flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12" />
                </div>
              </div>
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Welcome to <span className="text-primary">iShop4U</span>
            </h1>
            
            <p className="text-xl lg:text-2xl mb-8 text-gray-300">
              Your premium e-commerce destination with 96+ products, 
              smart analytics, and secure shopping experience.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/shop" className="btn btn-primary btn-lg hover:bg-primary-focus hover:shadow-lg transition-all duration-300">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/dashboard" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900 hover:shadow-lg transition-all duration-300">
                <TrendingUp className="w-5 h-5" />
                View Dashboard
              </Link>
            </div>
            
            {/* Stats */}
            <div className="stats stats-vertical lg:stats-horizontal shadow bg-gray-700 text-white">
              <div className="stat">
                <div className="stat-figure text-primary">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-300">Products</div>
                <div className="stat-value text-primary">96+</div>
                <div className="stat-desc text-gray-400">Premium quality</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-secondary">
                  <Star className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-300">Categories</div>
                <div className="stat-value text-secondary">5</div>
                <div className="stat-desc text-gray-400">Electronics, Fashion & more</div>
              </div>
              
              <div className="stat">
                <div className="stat-figure text-accent">
                  <Shield className="w-8 h-8" />
                </div>
                <div className="stat-title text-gray-300">Security</div>
                <div className="stat-value text-accent">100%</div>
                <div className="stat-desc text-gray-400">Encrypted & secure</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose iShop4U?</h2>
            <p className="text-lg text-gray-300">Built with modern technology for the best shopping experience</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card bg-gray-800 shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <ShoppingBag className="w-16 h-16 text-primary mb-4" />
                <h3 className="card-title mb-4">Smart Shopping</h3>
                <p className="text-gray-300">Browse 96+ premium products across multiple categories with intelligent search and filtering.</p>
              </div>
            </div>
            
            {/* Feature 2 */}
            <div className="card bg-gray-800 shadow-xl hover:shadow-secondary/20 transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <TrendingUp className="w-16 h-16 text-secondary mb-4" />
                <h3 className="card-title mb-4">Sales Analytics</h3>
                <p className="text-gray-300">Beautiful dashboard with real-time metrics, charts, and performance insights.</p>
              </div>
            </div>
            
            {/* Feature 3 */}
            <div className="card bg-gray-800 shadow-xl hover:shadow-accent/20 transition-shadow duration-300">
              <div className="card-body items-center text-center">
                <Shield className="w-16 h-16 text-accent mb-4" />
                <h3 className="card-title mb-4">Secure & Fast</h3>
                <p className="text-gray-300">Enterprise-grade security with bcrypt encryption and lightning-fast performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Shopping?</h2>
          <p className="text-xl mb-8 text-gray-300">
            Join thousands of satisfied customers and experience the future of online shopping.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn btn-secondary btn-lg hover:bg-secondary-focus hover:shadow-lg transition-all duration-300">
              <Heart className="w-5 h-5" />
              Browse Products
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg text-white border-white hover:bg-white hover:text-gray-900 hover:shadow-lg transition-all duration-300">
              <Users className="w-5 h-5" />
              Sign Up Today
            </Link>
          </div>
        </div>
      </section>
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32 bg-gray-950">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-0 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-green-500/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative container mx-auto px-4">
          <div className={`text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Logo/Brand */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-3 p-4 bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-lg">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-white" />
                </div>
                <span className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  iShop4U
                </span>
              </div>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 bg-gradient-to-r from-gray-100 via-blue-300 to-purple-300 bg-clip-text text-transparent leading-tight">
              Shop Smarter,
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Live Better
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
              Experience the future of e-commerce with our comprehensive platform. 
              <span className="font-semibold text-blue-400">Browse, cart, checkout</span> – all in one seamless experience.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/shop" className="group btn btn-lg bg-gradient-to-r from-blue-500 to-purple-500 border-none text-white hover:scale-105 transition-all duration-300 px-8">
                <ShoppingBag className="w-5 h-5" />
                Start Shopping
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dashboard" className="btn btn-lg btn-outline text-white border-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 hover:border-transparent hover:text-white transition-all duration-300 px-8">
                <TrendingUp className="w-5 h-5" />
                View Analytics
              </Link>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center group p-4 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors duration-300">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-black text-gray-100 mb-2">{stat.number}</div>
                    <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 bg-gradient-to-r from-gray-100 to-blue-300 bg-clip-text text-transparent">
              Why Choose iShop4U?
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Built with modern technology and designed for the best shopping experience
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-700">
                    <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-gray-100">{feature.title}</h3>
                    <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                    <div className="mt-6 flex items-center text-blue-400 font-semibold group-hover:translate-x-2 transition-transform duration-300">
                      Learn more <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-blue-700 to-purple-700 relative overflow-hidden text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Ready to Transform Your Shopping?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Join thousands of satisfied customers and experience the future of online shopping today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop" className="btn btn-lg bg-white text-blue-600 hover:bg-gray-100 border-none hover:scale-105 transition-all duration-300 px-8">
              <Play className="w-5 h-5" />
              Get Started Now
            </Link>
            <Link to="/dashboard" className="btn btn-lg btn-outline text-white border-white hover:bg-white hover:text-blue-600 transition-all duration-300 px-8">
              <Users className="w-5 h-5" />
              View Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="flex items-center gap-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <p className="text-lg text-gray-300 mb-8">
              "The best shopping experience I've ever had online. Clean interface, fast checkout, and excellent customer service."
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-100">Sarah Johnson</div>
                <div className="text-sm text-gray-400">Verified Customer</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;