import { motion } from "framer-motion";
import videoAd from "../../asst/finalbillys.mp4";

export function VideoAdSection(){

return(

<section className="w-full bg-black text-white py-24 px-6 md:px-20">

<div className="max-w-7xl mx-auto text-center">

<motion.h2
initial={{opacity:0,y:30}}
whileInView={{opacity:1,y:0}}
transition={{duration:0.6}}
className="text-5xl font-black mb-10 uppercase"
>

Experience The Ultimate Gaming Room

</motion.h2>

<div className="flex justify-center">

<motion.div
className="relative aspect-[9/16] h-[600px] border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl bg-black"
>

<video
src={videoAd}
className="w-full h-full object-cover"
autoPlay
loop
muted
playsInline
controls
/>

</motion.div>

</div>

</div>

</section>

)

}