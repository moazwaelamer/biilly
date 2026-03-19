import { useParams, useNavigate } from "react-router-dom";
import { Calendar, Clock, Trophy, Users, MapPin, Gamepad2 } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function EventDetails() {

  const { id } = useParams()
  const navigate = useNavigate()

  const [event, setEvent] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [joining, setJoining] = useState(false)

  useEffect(() => {
    // ✅ جيب البطولة مباشرة بالـ ID
    fetch(`https://backbilly.vercel.app/api/tournaments`)
      .then(r => r.json())
      .then(data => {
        const found = Array.isArray(data)
          ? data.find((t: any) => t.tournament_id === Number(id))
          : null
        setEvent(found || null)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [id])

  const handleRegister = async () => {
    try {
      setJoining(true)

      const user = JSON.parse(localStorage.getItem("userProfile") || "{}")

      if(!user.player_id) {
        toast.error("Please login first")
        navigate("/login")
        return
      }

      const res = await fetch(`https://backbilly.vercel.app/api/tournaments/${event.tournament_id}/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({ player_id: user.player_id })
      })

      const data = await res.json()

      if(!res.ok) {
        toast.error(data.error || "Failed to join")
        return
      }

      toast.success("Joined tournament successfully! 🎮")
      setEvent({ ...event, registered_players: event.registered_players + 1 })

    } catch(err) {
      toast.error("Something went wrong")
    } finally {
      setJoining(false)
    }
  }

  if(loading) return <div className="text-white p-20 text-center">Loading...</div>
  if(!event) return <div className="text-white p-20 text-center">Tournament not found</div>

  const isFull = event.registered_players >= event.max_players
  const firstSlot = event.schedule?.[0]

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString("en-GB", { day:"2-digit", month:"long", year:"numeric" })

  const formatTime = (dt: string) =>
    new Date(dt).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })

  return (
    <div className="pt-20 bg-zinc-950 text-white min-h-screen">

      {/* HERO */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1614294149010-950b698f72c0"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"/>
        <div className="absolute inset-0 flex items-center justify-center text-center px-4">
          <motion.div initial={{ opacity:0, y:40 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6 }}>
            <h1 className="text-5xl md:text-7xl font-black italic mb-4">{event.tournament_name}</h1>
            <p className="text-gray-300 text-lg max-w-xl mx-auto">
              Compete with the best players and win amazing prizes.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-14">

        {/* LEFT - Details */}
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-6">
            Tournament <span className="text-primary">Details</span>
          </h2>

          {/* Schedule */}
          {firstSlot && (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
              <Calendar className="text-primary shrink-0"/>
              <div>
                <p className="text-gray-400 text-sm">Date</p>
                <p className="font-bold">{formatDate(firstSlot.start_time)}</p>
              </div>
            </div>
          )}

          {firstSlot && (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
              <Clock className="text-primary shrink-0"/>
              <div>
                <p className="text-gray-400 text-sm">Time</p>
                <p className="font-bold">{formatTime(firstSlot.start_time)} → {formatTime(firstSlot.end_time)}</p>
              </div>
            </div>
          )}

          {firstSlot?.room_name && (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
              <Gamepad2 className="text-primary shrink-0"/>
              <div>
                <p className="text-gray-400 text-sm">Room</p>
                <p className="font-bold">{firstSlot.room_name}</p>
              </div>
            </div>
          )}

          {event.location && (
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
              <MapPin className="text-primary shrink-0"/>
              <div>
                <p className="text-gray-400 text-sm">Location</p>
                <p className="font-bold">{event.location}</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
            <Users className="text-primary shrink-0"/>
            <div>
              <p className="text-gray-400 text-sm">Players</p>
              <p className="font-bold">{event.registered_players}/{event.max_players}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-primary/10 border border-primary/40 p-4 rounded-lg">
            <Trophy className="text-primary shrink-0"/>
            <div>
              <p className="text-gray-400 text-sm">Prize Pool</p>
              <p className="text-2xl font-bold text-primary">{event.prize_pool} EGP</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-lg">
            <Clock className="text-primary shrink-0"/>
            <div>
              <p className="text-gray-400 text-sm">Entry Fee</p>
              <p className="font-bold">{event.entry_fee} EGP</p>
            </div>
          </div>
        </div>

        {/* RIGHT - Register */}
        <motion.div
          initial={{ opacity:0, y:30 }}
          animate={{ opacity:1, y:0 }}
          className="bg-white/5 border border-white/10 p-8 rounded-2xl h-fit"
        >
          <h2 className="text-3xl font-bold mb-4">Join Tournament</h2>
          <p className="text-gray-400 mb-8">Reserve your slot and challenge the best players.</p>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between text-xs text-gray-400 mb-2">
              <span>{event.registered_players} registered</span>
              <span>{event.max_players - event.registered_players} spots left</span>
            </div>
            <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${Math.min((event.registered_players / event.max_players) * 100, 100)}%` }}
              />
            </div>
          </div>

          {isFull ? (
            <div className="py-4 text-center bg-red-600/20 border border-red-600/40 rounded font-bold text-red-400">
              Tournament Full
            </div>
          ) : (
            <button
              onClick={handleRegister}
              disabled={joining}
              className="w-full py-4 bg-primary hover:bg-red-700 transition font-bold text-lg rounded disabled:opacity-50"
            >
              {joining ? "Joining..." : "Register Now"}
            </button>
          )}
        </motion.div>
      </div>
    </div>
  )
}