import { EyeOff, Eye} from 'lucide-react';
import { useState } from "react";
import axios from "axios";
function LoginView() {
  const apiUrl = import.meta.env.VITE_BACKENED_API_URL;
  const [isSignup, setIsSignup] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isSignup
      ? `${apiUrl}/api/auth/signup`
      : `${apiUrl}/api/auth/login`;
    try {
      const res = await axios.post(endpoint, form);
      if (!isSignup && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setMessage("Login successful! Redirecting...");
        window.location.href = "/";
      } else {
        setMessage("Registration successful! Please login.");
        setIsSignup(false);
      }
      setForm({ email: "", password: "" });
    } catch (err) {
      setMessage("Error: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="min-h-screen bg-[#990000] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="mb-8">
            <span className="text-xs font-black tracking-widest text-[#cc0000] uppercase">
              Sapphire Store
            </span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">
              {isSignup ? "Create Account" : "Welcome back"}
            </h2>
            <p className="text-slate-600 text-xs mt-1 font-medium">
              Please enter your details to proceed.
            </p>
          </div>

          {message && (
            <div className="mb-6 p-3 rounded-xl bg-slate-100 border border-slate-300 text-slate-800 text-xs text-center font-bold">
              {message}
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignup && (
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                  required
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                Email address
              </label>
              <input
                type="email"
                placeholder="user@gmail.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#cc0000]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  {/* <Eye size={20} /> */}
                </button>
              </div>

              {/* <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm focus:outline-none focus:border-[#cc0000]"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-[#cc0000]"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div> */}
            </div>
            <button
              type="submit"
              className="w-full bg-[#cc0000] hover:bg-[#990000] text-white font-black py-3 rounded-xl text-sm transition shadow"
            >
              {isSignup ? "Sign Up" : "Sign in"}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsSignup(!isSignup)}
                className="text-xs font-black text-slate-700 hover:underline"
              >
                {isSignup
                  ? "Already have an account? Sign in"
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
