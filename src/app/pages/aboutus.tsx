import { motion } from "framer-motion";
import { Gamepad2, Users, Trophy } from "lucide-react";

export function AboutUsSection() {

return(

<section className="w-full bg-zinc-950 text-white py-24 px-6 md:px-20">

<div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

{/* LEFT */}

<motion.div
initial={{opacity:0,x:-40}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.6}}
viewport={{once:true}}
>

<h2 className="text-5xl font-black mb-6 uppercase">
About Us
</h2>

<p className="text-gray-300 text-lg mb-6">
At Billy’s Hub, we believe gaming should be simple, enjoyable, and consistently high quality.

We’ve created a space where players can relax, connect, and enjoy their time without distractions. With modern PlayStation setups, a strong selection of games, and a comfortable environment, everything is designed to deliver a smooth and reliable experience every time you visit.

Whether you’re coming in to unwind with friends or spend time improving your skills, Billy’s Hub offers the right balance between comfort, performance, and atmosphere.

Our focus is straightforward: provide a place you can trust for a great gaming experience.
</p>

<p className="text-gray-400">
Our rooms are designed for comfort, fun and competition.
Play with friends, celebrate events, or relax with your favorite games.
</p>

</motion.div>

{/* RIGHT */}

<motion.div
initial={{opacity:0,x:40}}
whileInView={{opacity:1,x:0}}
transition={{duration:0.6}}
viewport={{once:true}}
className="grid grid-cols-1 gap-6"
>

<div className="flex items-center gap-4 bg-white/5 p-6 border border-white/10">

<Gamepad2 className="text-primary w-8 h-8"/>

<div>
<h3 className="font-bold text-xl">Latest Gaming</h3>
<p className="text-gray-400">PS5 with latest games</p>
</div>

</div>

<div className="flex items-center gap-4 bg-white/5 p-6 border border-white/10">

<Users className="text-primary w-8 h-8"/>

<div>
<h3 className="font-bold text-xl">Private Rooms</h3>
<p className="text-gray-400">Play with friends privately</p>
</div>

</div>

<div className="flex items-center gap-4 bg-white/5 p-6 border border-white/10">

<Trophy className="text-primary w-8 h-8"/>

<div>
<h3 className="font-bold text-xl">Tournaments</h3>
<p className="text-gray-400">Competitive gaming events</p>
</div>

</div>

</motion.div>

</div>

</section>

)

}