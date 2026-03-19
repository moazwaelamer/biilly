import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Flame,
  Zap,
  Crown,
  Monitor,
  LayoutGrid,
  Gamepad2
} from "lucide-react";

import { Games } from "./Games";
import { MovieNights } from "./MovieNights";
import { Events } from "./Events";
import { Location } from "./Location";
import { BirthdayService } from "./birthday";
import { PlayStationService } from "./playstation";
import { AboutUsSection } from "./aboutus";
import { VideoAdSection } from "./Videoadvertisement";
import { Leaderboard } from "./Leaderboard"
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/* ================= ROOMS SHOWCASE (Cinema Effect) ================= */


/* ================= FOOD SHOWCASE (Cinema Effect) ================= */
function FoodShowcase() {
  const [hoveredFood, setHoveredFood] = useState<string | null>(null);

  const foodCategories = [
    { 
      id: "Snacks", 
      name: "Crunchy Snacks", 
      description: "Chips, Doritos & More", 
      image: "https://images.unsplash.com/photo-1603052875302-d376b7c0638a?q=80&w=1080",
      icon: <Flame className="text-orange-500 w-6 h-6" />
    },
    { 
      id: "Drinks", 
      name: "Cold & Hot Drinks", 
      description: "Soda, Energy Drinks & Coffee", 
      image: "https://images.unsplash.com/photo-1622484211148-715348e362aa?q=80&w=1080",
      icon: <Zap className="text-blue-400 w-6 h-6" />
    }
  ];

  return (
    <section className="w-full min-h-screen bg-black flex items-center py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h2 className="text-5xl md:text-8xl font-black mb-16 uppercase italic tracking-tighter">
          Hub <span className="text-orange-500">Canteen</span>
        </h2>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
          onMouseLeave={() => setHoveredFood(null)}
        >
          {foodCategories.map((cat) => (
            <motion.div
              key={cat.id}
              onMouseEnter={() => setHoveredFood(cat.id)}
              animate={{
                opacity: hoveredFood === null || hoveredFood === cat.id ? 1 : 0,
                scale: hoveredFood === cat.id ? 1.05 : 0.95,
                filter: hoveredFood !== null && hoveredFood !== cat.id ? "blur(20px) brightness(0)" : "none",
                // ✅ عدلنا دي عشان تستخدم hoveredFood بدل hoveredId
                zIndex: hoveredFood === cat.id ? 20 : 1 
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="group relative h-[500px] overflow-hidden bg-zinc-950 border border-white/5 cursor-pointer"
            >
              
<Link to={`/food?category=${cat.id}`} className="block h-full">
                <img src={cat.image} loading="lazy" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 flex flex-col justify-end">
                  <div className="flex items-center gap-3 mb-4">
                    {cat.icon}
                    <span className="text-xs font-black tracking-[0.3em] text-orange-500 uppercase">Canteen Section</span>
                  </div>
                  <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-2">{cat.name}</h3>
                  <p className="text-zinc-400 font-medium mb-6">{cat.description}</p>
                  <div className="w-fit bg-orange-600 px-8 py-3 font-black uppercase italic text-sm group-hover:bg-white group-hover:text-black transition-colors">
                    View Menu
                  </div>
                </div>
              </Link>
              <motion.div 
                className="absolute bottom-0 left-0 h-2 bg-orange-500 shadow-[0_0_20px_#ea580c]" 
                animate={{ width: hoveredFood === cat.id ? "100%" : 0 }} 
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
/* ================= HOME ================= */
export function Home() {
  return (
    <main className="bg-black text-white">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1644571580854-114d7d8fa383?q=80&w=1600"
            alt="Billy Hub"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, x: -100 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-6xl md:text-9xl font-black mb-6 uppercase italic tracking-tighter leading-none">
              Welcome to <br /> <span className="text-primary">Billy's Hub</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-400 mb-10 max-w-2xl font-medium">
              Private gaming rooms, exclusive movie nights, and premium food crafted for true gamers.
            </p>
            <Link to="/rooms" className="group px-10 py-5 bg-primary font-black uppercase italic flex items-center w-fit hover:bg-white hover:text-black transition-all">
              Book a Room <ChevronRight className="ml-2 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      <AboutUsSection />
      
      <VideoAdSection />
      

      <section id="playstation"><PlayStationService /></section>
      <section id="games"><Games /></section>
      <section id="movie-nights"><MovieNights /></section>
      <section id="birthday"><BirthdayService /></section>
      
      <FoodShowcase />
      <Leaderboard/>
      <section id="events"><Events /></section>
      <section id="location"><Location /></section>
    </main>
  );
}