import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare,
  Mail,
  Lock,
  User,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast, Toaster } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/chat");
    }
  }, [navigate]);

  const validateForm = () => {
    if (!name || !email || !password) {
      setError("All fields are required");
      return false;
    }
    if (name.length < 3) {
      setError("Name must be at least 3 characters");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email format");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.data));
        toast.success("Account created successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 500);
      } else {
        setError(data.message || "Registration failed");
        toast.error(data.message || "Registration failed");
      }
    } catch (error) {
      console.log(error);
      setError("Server error. Please try again.");
      toast.error("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen overflow-y-auto flex justify-center items-center bg-gradient-to-br  from-blue-50 via-indigo-50 to-purple-50 p-4">
      <Toaster position="top-center" />

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
            <MessageSquare className="text-white w-10 h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-1">
            Create Account
          </h1>
          <p className="text-gray-600">Join the conversation today</p>
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-white p-8 rounded-2xl shadow-2xl"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Register
          </h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4 flex items-center gap-2">
              <AlertCircle size={20} />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 rounded-lg outline-none focus:border-blue-500 transition text-sm"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 rounded-lg outline-none focus:border-blue-500 transition text-sm"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 rounded-lg outline-none focus:border-blue-500 transition text-sm"
                disabled={loading}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
          {/* <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border-2 border-gray-200 pl-10 pr-4 py-3 rounded-lg outline-none focus:border-purple-500 transition text-sm"
                disabled={loading}
              />
            </div>
          </div> */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform active:scale-95 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </button>

          <p className="text-center mt-6 text-gray-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="text-blue-500 font-semibold hover:underline"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
