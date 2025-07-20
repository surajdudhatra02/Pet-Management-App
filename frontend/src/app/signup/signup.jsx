"use client";

import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Signup = () => {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup`,
        {
          fname,
          lname,
          email,
          password,
          role,
        }
      );

      setMessage(response.data.message);
      const { token } = response.data;

      if (typeof window !== "undefined") {
        localStorage.setItem("token", token);
      }

      router.push("/login");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "An error occurred during signup"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-20 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-gray-900 text-center">
          Create an Account
        </h2>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <label
                htmlFor="fname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                value={fname}
                onChange={(e) => setFname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="lname"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                value={lname}
                onChange={(e) => setLname(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300"
                required
              />
            </div>

            {message && <div className="text-sm text-red-600">{message}</div>}

            <button
              type="submit"
              className="w-full bg-amber-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-600 transition-colors duration-300 shadow-lg cursor-pointer"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <div className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/login">
                <span className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
                  Login here
                </span>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
