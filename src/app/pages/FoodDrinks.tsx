import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Zap, Flame, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function FoodDrinks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);

  const categoryParam = searchParams.get("category") || "All";
  const categories = ["All", "Snacks", "Drinks"];
const menuItems = [
  // ===== SNACKS & FOOD =====
  {
    id: 1,
    name: "Chipsy",
    category: "Snacks",
    description: "شيبسي عائلي - جميع الأطعم",
    image: "https://images.unsplash.com/photo-1566478433037-3f7cb9da40b4?q=80&w=1080", // Potato chips bag
  },
  {
    id: 2,
    name: "Indomie",
    category: "Snacks",
    description: "إندومي كوب - فراخ أو خضار",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?q=80&w=1080", // Instant noodles bowl/cup
  },
  {
    id: 3,
    name: "Chocolate Bar",
    category: "Snacks",
    description: "جيرسي، مندولين، أو كيت كات",
    image: "https://images.unsplash.com/photo-1621319011735-99930833290b?q=80&w=1080", // Chocolate snack
  },

  // ===== COLD DRINKS =====
  {
    id: 4,
    name: "Pepsi",
    category: "Drinks",
    description: "بيبسي - كانز 330ml مثلج",
    image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1080", // Pepsi Can
  },
  {
    id: 5,
    name: "Twist",
    category: "Drinks",
    description: "تويست - ليمون ونعناع منعش",
    image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1080", // Lemon drink / Twist style
  },
  {
    id: 6,
    name: "Red Bull",
    category: "Drinks",
    description: "ريد بول - طاقة الملوك",
    image: "https://images.unsplash.com/photo-1619096494440-f4285b487c4a?q=80&w=1080", // Energy drink
  },
  {
    id: 7,
    name: "Water",
    category: "Drinks",
    description: "مياه معدنية - باردة",
    image: "https://images.unsplash.com/photo-1560313093-594185e3c39b?q=80&w=1080", // Water bottle
  },

  // ===== HOT DRINKS =====
  {
    id: 8,
    name: "Nescafe",
    category: "Drinks",
    description: "نسكافيه 3*1 - ساخن",
    image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1080", // Coffee mug
  },
  {
    id: 9,
    name: "Tea",
    category: "Drinks",
    description: "شاي فتلة - كوباية مظبوطة",
    image: "https://images.unsplash.com/photo-1544787210-2211d7c928c7?q=80&w=1080", // Cup of tea
  }
];
  const filteredItems = menuItems.filter(
    (item) => categoryParam === "All" || item.category === categoryParam
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryParam]);

  return (
    <div className="pt-24 bg-black min-h-screen text-white overflow-hidden">

      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link
          to="/"
          className="text-orange-500 flex items-center gap-2 font-bold uppercase tracking-widest text-xs mb-8 hover:translate-x-[-5px] transition-transform w-fit"
        >
          <ChevronLeft size={16} /> Back to Hub
        </Link>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
          HUB <span className="text-orange-500">CANTEEN</span>
        </h1>
        <p className="text-zinc-500 text-sm mt-4 tracking-widest uppercase">
          Available inside the lounge
        </p>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="flex gap-4 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSearchParams({ category: cat })}
              className={`px-10 py-4 text-sm font-black uppercase italic tracking-widest border transition-all duration-300 ${
                categoryParam === cat
                  ? "bg-orange-600 border-orange-600 text-white shadow-[0_0_20px_rgba(234,88,12,0.4)]"
                  : "border-white/10 text-zinc-500 hover:border-white/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          onMouseLeave={() => setHoveredItemId(null)}
        >
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              onMouseEnter={() => setHoveredItemId(item.id)}
              initial={{ opacity: 0 }}
              animate={{
                opacity: hoveredItemId === null || hoveredItemId === item.id ? 1 : 0,
                scale: hoveredItemId === item.id ? 1.05 : 0.95,
                filter:
                  hoveredItemId !== null && hoveredItemId !== item.id
                    ? "blur(20px) brightness(0)"
                    : "none",
                zIndex: hoveredItemId === item.id ? 20 : 1,
              }}
              transition={{ duration: 0.4 }}
              className="group relative bg-zinc-950 border border-white/5 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700"
                />
              </div>

              <div className="p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/60 mb-2 block">
                  {item.category}
                </span>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-3 group-hover:text-orange-500 transition-colors">
                  {item.name}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 h-12 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-orange-500">
                  <span className="flex items-center gap-1">
                    <Flame size={14} /> Fan Favorite
                  </span>
                  <span className="flex items-center gap-1">
                    <Zap size={14} /> Gaming Fuel
                  </span>
                </div>
              </div>

              <motion.div
                className="absolute bottom-0 left-0 h-1.5 bg-orange-500 shadow-[0_0_15px_#ea580c]"
                animate={{ width: hoveredItemId === item.id ? "100%" : 0 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-600 uppercase tracking-widest">
              No items found in this section.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}