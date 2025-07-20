"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Shield } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login, isAuthenticated, role } = useAuth();

  useEffect(() => {
    if (isAuthenticated && role) {
      router.push(`/dashboard/${role}`);
    }
  }, [isAuthenticated, role, router]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all fields");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    setError("");

    try {
      const { role } = await login(formData.email, formData.password);
      router.push(`/dashboard/${role}`);
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 rounded-full bg-white shadow-lg">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
            </div>
            <h2 className="text-3xl font-bold mb-2 text-gray-900">
              Welcome Back
            </h2>
            <div className="h-1 w-16 bg-amber-500 mx-auto rounded-full mb-4"></div>
            <p className="text-gray-600">Login to your account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-colors"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm mt-2">{error}</div>
              )}

              <button
                type="submit"
                className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors duration-300 shadow-lg hover:shadow-amber-400/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;