import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { getRoleFromToken } from "../utils/auth";
// const Navbar = () => {
//   return (
//     <nav className="bg-[#0b0f19]/90 border-b border-slate-800 backdrop-blur-md sticky top-0 z-50 text-white">
//       <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
//         <Link to="/" className="text-2xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
//           ZERO-X TECH
//         </Link>
//         <div className="flex items-center space-x-6 text-sm font-medium">
//           <Link to="/" className="hover:text-cyan-400 transition">Store</Link>
//           <Link to="/admin" className="hover:text-cyan-400 transition">Admin Dashboard</Link>
//           <Link to="/orders" className="hover:text-cyan-400 transition">Orders</Link>
//           <Link to="/login" className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-5 py-2.5 rounded-full transition shadow-lg shadow-cyan-500/20">
//             Login / Signup
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// };

const Navbar = ({ totalCartCount }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};
  return (
    // <nav className="bg-[#990000] text-white px-6 md:px-8 h-20 flex justify-between items-center sticky top-0 z-50 border-b border-red-900 shadow-md"> 
    //      <Link to="/" className="text-xl font-black tracking-tight text-white">
    //       SAPPHIRE <span className="text-red-200">STORE</span>
    //     </Link>
    //     <div className="flex items-center space-x-6 text-sm font-bold">
    //       <Link to="/" className="hover:text-red-200 transition">
    //         Home
    //       </Link>
    //       <Link to="/products" className="hover:text-red-200 transition">
    //         Products
    //       </Link>
    //       <Link to="/categories" className="hover:text-red-200 transition">
    //         Categories
    //       </Link>
    //       <Link to="/orders" className="hover:text-red-200 transition relative">
    //         Orders
    //         {totalCartCount > 0 && (
    //           <span className="absolute -top-2 -right-4 bg-white text-[#cc0000] text-[10px] font-black px-1.5 py-0.5 rounded-full">
    //             {totalCartCount}
    //           </span>
    //         )}
    //       </Link>
    //       {getRoleFromToken() === "admin" && (
    //         <Link to="/admin" className="hover:text-red-200 transition">
    //           Dashboard
    //         </Link>
    //       )}
    //       {/* <Link to="/admin" className="hover:text-red-200 transition">
    //         Dashboard
    //       </Link> */}

    //       <button
    //         onClick={() => {
    //           localStorage.removeItem("token");
    //           window.location.href = "/login";
    //         }}
    //         className="border border-white/40 hover:bg-white/10 text-white px-5 py-2 rounded-full font-black transition text-xs shadow-sm"
    //       >
    //         Logout
    //       </button> 
    //     </div>  
    //    </nav> 
    <nav className="bg-[#990000] text-white px-6 md:px-8 h-20 flex justify-between items-center sticky top-0 z-50 border-b border-red-900 shadow-md">
  <Link to="/" className="text-xl font-black tracking-tight text-white">
    SAPPHIRE <span className="text-red-200">STORE</span>
  </Link>

  {/* Desktop menu */}
  <div className="hidden md:flex items-center space-x-6 text-sm font-bold">
    <Link to="/" className="hover:text-red-200 transition">Home</Link>
    <Link to="/products" className="hover:text-red-200 transition">Products</Link>
    <Link to="/categories" className="hover:text-red-200 transition">Categories</Link>
    <Link to="/orders" className="hover:text-red-200 transition relative">
      Orders
      {totalCartCount > 0 && (
        <span className="absolute -top-2 -right-4 bg-white text-[#cc0000] text-[10px] font-black px-1.5 py-0.5 rounded-full">
          {totalCartCount}
        </span>
      )}
    </Link>
    {getRoleFromToken() === "admin" && (
      <Link to="/admin" className="hover:text-red-200 transition">Dashboard</Link>
    )}
    <button
      onClick={handleLogout}
      className="border border-white/40 hover:bg-white/10 text-white px-5 py-2 rounded-full font-black transition text-xs shadow-sm"
    >
      Logout
    </button>
  </div>

  {/* Hamburger button (mobile only) */}
  <button
    onClick={() => setMenuOpen(!menuOpen)}
    className="md:hidden p-2 rounded-md hover:bg-white/10 transition"
    aria-label="Toggle menu"
  >
    {menuOpen ? (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    ) : (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )}
  </button>

  {/* Mobile menu */}
  {menuOpen && (
    <div className="md:hidden absolute top-full left-0 w-full bg-[#990000] border-b border-red-900 shadow-md flex flex-col px-6 py-4 space-y-4 text-sm font-bold">
      <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-red-200 transition">Home</Link>
      <Link to="/products" onClick={() => setMenuOpen(false)} className="hover:text-red-200 transition">Products</Link>
      <Link to="/categories" onClick={() => setMenuOpen(false)} className="hover:text-red-200 transition">Categories</Link>
      <Link to="/orders" onClick={() => setMenuOpen(false)} className="hover:text-red-200 transition flex items-center gap-2">
        Orders
        {totalCartCount > 0 && (
          <span className="bg-white text-[#cc0000] text-[10px] font-black px-1.5 py-0.5 rounded-full">
            {totalCartCount}
          </span>
        )}
      </Link>
      {getRoleFromToken() === "admin" && (
        <Link to="/admin" onClick={() => setMenuOpen(false)} className="hover:text-red-200 transition">Dashboard</Link>
      )}
      <button
        onClick={handleLogout}
        className="border border-white/40 hover:bg-white/10 text-white px-5 py-2 rounded-full font-black transition text-xs shadow-sm w-fit"
      >
        Logout
      </button>
    </div>
  )}
</nav>
  )
}


export default Navbar;