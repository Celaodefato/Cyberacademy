'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Home, LayoutDashboard, Binary, Terminal as LabIcon,
    Award, User, Trophy, Menu, X, ChevronRight, Zap, Book, Briefcase
} from 'lucide-react'

const NAV_ITEMS = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Módulos', href: '/dashboard#modules', icon: Binary },
    { name: 'Labs', href: '/labs', icon: LabIcon },
    { name: 'Glossário', href: '/glossary', icon: Book },
    { name: 'Carreira', href: '/career', icon: Briefcase },
    { name: 'Certs', href: '/certs', icon: Award },
    { name: 'Ranking', href: '/leaderboard', icon: Trophy },
    { name: 'Perfil', href: '/profile', icon: User },
]

export default function Sidebar() {
    const pathname = usePathname()
    const [isOpen, setIsOpen] = useState(false)
    const [userPath, setUserPath] = useState<'red' | 'blue' | 'purple' | null>(null)
    const [hovered, setHovered] = useState<string | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem('cyberpath_stats')
        if (stored) {
            const d = JSON.parse(stored)
            setUserPath(d.path || null)
        }
    }, [])

    const SidebarContent = () => (
        <div className="flex flex-col h-full py-6">
            {/* Brand Icon */}
            <div className="px-4 mb-10 flex justify-center">
                <div className="w-10 h-10 rounded-xl bg-neon-green/10 border border-neon-green/40 flex items-center justify-center group cursor-pointer shadow-[0_0_15px_rgba(0,255,65,0.2)]">
                    <Zap className="w-6 h-6 text-neon-green group-hover:animate-flicker" />
                </div>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 space-y-2 px-3">
                {NAV_ITEMS.map((item) => {
                    const isActive = pathname === item.href
                    const Icon = item.icon
                    return (
                        <div key={item.name} className="relative flex justify-center">
                            <Link
                                href={item.href}
                                onMouseEnter={() => setHovered(item.name)}
                                onMouseLeave={() => setHovered(null)}
                                className={`
                  p-3 rounded-xl transition-all duration-300 flex items-center justify-center
                  ${isActive
                                        ? 'bg-neon-green/20 text-neon-green border border-neon-green/40 shadow-[0_0_15px_rgba(0,255,65,0.1)]'
                                        : 'text-neon-green/40 hover:text-neon-green hover:bg-white/5'
                                    }
                `}
                            >
                                <Icon className={`w-5 h-5 ${isActive ? 'animate-pulse-neon' : ''}`} />
                            </Link>

                            {/* Tooltip */}
                            <AnimatePresence>
                                {hovered === item.name && (
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/90 border border-neon-green/40 rounded-lg text-[10px] uppercase tracking-widest text-neon-green font-bold whitespace-nowrap z-[100] shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                                    >
                                        {item.name}
                                        <div className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-2 h-2 bg-black border-l border-b border-neon-green/40 rotate-45" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )
                })}
            </nav>

            {/* Path Status */}
            <div className="mt-auto px-3">
                <div className={`
          p-3 rounded-xl border flex flex-col items-center gap-2 transition-all duration-500
          ${userPath === 'red'
                        ? 'border-neon-red/30 bg-neon-red/5'
                        : userPath === 'blue'
                            ? 'border-neon-blue/30 bg-neon-blue/5'
                            : userPath === 'purple'
                                ? 'border-neon-purple/30 bg-neon-purple/5'
                                : 'border-neon-green/10 bg-white/5'
                    }
        `}>
                    <div className={`w-2 h-2 rounded-full animate-pulse shadow-lg ${userPath === 'red' ? 'bg-neon-red shadow-neon-red/50' :
                        userPath === 'blue' ? 'bg-neon-blue shadow-neon-blue/50' :
                            userPath === 'purple' ? 'bg-neon-purple shadow-neon-purple/50' : 'bg-neon-green/40'
                        }`} />
                    <span className="text-[8px] uppercase font-bold tracking-tighter opacity-60">Status</span>
                </div>
            </div>
        </div>
    )

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-20 bg-black/40 backdrop-blur-3xl border-r border-neon-green/10 z-[60]">
                <SidebarContent />
            </aside>

            {/* Mobile Toggle */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed bottom-6 right-6 z-[100] w-14 h-14 bg-neon-green text-black rounded-full shadow-[0_0_20px_#00ff41] flex items-center justify-center transition-transform active:scale-90"
            >
                {isOpen ? <X /> : <Menu />}
            </button>

            {/* Mobile Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[80] lg:hidden"
                        />
                        <motion.aside
                            initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                            className="fixed left-0 top-0 bottom-0 w-64 bg-black border-r border-neon-green/20 z-[90] lg:hidden"
                        >
                            {/* Mobile Custom Content (wider) */}
                            <div className="flex flex-col h-full p-6">
                                <div className="flex items-center gap-3 mb-10">
                                    <Zap className="w-8 h-8 text-neon-green" />
                                    <span className="text-xl font-bold text-glow">CYBERPATH</span>
                                </div>
                                <nav className="flex-1 space-y-4">
                                    {NAV_ITEMS.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`flex items-center gap-4 p-3 rounded-xl transition-all ${pathname === item.href ? 'bg-neon-green/20 text-neon-green border border-neon-green/40' : 'text-neon-green/40'
                                                }`}
                                        >
                                            <item.icon className="w-6 h-6" />
                                            <span className="font-bold uppercase tracking-widest text-sm">{item.name}</span>
                                        </Link>
                                    ))}
                                </nav>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
