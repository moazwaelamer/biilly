import { Cake, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import img from "../../asst/birthday.png";

export function BirthdayService() {

  return (

    <section className="relative w-full min-h-screen flex items-center overflow-hidden">

      {/* Background */}

      <div className="absolute inset-0">

        <motion.img
          src={img}
          alt="Birthday Party"
          loading="eager"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-full h-full object-cover"
        />

        {/* overlay خفيف */}

        <div className="absolute inset-0 bg-black/30 md:bg-black/40" />

      </div>

      {/* Content */}

      <div className="relative z-20 w-full max-w-7xl mx-auto
      px-5 sm:px-8 md:px-12
      pt-32 md:pt-0">

        <motion.div
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >

          {/* Badge */}

          <span className="
          inline-block
          bg-purple-600
          text-white
          px-3 py-1.5
          text-[10px] md:text-xs
          font-bold
          uppercase
          tracking-[0.2em]
          mb-5
          shadow-lg shadow-purple-600/40
          ">
            Exclusive Offer
          </span>

          {/* Title */}

          <h1 className="
          text-4xl
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
          font-black
          text-white
          leading-[1.05]
          mb-5
          ">

            BIRTHDAY
            <br/>

            <span className="text-purple-500">
              PARTIES
            </span>

          </h1>

          {/* Description */}

          <p className="
          text-sm
          sm:text-base
          md:text-lg
          text-white/90
          mb-8
          leading-relaxed
          max-w-md
          ">

            Celebrate your birthday in complete privacy with your friends.
            Enjoy games, movies and unforgettable moments in a private party room.

          </p>

          {/* Button */}

          <Link
            to="/rooms?category=birthday"
            state={{ type: "birthday" }}
            className="
            group
            flex items-center gap-3
            bg-purple-600 hover:bg-purple-500
            text-white
            px-6 py-3 md:px-8 md:py-4
            w-fit
            font-bold
            uppercase
            text-sm md:text-base
            transition-all duration-300
            rounded-md
            shadow-lg shadow-purple-600/40
            hover:shadow-purple-500/70
            "
          >

            <Cake
              size={18}
              className="group-hover:rotate-12 transition-transform"
            />

            <span>
              Book Birthday
            </span>

            <ArrowRight
              size={16}
              className="group-hover:translate-x-2 transition-transform"
            />

          </Link>

        </motion.div>

      </div>

    </section>

  );

}