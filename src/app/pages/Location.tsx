import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Navigation, Wifi, ParkingCircle, Coffee } from "lucide-react";

export function Location() {
  const hours = [
    { day: "Saturday - Thursday", time: "12:00 PM - 2:00 AM" },
    { day: "Friday", time: "2:00 PM - 4:00 AM" },
  ];

  const amenities = [
    { icon: Wifi, label: "Free High-Speed WiFi" },
    { icon: ParkingCircle, label: "Free Parking" },
    { icon: Coffee, label: "Café & Snacks" },
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
              Find us in Ismailia — easy to reach, impossible to forget
            </p>
          </motion.div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="relative h-[500px] bg-zinc-900">
      <iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3433.7872264890584!2d32.3004199!3d30.611764200000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f859e699b52e1f%3A0xb90070327cadb115!2z2KfZhNi02LHZgiDYp9mE2KfZiNiz2Lcg2YTZhNin2LPYqtmK2LHYp9ivINmI2KfZhNiq2LXYr9mK2LEg2YjYp9mE2KrZiNix2YrYr9in2Ko!5e0!3m2!1sen!2seg!4v1774110540427!5m2!1sen!2seg"
  width="100%"
  height="100%"
  style={{ border: "0", filter: "invert(90%) hue-rotate(180deg)" }}
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>
    
        {/* Overlay Pin */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <a
            href="https://maps.app.goo.gl/Cu5Fzmgsxs1MNRFB6"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-primary px-6 py-3 font-bold text-white hover:bg-red-700 transition-all shadow-lg"
          >
            <Navigation className="w-5 h-5" />
            Get Directions
          </a>
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
                      Billy's Hub Gaming Lounge<br />
                      Ismailia, Egypt
                    </p>
                    <a
                      href="https://maps.app.goo.gl/Cu5Fzmgsxs1MNRFB6"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary text-sm hover:underline mt-1 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">Phone</h3>
                    <a href="tel:+201225596595" className="text-gray-400 hover:text-primary transition-colors">
                      01552858668
                    </a>
                  </div>
                </div>

              
              </div>

              {/* Amenities */}
              <div className="mt-8 pt-8 border-t border-white/10">
                <h3 className="text-white font-bold mb-4">Amenities</h3>
                <div className="grid grid-cols-2 gap-3">
                  {amenities.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                      <a.icon className="w-4 h-4 text-primary" />
                      {a.label}
                    </div>
                  ))}
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
              
              <div className="mt-6 p-4 bg-primary/10 border border-primary/30">
                <p className="text-gray-300 text-sm">
                  <strong className="text-white">24/7 Booking Available!</strong> Reserve your room anytime online.
                </p>
              </div>

              {/* Quick Actions */}
              <div className="mt-8 space-y-3">
                <a
                  href="https://maps.app.goo.gl/Cu5Fzmgsxs1MNRFB6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 bg-primary hover:bg-red-700 text-white font-bold transition-all"
                >
                  <Navigation className="w-5 h-5" />
                  Get Directions
                </a>
                <a
                  href="tel:+201552858668"
                  className="flex items-center justify-center gap-2 w-full py-3 border border-white/20 hover:border-white/40 text-white font-bold transition-all"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
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
              <a
                href="https://maps.app.goo.gl/Cu5Fzmgsxs1MNRFB6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-white text-primary hover:bg-gray-100 transition-all font-bold"
              >
                <Navigation className="mr-2 w-5 h-5" />
                Get Directions
              </a>
              <a
                href="tel:+201552858668 "
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