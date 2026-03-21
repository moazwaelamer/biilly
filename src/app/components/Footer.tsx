import { Link } from "react-router-dom";
import { Gamepad2, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Gamepad2 className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold text-white">
                Billy's <span className="text-primary">Hub</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Premium PlayStation gaming experience with luxury amenities, exclusive game library, and unforgettable entertainment.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/billys.hub.eg?igsh=emFnYmtvOHRwZ2hx" className="text-gray-400 hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/rooms" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Browse Rooms
                </Link>
              </li>
              <li>
                <Link to="/games" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Game Library
                </Link>
              </li>
              <li>
                <Link to="/movie-nights" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Movie Nights
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Events & Tournaments
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/food-drinks" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Food & Beverages
                </Link>
              </li>
    
              <li>
                <a href="birthday" className="text-gray-400 hover:text-primary transition-colors text-sm">
                  Birthday Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">
                  Abou Hanifa Al Nomani, El Sheikh Zayed, Ismailia, Ismailia Governorate 41511
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-gray-400 text-sm">+201552858668</span>
              </li>
          
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2026 Billy's Hub. All rights reserved.
            </p>
          
          </div>
          <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm flex items-center justify-center gap-3">
  Powered by
<a
  href="https://azteac.com"
  target="_blank"
  rel="noopener noreferrer"
  className="azteac-container"
  style={{ padding: '20px 10px' }}
>
  <span className="azteac-text">AZTEAC</span>

  <svg 
    className="azteac-snake" 
    viewBox="0 0 280 80" 
    preserveAspectRatio="none"
    style={{ overflow: 'visible' }}
  >
    <path
      /* رسمة منحنية تمر فوق وتحت الحروف */
      d="M10,40 
         Q30,0 50,40 
         Q70,80 90,40 
         Q110,0 130,40 
         Q150,80 170,40 
         Q190,0 210,40 
         Q230,80 250,40"
      className="snake-path"
    />
  </svg>
</a>
</p>
          </div>
        </div>
      </div>
    </footer>
  );
}