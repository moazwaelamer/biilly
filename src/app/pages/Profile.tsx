import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy, Star, Clock, Shield, Gamepad2,
  Calendar, LogOut, User, Film, Swords, XCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function Profile() {

  const [user, setUser] = useState<any>(null)
  const [profileData, setProfileData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const saved = localStorage.getItem("userProfile")
    if(!saved){ setLoading(false); return }
    const parsed = JSON.parse(saved)
    setUser(parsed)
    loadProfile(parsed.player_id, parsed.token)
  }, [])

  const loadProfile = async (playerId: number, token: string) => {
    try {
      const res = await fetch(`http://localhost:5000/api/players/${playerId}`, {
        headers: { "Authorization": `Bearer ${token}` }
      })
      if(!res.ok) throw new Error("Failed")
      const data = await res.json()
      setProfileData(data)
    } catch(err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("userProfile")
    toast.success("Logged out")
    navigate("/login")
  }

  // ✅ Cancel Booking
  const cancelBooking = async (reservationId: number, startTime: string) => {
    const now = new Date()
    const bookingTime = new Date(startTime)
    const diffHours = (bookingTime.getTime() - now.getTime()) / (1000 * 60 * 60)

    let warning = ""
    if(diffHours < 0) {
      warning = "❌ Booking time has passed - No refund\nانتهى وقت الحجز - لا استرداد"
    } else if(diffHours < 1) {
      warning = "⚠️ Less than 1 hour - 50% refund only\nأقل من ساعة - استرداد ٥٠٪ فقط"
    } else {
      warning = "✅ Full refund will be issued\nسيُسترد العربون كاملاً"
    }

    if(!confirm(`Cancel this booking?\n\n${warning}`)) return

    try {
      setCancellingId(reservationId)
      const res = await fetch(`http://localhost:5000/api/reservations/${reservationId}/cancel`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${user?.token}` }
      })

      const data = await res.json()

      if(!res.ok) {
        toast.error(data.error || "Failed to cancel")
        return
      }

      const refundMsg =
        data.refund === "full" ? "✅ Full refund will be issued" :
        data.refund === "half" ? "⚠️ 50% refund will be issued" :
        "❌ No refund"

      toast.success(`Booking cancelled — ${refundMsg}`)
      loadProfile(user.player_id, user.token)

    } catch(err) {
      toast.error("Something went wrong")
    } finally {
      setCancellingId(null)
    }
  }

  const tierColor: any = {
    Bronze:  "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Silver:  "text-gray-300 border-gray-300/30 bg-gray-300/10",
    Gold:    "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    Platinum:"text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    Elite:   "text-primary border-primary/30 bg-primary/10"
  }

  const statusColor: any = {
    "Pending":    "text-yellow-400 bg-yellow-400/10 border-yellow-400/30",
    "Checked-In": "text-green-400 bg-green-400/10 border-green-400/30",
    "Completed":  "text-blue-400 bg-blue-400/10 border-blue-400/30",
    "Cancelled":  "text-red-400 bg-red-400/10 border-red-400/30",
  }

  if(!user && !loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
      <User className="w-16 h-16 text-zinc-600 mb-4" />
      <h1 className="text-3xl font-bold mb-4">No Profile Found</h1>
      <p className="text-gray-400 mb-6">You need to login first.</p>
      <Link to="/login" className="px-6 py-3 bg-primary text-white hover:bg-red-700 transition rounded">
        Go to Login
      </Link>
    </div>
  )

  if(loading) return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      Loading profile...
    </div>
  )

  const data = profileData || user

  const formatDate = (dt: string) =>
    new Date(dt).toLocaleDateString("en-GB", { day:"2-digit", month:"short", year:"numeric" })

  const formatTime = (dt: string) =>
    new Date(dt).toLocaleTimeString([], { hour:"2-digit", minute:"2-digit" })

  return (
    <div className="pt-20 min-h-screen bg-zinc-950 text-white">

      {/* HEADER */}
      <section className="py-16 bg-black border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity:0, y:20 }}
            animate={{ opacity:1, y:0 }}
            className="flex flex-col md:flex-row items-center gap-8 justify-between"
          >
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-primary bg-zinc-800 flex items-center justify-center">
                {data?.avatar_url
                  ? <img src={`http://localhost:5000${data.avatar_url}`} className="w-full h-full object-cover" />
                  : <span className="text-4xl font-bold text-primary">{data?.full_name?.[0]?.toUpperCase() || "?"}</span>
                }
              </div>
              <div>
                <h1 className="text-3xl font-bold">{data?.full_name}</h1>
                {data?.nickname && <p className="text-primary text-sm">@{data.nickname}</p>}
                <p className="text-gray-400">{data?.phone}</p>
                {data?.email && <p className="text-gray-500 text-sm">{data?.email}</p>}
                {data?.country && <p className="text-gray-500 text-sm">🌍 {data.country}</p>}
                <div className="mt-3 flex items-center gap-3 flex-wrap">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${tierColor[data?.tier] || tierColor.Bronze}`}>
                    <Shield className="inline w-3 h-3 mr-1" />
                    {data?.tier || "Bronze"}
                  </span>
                  <span className="text-gray-400 text-sm">{data?.current_xp || 0} XP</span>
                  {data?.elo_rank && <span className="text-gray-400 text-sm">ELO: {data.elo_rank}</span>}
                  {data?.rank && <span className="text-gray-400 text-sm">Rank #{data.rank}</span>}
                </div>
              </div>
            </div>
            <button onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 border border-white/10 hover:border-primary hover:text-primary transition rounded text-sm"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Gamepad2 />, label: "Total Games", value: data?.total_games || 0 },
            { icon: <Trophy />, label: "Total Wins", value: data?.total_wins || 0 },
            { icon: <Star />, label: "Win Rate", value: `${data?.win_rate || 0}%` },
            { icon: <Clock />, label: "Hours Played", value: `${data?.total_hours || 0}h` },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl text-center">
              <div className="mx-auto mb-2 text-primary w-5 h-5 flex justify-center">
                {stat.icon}
              </div>
              <p className="text-gray-400 text-xs mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ROOM BOOKINGS */}
      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-5">
            Room <span className="text-primary">Bookings</span>
          </h2>
          {!profileData?.room_bookings?.length ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-400">
              No room bookings yet
            </div>
          ) : (
            <div className="space-y-3">
              {profileData.room_bookings.map((b: any) => (
                <div key={b.reservation_id}
                  className={`rounded-xl border p-4 flex items-center justify-between gap-4 ${
                    b.reservation_status === "Cancelled"
                      ? "bg-red-500/5 border-red-500/20 opacity-60"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold">{b.room_name || "Room"}</p>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor[b.reservation_status] || statusColor.Pending}`}>
                        {b.reservation_status}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm capitalize">{b.event_type} {b.play_mode && `• ${b.play_mode}`}</p>
                  </div>

                  <div className="text-right text-sm text-gray-400 shrink-0">
                    <div className="flex items-center gap-1 justify-end">
                      <Calendar className="w-3 h-3" />
                      {formatDate(b.start_time)}
                    </div>
                    <div className="flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3" />
                      {formatTime(b.start_time)} → {formatTime(b.end_time)}
                    </div>
                  </div>

                  {/* ✅ Cancel Button */}
                  {b.reservation_status !== "Cancelled" && b.reservation_status !== "Completed" && (
                    <button
                      onClick={() => cancelBooking(b.reservation_id, b.start_time)}
                      disabled={cancellingId === b.reservation_id}
                      className="shrink-0 flex items-center gap-1 text-xs border border-red-500/30 text-red-400 hover:bg-red-500/10 px-3 py-1.5 rounded-lg transition disabled:opacity-50"
                    >
                      <XCircle className="w-3 h-3" />
                      {cancellingId === b.reservation_id ? "..." : "Cancel"}
                    </button>
                  )}

                  {b.reservation_status === "Cancelled" && (
                    <span className="shrink-0 text-xs text-red-400/60 border border-red-500/20 px-3 py-1.5 rounded-lg">
                      Cancelled
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MOVIE BOOKINGS */}
      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-5">
            Movie <span className="text-primary">Bookings</span>
          </h2>
          {!profileData?.movie_bookings?.length ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-400">
              No movie bookings yet
            </div>
          ) : (
            <div className="space-y-3">
              {profileData.movie_bookings.map((b: any) => (
                <div key={b.booking_id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Film className="w-5 h-5 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold">{b.movie_name}</p>
                      <p className="text-gray-400 text-sm">{b.seats} seat{b.seats > 1 ? "s" : ""}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-400">
                    <Calendar className="w-3 h-3" />
                    {formatDate(b.movie_date)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* TOURNAMENT HISTORY */}
      <section className="pb-10">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-5">
            Tournament <span className="text-primary">History</span>
          </h2>
          {!profileData?.tournaments_played?.length ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-400">
              No tournaments yet —{" "}
              <Link to="/events" className="text-primary hover:underline">Join one now</Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {profileData.tournaments_played.map((t: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">{t.tournament_name}</p>
                    <p className="text-gray-400 text-sm">{t.status}</p>
                  </div>
                  {t.won && (
                    <span className="text-yellow-400 text-sm font-bold flex items-center gap-1">
                      <Trophy className="w-4 h-4" /> Winner
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* MATCH HISTORY */}
      <section className="pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold mb-5">
            Match <span className="text-primary">History</span>
          </h2>
          {!profileData?.match_history?.length ? (
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 text-center text-gray-400">
              No matches yet
            </div>
          ) : (
            <div className="space-y-3">
              {profileData.match_history.map((m: any) => (
                <div key={m.match_id} className={`rounded-xl border p-4 flex items-center justify-between ${
                  m.result === "WIN" ? "bg-green-500/5 border-green-500/20" :
                  m.result === "LOSS" ? "bg-red-500/5 border-red-500/20" :
                  "bg-white/5 border-white/10"
                }`}>
                  <div className="flex items-center gap-3">
                    <Swords className="w-4 h-4 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">{m.player1} vs {m.player2}</p>
                      <p className="text-gray-400 text-xs">{m.tournament_name} · Round {m.round}</p>
                    </div>
                  </div>
                  <span className={`text-xs font-bold px-2 py-1 rounded ${
                    m.result === "WIN" ? "bg-green-500/20 text-green-400" :
                    m.result === "LOSS" ? "bg-red-500/20 text-red-400" :
                    "bg-white/10 text-gray-400"
                  }`}>
                    {m.result}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}