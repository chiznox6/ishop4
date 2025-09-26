import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signupUser } from "../services/api";
import { AuthContext } from "../App";

function SignupPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);
      try {
        const userData = await signupUser(values.username, values.email, values.password);
        setUser(userData); // Set the user in AuthContext
        localStorage.setItem("user", JSON.stringify(userData)); // Also update localStorage
        navigate("/"); // Redirect to home page on successful signup
      } catch (err) {
        setError(err.message || "Signup failed");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Sign Up for iShop4U</h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="form-control">
            <label htmlFor="username" className="label">
              <span className="label-text text-gray-300">Username</span>
            </label>
            <input
              type="text"
              id="username"
              placeholder="Choose a username"
              className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary ${
                formik.touched.username && formik.errors.username ? 'input-error' : ''
              }`}
              {...formik.getFieldProps("username")}
            />
            {formik.touched.username && formik.errors.username ? (
              <label className="label">
                <span className="label-text-alt text-red-400">{formik.errors.username}</span>
              </label>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="email" className="label">
              <span className="label-text text-gray-300">Email</span>
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email address"
              className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary ${
                formik.touched.email && formik.errors.email ? 'input-error' : ''
              }`}
              {...formik.getFieldProps("email")}
            />
            {formik.touched.email && formik.errors.email ? (
              <label className="label">
                <span className="label-text-alt text-red-400">{formik.errors.email}</span>
              </label>
            ) : null}
          </div>
          <div className="form-control">
            <label htmlFor="password" className="label">
              <span className="label-text text-gray-300">Password</span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="Choose a password"
              className={`input input-bordered w-full bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary ${
                formik.touched.password && formik.errors.password ? 'input-error' : ''
              }`}
              {...formik.getFieldProps("password")}
            />
            {formik.touched.password && formik.errors.password ? (
              <label className="label">
                <span className="label-text-alt text-red-400">{formik.errors.password}</span>
              </label>
            ) : null}
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full mt-6 hover:bg-primary-focus transition-all duration-300"
            disabled={loading || !formik.isValid || !formik.dirty}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
          {error && <p className="text-red-400 text-center mt-4">{error}</p>}
        </form>
        <p className="text-center text-gray-400 mt-6">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SignupPage;
