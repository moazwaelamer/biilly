import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Navigation, Wifi, ParkingCircle, Coffee } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function Location() {
  const hours = [
    { day: "Monday - Thursday", time: "12:00 PM - 2:00 AM" },
    { day: "Friday", time: "12:00 PM - 4:00 AM" },
    { day: "Saturday", time: "10:00 AM - 4:00 AM" },
    { day: "Sunday", time: "10:00 AM - 12:00 AM" },
  ];

  const amenities = [
    { icon: Wifi, label: "Free High-Speed WiFi" },
    { icon: ParkingCircle, label: "Free Parking" },
    { icon: Coffee, label: "Café & Bar" },
    { icon: Navigation, label: "Easy Access" },
  ];

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="relative py-32 bg-gradient-to-b from-black to-zinc-950">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23dc2626" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }} />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-block px-4 py-2 bg-primary/20 border border-primary/50 backdrop-blur-sm mb-6">
              <p className="text-primary text-sm tracking-wider">VISIT US</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our <span className="text-primary">Location</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Find us in the heart of the Tech District - easy to reach, impossible to forget
            </p>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative h-[500px] bg-zinc-900">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1730317195705-8a265a59ed1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaXR5JTIwbWFwJTIwbG9jYXRpb24lMjBtb2Rlcm58ZW58MXx8fHwxNzcyMjIwOTU2fDA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Location Map"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200 }}
            className="bg-primary/90 backdrop-blur-sm p-8 border-4 border-white/20 max-w-md"
          >
            <MapPin className="w-16 h-16 text-white mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2 text-center">PS Lounge</h3>
            <p className="text-white text-center">
              123 Gaming Street<br />
              Tech District<br />
              San Francisco, CA 94105
            </p>
            <button className="w-full mt-6 px-6 py-3 bg-white text-primary hover:bg-gray-100 transition-all font-bold flex items-center justify-center">
              <Navigation className="w-5 h-5 mr-2" />
              Get Directions
            </button>
          </motion.div>
        </div>
      </section>

      {/* Contact & Hours */}
      <section className="py-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8"
            >
              <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Address</h3>
                    <p className="text-gray-400">
                      123 Gaming Street, Tech District<br />
                      San Francisco, CA 94105
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Phone</h3>
                    <a href="tel:+15551234567" className="text-gray-400 hover:text-primary transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Email</h3>
                    <a href="mailto:info@pslounge.com" className="text-gray-400 hover:text-primary transition-colors">
                      info@pslounge.com
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Opening Hours */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 p-8"
            >
              <h2 className="text-3xl font-bold mb-8 text-white flex items-center">
                <Clock className="w-8 h-8 text-primary mr-3" />
                Opening Hours
              </h2>
              <div className="space-y-4">
                {hours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-white/5 border-l-2 border-primary"
                  >
                    <span className="text-white font-bold">{schedule.day}</span>
                    <span className="text-primary">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-primary/10 border border-primary/30">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">24/7 Booking Available!</strong> Reserve your room anytime online.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      
      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-red-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Visit Us Today!
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Stop by for a tour or book your gaming session online
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-8 py-4 bg-white text-primary hover:bg-gray-100 transition-all font-bold">
                <Navigation className="mr-2 w-5 h-5" />
                Get Directions
              </button>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center px-8 py-4 bg-white/10 text-white border-2 border-white hover:bg-white/20 transition-all backdrop-blur-sm font-bold"
              >
                <Phone className="mr-2 w-5 h-5" />
                Call Now
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
