import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useParams, useNavigate } from "react-router-dom"

export default function MovieBooking() {

  const { movieId } = useParams()
  const navigate = useNavigate()

  const [seats, setSeats] = useState<any[]>([])
  const [selectedSeats, setSelectedSeats] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [booking, setBooking] = useState(false)

  // ✅ جيب بيانات اليوزر تلقائياً
  const user = JSON.parse(localStorage.getItem("userProfile") || "{}")
  const isLoggedIn = !!user?.player_id

  const loadSeats = async () => {
    try {
      const res = await fetch(`https://backbilly.vercel.app/api/movies/${movieId}/seats`)
      const data = await res.json()
      setSeats(data)
    } catch(err) {
      toast.error("Failed to load seats")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadSeats() }, [movieId])

  const toggleSeat = (seat: any) => {
    if(seat.is_booked) return
    if(selectedSeats.includes(seat.seat_number)) {
      setSelectedSeats(prev => prev.filter(s => s !== seat.seat_number))
    } else {
      setSelectedSeats(prev => [...prev, seat.seat_number])
    }
  }

  const bookSeats = async () => {

    // ✅ لو مش logged in يروح يسجل
    if(!isLoggedIn) {
      toast.error("Please login first")
      navigate("/login")
      return
    }

    if(selectedSeats.length === 0) {
      toast.error("Select seats first")
      return
    }

    try {
      setBooking(true)

      const res = await fetch("https://backbilly.vercel.app/api/movies/book-seats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movie_id: Number(movieId),
          seats: selectedSeats,
          // ✅ بيانات اللاعب من الـ localStorage تلقائياً
          name: user.full_name,
          phone: user.phone,
          player_id: user.player_id
        })
      })

      const data = await res.json()

      if(!res.ok) {
        toast.error(data.error || "Booking failed")
        return
      }

      toast.success(`Booking confirmed 🎬`)
      setSelectedSeats([])
      await loadSeats()

    } catch(err) {
      toast.error("Something went wrong")
    } finally {
      setBooking(false)
    }
  }

  if(loading) return (
    <div className="min-h-screen flex items-center justify-center text-white">
      Loading seats...
    </div>
  )

  const available = seats.filter(s => !s.is_booked).length

  return (
    <div className="max-w-3xl mx-auto py-20 px-6 text-white min-h-screen">

      <h1 className="text-2xl font-bold mb-2">Choose Seats</h1>

      {/* ✅ لو logged in يظهر بياناته */}
      {isLoggedIn ? (
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-3 mb-6">
          <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center font-bold text-sm">
            {user.full_name?.[0]?.toUpperCase()}
          </div>
          <div>
            <p className="font-medium text-sm">{user.full_name}</p>
            <p className="text-xs text-gray-400">{user.phone}</p>
          </div>
          <span className="ml-auto text-xs text-green-400 bg-green-500/10 border border-green-500/20 px-2 py-1 rounded">
            ✓ Logged in
          </span>
        </div>
      ) : (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-6 text-sm text-yellow-400">
          ⚠️ You need to{" "}
          <span className="underline cursor-pointer" onClick={() => navigate("/login")}>
            login
          </span>
          {" "}to book seats
        </div>
      )}

      <p className="text-sm text-gray-400 mb-6">
        {available} seats available · {selectedSeats.length} selected
      </p>

      {/* SCREEN */}
      <div className="text-center mb-8">
        <div className="text-xs text-gray-500 mb-2 tracking-widest uppercase">🎬 Screen</div>
        <div className="bg-gray-600 h-1.5 w-3/4 mx-auto rounded-full mb-8"></div>
      </div>

      {/* SEATS */}
      <div className="grid grid-cols-5 gap-3 justify-center mb-8">
        {seats.map(seat => (
          <div
            key={seat.seat_number}
            onClick={() => toggleSeat(seat)}
            className={`h-12 flex items-center justify-center rounded-md text-sm font-semibold cursor-pointer transition
              ${seat.is_booked
                ? "bg-red-600 cursor-not-allowed opacity-70"
                : selectedSeats.includes(seat.seat_number)
                ? "bg-blue-500 ring-2 ring-white"
                : "bg-emerald-600 hover:bg-emerald-500"
              }`}
          >
            {seat.seat_number}
          </div>
        ))}
      </div>

      {/* LEGEND */}
      <div className="flex gap-4 text-xs text-gray-400 mb-6 justify-center">
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-emerald-600 inline-block"/> Available</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-blue-500 inline-block"/> Selected</span>
        <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-red-600 inline-block"/> Booked</span>
      </div>

      {/* SELECTED SEATS SUMMARY */}
      {selectedSeats.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4 text-sm">
          <p>Seats: <span className="font-mono text-emerald-400">{selectedSeats.join(", ")}</span></p>
        </div>
      )}

      <button
        onClick={bookSeats}
        disabled={booking}
        className="mt-2 w-full bg-emerald-600 hover:bg-emerald-500 p-3 rounded font-bold transition disabled:opacity-50"
      >
        {booking ? "Booking..." : "Confirm Booking"}
      </button>

    </div>
  )
}