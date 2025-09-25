import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { checkSession, logoutUser } from "./services/api"; // Import checkSession and logoutUser
import Layout from "./components/Layout"; // Import the Layout component

// Dashboard components
import Dashboard from "./components/Dashboard";

// Shop pages
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage"; // Import the new page

// Create an AuthContext
export const AuthContext = createContext(null);

// ProtectedRoute component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading authentication...</div>; // Or a spinner
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// LoginRedirect component
const LoginRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <LoginPage />;
};

function AppRoutes() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginRedirect />} />

      {/* Public routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/shop" element={<ShopPage />} />
      <Route path="/dashboard" element={<Dashboard />} /> {/* Dashboard can be public too */}

      {/* Protected routes (for purchasing) */}
      <Route path="/cart" element={<ProtectedRoute><CartPage /></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />

      {/* Redirect any unknown paths to the home page */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifySession = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        const data = await checkSession();
        if (data.id) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data)); // Update localStorage with fresh data
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
      } catch (error) {
        console.error("Session check failed:", error);
        setUser(null);
        localStorage.removeItem("user");
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, []);

  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      localStorage.removeItem("user"); // Clear user from local storage
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      <Layout>
        <AppRoutes />
      </Layout>
    </AuthContext.Provider>
  );
}

export default App;
