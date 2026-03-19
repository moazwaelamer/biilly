import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { User, Phone, Mail, Lock, Globe, Gamepad2 } from "lucide-react";

const COUNTRIES = [
  "Egypt", "Saudi Arabia", "UAE", "Kuwait", "Qatar",
  "Jordan", "Lebanon", "Iraq", "Morocco", "Tunisia", "Other"
]

export function Register() {

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    email: "",
    password: "",
    nickname: "",
    country: ""
  })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!form.full_name.trim() || !form.phone.trim() || !form.email.trim() || !form.password){
      toast.error("Please fill all required fields")
      return
    }

    if(form.password.length < 6){
      toast.error("Password must be at least 6 characters")
      return
    }

    if(form.phone.length < 10){
      toast.error("Invalid phone number")
      return
    }

    try{
      setLoading(true)

      const res = await fetch("https://backbilly.vercel.app/api/players/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: form.full_name.trim(),
          phone: form.phone.trim(),
          email: form.email.trim(),
          password: form.password,
          nickname: form.nickname.trim() || null,
          country: form.country || null
        })
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.error || "Registration failed")
        return
      }

      localStorage.setItem("userProfile", JSON.stringify(data))
      toast.success(`Welcome ${data.full_name} 🎮`)
      navigate("/profile")

    }catch(err){
      toast.error("Server error, try again")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 py-12 px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black italic text-white uppercase tracking-tighter">
            Create <span className="text-primary">Account</span>
          </h2>
          <p className="text-zinc-500 text-sm mt-2 tracking-widest uppercase">
            Join the arena
          </p>
        </div>

        <form onSubmit={handleRegister} className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-4">

          {/* Full Name */}
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              name="full_name"
              placeholder="Full Name *"
              value={form.full_name}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 text-white rounded-lg focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Nickname */}
          <div className="relative">
            <Gamepad2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              name="nickname"
              placeholder="Gaming Nickname (optional)"
              value={form.nickname}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 text-white rounded-lg focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Phone */}
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              name="phone"
              placeholder="Phone Number *"
              value={form.phone}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 text-white rounded-lg focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={form.email}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 text-white rounded-lg focus:border-primary focus:outline-none transition"
            />
          </div>

          {/* Country */}
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <select
              name="country"
              value={form.country}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 text-white rounded-lg focus:border-primary focus:outline-none transition appearance-none"
            >
              <option value="">Select Country (optional)</option>
              {COUNTRIES.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 characters) *"
              value={form.password}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 bg-black/30 border border-white/10 text-white rounded-lg focus:border-primary focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white font-black uppercase italic tracking-widest rounded-lg hover:bg-red-700 transition disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-gray-400 text-sm">
            Already have an account?
            <Link to="/login" className="text-primary ml-2 font-semibold hover:underline">
              Login
            </Link>
          </p>

        </form>
      </div>
    </div>
  )
}