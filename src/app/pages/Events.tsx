import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Trophy, Users, ChevronRight, Clock, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Link } from "react-router-dom";

type Tournament = {
  tournament_id: number;
  tournament_name: string;
  max_players: number;
  registered_players: number;
  prize_pool: number;
  entry_fee: number;
  status: string;
  location: string;
  schedule: { start_time: string; end_time: string; room_name: string }[];
};

export function Events() {

  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [events, setEvents] = useState<Tournament[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://backbilly.vercel.app/api/tournaments")
      .then(r => r.json())
      .then(data => setEvents(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })

  const formatTime = (dt: string) =>
    new Date(dt).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })

  return (
    <div className="bg-black text-white overflow-hidden">

      <section className="relative py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase"
          >
            UPCO<span className="text-primary">MING</span> EVENTS
          </motion.h1>
          <p className="mt-4 text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-bold">
            Exclusive tournaments
          </p>
        </div>
      </section>

      <section className="py-12 bg-black">
        <div className="max-w-7xl mx-auto px-6">

          {loading && <div className="text-center text-zinc-400 py-20">Loading tournaments...</div>}
          {!loading && events.length === 0 && <div className="text-center text-zinc-400 py-20">No tournaments available</div>}

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            onMouseLeave={() => setHoveredId(null)}
          >
            {events.map((event) => {

              const registered = event.registered_players || 0
              const max = event.max_players || 0
              const isFull = registered >= max
              const firstSlot = event.schedule?.[0]

              return (
                <motion.div
                  key={event.tournament_id}
                  onMouseEnter={() => setHoveredId(event.tournament_id)}
                  animate={{
                    opacity: hoveredId === null || hoveredId === event.tournament_id ? 1 : 0,
                    scale: hoveredId === event.tournament_id ? 1.05 : 0.95,
                    filter: hoveredId !== null && hoveredId !== event.tournament_id ? "blur(20px) brightness(0)" : "none",
                    zIndex: hoveredId === event.tournament_id ? 20 : 1
                  }}
                  transition={{ duration:0.4 }}
                  className="group relative bg-zinc-950 border border-white/5 overflow-hidden cursor-pointer"
                >

                  {/* IMAGE */}
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1614294149010-950b698f72c0?auto=format&fit=crop&w=1080&q=80"
                      alt={event.tournament_name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"/>
                    <div className="absolute top-4 right-4 z-20">
                      <span className={`px-3 py-1 text-[10px] font-black uppercase italic tracking-widest ${isFull ? "bg-red-600" : "bg-green-600"}`}>
                        {isFull ? "FULL" : event.status || "Open"}
                      </span>
                    </div>
                  </div>

                  {/* CONTENT */}
                  <div className="p-8 space-y-4 bg-zinc-950">

                    <h3 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none group-hover:text-primary transition-colors">
                      {event.tournament_name}
                    </h3>

                    {/* Schedule Info */}
                    <div className="space-y-1.5 text-xs text-zinc-400">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-primary shrink-0"/>
                        {firstSlot ? formatDate(firstSlot.start_time) : "TBD"}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-primary shrink-0"/>
                        {firstSlot
                          ? `${formatTime(firstSlot.start_time)} → ${formatTime(firstSlot.end_time)}`
                          : "TBD"
                        }
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="w-3 h-3 text-primary shrink-0"/>
                        {firstSlot?.room_name || "TBD"}
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-primary shrink-0"/>
                          {event.location}
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-6 pt-4 border-t border-white/5">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Players</p>
                        <p className="text-sm font-black italic">{registered}/{max}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Entry</p>
                        <p className="text-sm font-black italic">{event.entry_fee} EGP</p>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-white/5">
                      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">Prize Pool</p>
                      <p className="text-2xl font-black italic text-primary">{event.prize_pool} EGP</p>
                    </div>

                    {!isFull ? (
                      <Link
                        to={`/event/${event.tournament_id}`}
                        state={{ event }}
                        className="w-full mt-2 px-6 py-4 bg-primary text-white font-black uppercase italic tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center group/btn"
                      >
                        Register Now
                        <ChevronRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform"/>
                      </Link>
                    ) : (
                      <div className="w-full mt-2 px-6 py-4 bg-zinc-800 text-zinc-400 font-black uppercase italic tracking-widest text-center">
                        Tournament Full
                      </div>
                    )}
                  </div>

                  <motion.div
                    className="absolute bottom-0 left-0 h-1.5 bg-primary shadow-[0_0_20px_#ff0000]"
                    initial={{ width:0 }}
                    animate={{ width: hoveredId === event.tournament_id ? "100%" : 0 }}
                  />
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>
    </div>
  )
}