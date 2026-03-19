import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, ChevronRight, Copy, AlertCircle, Printer, Upload, X } from "lucide-react";
import toast from "react-hot-toast";

export function Booking() {

  const { roomId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const receiptRef = useRef<HTMLDivElement>(null)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const bookingType = location.state?.type || "gaming"
  const eventTypeMap: any = { movie: "Movie", birthday: "Birthday", gaming: "PlayStation" }
  const isMovie = bookingType === "movie"
  const isBirthday = bookingType === "birthday"

  const [step, setStep] = useState(2)
  const [bookingComplete, setBookingComplete] = useState(false)
  const [bookingRef, setBookingRef] = useState("")

  const { roomName, date, time, mode, price, duration: selectedDuration } = location.state || {}

  const savedUser = JSON.parse(localStorage.getItem("userProfile") || "{}")
  const isLoggedIn = !!savedUser?.player_id

  const [formData] = useState({
    name: savedUser?.full_name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
    date: date || "",
    time: time || "",
    duration: selectedDuration || ""
  })

  const [instapayRef, setInstapayRef] = useState("")
  const [transferScreenshot, setTransferScreenshot] = useState<File | null>(null)
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const basePrice = price || 0
  const duration = parseFloat(formData.duration || "0")
  const finalTotal = basePrice * duration

  const theme = {
    text: isMovie ? "text-emerald-400" : isBirthday ? "text-purple-400" : "text-primary",
    bg: isMovie ? "bg-emerald-500" : isBirthday ? "bg-purple-500" : "bg-primary",
    hover: isMovie ? "hover:bg-emerald-400" : isBirthday ? "hover:bg-purple-400" : "hover:bg-red-700",
    border: isMovie ? "border-emerald-500/30" : isBirthday ? "border-purple-500/30" : "border-primary/30"
  }

  // ✅ حساب وقت النهاية
  const calcEndTime = () => {
    if(!formData.time || !formData.duration) return "—"
    const [h, m] = formData.time.split(":")
    const start = new Date()
    start.setHours(Number(h), Number(m), 0)
    const end = new Date(start.getTime() + duration * 60 * 60 * 1000)
    return end.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  // ✅ رفع الصورة
  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if(!file) return
    setTransferScreenshot(file)
    const reader = new FileReader()
    reader.onload = () => setScreenshotPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if(step < 3) { setStep(step + 1); return }

    if(!isLoggedIn) {
      toast.error("Please login first")
      navigate("/login")
      return
    }

    if(!instapayRef.trim()) {
      toast.error("Please enter InstaPay reference number / ادخل رقم المرجع")
      return
    }

    if(!transferScreenshot) {
      toast.error("Please upload transfer screenshot / ارفع صورة التحويل")
      return
    }

    try {
      setSubmitting(true)

    
const startDate = new Date(`${formData.date}T${formData.time}:00`)

const endDate = new Date(startDate)
endDate.setHours(endDate.getHours() + Math.floor(duration))
endDate.setMinutes(endDate.getMinutes() + (duration % 1) * 60)
      let response

      if(bookingType === "movie") {
        response = await fetch("https://backbilly.vercel.app/api/movies/book-seats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            movie_id: Number(roomId),
            seats: ["AUTO"],
            name: formData.name,
            phone: formData.phone,
            player_id: savedUser?.player_id || null
          })
        })
      } else {
       response = await fetch("https://backbilly.vercel.app/api/reservations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    name: formData.name,
    phone: formData.phone,
    room_id: Number(roomId),
    event_type: eventTypeMap[bookingType],
    start_time: startDate.toISOString(),  // ✅ الصح
    end_time: endDate.toISOString(),      // ✅ الصح
    source: "Website",
    player_id: savedUser?.player_id || null
  })
})
      }

      const data = await response.json()

      if(!response.ok) {
        toast.error(data.error || "Booking failed")
        return
      }

      const ref = `BH-${Date.now().toString().slice(-6)}`
      setBookingRef(ref)
      toast.success("Booking confirmed! 🎮")
      setBookingComplete(true)

    } catch(err) {
      toast.error("Server error")
    } finally {
      setSubmitting(false)
    }
  }

  const handlePrint = () => {
    const win = window.open("", "_blank")
    if(!win) return

    win.document.write(`
      <html>
        <head>
          <title>Booking Receipt - Billy's Hub</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: Arial, sans-serif; background: #fff; color: #000; padding: 40px; }
            .receipt { max-width: 500px; margin: 0 auto; border: 2px solid #000; padding: 30px; }
            .header { text-align: center; border-bottom: 2px solid #000; padding-bottom: 20px; margin-bottom: 20px; }
            .logo { font-size: 28px; font-weight: 900; letter-spacing: 2px; }
            .logo span { color: #dc2626; }
            .ref { font-size: 12px; color: #666; margin-top: 5px; }
            .section { margin-bottom: 16px; }
            .label { font-size: 11px; color: #666; text-transform: uppercase; letter-spacing: 1px; }
            .value { font-size: 16px; font-weight: bold; margin-top: 2px; }
            .divider { border-top: 1px dashed #ccc; margin: 16px 0; }
            .total-row { display: flex; justify-content: space-between; align-items: center; }
            .total-label { font-size: 18px; font-weight: bold; }
            .total-amount { font-size: 28px; font-weight: 900; color: #dc2626; }
            .footer { text-align: center; margin-top: 20px; font-size: 11px; color: #666; border-top: 1px solid #ccc; padding-top: 15px; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
            .badge { display: inline-block; background: #f3f4f6; padding: 4px 10px; border-radius: 4px; font-size: 12px; font-weight: bold; text-transform: uppercase; }
          </style>
        </head>
        <body>
          <div class="receipt">
            <div class="header">
              <div class="logo">BILLY'S <span>HUB</span></div>
              <div class="ref">BOOKING RECEIPT</div>
              <div class="ref">Ref: ${bookingRef} • ${new Date().toLocaleString("en-GB")}</div>
            </div>
            <div class="section">
              <div class="label">Customer</div>
              <div class="value">${formData.name}</div>
              <div style="font-size:13px;color:#666;">${formData.phone}</div>
              ${formData.email ? `<div style="font-size:13px;color:#666;">${formData.email}</div>` : ""}
            </div>
            <div class="divider"></div>
            <div class="grid">
              <div class="section">
                <div class="label">${bookingType === "movie" ? "Event" : "Room"}</div>
                <div class="value">${roomName || "Room"}</div>
              </div>
              <div class="section">
                <div class="label">Type</div>
                <div class="value"><span class="badge">${mode || bookingType}</span></div>
              </div>
              <div class="section">
                <div class="label">Date</div>
                <div class="value">${formData.date}</div>
              </div>
              <div class="section">
                <div class="label">From → To</div>
                <div class="value">${formData.time} → ${calcEndTime()}</div>
              </div>
              <div class="section">
                <div class="label">Duration</div>
                <div class="value">${formData.duration} Hour${Number(formData.duration) > 1 ? "s" : ""}</div>
              </div>
              <div class="section">
                <div class="label">Price/hr</div>
                <div class="value">${basePrice} EGP</div>
              </div>
            </div>
            <div class="divider"></div>
            <div class="total-row">
              <div class="total-label">TOTAL PAID</div>
              <div class="total-amount">${finalTotal} EGP</div>
            </div>
            <div class="divider"></div>
            <div class="section">
              <div class="label">Payment Method</div>
              <div class="value">InstaPay</div>
              <div style="font-size:13px;color:#666;">Ref: ${instapayRef}</div>
            </div>
            <div class="footer">
              <p>Thank you for booking with Billy's Hub!</p>
              <p style="margin-top:4px;">📍 Billy's Hub Gaming Lounge</p>
              <p style="margin-top:4px;">⚠️ Please keep this receipt for your records</p>
            </div>
          </div>
        </body>
      </html>
    `)
    win.document.close()
    win.focus()
    setTimeout(() => { win.print(); win.close() }, 300)
  }

  /* SUCCESS */
  if(bookingComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="max-w-lg w-full">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center space-y-6">

            <div className={`w-20 h-20 ${theme.bg} rounded-full flex items-center justify-center mx-auto`}>
              <CheckCircle className="w-12 h-12 text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Booking Confirmed!</h1>
              <p className="text-gray-400 text-sm">Ref: <span className="font-mono text-white">{bookingRef}</span></p>
            </div>

            {/* Receipt Preview */}
            <div ref={receiptRef} className="bg-black/40 border border-white/10 rounded-xl p-5 text-left space-y-3 text-sm">
              <div className="text-center border-b border-white/10 pb-3">
                <p className="font-black text-lg">BILLY'S <span className={theme.text}>HUB</span></p>
                <p className="text-gray-400 text-xs">{new Date().toLocaleString("en-GB")}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-gray-400 text-xs">Customer</p>
                  <p className="font-bold">{formData.name}</p>
                  <p className="text-gray-400 text-xs">{formData.phone}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">{bookingType === "movie" ? "Event" : "Room"}</p>
                  <p className="font-bold">{roomName}</p>
                  <p className="text-gray-400 text-xs capitalize">{mode || bookingType}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Date</p>
                  <p className="font-bold">{formData.date}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Time</p>
                  <p className="font-bold">{formData.time} → {calcEndTime()}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Duration</p>
                  <p className="font-bold">{formData.duration} hr{Number(formData.duration) > 1 ? "s" : ""}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">Price/hr</p>
                  <p className="font-bold">{basePrice} EGP</p>
                </div>
              </div>

              <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                <span className="font-bold">TOTAL</span>
                <span className={`text-2xl font-black ${theme.text}`}>{finalTotal} EGP</span>
              </div>

              <div className="border-t border-white/10 pt-3">
                <p className="text-gray-400 text-xs">Payment</p>
                <p className="font-bold">InstaPay • {instapayRef}</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={handlePrint}
                className="flex-1 flex items-center justify-center gap-2 py-3 border border-white/20 hover:border-white/40 rounded-lg text-sm font-bold transition"
              >
                <Printer className="w-4 h-4" /> Print Receipt
              </button>
              <button onClick={() => navigate("/profile")}
                className={`flex-1 py-3 ${theme.bg} ${theme.hover} rounded-lg text-sm font-bold transition`}
              >
                Go To Profile
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="pt-20 min-h-screen bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-12">

          <div className="lg:col-span-2">

            {/* STEP INDICATOR */}
            <div className="flex items-center gap-3 mb-8">
              {["Details", "Payment"].map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition ${
                    step > i + 2 ? theme.bg : step === i + 2 ? `${theme.bg} ring-2 ring-white/30` : "bg-white/10"
                  }`}>
                    {step > i + 2 ? "✓" : i + 1}
                  </div>
                  <span className={`text-sm ${step === i + 2 ? "text-white" : "text-gray-500"}`}>{s}</span>
                  {i < 1 && <div className="w-8 h-px bg-white/20 mx-1" />}
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">

                {/* STEP 2 - DETAILS */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                    className="bg-white/5 border border-white/10 p-8 rounded-xl"
                  >
                    <h2 className="text-2xl font-bold mb-6">Booking Details</h2>

                    {/* User Info Card */}
                    {isLoggedIn && (
                      <div className={`flex items-center gap-3 p-3 rounded-lg border ${theme.border} bg-white/5 mb-5`}>
                        <div className={`w-9 h-9 rounded-full ${theme.bg} flex items-center justify-center font-bold shrink-0`}>
                          {savedUser.full_name?.[0]?.toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{savedUser.full_name}</p>
                          <p className="text-xs text-gray-400">{savedUser.phone}</p>
                        </div>
                        <span className={`ml-auto text-xs ${theme.text} border ${theme.border} px-2 py-1 rounded shrink-0`}>
                          ✓ Logged in
                        </span>
                      </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                      {[
                        { label: bookingType === "movie" ? "Event" : "Room", value: roomName || "—" },
                        { label: "Type", value: mode || bookingType },
                        { label: "Date", value: formData.date || "—" },
                        { label: "From", value: formData.time || "—" },
                        { label: "To", value: calcEndTime() },
                        { label: "Duration", value: formData.duration ? `${formData.duration} hrs` : "—" },
                        { label: "Price / hr", value: `${basePrice} EGP` },
                      ].map((item, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                          <p className="text-gray-400 text-xs mb-1">{item.label}</p>
                          <p className="font-bold capitalize">{item.value}</p>
                        </div>
                      ))}
                    </div>

                    <div className={`mt-4 p-4 rounded-lg border ${theme.border} flex justify-between items-center`}>
                      <span className="font-bold text-lg">Total</span>
                      <span className={`text-3xl font-black ${theme.text}`}>{finalTotal} EGP</span>
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 - PAYMENT */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-20 }}
                    className="space-y-4"
                  >
                    {/* POLICY */}
                    <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <AlertCircle className="w-4 h-4 text-yellow-400 shrink-0" />
                        <p className="text-yellow-400 font-bold text-sm">Booking Policy / سياسة الحجز</p>
                      </div>
                      <div className="space-y-2 text-xs text-gray-300 leading-relaxed">
                        <p>🇬🇧 <span className="font-semibold text-white">Payment:</span> Booking confirmed only after InstaPay deposit. Unpaid bookings are auto-cancelled.</p>
                        <p>🇬🇧 <span className="font-semibold text-white">Cancellation:</span> 1+ hour before → full refund. Within 1 hour → 50% refund. No-show → no refund, room reopens after 30 mins.</p>
                        <div className="border-t border-white/10 pt-3 mt-2 space-y-1">
                          <p>🇸🇦 <span className="font-semibold text-white">الدفع:</span> يُعتبر الحجز مؤكداً فقط بعد إرسال العربون عبر انستا باي. الحجوزات غير المدفوعة تُلغى تلقائياً.</p>
                          <p>🇸🇦 <span className="font-semibold text-white">الإلغاء:</span> قبل ساعة أو أكثر ← استرداد كامل. خلال ساعة ← استرداد ٥٠٪. عدم الحضور ← لا استرداد وتُفتح الغرفة بعد ٣٠ دقيقة.</p>
                        </div>
                      </div>
                    </div>

                    {/* INSTAPAY */}
                    <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
                      <h2 className="text-2xl font-bold">InstaPay Payment</h2>

                      {/* رقم التحويل */}
                      <div className={`flex items-center justify-between p-4 rounded-lg border ${theme.border} bg-black/20`}>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Transfer to / حول على</p>
                          <p className="text-2xl font-black tracking-widest">01225596595</p>
                          <p className="text-gray-400 text-xs mt-1">Billy's Hub</p>
                        </div>
                        <button type="button"
                          onClick={() => { navigator.clipboard.writeText("01225596595"); toast.success("Copied!") }}
                          className="flex items-center gap-1 text-xs border border-white/20 px-3 py-2 rounded hover:border-white/40 transition"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>

                      {/* المبلغ */}
                      <div className={`p-4 rounded-lg border ${theme.border} bg-black/20 flex justify-between items-center`}>
                        <div>
                          <p className="text-gray-400 text-xs mb-1">Amount / المبلغ</p>
                          <p className={`text-2xl font-black ${theme.text}`}>{finalTotal} EGP</p>
                        </div>
                        <button type="button"
                          onClick={() => { navigator.clipboard.writeText(finalTotal.toString()); toast.success("Copied!") }}
                          className="flex items-center gap-1 text-xs border border-white/20 px-3 py-2 rounded hover:border-white/40 transition"
                        >
                          <Copy className="w-3 h-3" /> Copy
                        </button>
                      </div>

                      {/* ✅ رفع صورة التحويل */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                          Transfer Screenshot / صورة التحويل <span className="text-red-400">*</span>
                        </label>

                        {screenshotPreview ? (
                          <div className="relative">
                            <img src={screenshotPreview} className="w-full rounded-lg border border-white/10 max-h-48 object-contain bg-black/20" />
                            <button type="button"
                              onClick={() => { setTransferScreenshot(null); setScreenshotPreview(null) }}
                              className="absolute top-2 right-2 bg-red-600 rounded-full p-1"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        ) : (
                          <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-white/20 rounded-lg p-6 cursor-pointer hover:border-white/40 transition">
                            <Upload className="w-6 h-6 text-gray-400" />
                            <span className="text-xs text-gray-400">Click to upload / اضغط لرفع الصورة</span>
                            <input type="file" accept="image/*" className="hidden" onChange={handleScreenshotUpload} />
                          </label>
                        )}
                      </div>

                      {/* رقم المرجع */}
                      <div className="space-y-2">
                        <label className="text-sm text-gray-400">
                          Reference Number / رقم المرجع <span className="text-red-400">*</span>
                        </label>
                        <input
                          placeholder="Enter reference number / ادخل رقم المرجع"
                          value={instapayRef}
                          onChange={e => setInstapayRef(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white outline-none focus:border-white/30"
                        />
                      </div>

                      {/* Validation hint */}
                      {(!transferScreenshot || !instapayRef) && (
                        <p className="text-xs text-yellow-400">
                          ⚠️ {!transferScreenshot && "Upload screenshot"}{!transferScreenshot && !instapayRef && " & "}{!instapayRef && "Enter reference number"} to confirm
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              <div className="flex gap-3">
                {step > 2 && (
                  <button type="button" onClick={() => setStep(step - 1)}
                    className="px-6 py-4 border border-white/20 hover:border-white/40 rounded-lg font-bold transition"
                  >
                    ← Back
                  </button>
                )}
                <button type="submit" disabled={submitting}
                  className={`flex-1 py-4 ${theme.bg} ${theme.hover} text-white flex items-center justify-center transition rounded-lg font-bold disabled:opacity-50`}
                >
                  {submitting ? "Processing..." : step === 3 ? "Confirm Booking" : "Continue"}
                  <ChevronRight className="ml-2" />
                </button>
              </div>
            </form>
          </div>

          {/* SUMMARY */}
          <div className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white/5 border border-white/10 p-6 rounded-xl space-y-4">
              <h3 className="text-xl font-bold">Booking Summary</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: bookingType === "movie" ? "Event" : "Room", value: roomName || "—" },
                  { label: "Type", value: mode || bookingType },
                  { label: "Date", value: formData.date || "—" },
                  { label: "From", value: formData.time || "—" },
                  { label: "To", value: calcEndTime() },
                  { label: "Duration", value: formData.duration ? `${formData.duration} hrs` : "—" },
                  { label: "Price/hr", value: `${basePrice} EGP` },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="font-medium capitalize">{item.value}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span className={theme.text}>{finalTotal} EGP</span>
                </div>
              </div>

              {isLoggedIn ? (
                <div className="border-t border-white/10 pt-4 space-y-1">
                  <p className="text-gray-400 text-xs">Booking for</p>
                  <p className="font-medium">{savedUser.full_name}</p>
                  <p className="text-gray-400 text-xs">{savedUser.phone}</p>
                </div>
              ) : (
                <div className="border-t border-white/10 pt-4">
                  <p className="text-yellow-400 text-xs">⚠️ Login to save this booking to your profile</p>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}