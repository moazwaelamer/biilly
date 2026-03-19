import { motion } from "motion/react";
import { Gamepad2, Search, Star, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useState } from "react";

export function Games() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const categories = ["All", "Action", "Sports", "Racing", "RPG", "Fighting", "Adventure"];

  const games = [
    { id: 1, title: "God of War Ragnarök", category: "Action", rating: 5.0, players: "1", image: "https://images.unsplash.com/photo-1644571580854-114d7d8fa383?auto=format&fit=crop&w=1080&q=80" },
    { id: 2, title: "FIFA 24", category: "Sports", rating: 4.8, players: "1-4", image: "https://images.unsplash.com/photo-1767455471543-055dbc6c6700?auto=format&fit=crop&w=1080&q=80" },
    { id: 3, title: "Gran Turismo 7", category: "Racing", rating: 4.9, players: "1-2", image: "https://images.unsplash.com/photo-1691169467000-d1d929ec380d?auto=format&fit=crop&w=1080&q=80" },
    { id: 4, title: "Elden Ring", category: "RPG", rating: 5.0, players: "1", image: "https://images.unsplash.com/photo-1616445598565-5327a63e85d0?auto=format&fit=crop&w=1080&q=80" },
    { id: 5, title: "Street Fighter 6", category: "Fighting", rating: 4.7, players: "1-2", image: "https://images.unsplash.com/photo-1754246522949-69355c187b13?auto=format&fit=crop&w=1080&q=80" },
    { id: 6, title: "Spider-Man 2", category: "Action", rating: 5.0, players: "1", image: "https://images.unsplash.com/photo-1644571580854-114d7d8fa383?auto=format&fit=crop&w=1080&q=80" },
    { id: 7, title: "NBA 2K24", category: "Sports", rating: 4.6, players: "1-4", image: "https://images.unsplash.com/photo-1767455471543-055dbc6c6700?auto=format&fit=crop&w=1080&q=80" },
    { id: 8, title: "Horizon Forbidden West", category: "Adventure", rating: 4.9, players: "1", image: "https://images.unsplash.com/photo-1691169467000-d1d929ec380d?auto=format&fit=crop&w=1080&q=80" },
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
                  className={`px-6 py-2 text-xs font-black uppercase tracking-widest transition-all ${
                    selectedCategory === cat ? "bg-primary text-white" : "bg-zinc-900 text-zinc-500 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid - THE DARK MODE EFFECT */}
      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div 
            layout 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            onMouseLeave={() => setHoveredId(null)}
          >
            {filteredGames.map((game, i) => (
              <motion.div
                key={game.id}
                layout
                onMouseEnter={() => setHoveredId(game.id)}
                animate={{
                  // الكروت غير المحددة بتختفي تماماً وترجع لورا شوية
                  opacity: hoveredId === null ? 1 : (hoveredId === game.id ? 1 : 0),
                  scale: hoveredId === game.id ? 1.05 : 0.95,
                  filter: hoveredId !== null && hoveredId !== game.id 
                    ? "blur(20px) brightness(0)" 
                    : "blur(0px) brightness(1)",
                  zIndex: hoveredId === game.id ? 20 : 1
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
                  
                  {/* Overlay Noir - بيخلي الصورة غامقة وبنتور لما نلمسها */}
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />
                  
                  {/* Content - Visible only on current card or no hover */}
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
                      <span>Online Ready</span>
                    </div>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 flex items-center gap-1 border border-white/10 z-20">
                    <Star className="w-3 h-3 text-primary fill-primary" />
                    <span className="text-[10px] font-black">{game.rating}</span>
                  </div>
                </div>

                {/* Neon Underline Animation */}
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
              <p className="text-zinc-700 font-black uppercase italic tracking-widest">System Offline: No Games Found</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}