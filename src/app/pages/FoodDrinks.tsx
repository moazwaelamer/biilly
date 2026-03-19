import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Zap, Flame, ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function FoodDrinks() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  
  // بنجيب الكاتجوري من الـ URL ولو مفيش بنخليها All
  const categoryParam = searchParams.get("category") || "All";

  const categories = ["All", "Snacks", "Drinks"];

  // الداتا متظبطة على الكاتجوريز الجديدة
  const menuItems = [
    { 
      id: 1, 
      name: "Indomie Cup", 
      category: "Snacks", 
      price: 45, 
      description: "Ready-to-eat cup noodles (All Flavors)", 
      image: "https://images.unsplash.com/photo-1526318896980-cf78c088247c?q=80&w=1080" 
    },
    { 
      id: 3, 
      name: "Large Chipsy", 
      category: "Snacks", 
      price: 25, 
      description: "Family size potato chips bag", 
      image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?q=80&w=1080" 
    },
    { 
      id: 4, 
      name: "Doritos / Cheetos", 
      category: "Snacks", 
      price: 30, 
      description: "Crunchy nacho cheese or spicy flamin' hot", 
      image: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?q=80&w=1080" 
    },
    { 
      id: 5, 
      name: "Cold Soda", 
      category: "Drinks", 
      price: 25, 
      description: "Pepsi, 7UP, or Marinda 330ml", 
      image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?q=80&w=1080" 
    },
    { 
      id: 6, 
      name: "Energy Drink", 
      category: "Drinks", 
      price: 60, 
      description: "RedBull or Sting for gaming", 
      image: "https://images.unsplash.com/photo-1622484211148-715348e362aa?q=80&w=1080" 
    },
    { 
      id: 8, 
      name: "Nescafe 3-in-1", 
      category: "Drinks", 
      price: 25, 
      description: "Hot coffee mix to stay awake", 
      image: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1080" 
    },
  ];

  // الفلترة بناءً على الـ Param اللي جاي من الـ URL
  const filteredItems = menuItems.filter(
    (item) => categoryParam === "All" || item.category === categoryParam
  );

  // سكرول لأول الصفحة أول ما نفتح
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categoryParam]);

  return (
    <div className="pt-24 bg-black min-h-screen text-white overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <Link to="/" className="text-orange-500 flex items-center gap-2 font-bold uppercase tracking-widest text-xs mb-8 hover:translate-x-[-5px] transition-transform w-fit">
          <ChevronLeft size={16}/> Back to Hub
        </Link>
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase leading-none">
          HUB <span className="text-orange-500">CANTEEN</span>
        </h1>
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
          layout // عشان الكروت تتحرك بنعومة لما الفلتر يتغير
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
                filter: hoveredItemId !== null && hoveredItemId !== item.id ? "blur(20px) brightness(0)" : "none",
                zIndex: hoveredItemId === item.id ? 20 : 1
              }}
              transition={{ duration: 0.4 }}
              className="group relative bg-zinc-950 border border-white/5 overflow-hidden"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback src={item.image} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700" />
                <div className="absolute top-4 right-4 bg-orange-600 px-4 py-1 font-black italic shadow-lg">
                  {item.price} EGP
                </div>
              </div>

              <div className="p-8">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500/60 mb-2 block">{item.category}</span>
                <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white mb-3 group-hover:text-orange-500 transition-colors">{item.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6 h-12 line-clamp-2">{item.description}</p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-white/5 text-[10px] font-black uppercase tracking-widest text-orange-500">
                  <span className="flex items-center gap-1"><Flame size={14}/> Best Seller</span>
                  <span className="flex items-center gap-1"><Zap size={14}/> Instant Fuel</span>
                </div>
              </div>

              <motion.div 
                className="absolute bottom-0 left-0 h-1.5 bg-orange-500 shadow-[0_0_15px_#ea580c]" 
                animate={{ width: hoveredItemId === item.id ? "100%" : 0 }} 
              />
            </motion.div>
          ))}
        </motion.div>

        {/* لو مفيش آيتمز في الكاتجوري دي */}
        {filteredItems.length === 0 && (
          <div className="text-center py-20">
            <p className="text-zinc-600 uppercase tracking-widest">No items found in this section.</p>
          </div>
        )}
      </div>
    </div>
  );
}