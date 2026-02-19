'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Bell, Clock, Terminal as TerminalIcon, Shield } from 'lucide-react'

export default function Header() {
    const [time, setTime] = useState('')
    const [xp, setXp] = useState({ current: 0, next: 5000 })
    const [user, setUser] = useState({ username: 'hacker' })

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            setTime(now.toLocaleTimeString('pt-BR', { hour12: false }))
        }, 1000)

        try {
            const stored = localStorage.getItem('cyberpath_demo')
            if (stored) {
                const d = JSON.parse(stored)
                setXp({ current: d.xp || 0, next: 5000 })
                setUser({ username: d.username || 'hacker' })
            }
        } catch (e) {
            console.error('Failed to read cyberpath_demo from localStorage', e)
        }

        return () => clearInterval(timer)
    }, [])

    const progress = (xp.current / xp.next) * 100
    const dashArray = 2 * Math.PI * 18 // 18 is radius of circle

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 h-14 bg-black/40 backdrop-blur-xl border-b border-neon-green/10 flex items-center justify-between">
            <div className="hud-underline" />

            {/* Left: Terminal Prompt */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-xs font-mono">
                    <span className="text-neon-green/60">┌──(</span>
                    <span className="text-neon-green font-bold text-glow">root㉿{user.username}</span>
                    <span className="text-neon-green/60">)-[</span>
                    <span className="text-neon-blue">~</span>
                    <span className="text-neon-green/60">]</span>
                </div>
            </div>

            {/* Center: System Status / Clock */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
                <div className="flex items-center gap-2 text-neon-green/40">
                    <Shield className="w-3.5 h-3.5 animate-pulse-neon" />
                    <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Encrypted Link Active</span>
                </div>
                <div className="flex items-center gap-2 text-neon-green px-3 py-1 bg-neon-green/5 rounded-full border border-neon-green/20">
                    <Clock className="w-3.5 h-3.5 opacity-60" />
                    <span className="text-xs font-mono font-medium tracking-widest">{time}</span>
                </div>
            </div>

            {/* Right: XP HUD & Notifications */}
            <div className="flex items-center gap-4">
                {/* Radial XP Orb */}
                <div className="relative group cursor-help">
                    <svg className="w-10 h-10 rotate-[-90deg]">
                        <circle cx="20" cy="20" r="18" fill="none" stroke="rgba(0, 255, 65, 0.1)" strokeWidth="2" />
                        <motion.circle
                            cx="20"
                            cy="20"
                            r="18"
                            fill="none"
                            stroke="#00ff41"
                            strokeWidth="2"
                            strokeDasharray={dashArray}
                            animate={{ strokeDashoffset: dashArray - (dashArray * progress) / 100 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="drop-shadow-[0_0_5px_#00ff41]"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-[8px] font-bold leading-none">XP</span>
                        <span className="text-[9px] opacity-70 leading-none">LV1</span>
                    </div>
                    {/* Tooltip */}
                    <div className="absolute top-12 right-0 bg-black/90 border border-neon-green/40 p-2 rounded text-[10px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-[60]">
                        PROGRESS: {xp.current} / {xp.next} XP
                    </div>
                </div>

                <button className="relative p-2 hover:bg-white/5 rounded-full transition-colors group">
                    <Bell className="w-4 h-4 text-neon-green group-hover:animate-shake" />
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-neon-red rounded-full animate-pulse shadow-[0_0_5px_#ff4444]" />
                </button>

                <div className="w-px h-6 bg-neon-green/20" />

                <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase tracking-tighter text-neon-green/60">System Mode</span>
                    <span className="text-[12px] font-bold text-glow">ADMIN</span>
                </div>
            </div>
        </header>
    )
}
