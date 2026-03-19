import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Clock, MapPin, Play, X, Calendar } from "lucide-react";

/* ================= ROOMS ================= */

const ROOMS = [
  { name: "Standard Room", type: "standard", price: 100 },
  { name: "Mini Studio", type: "mini", price: 100 },
  { name: "VIP Room", type: "vip", price: 120 },
];

/* ================= DAYS AUTO ================= */

function generateDays(daysAhead = 4) {
  const days = [];
  const today = new Date();

  for (let i = 0; i < daysAhead; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    days.push({
      label: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      name:
        i === 0
          ? "Today"
          : d.toLocaleDateString("en-US", { day: "numeric", month: "short" }),
      date: d.toISOString().split("T")[0],
    });
  }
  return days;
}

const DAYS = generateDays(4);

/* ================= TIMES AUTO ================= */

function generateTimes(
  openingHour = 13,
  closingHour = 23,
  movieHours = 2,
  breakMinutes = 30
) {
  const times = [];
  let current = openingHour * 60;
  const end = closingHour * 60;
  const duration = movieHours * 60;

  while (current + duration <= end) {
    const h = Math.floor(current / 60);
    const m = current % 60;
    const t = new Date();
    t.setHours(h, m);

    times.push(
      t.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );

    current += duration + breakMinutes;
  }

  return times;
}

const TIMES = generateTimes();

/* ================= MOVIES ================= */

const MOVIES_DATA = {
  "wuthering-heights": {
    title: "Wuthering Heights",
    genre: "ROMANCE • DRAMA",
    story:
      "A bold and original imagining of one of the greatest love stories of all time.",
    img: "https://images.unsplash.com/photo-1771315130849-737e0622c712?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },

  hamnet: {
    title: "Hamnet",
    genre: "DRAMA • ROMANCE",
    story:
      "1580 England. William Shakespeare meets the free-spirited Agnes.",
    img: "https://images.unsplash.com/photo-1699152503395-e508b8824ed1?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/ysz5S6PUM-U",
  },

  "crime-101": {
    title: "Crime 101",
    genre: "THRILLER • CRIME",
    story:
      "A sharp cat-and-mouse thriller where justice and obsession collide.",
    img: "https://images.unsplash.com/photo-1765510296004-614b6cc204da?auto=format&fit=crop&w=900&q=80",
    trailer: "https://www.youtube.com/embed/ScMzIvxBSi4",
  },
};

/* ================= COMPONENT ================= */

export function MovieDetails() {

  const { id } = useParams();

const movie = id ? MOVIES_DATA[id as keyof typeof MOVIES_DATA] : undefined;
if (!movie) {
  return (
    <div className="text-white text-center p-20">
      Movie not found
    </div>
  );
}

  const [selectedRoom, setSelectedRoom] = useState(ROOMS[0]);

  const [selectedDay, setSelectedDay] = useState(DAYS[0]);
  const [selectedDate, setSelectedDate] = useState(DAYS[0].date);

  const [selectedTime, setSelectedTime] = useState("");

  const [duration, setDuration] = useState(2);

  const [showTrailer, setShowTrailer] = useState(false);

  const totalPrice = selectedRoom.price * duration;

  if (!movie) return <div className="text-white p-20">Movie not found</div>;

  return (
    <div className="bg-black text-white min-h-screen pt-20">

      {/* TRAILER */}

      {showTrailer && (
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">

          <button
            onClick={() => setShowTrailer(false)}
            className="absolute top-4 right-4"
          >
            <X className="w-8 h-8" />
          </button>

          <iframe
            src={`${movie.trailer}?autoplay=1`}
            className="w-full max-w-3xl h-[60vh]"
            allowFullScreen
          />

        </div>
      )}

      {/* HERO */}

      <section className="max-w-7xl mx-auto px-4 py-10 md:flex gap-10">

        <img
          src={movie.img}
          loading="lazy"
          className="w-72 h-[420px] object-cover rounded"
        />

        <div>

          <p className="text-emerald-500 font-bold mb-2">{movie.genre}</p>

          <h1 className="text-5xl font-black italic mb-4">
            {movie.title}
          </h1>

          <p className="text-gray-300 mb-6">{movie.story}</p>

          <button
            onClick={() => setShowTrailer(true)}
            className="px-8 py-3 bg-white text-black font-bold"
          >
            <Play className="inline w-4 h-4 mr-2" />
            Watch Trailer
          </button>

        </div>

      </section>

      {/* CONTENT */}

      <section className="py-20">

        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-3 gap-12">

          {/* LEFT */}

          <div className="lg:col-span-2">

            {/* ROOMS */}

            <h3 className="text-2xl font-bold mb-4">
              Choose Room
            </h3>

            <div className="grid md:grid-cols-3 gap-4 mb-8">

              {ROOMS.map((room) => (

                <button
                  key={room.type}
                  onClick={() => setSelectedRoom(room)}
                  className={`p-4 border ${
                    selectedRoom.type === room.type
                      ? "border-emerald-500 bg-emerald-500/20"
                      : "border-white/20"
                  }`}
                >

                  <p className="font-bold">{room.name}</p>

                  <p className="text-emerald-400">
                    {room.price} EGP / hour
                  </p>

                </button>

              ))}

            </div>

            {/* DAYS */}

            <div className="flex gap-3 mb-8 overflow-x-auto">

              {DAYS.map((day) => (

                <button
                  key={day.date}
                  onClick={() => {
                    setSelectedDay(day);
                    setSelectedDate(day.date);
                    setSelectedTime("");
                  }}
                  className={`min-w-[110px] py-3 border ${
                    selectedDay.date === day.date
                      ? "border-emerald-500"
                      : "border-white/20"
                  }`}
                >

                  <div className="text-xs">{day.label}</div>
                  <div className="font-bold">{day.name}</div>

                </button>

              ))}

            </div>

            {/* TIMES */}

            <h3 className="flex items-center gap-2 mb-4">
              <MapPin className="w-4 h-4" />
              Billys Hub
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">

              {TIMES.map((time) => (

                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 border ${
                    selectedTime === time
                      ? "bg-emerald-500 border-emerald-500 text-black"
                      : "border-white/20"
                  }`}
                >

                  <Clock className="inline w-4 h-4 mr-2" />
                  {time}

                </button>

              ))}

            </div>

          </div>

          {/* BOOKING BOX */}

          <div>

            <div className="sticky top-28 bg-white/5 border border-white/10 p-6">

              <h3 className="text-2xl font-bold mb-6">
                Booking Summary
              </h3>

              <div className="space-y-3 mb-6">

                <div className="flex justify-between">
                  <span>Movie</span>
                  <span>{movie.title}</span>
                </div>

                <div className="flex justify-between">
                  <span>Room</span>
                  <span>{selectedRoom.name}</span>
                </div>

                <div className="flex justify-between">
                  <span>Price/hour</span>
                  <span>{selectedRoom.price} EGP</span>
                </div>

              </div>

              {/* DATE */}

              <label className="flex items-center mb-2">
                <Calendar className="w-4 mr-2" />
                Selected Date
              </label>

              <input
                type="date"
                value={selectedDate}
                readOnly
                className="w-full mb-6 bg-white/5 border border-white/10 px-4 py-3"
              />

              {/* DURATION */}

              <label className="block mb-2">
                Duration (hours)
              </label>

             <select
value={duration}
onChange={(e)=>setDuration(Number(e.target.value))}
className="w-full mb-6 bg-black border border-white/20 px-4 py-3 text-white focus:border-emerald-500 outline-none"
>

                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
                <option value={3}>3 Hours</option>

              </select>

              {/* TOTAL */}

              <div className="flex justify-between text-xl font-bold mb-6">

                <span>Total</span>

                <span className="text-emerald-400">
                  {totalPrice} EGP
                </span>

              </div>

              {/* BOOK */}

              <Link
                to={selectedTime ? `/booking/${id}` : "#"}
                state={{
                  type: "movie",
                  movieName: movie.title,
                  roomName: selectedRoom.name,
                  price: selectedRoom.price,
                  duration,
                  date: selectedDate,
                  time: selectedTime
                }}
                className={`block text-center py-4 font-bold ${
                  selectedTime
                    ? "bg-emerald-500 text-black hover:bg-emerald-400"
                    : "bg-white/10 text-gray-500 cursor-not-allowed"
                }`}
              >

                {selectedTime
                  ? "Proceed to Booking"
                  : "Select Date & Time"}

              </Link>

            </div>

          </div>

        </div>

      </section>

    </div>
  );
}