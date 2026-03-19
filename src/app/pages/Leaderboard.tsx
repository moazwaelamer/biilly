import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Crown, Flame, Shield, TrendingUp, Star } from "lucide-react";
import { Link } from "react-router-dom";

const tierColors: any = {
  Bronze:  { bg: "from-orange-900/40 to-orange-800/10", badge: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  Silver:  { bg: "from-zinc-700/40 to-zinc-600/10",    badge: "bg-zinc-400/20 text-zinc-300 border-zinc-400/30" },
  Gold:    { bg: "from-yellow-900/40 to-yellow-800/10", badge: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  Platinum:{ bg: "from-cyan-900/40 to-cyan-800/10",    badge: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  Elite:   { bg: "from-red-900/40 to-red-800/10",      badge: "bg-red-500/20 text-primary border-primary/30" },
}

const rankMedal = (rank: number) => {
  if(rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />
  if(rank === 2) return <Trophy className="w-5 h-5 text-zinc-300" />
  if(rank === 3) return <Trophy className="w-5 h-5 text-orange-400" />
  return <span className="text-zinc-500 font-bold text-sm">#{rank}</span>
}

export function Leaderboard() {

  const [players, setPlayers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<"elo" | "wins" | "winrate">("elo")

  const currentUser = JSON.parse(localStorage.getItem("userProfile") || "{}")

  useEffect(() => {
    fetch("https://backbilly.vercel.app/api/players/leaderboard")
      .then(r => r.json())
      .then(data => {
        setPlayers(Array.isArray(data) ? data : [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const sorted = [...players].sort((a, b) => {
    if(filter === "elo")     return b.elo_rank - a.elo_rank
    if(filter === "wins")    return b.total_wins - a.total_wins
    if(filter === "winrate") return b.win_rate - a.win_rate
    return 0
  })

  const top3 = sorted.slice(0, 3)
  const rest  = sorted.slice(3)

  return (
    <div className="pt-20 min-h-screen bg-zinc-950 text-white">

      {/* HEADER */}
      <section className="py-16 bg-black border-b border-white/5 text-center">
        <motion.h1
          initial={{ opacity:0, y:20 }}
          animate={{ opacity:1, y:0 }}
          className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter"
        >
          LEADER<span className="text-primary">BOARD</span>
        </motion.h1>
        <p className="mt-3 text-zinc-500 text-xs tracking-[0.4em] uppercase">
          Top players ranked by performance
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12 space-y-10">

        {/* FILTER TABS */}
        <div className="flex gap-2 justify-center">
          {[
            { key:"elo",     label:"ELO Rank",  icon:<TrendingUp className="w-3 h-3"/> },
            { key:"wins",    label:"Most Wins",  icon:<Trophy className="w-3 h-3"/> },
            { key:"winrate", label:"Win Rate",   icon:<Star className="w-3 h-3"/> },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key as any)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition border ${
                filter === f.key
                  ? "bg-primary border-primary text-white"
                  : "border-white/10 text-zinc-400 hover:border-white/30"
              }`}
            >
              {f.icon}{f.label}
            </button>
          ))}
        </div>

        {loading && (
          <div className="text-center text-zinc-500 py-20">Loading leaderboard...</div>
        )}

        {!loading && players.length === 0 && (
          <div className="text-center text-zinc-500 py-20">
            No players yet. Be the first to compete!
          </div>
        )}

        {/* TOP 3 PODIUM */}
        {!loading && top3.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[top3[1], top3[0], top3[2]].map((p, i) => {
              if(!p) return <div key={i} />
              const position = i === 1 ? 1 : i === 0 ? 2 : 3
              const isMe = p.player_id === currentUser?.player_id
              const tier = tierColors[p.tier] || tierColors.Bronze

              return (
                <motion.div
                  key={p.player_id}
                  initial={{ opacity:0, y:30 }}
                  animate={{ opacity:1, y:0 }}
                  transition={{ delay: i * 0.1 }}
                  className={`relative flex flex-col items-center p-5 rounded-2xl border bg-gradient-to-b ${tier.bg} ${
                    position === 1
                      ? "border-yellow-500/40 scale-105"
                      : "border-white/10"
                  } ${isMe ? "ring-2 ring-primary" : ""}`}
                >
                  {/* Medal */}
                  <div className="mb-3">
                    {position === 1
                      ? <Crown className="w-8 h-8 text-yellow-400" />
                      : position === 2
                      ? <Trophy className="w-6 h-6 text-zinc-300" />
                      : <Trophy className="w-6 h-6 text-orange-400" />
                    }
                  </div>

                  {/* Avatar */}
                  <div className={`w-14 h-14 rounded-full flex items-center justify-center font-black text-xl border-2 mb-3 ${
                    position === 1 ? "border-yellow-400 bg-yellow-900/30" : "border-white/20 bg-white/5"
                  }`}>
                    {p.avatar_url
                      ? <img src={`https://backbilly.vercel.app${p.avatar_url}`} className="w-full h-full rounded-full object-cover" />
                      : p.full_name?.[0]?.toUpperCase()
                    }
                  </div>

                  <p className="font-black text-sm text-center leading-tight">{p.full_name}</p>
                  {p.nickname && <p className="text-zinc-500 text-xs">@{p.nickname}</p>}

                  <span className={`mt-2 px-2 py-0.5 rounded-full text-[10px] font-bold border ${tier.badge}`}>
                    {p.tier}
                  </span>

                  <div className="mt-3 text-center">
                    <p className="text-primary font-black text-lg">{p.elo_rank}</p>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-widest">ELO</p>
                  </div>

                  <div className="mt-2 grid grid-cols-2 gap-2 text-center w-full">
                    <div>
                      <p className="text-xs font-bold">{p.total_wins}</p>
                      <p className="text-zinc-600 text-[10px]">Wins</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold">{p.win_rate}%</p>
                      <p className="text-zinc-600 text-[10px]">WR</p>
                    </div>
                  </div>

                  {isMe && (
                    <span className="absolute top-2 right-2 text-[9px] bg-primary px-1.5 py-0.5 rounded font-bold">
                      YOU
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        )}

        {/* REST OF PLAYERS */}
        {!loading && rest.length > 0 && (
          <div className="space-y-2">
            {rest.map((p, i) => {
              const rank = i + 4
              const isMe = p.player_id === currentUser?.player_id
              const tier = tierColors[p.tier] || tierColors.Bronze

              return (
                <motion.div
                  key={p.player_id}
                  initial={{ opacity:0, x:-20 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-4 p-4 rounded-xl border transition ${
                    isMe
                      ? "border-primary/50 bg-primary/5"
                      : "border-white/5 bg-white/3 hover:border-white/10"
                  }`}
                >
                  {/* Rank */}
                  <div className="w-8 text-center flex-shrink-0">
                    {rankMedal(rank)}
                  </div>

                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-sm border border-white/10 bg-white/5 overflow-hidden">
                    {p.avatar_url
                      ? <img src={`https://backbilly.vercel.app${p.avatar_url}`} className="w-full h-full object-cover" />
                      : p.full_name?.[0]?.toUpperCase()
                    }
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-bold text-sm truncate">{p.full_name}</p>
                      {p.nickname && <span className="text-zinc-500 text-xs">@{p.nickname}</span>}
                      {isMe && <span className="text-[9px] bg-primary px-1.5 py-0.5 rounded font-bold">YOU</span>}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-[10px] px-1.5 py-0.5 rounded border ${tier.badge}`}>{p.tier}</span>
                      {p.country && <span className="text-zinc-600 text-[10px]">{p.country}</span>}
                      {p.win_streak > 2 && (
                        <span className="flex items-center gap-0.5 text-[10px] text-orange-400">
                          <Flame className="w-3 h-3" />{p.win_streak} streak
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="hidden md:flex items-center gap-6 text-center">
                    <div>
                      <p className="text-xs font-bold">{p.total_games}</p>
                      <p className="text-zinc-600 text-[10px]">Games</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-green-400">{p.total_wins}</p>
                      <p className="text-zinc-600 text-[10px]">Wins</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold">{p.win_rate}%</p>
                      <p className="text-zinc-600 text-[10px]">WR</p>
                    </div>
                  </div>

                  {/* ELO */}
                  <div className="text-right flex-shrink-0">
                    <p className="text-primary font-black">{p.elo_rank}</p>
                    <p className="text-zinc-600 text-[10px]">ELO</p>
                  </div>

                </motion.div>
              )
            })}
          </div>
        )}

      </div>
    </div>
  )
}