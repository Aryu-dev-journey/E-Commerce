import React, { useState } from "react";
import axios from "axios";

export default function BlackWhiteSignPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  function handleChange(e) {
    setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    // Basic validation
    if (!form.email || !form.password) {
      alert("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (isSignUp && !form.name) {
      alert("Please enter your name");
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email address");
      setLoading(false);
      return;
    }

    // Password strength check
    if (form.password.length < 8) {
      alert("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isSignUp
        ? "http://localhost:3000/api/register"
        : "http://localhost:3000/api/login";

      const response = await axios.post(endpoint, form);
      
      if (response.status === 200 || response.status === 201) {
        alert(isSignUp ? "Registration successful" : "Login successful");
        
        // Store user data in React state (NOT localStorage)
        const user = {
          name: isSignUp ? form.name : response.data.user?.name || form.email.split('@')[0],
          email: form.email,
          token: response.data.token,
          ...response.data.user
        };
        
        setUserData(user);
        setIsLoggedIn(true);
      }
      
      setForm({ name: "", email: "", password: "" });
    } catch (error) {
      console.error("Request failed:", error);
      if (error.response) {
        alert(error.response.data.message || error.response.data.error || "Something went wrong");
      } else {
        alert("Network error. Please check if the server is running.");
      }
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserData(null);
    setForm({ name: "", email: "", password: "" });
  }

  // If logged in, show account page
  if (isLoggedIn && userData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
        <div className="w-full max-w-2xl p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white text-black flex items-center justify-center font-bold text-2xl">
              {userData.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <h1 className="text-3xl font-bold mb-2">Welcome back!</h1>
            <p className="text-gray-400">{userData.email}</p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Name</p>
              <p className="text-lg font-semibold">{userData.name}</p>
            </div>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-sm text-gray-400 mb-1">Email</p>
              <p className="text-lg font-semibold">{userData.email}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-white text-black font-semibold hover:opacity-90 transition"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">

        {/* Left Section */}
        <aside className="hidden md:flex flex-col justify-center items-start gap-6 p-8 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center font-bold">M</div>
          </div>

          <h3 className="text-3xl font-bold leading-tight">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h3>

          <p className="text-gray-300 max-w-xs">
            {isSignUp
              ? "Join our minimalist community — simple, private, and elegant."
              : "Sign in to continue to your account and access exclusive minimal picks."}
          </p>

          <ul className="mt-4 text-sm text-gray-400 space-y-2">
            <li>• Clean, distraction-free shopping</li>
            <li>• Privacy-first — no spam</li>
            <li>• Fast checkout & returns</li>
          </ul>
        </aside>

        {/* Right Section */}
        <main className="p-8 rounded-2xl bg-white/3 border border-white/10 backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-extrabold">
              {isSignUp ? "Sign up" : "Sign in"}
            </h1>

            <button
              onClick={() => setIsSignUp((s) => !s)}
              className="text-sm py-1 px-3 rounded-full border border-white/20 hover:bg-white/5 transition"
            >
              {isSignUp ? "Have an account?" : "Create account"}
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isSignUp && (
              <label className="block">
                <span className="text-sm text-gray-200">Full name</span>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-white/30 transition"
                  placeholder="Jane Doe"
                />
              </label>
            )}

            <label className="block">
              <span className="text-sm text-gray-200">Email</span>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
                className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-white/30 transition"
                placeholder="you@example.com"
              />
            </label>

            <label className="block relative">
              <span className="text-sm text-gray-200">Password</span>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                required
                minLength="8"
                className="mt-2 w-full p-3 rounded-lg bg-black/40 border border-white/10 focus:outline-none focus:border-white/30 transition"
                placeholder="••••••••"
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-9 text-xs opacity-70 hover:opacity-100 transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </label>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input type="checkbox" className="w-4 h-4" /> <span>Remember me</span>
              </label>

              {!isSignUp && (
                <a href="#" className="text-sm text-gray-300 hover:underline">
                  Forgot password?
                </a>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold shadow-sm transition ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-white text-black hover:opacity-95'
              }`}
            >
              {loading ? "Please wait..." : isSignUp ? "Create account" : "Sign in"}
            </button>

            <div className="text-center text-sm text-gray-400">or</div>

            <div className="grid grid-cols-1 gap-3">
              <button type="button" className="w-full py-3 rounded-full border border-white/10 bg-black/20 hover:bg-black/30 transition">
                Continue with Google
              </button>
              <button type="button" className="w-full py-3 rounded-full border border-white/10 bg-black/20 hover:bg-black/30 transition">
                Continue with Apple
              </button>
            </div>

            <p className="text-xs text-gray-400 text-center mt-4">
              By continuing you agree to our <a href="#" className="underline">Terms</a> and{" "}
              <a href="#" className="underline">Privacy Policy</a>.
            </p>
          </form>
        </main>
      </div>

      <footer className="absolute bottom-6 text-xs text-gray-600">© 2025 Monochrome</footer>
    </div>
  );
}