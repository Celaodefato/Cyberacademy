'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Trophy, Skull, Shield } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'

const MOCK_USERS = [
    { rank: 1, name: 'x0r_rafael', xp: 4200, level: 9, path: 'red', badges: 6, streak: 14 },
    { rank: 2, name: 'blueshield99', xp: 3850, level: 8, path: 'blue', badges: 5, streak: 9 },
    { rank: 3, name: 'mariana_sec', xp: 3700, level: 8, path: 'blue', badges: 5, streak: 21 },
    { rank: 4, name: 'h4cker_br', xp: 3100, level: 7, path: 'red', badges: 4, streak: 7 },
    { rank: 5, name: 'cryptodefender', xp: 2900, level: 6, path: 'blue', badges: 4, streak: 3 },
    { rank: 6, name: 'nmap_ninja', xp: 2600, level: 6, path: 'red', badges: 3, streak: 5 },
    { rank: 7, name: 'soc_warrior', xp: 2400, level: 5, path: 'blue', badges: 3, streak: 12 },
    { rank: 8, name: 'kali_elite', xp: 2100, level: 5, path: 'red', badges: 3, streak: 2 },
    { rank: 9, name: 'dfir_master', xp: 1800, level: 4, path: 'blue', badges: 2, streak: 8 },
    { rank: 10, name: 'pentest_br', xp: 1600, level: 4, path: 'red', badges: 2, streak: 4 },
]

export default function LeaderboardPage() {
    const [filter, setFilter] = useState<'all' | 'red' | 'blue'>('all')

    const filtered = MOCK_USERS.filter(u => filter === 'all' || u.path === filter)

    const rankColor = (r: number) =>
        r === 1 ? 'text-neon-yellow' : r === 2 ? 'text-gray-300' : r === 3 ? 'text-yellow-700' : 'text-neon-dim'
    const rankIcon = (r: number) => r === 1 ? '🥇' : r === 2 ? '🥈' : r === 3 ? '🥉' : `#${r}`

    return (
        <div className="min-h-screen bg-cyber-black">
            <main className="pt-14 max-w-4xl mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <Trophy className="w-10 h-10 text-neon-yellow mx-auto mb-2" style={{ filter: 'drop-shadow(0 0 10px #ffff00)' }} />
                    <p className="text-neon-dim text-xs tracking-widest mb-1">root@cyberpath:~# cat leaderboard.json</p>
                    <h1 className="text-2xl font-bold text-neon-green text-glow">Leaderboard Global</h1>
                    <p className="text-neon-dim text-sm mt-1">Top hackers por XP — semana atual</p>
                </div>

                {/* Filter */}
                <div className="flex justify-center gap-3 mb-6">
                    {(['all', 'red', 'blue'] as const).map(f => (
                        <button key={f} onClick={() => setFilter(f)}
                            className={`btn-cyber text-xs py-1.5 px-4 ${filter === f ? (f === 'red' ? 'btn-cyber-red bg-neon-red/10' : f === 'blue' ? 'btn-cyber-blue bg-neon-blue/10' : 'bg-neon-green/10') : ''
                                } ${f === 'red' ? 'btn-cyber-red' : f === 'blue' ? 'btn-cyber-blue' : ''}`}>
                            {f === 'all' ? '[ todos ]' : f === 'red' ? '[ 💀 red team ]' : '[ 🛡️ blue team ]'}
                        </button>
                    ))}
                </div>

                <TerminalWindow title="top100.sh">
                    <div className="space-y-2">
                        {/* Header */}
                        <div className="grid grid-cols-12 text-neon-dim text-xs pb-2 border-b border-terminal-border">
                            <span className="col-span-1">Rank</span>
                            <span className="col-span-4">Usuário</span>
                            <span className="col-span-2">Time</span>
                            <span className="col-span-2">Nível</span>
                            <span className="col-span-2">Streak</span>
                            <span className="col-span-1 text-right">XP</span>
                        </div>

                        {filtered.map((u, i) => (
                            <motion.div key={u.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="grid grid-cols-12 items-center py-2.5 border-b border-terminal-border/30 hover:bg-neon-green/2 transition-all rounded">
                                <span className={`col-span-1 font-bold text-sm ${rankColor(u.rank)}`}>{rankIcon(u.rank)}</span>
                                <div className="col-span-4 flex items-center gap-2">
                                    <div className={`w-7 h-7 rounded border flex items-center justify-center text-xs font-bold flex-shrink-0 ${u.path === 'red' ? 'border-neon-red/40 text-neon-red' : 'border-neon-blue/40 text-neon-blue'
                                        }`}>{u.name[0].toUpperCase()}</div>
                                    <span className="text-neon-green text-sm font-semibold truncate">{u.name}</span>
                                </div>
                                <span className="col-span-2">
                                    {u.path === 'red'
                                        ? <span className="flex items-center gap-1 text-neon-red text-xs"><Skull className="w-3 h-3" /> Red</span>
                                        : <span className="flex items-center gap-1 text-neon-blue text-xs"><Shield className="w-3 h-3" /> Blue</span>
                                    }
                                </span>
                                <span className="col-span-2 text-neon-dim text-xs">Lv {u.level}</span>
                                <span className="col-span-2 text-neon-dim text-xs">🔥 {u.streak}d</span>
                                <span className="col-span-1 text-right xp-pill text-neon-green">{u.xp.toLocaleString()}</span>
                            </motion.div>
                        ))}
                    </div>

                    <p className="text-neon-dim text-xs mt-6 text-center opacity-60">
                        Atualizado em tempo real • Complete lições e quizzes para subir no ranking
                    </p>
                </TerminalWindow>
            </main>
        </div>
    )
}
