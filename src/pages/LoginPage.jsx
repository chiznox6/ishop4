import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser, signupUser } from "../services/api";
// import BusinessOverview from '../components/BusinessOverview'; // Import BusinessOverview (commented out)

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle between login and signup
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const data = await loginUser(values.username, values.password);
        if (data.id) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/shop");
        } else {
          setError(data.error || "Login failed");
        }
      } catch (err) {
        setError("Network error or server unavailable");
        console.error("Login error:", err);
      }
    },
  });

  const signupFormik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Required"),
    }),
    onSubmit: async (values) => {
      setError("");
      try {
        const data = await signupUser(values.username, values.email, values.password);
        if (data.id) {
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/shop");
        } else {
          setError(data.error || "Signup failed");
        }
      } catch (err) {
        setError("Network error or server unavailable");
        console.error("Signup error:", err);
      }
    },
  });

  return (
    <div className="min-h-screen bg-base-200 flex flex-col lg:flex-row items-center justify-center p-8">
      {/* Left Section: Marketing/Brand Message */}
      <div className="w-full lg:w-1/2 max-w-3xl lg:mr-12 mb-12 lg:mb-0 flex flex-col items-center justify-center">
        <h1 className="text-6xl font-black text-primary mb-6 tracking-widest animate-pulse font-serif">
          iShop4U
        </h1>
        <p className="text-base-content text-lg text-center mb-8 max-w-md leading-relaxed">
          Your one-stop shop for amazing products and seamless shopping experience. Explore, discover, and manage your inventory with ease.
        </p>
      </div>

      {/* Right Section: Login/Signup Card */}
      <div className="card bg-base-100 shadow-xl w-full lg:w-1/2 max-w-md transform transition-all duration-500 hover:scale-105">
        <div className="card-body p-10">
          <h2 className="text-3xl font-bold text-base-content mb-8 text-center tracking-wide">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>

          {error && (
            <p className="text-error mb-4 text-center font-semibold animate-pulse">
              {error}
            </p>
          )}

          {isLogin ? (
            <form onSubmit={loginFormik.handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  value={loginFormik.values.username}
                  placeholder="Your username"
                  className="input input-bordered w-full"
                  required
                />
                {loginFormik.touched.username && loginFormik.errors.username ? (
                  <div className="text-error text-sm mt-1">{loginFormik.errors.username}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={loginFormik.handleChange}
                  onBlur={loginFormik.handleBlur}
                  value={loginFormik.values.password}
                  placeholder="********"
                  className="input input-bordered w-full"
                  required
                />
                {loginFormik.touched.password && loginFormik.errors.password ? (
                  <div className="text-error text-sm mt-1">{loginFormik.errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={loginFormik.isSubmitting}
              >
                {loginFormik.isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Login"
                )}
              </button>
            </form>
          ) : (
            <form onSubmit={signupFormik.handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.username}
                  placeholder="Choose a username"
                  className="input input-bordered w-full"
                  required
                />
                {signupFormik.touched.username && signupFormik.errors.username ? (
                  <div className="text-error text-sm mt-1">{signupFormik.errors.username}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.email}
                  placeholder="your@email.com"
                  className="input input-bordered w-full"
                  required
                />
                {signupFormik.touched.email && signupFormik.errors.email ? (
                  <div className="text-error text-sm mt-1">{signupFormik.errors.email}</div>
                ) : null}
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-content">Password</span>
                </label>
                <input
                  type="password"
                  name="password"
                  onChange={signupFormik.handleChange}
                  onBlur={signupFormik.handleBlur}
                  value={signupFormik.values.password}
                  placeholder="********"
                  className="input input-bordered w-full"
                  required
                />
                {signupFormik.touched.password && signupFormik.errors.password ? (
                  <div className="text-error text-sm mt-1">{signupFormik.errors.password}</div>
                ) : null}
              </div>

              <button
                type="submit"
                className="btn btn-primary w-full"
                disabled={signupFormik.isSubmitting}
              >
                {signupFormik.isSubmitting ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Sign Up"
                )}
              </button>
            </form>
          )}

          <p className="mt-6 text-center text-base-content text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span
              className="text-primary underline cursor-pointer hover:text-primary-focus"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;