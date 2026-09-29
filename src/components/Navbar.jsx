import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-[#0b0f19]/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 text-white">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        <Link to="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
          ZERO-X TECH
        </Link>
        <div className="flex items-center space-x-6 text-sm font-medium">
          <Link to="/" className="hover:text-cyan-400 transition">Store</Link>
          <Link to="/admin" className="hover:text-cyan-400 transition">Admin Dashboard</Link>
          <Link to="/orders" className="hover:text-cyan-400 transition">Orders</Link>
          <Link to="/login" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-full transition shadow-lg shadow-cyan-500/20">
            Login / Signup
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;