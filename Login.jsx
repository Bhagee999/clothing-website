import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.password.trim()) newErrors.password = "Password is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      alert("Login successful");
      navigate("/");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 relative"
      style={{
        backgroundImage:
          "url('https://media.istockphoto.com/id/1341651858/vector/women-enjoy-shopping-in-mall-banner-or-background.jpg?s=612x612&w=0&k=20&c=jURCGlU9c3Xw4RU-RntoEiBlphcqMtf8w-D84w9BDBo=')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-opacity-50"></div>

      {/* Form container */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl shadow-2xl w-full max-w-sm sm:max-w-md lg:max-w-lg relative z-10">
        {/* Welcome message */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-700 mb-2">
            Welcome Back!
          </h1>
          <p className="text-purple-500 text-lg sm:text-xl font-medium">
            Log in to access your favorite styles and exclusive offers
          </p>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-700 mb-8">
          Login
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="relative">
            <FaEnvelope className="absolute left-3 top-3.5 text-purple-400" />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-3.5 text-purple-400" />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full pl-10 pr-4 py-2 border border-purple-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-purple-500 text-white font-semibold py-2 rounded-xl hover:bg-purple-600 transition-colors duration-200"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-center mt-6 text-gray-700">
          Don't have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-600 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
