import { motion } from "motion/react";
import { Gamepad2, Search, Star, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";
import crash from '../../asst/crash.jpg';
import cod from '../../asst/cod.jpg';
import fc25 from '../../asst/fc25.jpg';
import fc26 from '../../asst/fc26.jpg';
import pes26 from '../../asst/pes26.jpg';
import mk1 from '../../asst/mk1.jpg';

export function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "Action", "Sports", "Fighting", "Adventure"];

  const games = [
    { id: 1, title: "Call of Duty",    category: "Action",    rating: 5.0, players: "1-4", image: cod },
    { id: 3, title: "EA FC 26",        category: "Sports",    rating: 4.8, players: "1-4", image: fc26 },
    { id: 4, title: "eFootball 2026",  category: "Sports",    rating: 4.6, players: "1-4", image: pes26 },
    { id: 5, title: "Mortal Kombat 1", category: "Fighting",  rating: 4.9, players: "1-2", image: mk1 },
    { id: 6, title: "Crash Bandicoot", category: "Adventure", rating: 4.8, players: "1-2", image: crash },
  ];

  const filteredGames = games.filter(
    (game) =>
      game.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedCategory === "All" || game.category === selectedCategory)
  );

  return (
    <div className="bg-black min-h-screen text-white overflow-x-hidden">

      {/* Header */}
      <section className="relative py-12 md:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter italic">
              Game <span className="text-primary">Library</span>
            </h1>
            <p className="text-zinc-500 text-sm tracking-widest uppercase">
              All titles available on PS5
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-4 md:py-6 bg-black sticky top-0 z-30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-600" />
              <input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search games..."
                className="w-full bg-zinc-900/50 border border-white/10 text-white pl-12 pr-4 py-3 focus:border-primary outline-none transition-all"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-primary text-white"
                      : "bg-zinc-900 text-zinc-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            onMouseLeave={() => setHoveredId(null)}
          >
            {filteredGames.map((game) => (
              <motion.div
                key={game.id}
                layout
                onMouseEnter={() => setHoveredId(game.id)}
                animate={{
                  opacity: hoveredId === null ? 1 : hoveredId === game.id ? 1 : 0,
                  scale: hoveredId === game.id ? 1.05 : 0.95,
                  filter:
                    hoveredId !== null && hoveredId !== game.id
                      ? "blur(20px) brightness(0)"
                      : "blur(0px) brightness(1)",
                  zIndex: hoveredId === game.id ? 20 : 1,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative bg-zinc-950 overflow-hidden cursor-pointer aspect-[3/4.5] border border-white/5"
              >
                <div className="relative h-full w-full">
                  <ImageWithFallback
                    src={game.image}
                    alt={game.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  <div className="absolute inset-0 p-6 flex flex-col justify-end z-20">
                    <div className="mb-2">
                      <span className="bg-primary text-white text-[10px] font-black px-2 py-0.5 uppercase italic">
                        {game.category}
                      </span>
                    </div>
                    <h3 className="text-white font-black text-2xl uppercase italic leading-none mb-3 tracking-tighter">
                      {game.title}
                    </h3>
                    <div className="flex items-center gap-4 text-zinc-400 text-[10px] font-bold tracking-widest uppercase">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-primary" />
                        <span>{game.players} P</span>
                      </div>
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span>PS5</span>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 flex items-center gap-1 border border-white/10 z-20">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-[10px] font-black">{game.rating}</span>
                  </div>
                </div>

                <motion.div
                  className="absolute bottom-0 left-0 h-1 bg-primary z-30"
                  initial={{ width: 0 }}
                  animate={{ width: hoveredId === game.id ? "100%" : 0 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {filteredGames.length === 0 && (
            <div className="text-center py-40">
              <Gamepad2 className="w-20 h-20 text-zinc-900 mx-auto mb-4" />
              <p className="text-zinc-700 font-black uppercase italic tracking-widest">
                No Games Found
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}