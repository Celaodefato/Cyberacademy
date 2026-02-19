'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Shield, Box } from 'lucide-react'
import { CHALLENGES } from '@/data/challenges'
import { terminalInterpreter } from '@/utils/terminalInterpreter'
import TerminalWindow from '@/components/TerminalWindow'
import dynamic from 'next/dynamic'

const TerminalSimulator = dynamic(() => import('@/components/TerminalSimulator'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-cyber-dark animate-pulse border border-white/5 rounded-lg flex items-center justify-center text-[10px] uppercase font-bold text-neon-green/20">Initializing_Terminal...</div>
})

const EXTERNAL_LABS = [
    { name: 'OverTheWire: Bandit', desc: 'Linux básico.', url: 'https://overthewire.org/wargames/bandit/', difficulty: 'Iniciante', icon: '💻' },
    { name: 'TryHackMe', desc: 'Rooms guiados.', url: 'https://tryhackme.com', difficulty: 'Todos', icon: '🎯' },
    { name: 'HackTheBox', desc: 'Máquinas reais.', url: 'https://hackthebox.com', difficulty: 'Intermediário+', icon: '📦' },
]

function SimTerminal({ challenge }: { challenge: typeof CHALLENGES[0] | null }) {
    const handleCommand = (cmd: string) => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('cyberpath_stats') : null
        const stats = stored ? JSON.parse(stored) : null
        const res = terminalInterpreter(cmd, challenge, stats)
        return res.output
    }

    return (
        <div className="h-[450px] w-full">
            <TerminalSimulator
                onCommand={handleCommand}
                initialMessage={`system@cyberpath-lab:~# [ MISSION STATUS: ${challenge ? 'ACTIVE - ' + challenge.title : 'WAITING'} ]\nType "help" for a list of available tools.`}
            />
        </div>
    )
}

export default function LabsPage() {
    const [selected, setSelected] = useState<typeof CHALLENGES[0] | null>(null)

    return (
        <div className="p-4 lg:p-10">
            <div className="mb-10">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-neon-green opacity-40 mb-2">
                    <Box className="w-3 h-3" /> [ ENVIRONMENT_SECTOR_7 ]
                </div>
                <h1 className="text-4xl font-black text-neon-green text-glow mb-1">Interactive_Labs</h1>
                <p className="text-neon-green/40 text-xs uppercase tracking-widest font-bold">Simulated Breach Environments & CTF Challenges</p>
            </div>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Challenge HUD */}
                <div className="lg:col-span-2 space-y-4">
                    <p className="text-[10px] uppercase font-bold opacity-30 px-2 tracking-widest">Available Operations</p>
                    {CHALLENGES.map(c => (
                        <motion.button
                            key={c.id}
                            onClick={() => setSelected(c)}
                            whileHover={{ scale: 1.02 }}
                            className={`
                                w-full text-left glass-card p-5 border-l-4 transition-all duration-300
                                ${selected?.id === c.id ? 'border-neon-green bg-neon-green/10' : 'border-white/10 hover:border-neon-green/40'}
                            `}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className={`text-xs font-black uppercase tracking-tighter ${selected?.id === c.id ? 'text-neon-green' : 'text-white/60'}`}>{c.title}</span>
                                <span className="xp-pill">+{c.xp} XP</span>
                            </div>
                            <div className="flex gap-2 mb-3">
                                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border ${c.difficulty === 'Fácil' ? 'border-neon-green/20 text-neon-green/60' : 'border-neon-yellow/20 text-neon-yellow/60'
                                    }`}>{c.difficulty.toUpperCase()}</span>
                            </div>
                            <p className="text-[10px] text-white/40 leading-relaxed italic">{c.desc}</p>
                        </motion.button>
                    ))}

                    <div className="pt-10 space-y-4">
                        <p className="text-[10px] uppercase font-bold opacity-30 px-2 tracking-widest">External Training Nodes</p>
                        <div className="grid grid-cols-1 gap-2">
                            {EXTERNAL_LABS.map(l => (
                                <a key={l.name} href={l.url} target="_blank" rel="noopener noreferrer" className="glass-card p-3 border-white/5 hover:border-neon-blue/40 transition-all flex items-center justify-between group">
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg opacity-40 group-hover:opacity-100 transition-opacity">{l.icon}</span>
                                        <span className="text-[10px] uppercase font-black tracking-widest text-white/40 group-hover:text-neon-blue transition-colors">{l.name}</span>
                                    </div>
                                    <ExternalLink className="w-3 h-3 text-white/20" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Integrated Terminal HUD */}
                <div className="lg:col-span-3 space-y-6">
                    <AnimatePresence mode="wait">
                        {selected && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="glass-card p-6 border-neon-green/40 shadow-[0_0_20px_rgba(0,255,65,0.1)]"
                            >
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="w-5 h-5 text-neon-green animate-pulse" />
                                    <div>
                                        <h2 className="text-sm font-black uppercase tracking-widest text-neon-green">Operation_{selected.id.toUpperCase()}</h2>
                                        <p className="text-[10px] text-white/40">STATUS: INTERFACE ACTIVE</p>
                                    </div>
                                </div>
                                <TerminalWindow title="MISSION_BRIEF.TXT" noPadding className="bg-transparent border-none">
                                    <p className="text-xs text-white/80 leading-relaxed font-mono">
                                        <span className="text-neon-green font-bold">TASK:</span> {selected.task}
                                        <br /><br />
                                        <span className="text-neon-green font-bold">INFO:</span> Submit found flags using "submit flag&#123;...&#125;"
                                    </p>
                                </TerminalWindow>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    <SimTerminal challenge={selected} />
                </div>
            </div>
        </div>
    )
}
