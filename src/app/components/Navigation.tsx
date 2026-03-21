import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../asst/logo.png";

declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
declare module "*.mp4";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [accountLink, setAccountLink] = useState("/register");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const savedUser = localStorage.getItem("userProfile");
    const savedAccount = localStorage.getItem("userAccount");

    if (savedUser) {
      const user = JSON.parse(savedUser);
    setUsername(user.name || user.username || user.full_name || "User");
      setAccountLink("/profile");
      setLoggedIn(true);
    } else if (savedAccount) {
      setAccountLink("/login");
      setLoggedIn(false);
    } else {
      setAccountLink("/register");
      setLoggedIn(false);
    }
    setLoading(false);
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("userProfile");
    setLoggedIn(false);
    setUsername("");
    navigate("/");
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/rooms", label: "Rooms" },
    { path: "/games", label: "Games" },
    { path: "/movie-nights", label: "Movie Nights" },
    { path: "/food", label: "Food & Drinks" },
    { path: "/events", label: "Events" },
    { path: "/location", label: "Location" },
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* LOGO */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative w-24 h-16 sm:w-32 sm:h-24 overflow-hidden rounded-lg shrink-0">
                <img
                  src={logo}
                  loading="lazy"
                  alt="Billy's Hub Logo"
                  className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-4 py-2 text-sm transition-colors ${
                    isActive(item.path)
                      ? "text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {item.label}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                    />
                  )}
                </Link>
              ))}
            </div>

            {/* RIGHT SIDE - DESKTOP */}
            <div className="hidden lg:flex items-center space-x-4">
              {loading ? (
                <div className="w-6 h-6 rounded-full border-2 border-gray-600 border-t-primary animate-spin" />
              ) : (
                <>
                  <Link
                    to={accountLink}
                    className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
                  >
                    <User className="w-6 h-6" />
                    {loggedIn && (
                      <span className="text-sm font-medium">{username}</span>
                    )}
                  </Link>
                  {loggedIn && (
                    <button
                      onClick={logout}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <LogOut className="w-6 h-6" />
                    </button>
                  )}
                </>
              )}
              <Link
                to="/rooms"
                className="px-6 py-2.5 bg-primary text-white hover:bg-red-700 transition-all duration-300"
              >
                Book Now
              </Link>
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-white hover:text-primary"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-black/60 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* SIDE DRAWER */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 h-full w-72 z-50 bg-black border-r border-white/10 lg:hidden flex flex-col"
          >
            {/* DRAWER HEADER */}
            <div className="flex items-center justify-between px-5 h-20 border-b border-white/10">
              <img src={logo} alt="Billy's Hub" className="h-10 object-contain" />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* USER INFO */}
            <div className="px-5 py-4 border-b border-white/10">
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600 border-t-primary animate-spin" />
                  <span className="text-sm text-gray-400">Loading...</span>
                </div>
              ) : loggedIn ? (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-medium">{username}</p>
                      <Link
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className="text-xs text-gray-400 hover:text-primary"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                  <button
                    onClick={() => { logout(); setIsOpen(false); }}
                    className="p-2 text-gray-400 hover:text-red-500"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <Link
                  to={accountLink}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Sign In / Register</span>
                </Link>
              )}
            </div>

            {/* NAV LINKS */}
            <div className="flex-1 overflow-y-auto py-3">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center px-5 py-3.5 text-sm transition-colors ${
                      isActive(item.path)
                        ? "text-white bg-primary/10 border-l-2 border-primary"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* BOOK NOW */}
            <div className="p-5 border-t border-white/10">
              <Link
                to="/rooms"
                onClick={() => setIsOpen(false)}
                className="block w-full py-3 text-center bg-primary text-white hover:bg-red-700 transition-all duration-300 text-sm font-medium"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}