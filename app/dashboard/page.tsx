'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Target, Shield, Skull, Zap, Lock, Globe, Database, Cpu, Trophy } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'
import { CURRICULUM, BADGES } from '@/data/curriculum'
import { DashboardSkeleton } from '@/components/Skeleton'

import { useXP } from '@/hooks/useXP'
import { useProgress } from '@/hooks/useProgress'

export default function Dashboard() {
    const user = useXP()
    const progress = useProgress()
    const [stats, setStats] = useState({ labs: 0, certs: 0, rank: 1337 })
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulate initial data hydration delay
        const timer = setTimeout(() => setLoading(false), 800)
        return () => clearTimeout(timer)
    }, [])

    const modules = CURRICULUM.filter(m => m.path === 'shared' || m.path === user.path)

    if (loading) return <DashboardSkeleton />

    return (
        <div className="p-4 lg:p-10 space-y-10">
            {/* Top HUD: User Intelligence */}
            <section className="grid md:grid-cols-3 gap-6">
                <TerminalWindow title="identity.sh" className="md:col-span-2">
                    <div className="flex items-center gap-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-2xl bg-neon-green/10 border-2 border-neon-green/20 flex items-center justify-center overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-green/20 to-transparent" />
                                {user.path === 'red' ? <Skull className="w-12 h-12 text-neon-red drop-shadow-[0_0_10px_#ff4444]" /> :
                                    user.path === 'blue' ? <Shield className="w-12 h-12 text-neon-blue drop-shadow-[0_0_10px_#00ccff]" /> :
                                        user.path === 'purple' ? (
                                            <div className="relative">
                                                <Skull className="w-12 h-12 text-neon-purple opacity-40 absolute inset-0" />
                                                <Shield className="w-12 h-12 text-neon-purple drop-shadow-[0_0_10px_#a855f7]" />
                                            </div>
                                        ) :
                                            <UserIcon className="w-12 h-12 text-neon-green/40" />}
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-black border border-neon-green/40 px-2 py-0.5 rounded text-[10px] font-bold">
                                RANK #{stats.rank}
                            </div>
                        </div>

                        <div className="flex-1">
                            <h2 className="text-3xl font-black text-neon-green text-glow leading-tight mb-1">
                                {user.username.toUpperCase()}
                            </h2>
                            <div className="flex items-center gap-4 text-[10px] uppercase font-bold tracking-widest text-neon-green/60">
                                <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> LEVEL {user.level}</span>
                                <span className="flex items-center gap-1">
                                    <Target className={`w-3 h-3 ${user.path === 'red' ? 'text-neon-red' : user.path === 'blue' ? 'text-neon-blue' : 'text-neon-purple'}`} />
                                    {user.path ? user.path.toUpperCase() + ' TEAM' : 'UNDECIDED'}
                                </span>
                            </div>

                            {/* Detailed Progress Bar */}
                            <div className="mt-4 space-y-1.5">
                                <div className="flex justify-between text-[10px] font-bold">
                                    <span className="text-neon-green">EXPERIENCE PROGRESS</span>
                                    <span className="text-neon-green/60">{user.xp % 1000} / 1000 XP</span>
                                </div>
                                <div className="w-full h-2 bg-black/40 rounded-full border border-neon-green/10 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(user.xp % 1000) / 10}%` }}
                                        className="h-full bg-gradient-to-r from-neon-green-dim to-neon-green shadow-[0_0_10px_#00ff41]"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </TerminalWindow>

                {/* Quick Stats Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-neon-green/50 transition-all border-glow">
                        <span className="text-2xl font-black text-glow mb-1">{stats.labs}</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-60">Labs Solved</span>
                    </div>
                    <div className="glass-card p-4 flex flex-col items-center justify-center text-center group cursor-pointer hover:border-neon-purple/50 transition-all">
                        <span className="text-2xl font-black text-neon-purple drop-shadow-[0_0_10px_#a855f7] mb-1">82%</span>
                        <span className="text-[8px] uppercase tracking-widest font-bold opacity-60">Job Ready</span>
                    </div>
                    <div className="glass-card p-4 col-span-2 flex items-center justify-between group cursor-pointer">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-neon-yellow/10 rounded-lg border border-neon-yellow/20">
                                <Trophy className="w-4 h-4 text-neon-yellow" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] uppercase font-bold tracking-widest">Global Ranking</span>
                                <span className="text-[8px] text-neon-green/60">Você hackeou 80% mais rápido que a média</span>
                            </div>
                        </div>
                        <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" />
                    </div>
                </div>
            </section>

            {/* Middle: 3D Holographic Badges */}
            <section className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-neon-green opacity-40">Achievements_Cabinet v4.0</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-neon-green/20 to-transparent" />
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                    {BADGES.map((badge, i) => {
                        const isUnlocked = user.xp >= (i * 1000) // Mock logic
                        return (
                            <motion.div
                                key={badge.id}
                                whileHover={{ rotateY: 20, rotateX: -10, scale: 1.1 }}
                                className={`
                                    relative aspect-square glass-card flex flex-col items-center justify-center p-4 text-center cursor-help group
                                    ${isUnlocked ? 'grayscale-0' : 'grayscale opacity-20'}
                                `}
                            >
                                <span className="text-3xl mb-1 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">{badge.icon}</span>
                                <span className="text-[8px] font-bold uppercase tracking-tighter text-neon-green/80 group-hover:text-glow transition-all">{badge.name}</span>

                                {/* Holographic Scanner Effect */}
                                <div className="absolute inset-0 bg-gradient-to-t from-neon-green/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-2xl" />
                                <div className="absolute top-0 left-0 w-full h-[2px] bg-neon-green/40 shadow-[0_0_5px_#00ff41] -translate-y-full group-hover:translate-y-[100px] transition-transform duration-1000 ease-linear pointer-events-none" />
                            </motion.div>
                        )
                    })}
                </div>
            </section>

            {/* Bottom: The Grid (Module Tree) */}
            <section id="modules" className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-neon-green rounded-full shadow-[0_0_10px_#00ff41]" />
                        <h3 className="text-xl font-black uppercase tracking-[0.2em] italic">Operations_Grid</h3>
                    </div>
                    <div className="px-4 py-1.5 glass-card border-neon-blue/40 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-neon-blue animate-pulse" />
                        <span className="text-[10px] uppercase font-bold text-neon-blue">Neural Network Online</span>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                    {/* SVG Connector lines (Mocking for now with CSS pseudo-elements) */}
                    {modules.map((level, idx) => (
                        <TerminalWindow
                            key={level.id}
                            title={`M0${level.id}.vfs`}
                            glowColor={level.path === 'red' ? 'red' : level.path === 'blue' ? 'blue' : level.path === 'purple' ? 'purple' : 'green'}
                            className="group hover:-translate-y-1"
                        >
                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <p className="text-[10px] opacity-40 font-bold uppercase mb-1">Sector_{level.id}</p>
                                        <h4 className="text-lg font-bold group-hover:text-glow transition-all">{level.title}</h4>
                                    </div>
                                    <div className="p-2 glass-panel border-white/5 group-hover:border-neon-green/40 transition-all">
                                        {idx === 0 ? <Globe className="w-5 h-5 opacity-40" /> :
                                            idx === 1 ? <Lock className="w-5 h-5 opacity-40" /> :
                                                <Database className="w-5 h-5 opacity-40" />}
                                    </div>
                                </div>

                                <p className="text-[11px] text-neon-green/60 leading-relaxed mb-6 h-10 overflow-hidden line-clamp-2">
                                    {level.description}
                                </p>

                                <div className="flex items-center justify-between mt-auto">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] uppercase font-bold opacity-30">Difficulty</span>
                                        <div className="flex gap-1 mt-1">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className={`w-3 h-1 rounded-full ${i <= (level.id) ? 'bg-neon-green' : 'bg-white/10'}`} />
                                            ))}
                                        </div>
                                    </div>
                                    <Link href={`/roadmap/${user.path || 'shared'}/${level.id}`} className="btn-cyber text-[10px] py-1 px-4">
                                        INITIALIZE_LINK
                                    </Link>
                                </div>
                            </div>
                        </TerminalWindow>
                    ))}
                </div>
            </section>
        </div>
    )
}

function UserIcon({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
    )
}
