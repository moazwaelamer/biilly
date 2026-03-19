import { Gamepad2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function PlayStationService() {

  const background =
    "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=2000&q=80";

  return (

    <section className="relative bg-black w-full min-h-screen my-10 md:my-20 flex flex-col overflow-hidden text-white">

      {/* Background */}

      <div className="absolute inset-0 z-0">

        <motion.img
          src={background}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full h-full object-cover object-center"
        />

        <div className="absolute inset-0 bg-black/60"/>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"/>

      </div>

      {/* Content */}

      <div className="relative z-10 flex-grow flex items-center px-6 md:px-20 py-24 md:py-32">

        <div className="max-w-3xl">

          <span className="bg-primary px-3 py-1 rounded text-xs font-bold uppercase tracking-widest">
            Gaming
          </span>

          <h1 className="text-5xl md:text-7xl font-black mt-6 mb-6 uppercase">
            PLAYSTATION ROOMS
          </h1>

          <p className="text-lg text-gray-200 mb-10">
            Enjoy playing PS5 with your friends in private gaming rooms
            with 4K screens, RGB lighting and high-speed internet.
          </p>

          <Link
            to="/rooms?category=gaming"
            state={{ type: "gaming" }}
            className="flex items-center gap-3 bg-primary hover:bg-red-700 text-white px-10 py-4 w-fit font-bold uppercase"
          >
            <Gamepad2 size={20}/>
            Book Gaming Room
          </Link>

        </div>

      </div>

    </section>

  );

}