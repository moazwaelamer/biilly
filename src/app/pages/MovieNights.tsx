import { Ticket } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export function MovieNights() {

const background =
"https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2000&auto=format&fit=crop";

const [events,setEvents] = useState<any[]>([]);

/* Load Events */

useEffect(()=>{

const loadEvents = async ()=>{

try{

const res = await fetch("https://backbilly.vercel.app/api/movies")
const data = await res.json()

setEvents(data)

}catch(err){

console.log("Movies load error:",err)

}

}

loadEvents()

const interval = setInterval(loadEvents,5000)

return ()=> clearInterval(interval)

},[])
const isSoldOut = (event:any) => 
  event.booked_seats >= event.total_seats;
return(

<section className="relative bg-black w-full min-h-screen flex items-center overflow-hidden text-white py-32 my-24">

{/* Background */}

<div className="absolute inset-0 z-0">

<motion.img
src={background}
initial={{opacity:0}}
animate={{opacity:1}}
transition={{duration:0.8}}
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-black/70"/>
<div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/20"/>

</div>

{/* Content */}

<div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-20">

<div className="grid lg:grid-cols-2 gap-20 items-center">

{/* LEFT SIDE */}

<div>

<span className="bg-emerald-600 px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
Movie Nights
</span>

<h1 className="text-5xl md:text-7xl font-black mt-6 mb-6 leading-[0.9] uppercase">
PRIVATE MOVIE ROOM
</h1>

<p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed">
Enjoy your favorite movies with friends in a private cinema room.
We provide access to streaming platforms like
<span className="text-emerald-400 font-bold"> Netflix</span>,
<span className="text-emerald-400 font-bold"> Shahid</span> and
<span className="text-emerald-400 font-bold"> Disney+</span>.
</p>

<p className="text-gray-400 mb-10">
Choose your room, pick your time and enjoy the movie experience.
</p>

<Link
to="/rooms?category=movie"
state={{type:"movie"}}
className="flex items-center gap-3 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-4 w-fit font-bold uppercase tracking-widest transition-all shadow-lg"
>

<Ticket size={20}/>
Book Movie Night

</Link>

</div>

{/* RIGHT SIDE EVENTS */}

<div>

<div className="space-y-6">

<h3 className="text-2xl font-bold text-emerald-400">
Upcoming Events
</h3>

{events.map((event)=>{

const soldOut = event.booked_seats >= event.total_seats

return (

<div
key={event.movie_id}
className={`block bg-black/70 border p-6 transition rounded-lg relative
${soldOut ? "border-red-500/50 opacity-80" : "border-emerald-500/30 hover:border-emerald-500"}
`}
>


<img
src={`https://backbilly.vercel.app${event.image_url}`}
className="w-full h-40 object-cover rounded mb-4"
/>
{/* SOLD OUT BADGE */}
{soldOut && (
<div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
SOLD OUT
</div>
)}

<h4 className="text-lg font-bold text-emerald-400 mb-2">
{event.title}
</h4>

<p className="text-gray-300 text-sm">
Date : {new Date(event.movie_date).toLocaleString("en-GB",{
day:"2-digit",
month:"2-digit",
year:"numeric",
hour:"2-digit",
minute:"2-digit"
})}
</p>
<p className="text-gray-300 text-sm">
Seats : {event.total_seats}
</p>

<p className="text-emerald-400 font-bold mt-2">
{event.price} EGP
</p>
<p className="text-gray-300 text-sm">
Remaining : {event.total_seats - event.booked_seats}
</p>
{/* زر الحجز */}
{!soldOut ? (
<Link
to={`/movie-booking/${event.movie_id}`}
state={{
type:"movie",
roomName:event.title,
date:new Date(event.movie_date).toISOString().split("T")[0],
time:new Date(event.movie_date).toLocaleTimeString([],{
hour:"2-digit",
minute:"2-digit"
}),
mode:"movie",
price:event.price,
duration:1
}}
className="mt-4 inline-block bg-emerald-600 hover:bg-emerald-500 px-5 py-2 text-sm font-bold rounded"
>
Book Seats
</Link>

) : (
<div className="mt-4 bg-red-600 text-white text-center py-2 rounded font-bold">
Event Full
</div>
)}

</div>

)
})}

</div>

</div>

</div>

</div>

</section>

)

}