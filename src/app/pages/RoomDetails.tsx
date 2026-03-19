import { useState, useEffect } from "react"
import { useParams, useLocation, useNavigate } from "react-router-dom"
import { Calendar, Clock, Check, Users, Trophy } from "lucide-react"

interface TimeSlot {
  time: string
  available: boolean
  booked: boolean
  tournament: boolean
}

export function RoomDetails() {

  const navigate = useNavigate()
  const { id } = useParams()
  const location = useLocation()

  const [room, setRoom] = useState<any>(null)
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  // ✅ Cairo Date
  const getCairoDate = () => {
    const cairo = new Date(
      new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
    )
    return cairo.toISOString().split("T")[0]
  }

  // ✅ Cairo Time Now
  const getCairoNow = () => {
    return new Date(
      new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" })
    )
  }

  const [selectedDate, setSelectedDate] = useState(getCairoDate())
  const [startTime, setStartTime] = useState("")
  const [duration, setDuration] = useState(1)
  const [mode, setMode] = useState<"single" | "multi">("single")

  const bookingType = location.state?.type ?? "gaming"

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  /* ================= GET ROOM ================= */
  useEffect(() => {
    if (!id) return

    fetch(`https://backbilly.vercel.app/api/rooms`)
      .then(r => r.json())
      .then((rooms) => {
        const found = rooms.find((r: any) => r.room_id === Number(id))
        setRoom(found)
      })
      .catch(console.error)

  }, [id])

  /* ================= GET AVAILABILITY ================= */
  useEffect(() => {
    if (!selectedDate || !room?.room_id) return

    const loadSlots = async () => {
      try {
        setLoadingSlots(true)

        const res = await fetch(
          `https://backbilly.vercel.app/api/reservations/availability?room_id=${room.room_id}&date=${selectedDate}`
        )

        const data = await res.json()
        setTimeSlots(Array.isArray(data) ? data : [])

      } catch (err) {
        console.log("Availability error", err)
        setTimeSlots([])
      } finally {
        setLoadingSlots(false)
      }
    }

    loadSlots()
  }, [selectedDate, room?.room_id])

  /* ================= FILTER ================= */

  const now = getCairoNow()

  const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`

  const isToday = selectedDate === getCairoDate()

  const filteredSlots = timeSlots.filter(slot => {
    if (isToday && slot.time <= currentTime) return false
    if (slot.booked) return false
    if (slot.tournament) return false
    return true
  })

  /* ================= PRICE ================= */
  let price = 0

  if (bookingType === "gaming") {
    price = mode === "multi"
      ? (room?.price_multi || 0)
      : (room?.price_single || 0)
  }

  if (bookingType === "movie") {
    price = room?.price_movie || 0
  }

  if (bookingType === "birthday") {
    price = room?.price_birthday || 0
  }

  /* ================= UI HELPERS ================= */
  const durations = [
    { value: 1, label: "1 Hour" },
    { value: 1.5, label: "1.5 Hours" },
    { value: 2, label: "2 Hours" },
    { value: 2.5, label: "2.5 Hours" },
    { value: 3, label: "3 Hours" },
  ]

  const formatTime = (time: string) => {
    const [h, m] = time.split(":")
    const hour = Number(h)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 === 0 ? 12 : hour % 12
    return `${displayHour}:${m} ${ampm}`
  }

  const isMovie = bookingType === "movie"
  const isBirthday = bookingType === "birthday"

  const theme = {
    bg: isMovie ? "bg-emerald-600" : isBirthday ? "bg-purple-600" : "bg-red-600",
    text: isMovie ? "text-emerald-400" : isBirthday ? "text-purple-400" : "text-red-400",
  }

  if (!room) {
    return <div className="text-center text-white mt-20">Loading room...</div>
  }

  return (
    <div className="pt-20 bg-zinc-950 min-h-screen text-white">
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ROOM INFO */}
          <div className="lg:col-span-2">
            <div className="relative mb-8">
              <img
                src={room.image || "/placeholder.jpg"}
                alt={room.room_name}
                className="w-full h-64 md:h-80 object-cover rounded-lg"
              />
              <div className="absolute bottom-4 left-4">
                <h1 className="text-3xl md:text-4xl font-bold">
                  {room.room_name}
                </h1>
                <p className={`font-bold ${theme.text}`}>
                  {bookingType.toUpperCase()}
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-bold mb-6">Room Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
                <Check className="w-5 h-5 text-primary" /> PS5 Console
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
                <Check className="w-5 h-5 text-primary" /> 4K Screen
              </div>
              <div className="flex items-center gap-3 p-4 bg-white/5 border border-white/10">
                <Users className="w-5 h-5 text-primary" /> {room.capacity} Players
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-white/5 border border-white/10 p-6 rounded-lg">

              <p className="text-gray-400 text-sm">Price per Hour</p>
              <p className={`text-2xl font-bold mb-6 ${theme.text}`}>
                {price} EGP
              </p>

              {bookingType === "gaming" && (
                <div className="grid grid-cols-2 gap-2 mb-6">
                  <button onClick={() => setMode("single")}
                    className={`py-3 border ${mode === "single" ? theme.bg : "bg-white/5 border-white/10"}`}>
                    Single
                  </button>
                  <button onClick={() => setMode("multi")}
                    className={`py-3 border ${mode === "multi" ? theme.bg : "bg-white/5 border-white/10"}`}>
                    Multi
                  </button>
                </div>
              )}

              <label className="block mb-2 flex items-center">
                <Calendar className="w-4 h-4 mr-2" /> Select Date
              </label>

              <input
                type="date"
                value={selectedDate}
                min={getCairoDate()}
                onChange={(e) => {
                  setSelectedDate(e.target.value)
                  setStartTime("")
                }}
                className="w-full mb-6 bg-white/5 border border-white/10 px-4 py-3"
              />

              <label className="block mb-3 flex items-center">
                <Clock className="w-4 h-4 mr-2" /> Start Time
              </label>

              {loadingSlots && <p>Loading...</p>}

              <div className="grid grid-cols-2 gap-2 mb-6">
                {filteredSlots.map((slot, i) => (
                  <button key={i}
                    onClick={() => setStartTime(slot.time)}
                    className={`py-3 border ${startTime === slot.time ? theme.bg : "bg-white/5 border-white/10"}`}>
                    {formatTime(slot.time)}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-2 mb-6">
                {durations.map(d => (
                  <button key={d.value}
                    onClick={() => setDuration(d.value)}
                    className={`py-3 border ${duration === d.value ? theme.bg : ""}`}>
                    {d.label}
                  </button>
                ))}
              </div>

              {startTime && (
                <button
                  onClick={() => navigate(`/booking/${room.room_id}`, {
                    state: {
                      roomId: room.room_id,
                      roomName: room.room_name,
                      date: selectedDate,
                      time: startTime,
                      duration,
                      price,
                      mode,
                      type: bookingType
                    }
                  })}
                  className={`w-full py-4 font-bold text-white ${theme.bg}`}
                >
                  Proceed to Booking
                </button>
              )}

            </div>
          </div>

        </div>
      </section>
    </div>
  )
}