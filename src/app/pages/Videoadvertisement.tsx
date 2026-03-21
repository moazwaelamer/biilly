import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import videoAd from "../../asst/finalbillys.mp4";

export function VideoAdSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            video.play();
          } else {
            setVisible(false);
            video.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <section className="w-full bg-black text-white py-24 px-6 md:px-20">
      <div className="max-w-7xl mx-auto text-center">
   
        <div className="flex justify-center">
          <motion.div className="relative aspect-[9/16] h-[600px] border-[8px] border-zinc-800 rounded-[3rem] overflow-hidden shadow-2xl bg-black">
            <video
              ref={videoRef}
              src={videoAd}
              className="w-full h-full object-cover"
              loop
              muted
              playsInline
            />

            {/* زرار الصوت */}
            {visible && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={toggleMute}
                className="absolute bottom-5 right-5 bg-black/60 backdrop-blur-sm border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-black/80 transition"
              >
                {muted ? "🔇 Tap for Sound" : "🔊 Mute"}
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}