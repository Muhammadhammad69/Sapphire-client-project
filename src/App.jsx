import React, { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router-dom";
import axios from "axios";

import { getRoleFromToken } from "./utils/auth";
import { useProducts } from "./context/ProductContext";
import LoginView from "./components/Auth";
import Navbar from "./components/Navbar";






function StoreFront() {
  const { products, loading } = useProducts();

  const displayProducts = products;
  const [currentBanner, setCurrentBanner] = useState(0);

  const banners = [
    {
      title: "SAPPHIRE NITRO",
      subtitle: "Pakistan's first tech gear & audio innovation lab.",
      tag: "New Arrivals",
      bg: "from-[#990000] via-[#cc0000] to-[#550000]",
    },
    {
      title: "JEWEL PRO",
      subtitle: "Smart tech, tailored for her.",
      tag: "Sapphire Luxury",
      bg: "from-[#b30000] via-[#e60000] to-[#660000]",
    },
    {
      title: "THUNDER PRO",
      subtitle: "Pakistan's loudest sound, boxed and ready.",
      tag: "Sapphire Audio",
      bg: "from-[#800000] via-[#b30000] to-[#400000]",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col justify-between">
      <div>
        <div className="w-full bg-[#990000]">
          <div
            className={`w-full overflow-hidden shadow-2xl bg-gradient-to-br ${banners[currentBanner].bg} text-white transition-all duration-700 relative min-h-[540px] md:min-h-[600px] flex items-center`}
          >
            <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:18px_18px] pointer-events-none"></div>

            <span className="absolute -bottom-8 left-0 text-[8rem] md:text-[12rem] font-black text-white/[0.06] tracking-tighter whitespace-nowrap select-none pointer-events-none leading-none">
              SAPPHIRE SAPPHIRE
            </span>

            <div className="max-w-7xl mx-auto grid grid-cols-1 w-full p-8 md:p-16 items-center z-10 gap-10">
              <div className="space-y-7 text-center md:text-left">
                <span className="bg-white text-[#cc0000] text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md inline-block">
                  {banners[currentBanner].tag}
                </span>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.95] text-white drop-shadow-sm">
                  {banners[currentBanner].title}
                </h1>
                <p className="text-white text-sm md:text-base max-w-md leading-relaxed font-medium mx-auto md:mx-0">
                  {banners[currentBanner].subtitle}
                </p>
                <div>
                  <Link
                    to="/products"
                    className="inline-block bg-white hover:bg-slate-100 text-[#cc0000] text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition shadow-xl transform hover:scale-105"
                  >
                    Explore Collection
                  </Link>
                </div>
              </div>
            </div>

            <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3 z-20">
              {banners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBanner(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${currentBanner === index ? "w-9 bg-white" : "w-2 bg-white/50"}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Featured Products */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="flex justify-between items-end mb-10 border-b border-slate-200 pb-5">
            <div>
              <span className="text-[#cc0000] text-xs font-black uppercase tracking-widest">
                New drops
              </span>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
                Featured tech
              </h2>
            </div>
            <Link
              to="/products"
              className="text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-[#cc0000] transition"
            >
              View all &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {loading ? (
              <div className="col-span-full text-center text-[#cc0000] font-bold">
                Loading products...
              </div>
            ) : (
              displayProducts.map((product) => {
                const productId = product.id || product._id;
                return (
                  <div
                    key={productId || product.title}
                    className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between group"
                  >
                    <Link to={`/product/${productId || product.title}`}>
                      <div className="h-52 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                        <span className="absolute top-3 right-3 bg-[#cc0000] text-white text-[10px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider z-10">
                          New
                        </span>
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          />
                        ) : (
                          <span className="text-slate-400 text-xs font-medium">
                            No Image
                          </span>
                        )}
                      </div>
                      <div className="p-5">
                        <span className="text-[10px] font-black uppercase text-[#cc0000] bg-red-50 px-2.5 py-1 rounded-md tracking-wide">
                          {product.category || "Tech"}
                        </span>
                        <h3 className="text-base font-black text-slate-900 mt-2 mb-1">
                          {product.title}
                        </h3>
                        <p className="text-slate-600 text-xs line-clamp-2 leading-relaxed font-medium">
                          {product.description}
                        </p>
                      </div>
                    </Link>
                    <div className="p-5 bg-white border-t border-slate-100 flex justify-between items-center">
                      <div>
                        <span className="text-[10px] text-slate-400 line-through block font-medium">
                          Rs.14,999
                        </span>
                        <span className="text-lg font-black text-slate-900">
                          ${product.price}
                        </span>
                      </div>
                      <Link
                        to={`/product/${productId || product.title}`}
                        className="bg-[#cc0000] hover:bg-[#990000] text-white text-xs font-black uppercase tracking-wider px-5 py-3 rounded-full transition shadow-md active:scale-95 inline-block text-center"
                      >
                        BUY NOW
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Delivery cities */}
        <div className="bg-white py-20 px-6 border-t border-slate-100">
          <div className="max-w-7xl mx-auto text-center mb-12">
            <span className="text-[#cc0000] text-xs font-black uppercase tracking-widest">
              Nationwide delivery
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight mt-2">
              Wherever you are in Pakistan
            </h2>
          </div>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-4">
            {["Karachi", "Lahore", "Islamabad", "Faisalabad", "Multan"].map(
              (city) => (
                <div
                  key={city}
                  className="bg-red-50 border border-red-100 rounded-2xl py-6 text-center hover:bg-[#cc0000] hover:text-white transition cursor-default text-slate-800 font-bold"
                >
                  <span className="text-sm">{city}</span>
                </div>
              ),
            )}
          </div>
        </div>

        {/* Closing CTA */}
        <div className="relative bg-[#990000] text-white py-24 px-6 overflow-hidden">
          <div className="relative max-w-3xl mx-auto text-center">
            <span className="text-white text-xs font-black uppercase tracking-widest bg-white/20 px-3 py-1 rounded-full">
              Level up
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight mt-4 leading-[0.95] text-white">
              Your setup deserves better
            </h2>
            <p className="text-white/90 mt-4 max-w-md mx-auto text-sm font-medium">
              Premium gear, fast delivery, and a warranty that actually means
              something.
            </p>
            <Link
              to="/products"
              className="inline-block mt-8 bg-white text-[#cc0000] hover:bg-slate-100 text-xs font-black uppercase tracking-widest px-8 py-4 rounded-full transition transform hover:scale-105 shadow-xl"
            >
              Shop now
            </Link>
          </div>
        </div>
      </div>

      <footer className="bg-[#400000] text-white pt-16 px-8 border-t border-red-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div>
            <h3 className="text-lg font-black tracking-tight mb-3 text-white">
              Sapphire Store
            </h3>
            <p className="text-white/80 text-xs leading-relaxed font-medium">
              Your ultimate destination for high-end tech gear, audio equipment,
              and workspace accessories.
            </p>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-red-200 mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-white/80 font-medium">
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-white transition">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/categories" className="hover:text-white transition">
                  Categories
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-red-200 mb-3">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-white/80 font-medium">
              <li>
                <Link to="/orders" className="hover:text-white transition">
                  Orders
                </Link>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  Shipping Policy
                </span>
              </li>
              <li>
                <span className="hover:text-white cursor-pointer">
                  Returns & Warranty
                </span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-red-200 mb-3">
              Newsletter
            </h4>
            <p className="text-white/80 text-xs mb-3 font-medium">
              Subscribe to get special offers and new tech drops.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white/10 border border-white/20 text-xs px-3 py-2.5 rounded-l-xl text-white focus:outline-none w-full placeholder:text-white/50 font-medium"
              />
              <button className="bg-white text-[#cc0000] text-xs font-black px-4 py-2.5 rounded-r-xl hover:bg-slate-100 transition">
                Join
              </button>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-6 border-t border-red-900/50 text-center text-xs text-white/70 pb-6 font-medium">
          &copy; 2026 Sapphire Store. All rights reserved. Built with React &
          Node.js.
        </div>
      </footer>
    </div>
  );
}

function ProductDetailView({ addToCart }) {
  const {products, loading} = useProducts();
  const { id } = useParams();
  const navigate = useNavigate();
  const displayProducts =
    products ;

  const product =
    displayProducts.find(
      (p) => String(p.id || p._id) === String(id) || p.title === id,
    ) || displayProducts[0];

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");

  const handleAddToCart = () => {
    addToCart({ ...product, quantity, color: selectedColor });
    navigate("/orders");
  };

  const handleBuyNow = () => {
    addToCart({ ...product, quantity, color: selectedColor });
    navigate("/orders");
  };
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center text-[#cc0000] font-bold">
      Loading product details...
    </div>
  );
  return (
    <div className="min-h-screen bg-white py-12 px-4 md:px-12 text-slate-900">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-xs font-bold text-slate-500 hover:text-[#cc0000] mb-8 transition"
        >
          &larr; Back to products
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <div className="bg-slate-100 rounded-3xl overflow-hidden p-6 border border-slate-200 flex items-center justify-center relative min-h-[400px]">
            <span className="absolute top-4 left-4 bg-[#cc0000] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider">
              Trending
            </span>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-96 object-cover rounded-2xl shadow-md"
            />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-amber-500 text-sm">★★★★★</span>
                <span className="text-xs font-bold text-slate-500">
                  3409 reviews
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
                {product.title}
              </h1>
              <p className="text-slate-600 text-xs font-bold mt-1 uppercase tracking-wide">
                {product.category || "Tech Gear"} | High Quality
              </p>
            </div>

            <div className="flex items-baseline space-x-4">
              <span className="text-2xl font-black text-slate-950">
                ${product.price}
              </span>
              <span className="text-sm text-slate-400 line-through">
                Rs.14,499
              </span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-1 rounded-md uppercase">
                76% OFF
              </span>
            </div>

            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-2.5 rounded-xl text-xs font-bold">
              Sale Might End In 00h 11m 42s &bull; 1438+ People viewed this in
              the last 7 days
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-slate-700 mb-2">
                Color: <span className="text-[#cc0000]">{selectedColor}</span>
              </label>
              <div className="flex space-x-3">
                {["Black", "Grey", "Silver"].map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition ${selectedColor === col ? "border-[#cc0000] bg-red-50 text-[#cc0000]" : "border-slate-200 bg-white text-slate-700"}`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-b border-slate-200 py-4 space-y-2">
              <h3 className="text-xs font-black uppercase tracking-wider text-slate-900">
                Description
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {product.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Quantity
              </span>
              <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 font-bold hover:bg-slate-200 transition"
                >
                  -
                </button>
                <span className="px-4 text-xs font-black">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 font-bold hover:bg-slate-200 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <button
                onClick={handleAddToCart}
                className="w-full bg-white hover:bg-slate-50 text-slate-900 border-2 border-slate-900 text-xs font-black uppercase tracking-wider py-4 rounded-full transition shadow-sm active:scale-95"
              >
                Add To Cart
              </button>
              <button
                onClick={handleBuyNow}
                className="w-full bg-slate-900 hover:bg-slate-950 text-white text-xs font-black uppercase tracking-wider py-4 rounded-full transition shadow-lg active:scale-95"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductsView() {
  const { products, loading } = useProducts();
  const displayProducts = products;
  if(loading) return <div className="min-h-full flex items-center justify-center text-center text-[#cc0000] font-bold">
                Loading products...
              </div>
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <div className="mb-10">
        <span className="text-[#cc0000] text-xs font-black uppercase tracking-widest">
          Full catalog
        </span>
        <h2 className="text-3xl font-black mb-0 text-slate-900 tracking-tight mt-1">
          All Products
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-full text-center text-[#cc0000] font-bold">
            Loading products...
          </div>
        ) : (
          displayProducts.map((p) => {
            const productId = p.id || p._id;
            return (
              <div
                key={productId || p.title}
                className="bg-white border border-slate-200 rounded-3xl p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <Link to={`/product/${productId || p.title}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-40 w-full object-cover rounded-2xl mb-4 bg-slate-100"
                  />
                  <span className="text-[10px] font-black uppercase bg-red-50 text-[#cc0000] px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <h3 className="font-black text-slate-900 mt-2">{p.title}</h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium">
                    {p.description}
                  </p>
                </Link>
                <div className="mt-4 flex justify-between items-center">
                  <span className="font-black text-slate-900">${p.price}</span>
                  <Link
                    to={`/product/${productId || p.title}`}
                    className="bg-[#cc0000] hover:bg-[#990000] text-white text-xs font-bold px-4 py-2.5 rounded-full transition shadow"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}




function CategoriesView() {
  const { products, loading } = useProducts();
  const [displayProducts, setDisplayProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
 
  // ---- carousel drag logic (hooks hamesha early return se pehle) ----
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
 
  const onPointerDown = (e) => {
    // touch ka scroll browser khud karta hai, yahan sirf mouse drag
    if (e.pointerType !== "mouse") return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: trackRef.current.scrollLeft,
      moved: false,
    };
    // NOTE: yahan setPointerCapture nahi lagana, warna click button tak
    // pohanchta hi nahi (category click kaam nahi karta)
  };
 
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (!d.moved && Math.abs(dx) > 5) {
      // asli drag shuru hua, ab capture karo
      d.moved = true;
      trackRef.current.setPointerCapture(e.pointerId);
      setIsDragging(true);
    }
    if (d.moved) trackRef.current.scrollLeft = d.startScroll - dx;
  };
 
  const endDrag = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setIsDragging(false);
    if (trackRef.current.hasPointerCapture?.(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };
  // -------------------------------------------------------------------
 
  // pehli dafa page khule aur koi category select na ho to random category ke products dikhao
  useEffect(() => {
    if (loading || selectedCategory !== null || !products?.length) return;
    const cats = [...new Set(products.map((p) => p.category))];
    const random = cats[Math.floor(Math.random() * cats.length)];
    setSelectedCategory(random);
    setDisplayProducts(products.filter((p) => p.category === random));
  }, [loading, products, selectedCategory]);
 
  if (loading)
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center text-[#cc0000] font-bold px-4">
        Loading categories...
      </div>
    );
 
  const categoriesList = [...new Set(products.map((p) => p.category))];
 
  const handleCategoryClick = (category) => {
    // drag ke baad galti se click na ho
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    setSelectedCategory(category);
    setDisplayProducts(products.filter((p) => p.category === category));
  };
 
  return (
    <div className="w-full min-w-0 max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-16 overflow-x-clip">
      {/* scrollbar hide (Tailwind version se independent) */}
      <style>{`
        .category-track { scrollbar-width: none; -ms-overflow-style: none; }
        .category-track::-webkit-scrollbar { display: none; width: 0; height: 0; }
      `}</style>
      <div className="mb-6 sm:mb-8">
        <span className="text-[#cc0000] text-xs font-black uppercase tracking-widest">
          Browse
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
          Categories
        </h2>
      </div>
 
      {/* Category carousel (sirf naam) */}
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        // mobile par carousel screen ke edge tak jaye (-mx-4 px-4)
        className={`category-track  px-4 sm:mx-0 sm:px-0 w-auto max-w-full min-w-0 flex gap-2 sm:gap-3 overflow-x-auto overscroll-x-contain pb-2 mb-8 sm:mb-10 select-none
          ${isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-proximity"}`}
      >
        {categoriesList.map((cat) => {
          const active = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryClick(cat)}
              className="group flex shrink-0 snap-start flex-col items-center gap-2 focus:outline-none"
            >
              <span
                className={`bg-red-50 border border-red-100 px-3 sm:px-4 py-1.5 sm:py-2 rounded-3xl text-center whitespace-nowrap transition cursor-pointer font-bold text-xs sm:text-sm ${
                  active
                    ? "text-[#cc0000]"
                    : "text-slate-900 group-hover:text-[#cc0000]"
                }`}
              >
                <p>{cat}</p>
              </span>
            </button>
          );
        })}
      </div>
 
      {/* Products */}
      {selectedCategory === null ? (
        <p className="text-center text-slate-500 text-sm font-medium py-10">
          Products dekhne ke liye koi category select karo.
        </p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {displayProducts.map((p) => {
            const productId = p.id || p._id;
            return (
              <div
                key={productId || p.title}
                className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-3 sm:p-4 hover:shadow-xl hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <Link to={`/product/${productId || p.title}`}>
                  <img
                    src={p.image}
                    alt={p.title}
                    className="h-28 sm:h-40 w-full object-cover rounded-xl sm:rounded-2xl mb-3 sm:mb-4 bg-slate-100"
                  />
                  <span className="text-[10px] font-black uppercase bg-red-50 text-[#cc0000] px-2 py-0.5 rounded">
                    {p.category}
                  </span>
                  <h3 className="font-black text-slate-900 mt-2 text-sm sm:text-base line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-600 mt-1 font-medium line-clamp-2">
                    {p.description}
                  </p>
                </Link>
                <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <span className="font-black text-slate-900">${p.price}</span>
                  <Link
                    to={`/product/${productId || p.title}`}
                    className="bg-[#cc0000] hover:bg-[#990000] text-white text-xs font-bold px-4 py-2 sm:py-2.5 rounded-full transition shadow text-center"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}



function OrdersView({ cart, updateQuantity, removeFromCart, setCart }) {
  const apiUrl = import.meta.env.VITE_BACKENED_API_URL;
  const [form, setForm] = useState({
    email: "",
    country: "Pakistan",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    shippingMethod: "Free Delivery",
    paymentMethod: "Cash on Delivery (COD)",
  });
  const [successMsg, setSuccessMsg] = useState("");

  const subtotal = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0,
  );
  const totalAmount = subtotal;

  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    try {
      const fullCustomerName = `${form.firstName} ${form.lastName}`.trim();
      const fullAddress = `${form.address}, ${form.city} - ${form.postalCode || "N/A"} (${form.country}) [Email: ${form.email}, Phone: ${form.phone}, Payment: ${form.paymentMethod}]`;

      await axios.post(`${apiUrl}/api/orders`, {
        customerName: fullCustomerName || "Guest Customer",
        shippingAddress: fullAddress,
        totalAmount,
        items: cart,
      });
      setSuccessMsg("Order placed successfully! Recorded in database.");
      setCart([]);
      setForm({
        email: "",
        country: "Pakistan",
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        postalCode: "",
        phone: "",
        shippingMethod: "Free Delivery",
        paymentMethod: "Cash on Delivery (COD)",
      });
      setTimeout(() => setSuccessMsg(""), 4000);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to place order: " + (err.response?.data?.error || err.message),
      );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="text-[#cc0000] text-xs font-black uppercase tracking-widest">
            Checkout
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
            Secure Checkout
          </h2>
        </div>

        {successMsg && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 text-sm font-bold rounded-2xl text-center">
            {successMsg}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <form onSubmit={handleCheckout} className="space-y-6">
              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3">
                  Contact
                </h3>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3">
                  Delivery
                </h3>
                <div className="space-y-3">
                  <select
                    value={form.country}
                    onChange={(e) =>
                      setForm({ ...form, country: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                  >
                    <option value="Karachi">Karachi</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Multan">Multan</option>
                  </select>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="First name"
                      value={form.firstName}
                      onChange={(e) =>
                        setForm({ ...form, firstName: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={form.lastName}
                      onChange={(e) =>
                        setForm({ ...form, lastName: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                      required
                    />
                  </div>

                  <input
                    type="text"
                    placeholder="Address (House/Street, Landmark)"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) =>
                        setForm({ ...form, city: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Postal code (optional)"
                      value={form.postalCode}
                      onChange={(e) =>
                        setForm({ ...form, postalCode: e.target.value })
                      }
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    />
                  </div>

                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => {
                      const numericValue = e.target.value.replace(/\D/g, "");
                      setForm({ ...form, phone: numericValue });
                    }}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-3">
                  Shipping method
                </h3>
                <div className="border border-slate-200 rounded-xl p-4 flex justify-between items-center bg-slate-50">
                  <span className="text-xs font-bold text-slate-800">
                    Free Delivery
                  </span>
                  <span className="text-xs font-black text-slate-900">
                    FREE
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-1">
                  Payment
                </h3>
                <p className="text-xs text-slate-600 mb-3 font-medium">
                  All transactions are secure and encrypted.
                </p>
                <div className="space-y-3">
                  <label
                    className={`border rounded-xl p-4 flex items-center space-x-3 cursor-pointer ${form.paymentMethod === "Cash on Delivery (COD)" ? "border-[#cc0000] bg-red-50" : "border-slate-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === "Cash on Delivery (COD)"}
                      onChange={() =>
                        setForm({
                          ...form,
                          paymentMethod: "Cash on Delivery (COD)",
                        })
                      }
                      className="accent-[#cc0000]"
                    />
                    <span className="text-xs font-black text-slate-900">
                      Cash on Delivery (COD)
                    </span>
                  </label>
                  <label
                    className={`border rounded-xl p-4 flex items-center space-x-3 cursor-pointer ${form.paymentMethod === "PAYFAST" ? "border-[#cc0000] bg-red-50" : "border-slate-200"}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentMethod === "PAYFAST"}
                      onChange={() =>
                        setForm({ ...form, paymentMethod: "PAYFAST" })
                      }
                      className="accent-[#cc0000]"
                    />
                    <span className="text-xs font-black text-slate-900">
                      PAYFAST (Pay via Debit/Credit/Wallet/Bank Account)
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#cc0000] hover:bg-[#990000] text-white font-black py-4 rounded-xl text-sm transition shadow-lg"
              >
                Complete order
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm h-fit space-y-6">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 border-b pb-4">
              Order Summary (
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items)
            </h3>

            {cart.length === 0 ? (
              <p className="text-slate-500 text-xs py-4 font-medium">
                Your cart is empty. Add products to proceed.
              </p>
            ) : (
              <div className="space-y-4 max-h-72 overflow-y-auto pr-2">
                {cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-100"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-12 h-12 object-cover rounded-xl bg-white border"
                    />
                    <div className="flex-1">
                      <h4 className="text-xs font-black text-slate-900">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 font-medium">
                        ${item.price} each {item.color ? `(${item.color})` : ""}
                      </p>

                      <div className="flex items-center space-x-2 mt-1.5">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id || item.title, -1)
                          }
                          className="w-6 h-6 bg-white border border-slate-200 rounded-md font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
                        >
                          -
                        </button>
                        <span className="text-xs font-black text-slate-900 px-1">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(item.id || item.title, 1)
                          }
                          className="w-6 h-6 bg-white border border-slate-200 rounded-md font-bold text-slate-700 hover:bg-slate-100 flex items-center justify-center transition"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-black text-slate-900 block">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.id || item.title)}
                        className="mt-2 text-[10px] font-bold bg-red-50 text-red-600 hover:bg-red-100 px-2 py-1 rounded-lg transition flex items-center gap-1 ml-auto"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="border-t pt-4 space-y-2 text-xs text-slate-700 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-black text-slate-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-black text-slate-900">FREE</span>
              </div>
              <div className="flex justify-between text-sm font-black text-slate-900 pt-2 border-t">
                <span>Total</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const apiUrl = import.meta.env.VITE_BACKENED_API_URL;
  const { addProduct, deleteProduct, products } = useProducts();
  const [activeTab, setActiveTab] = useState("products");
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });
  const [msg, setMsg] = useState("");

  // Fetch orders from backend API
  useEffect(() => {
    if (activeTab === "orders") {
      setLoadingOrders(true);
      axios
        .get(`${apiUrl}/api/orders`)
        .then((res) => {
          setOrders(res.data);
          setLoadingOrders(false);
        })
        .catch((err) => {
          console.error(err);
          setLoadingOrders(false);
        });
    }
  }, [activeTab]);

  // const handleAddProduct = (e) => {
  //   e.preventDefault();
  //   if (!newProduct.title || !newProduct.price) {
  //     alert("Please fill out product title and price!");
  //     return;
  //   }

  //   const productToAdd = {
  //     id: Date.now(),
  //     ...newProduct,
  //     price: Number(newProduct.price),
  //   };

  //   setProducts([productToAdd, ...products]);
  //   setNewProduct({
  //     title: "",
  //     price: "",
  //     category: "",
  //     description: "",
  //     image: "",
  //   });
  //   setMsg("Product added successfully!");
  //   setTimeout(() => setMsg(""), 3000);
  // };
  const handleAddProduct = async (e) => {
    e.preventDefault();

    if (!newProduct.title || !newProduct.price) {
      alert("Please fill out product title and price!");
      return;
    }

    try {
      await addProduct({
        ...newProduct,
        price: Number(newProduct.price),
      });

      setNewProduct({
        title: "",
        price: "",
        category: "",
        description: "",
        image: "",
      });

      setMsg("Product added successfully!");

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error("Add product error:", error);
      setMsg("Failed to add product!");
    }
  };
  const handleDeleteProduct = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmed) return;

    try {
      await deleteProduct(id);

      setMsg("Product deleted successfully!");

      setTimeout(() => setMsg(""), 3000);
    } catch (error) {
      console.error(error);
      setMsg("Failed to delete product!");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 py-10 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <span className="text-[#cc0000] text-xs font-black uppercase tracking-widest">
              Management
            </span>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight mt-1">
              Admin Dashboard
            </h2>
          </div>
          <div className="flex space-x-2 bg-slate-200 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === "products" ? "bg-[#cc0000] text-white shadow" : "text-slate-700 hover:text-slate-900"}`}
            >
              Manage Products ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition ${activeTab === "orders" ? "bg-[#cc0000] text-white shadow" : "text-slate-700 hover:text-slate-900"}`}
            >
              View Orders
            </button>
          </div>
        </div>

        {msg && (
          <div className="mb-6 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl text-center">
            {msg}
          </div>
        )}

        {activeTab === "products" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm h-fit">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                Add New Product
              </h3>
              <form onSubmit={handleAddProduct} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={newProduct.title}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, title: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#cc0000]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">
                    Category
                  </label>
                  <input
                    type="text"
                    value={newProduct.category}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, category: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#cc0000]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={newProduct.image}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, image: e.target.value })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#cc0000]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-black uppercase text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#cc0000]"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-[#cc0000] hover:bg-[#990000] text-white font-black py-3 rounded-xl text-xs transition shadow"
                >
                  Add Product
                </button>
              </form>
            </div>

            {/* Products List Table */}
            <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
                Existing Products Inventory
              </h3>
              <div className="overflow-x-auto max-h-[500px] overflow-y-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b bg-slate-50 text-slate-700 uppercase text-[10px]">
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {products.map((p) => {
                      const pId = p.id || p._id;
                      return (
                        <React.Fragment key={p.id}>
                        <tr key={pId} className="hover:bg-slate-50 transition">
                          <td className="p-3 flex items-center space-x-3">
                            <img
                              src={p.image || "/placeholder.png"}
                              alt={p.title}
                              className="w-10 h-10 object-cover rounded-lg bg-slate-100 border"
                            />
                            <span className="font-bold text-slate-900 line-clamp-1">
                              {p.title}
                            </span>
                          </td>
                          <td className="p-3 text-slate-600">
                            {p.category || "Tech"}
                          </td>
                          <td className="p-3 font-bold text-slate-900">
                            ${p.price}
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => handleDeleteProduct(pId)}
                              className="bg-red-50 text-red-600 hover:bg-red-100 px-3 py-1.5 rounded-lg text-[10px] font-bold transition"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                        </React.Fragment>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-slate-900 mb-4">
              Customer Orders
            </h3>
            {loadingOrders ? (
              <p className="text-xs text-slate-500 py-8 text-center font-medium">
                Loading orders...
              </p>
            ) : orders.length === 0 ? (
              <p className="text-xs text-slate-500 py-8 text-center font-medium">
                No orders found in database.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b bg-slate-50 text-slate-700 uppercase text-[10px]">
                      <th className="p-3">Order ID</th>
                      <th className="p-3">Customer Name</th>
                      <th className="p-3">Shipping Info</th>
                      <th className="p-3">Total Amount</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.map((order, idx) => (
                      <tr
                        key={order.id || idx}
                        className="hover:bg-slate-50 transition"
                      >
                        <td className="p-3 font-bold text-[#cc0000]">
                          #{order.id || idx + 1}
                        </td>
                        <td className="p-3 font-bold text-slate-900">
                          {order.customerName}
                        </td>
                        <td className="p-3 text-slate-600 max-w-xs truncate">
                          {order.shippingAddress}
                        </td>
                        <td className="p-3 font-black text-slate-900">
                          ${order.totalAmount}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}



function MainAppContent() {
  
 
  
  const [cart, setCart] = useState([]);
  
  const addToCart = (product) => {
    const existingIndex = cart.findIndex(
      (item) =>
        (item.id && item.id === product.id) || item.title === product.title,
    );
    let updatedCart;
    if (existingIndex > -1) {
      updatedCart = [...cart];
      updatedCart[existingIndex].quantity += product.quantity || 1;
    } else {
      updatedCart = [...cart, { ...product, quantity: product.quantity || 1 }];
    }
    setCart(updatedCart);
  };

  const updateQuantity = (identifier, delta) => {
    setCart(
      cart
        .map((item) => {
          const idMatch = item.id && item.id === identifier;
          const titleMatch = item.title === identifier;
          if (idMatch || titleMatch) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const removeFromCart = (identifier) => {
    setCart(
      cart.filter(
        (item) => item.id !== identifier && item.title !== identifier,
      ),
    );
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="bg-white min-h-screen text-slate-900 flex flex-col justify-between">
      <Navbar totalCartCount={totalCartCount} />

      <Routes>
        <Route path="/" element={<StoreFront />} />
        <Route
          path="/products"
          element={<ProductsView  />}
        />
        <Route path="/categories" element={<CategoriesView />} />
        <Route
          path="/product/:id"
          element={
            <ProductDetailView  addToCart={addToCart} />
          }
        />
        <Route
          path="/orders"
          element={
            <OrdersView
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/admin"
          element={
            getRoleFromToken() === "admin" ? (
              <AdminDashboard
                
              />
            ) : (
              <Navigate to="/" replace />
            )
          }
        />
        
        <Route path="*" element={<StoreFront  />} />
      </Routes>
    </div>
  );
}

function App() {
  const isLoggedIn = !!localStorage.getItem("token");
 
  
  if (!isLoggedIn) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<LoginView />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <MainAppContent />
    </Router>
  );
}

export default App;
