import { useRef, useState } from "react";

const categories = [
  { id: 1, name: "Mobiles", img: "https://picsum.photos/seed/mobiles/200" },
  { id: 2, name: "Laptops", img: "https://picsum.photos/seed/laptops/200" },
  { id: 3, name: "Fashion", img: "https://picsum.photos/seed/fashion/200" },
  { id: 4, name: "Shoes", img: "https://picsum.photos/seed/shoes/200" },
  { id: 5, name: "Watches", img: "https://picsum.photos/seed/watches/200" },
  { id: 6, name: "Beauty", img: "https://picsum.photos/seed/beauty/200" },
  { id: 7, name: "Home", img: "https://picsum.photos/seed/home/200" },
  { id: 8, name: "Kitchen", img: "https://picsum.photos/seed/kitchen/200" },
  { id: 9, name: "Toys", img: "https://picsum.photos/seed/toys/200" },
  { id: 10, name: "Sports", img: "https://picsum.photos/seed/sports/200" },
  { id: 11, name: "Books", img: "https://picsum.photos/seed/books/200" },
  { id: 12, name: "Grocery", img: "https://picsum.photos/seed/grocery/200" },
];

export default function CategoryCarousel({ items = categories, onSelect }) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  // drag state ko ref me rakha hai taake har move par re-render na ho
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });

  const onPointerDown = (e) => {
    // touch ka scroll browser khud handle karta hai, yahan sirf mouse drag chahiye
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    drag.current = {
      active: true,
      startX: e.clientX,
      startScroll: el.scrollLeft,
      moved: false,
    };
    el.setPointerCapture(e.pointerId);
    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current.scrollLeft = d.startScroll - dx;
  };

  const endDrag = (e) => {
    if (!drag.current.active) return;
    drag.current.active = false;
    setIsDragging(false);
    if (trackRef.current.hasPointerCapture?.(e.pointerId)) {
      trackRef.current.releasePointerCapture(e.pointerId);
    }
  };

  // drag ke baad galti se click na ho jaye
  const handleClick = (item) => {
    if (drag.current.moved) {
      drag.current.moved = false;
      return;
    }
    onSelect?.(item);
  };

  return (
    <section className="w-full bg-white border-b border-gray-200">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        onDragStart={(e) => e.preventDefault()}
        className={`
          flex gap-5 sm:gap-7 overflow-x-auto px-4 py-4 select-none
          [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
          ${isDragging ? "cursor-grabbing" : "cursor-grab snap-x snap-proximity"}
        `}
      >
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handleClick(item)}
            className="group flex shrink-0 snap-start flex-col items-center gap-2 focus:outline-none"
          >
            <span className="h-16 w-16 sm:h-20 sm:w-20 overflow-hidden rounded-full bg-gray-100 ring-2 ring-transparent ring-offset-2 transition group-hover:ring-orange-500 group-focus-visible:ring-orange-500">
              <img
                src={item.img}
                alt={item.name}
                draggable={false}
                className="h-full w-full object-cover pointer-events-none"
              />
            </span>
            <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-orange-600">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

/*
Use kaise karna hai:

import CategoryCarousel from "./CategoryCarousel";

function App() {
  return (
    <>
      <Header />
      <CategoryCarousel onSelect={(cat) => console.log(cat.name)} />
      ...
    </>
  );
}
*/