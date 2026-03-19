import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export function Login() {

  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation() as any

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if(!phone || !password){
      toast.error("Please fill all fields")
      return
    }

    try{
      setLoading(true)

      const res = await fetch("https://backbilly.vercel.app/api/players/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone: phone.trim(), password })
      })

      const data = await res.json()

      if(!res.ok){
        toast.error(data.error || "Login failed")
        return
      }

      // ✅ احفظ كل بيانات اللاعب
      localStorage.setItem("userProfile", JSON.stringify(data))

      toast.success(`Welcome back ${data.full_name} 🎮`)

      // ✅ لو كان رايح يحجز يرجعله
      if(location.state?.redirectTo){
        navigate(location.state.redirectTo, { state: location.state.bookingData })
      }else{
        navigate("/profile")
      }

    }catch(err){
      toast.error("Server error, try again")
    }finally{
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950">
      <form
        onSubmit={handleSubmit}
        className="p-8 bg-white/5 border border-white/10 rounded-xl w-full max-w-md space-y-4"
      >
        <h2 className="text-3xl font-bold text-white text-center">Login</h2>

        <input
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-3 py-3 bg-black/20 border border-white/20 text-white rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-3 bg-black/20 border border-white/20 text-white rounded"
        />
 
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary text-white font-bold rounded hover:bg-red-700 transition disabled:opacity-50"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-gray-400 text-sm">
          Don't have an account?
          <Link to="/register" className="text-primary ml-2 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  )
}