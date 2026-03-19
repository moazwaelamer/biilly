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

const [isOpen,setIsOpen] = useState(false)
const [accountLink,setAccountLink] = useState("/register")
const [loggedIn,setLoggedIn] = useState(false)
const [username,setUsername] = useState("")

const location = useLocation()
const navigate = useNavigate()

/* CHECK USER */

useEffect(()=>{

const savedAccount = localStorage.getItem("userAccount")
const savedUser = localStorage.getItem("userProfile")

if(savedUser){

const user = JSON.parse(savedUser)

setUsername(user.name)

setAccountLink("/profile")

setLoggedIn(true)

}

else if(savedAccount){

setAccountLink("/login")

setLoggedIn(false)

}

else{

setAccountLink("/register")

setLoggedIn(false)

}

},[location.pathname])


/* LOGOUT */

const logout = ()=>{

localStorage.removeItem("userProfile")

setLoggedIn(false)

setUsername("")

navigate("/")

}


/* NAV ITEMS */

const navItems = [

{ path:"/" , label:"Home" },

{ path:"/rooms" , label:"Rooms" },

{ path:"/games" , label:"Games" },

{ path:"/movie-nights" , label:"Movie Nights" },

{ path:"/food" , label:"Food & Drinks" },

{ path:"/events" , label:"Events" },

{ path:"/location" , label:"Location" }

]


const isActive = (path:string)=>{

if(path === "/") return location.pathname === "/"

return location.pathname.startsWith(path)

}


/* UI */

return(

<nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">

<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

<div className="flex items-center justify-between h-20">


{/* LOGO */}

<Link to="/" className="flex items-center space-x-3 group">

<div className="relative w-22 h-18 overflow-hidden rounded-lg">

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

{navItems.map((item)=>(

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


{/* RIGHT SIDE */}

<div className="hidden lg:flex items-center space-x-4">

<Link
to={accountLink}
className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors"
title="Account"
>

<User className="w-6 h-6"/>

{loggedIn && (

<span className="text-sm font-medium">
{username}
</span>

)}

</Link>


{loggedIn && (

<button
onClick={logout}
className="p-2 text-gray-400 hover:text-red-500 transition-colors"
title="Logout"
>

<LogOut className="w-6 h-6"/>

</button>

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
onClick={()=>setIsOpen(!isOpen)}
className="lg:hidden p-2 text-white hover:text-primary"
>

{isOpen ? <X className="w-6 h-6"/> : <Menu className="w-6 h-6"/>}

</button>

</div>

</div>


{/* MOBILE MENU */}

<AnimatePresence>

{isOpen && (

<motion.div
initial={{opacity:0,height:0}}
animate={{opacity:1,height:"auto"}}
exit={{opacity:0,height:0}}
className="lg:hidden bg-black border-t border-white/10"
>

<div className="px-4 py-4 space-y-1">


{navItems.map((item)=>(

<Link
key={item.path}
to={item.path}
onClick={()=>setIsOpen(false)}
className={`block px-4 py-3 text-sm ${
isActive(item.path)
? "text-white bg-primary/10 border-l-2 border-primary"
: "text-gray-400 hover:text-white hover:bg-white/5"
}`}
>

{item.label}

</Link>

))}


{/* ACCOUNT */}

<Link
to={accountLink}
onClick={()=>setIsOpen(false)}
className="flex items-center gap-2 px-4 py-3 text-gray-400 hover:text-white"
>

<User className="w-5 h-5"/>

{loggedIn ? username : "Account"}

</Link>


{/* LOGOUT */}

{loggedIn && (

<button
onClick={logout}
className="flex items-center gap-2 w-full px-4 py-3 text-red-400"
>

<LogOut className="w-5 h-5"/>

Logout

</button>

)}


<Link
to="/rooms"
className="block px-4 py-3 text-center bg-primary text-white mt-4"
>

Book Now

</Link>

</div>

</motion.div>

)}

</AnimatePresence>

</nav>

)

}