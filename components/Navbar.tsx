'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Shield, Skull, Terminal, Menu, X, Trophy, BookOpen, FlaskConical, Award } from 'lucide-react'

interface NavbarProps {
    xp?: number
    path?: 'red' | 'blue' | null
    username?: string
}

export default function Navbar({ xp = 0, path = null, username }: NavbarProps) {
    const [mobileOpen, setMobileOpen] = useState(false)

    const navLinks = [
        { href: '/dashboard', label: 'Dashboard', icon: Terminal },
        { href: '/roadmap', label: 'Módulos', icon: BookOpen },
        { href: '/labs', label: 'Labs', icon: FlaskConical },
        { href: '/certs', label: 'Certificações', icon: Award },
        { href: '/leaderboard', label: 'Ranking', icon: Trophy },
    ]

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-terminal-border bg-cyber-black/95 backdrop-blur">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-14">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <Terminal className="w-5 h-5 text-neon-green group-hover:drop-shadow-neon transition-all" />
                    <span className="text-neon-green font-bold text-sm tracking-wider text-glow-dim group-hover:text-glow transition-all">
                        CyberPath<span className="text-neon-dim">_</span>Academy
                    </span>
                </Link>

                {/* Desktop links */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-neon-dim hover:text-neon-green text-xs tracking-wide transition-all hover:bg-neon-green/5 rounded border border-transparent hover:border-terminal-border">
                            <Icon className="w-3.5 h-3.5" />
                            {label}
                        </Link>
                    ))}
                </div>

                {/* Right side */}
                <div className="flex items-center gap-3">
                    {username ? (
                        <>
                            <span className="xp-pill hidden sm:block">{xp} XP</span>
                            {path && (
                                <span className={`hidden sm:flex items-center gap-1 text-xs px-2 py-1 rounded border ${path === 'red'
                                        ? 'border-neon-red/40 text-neon-red'
                                        : 'border-neon-blue/40 text-neon-blue'
                                    }`}>
                                    {path === 'red' ? <Skull className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                    {path === 'red' ? 'Red' : 'Blue'}
                                </span>
                            )}
                            <Link href="/profile">
                                <div className="w-8 h-8 rounded border border-neon-green/40 bg-cyber-panel flex items-center justify-center text-neon-green text-xs font-bold hover:border-neon-green hover:shadow-neon-sm transition-all">
                                    {username[0].toUpperCase()}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <Link href="/auth/login" className="btn-cyber text-xs py-1.5 px-4">
                            [ login ]
                        </Link>
                    )}
                    <button className="md:hidden text-neon-dim hover:text-neon-green" onClick={() => setMobileOpen(!mobileOpen)}>
                        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-terminal-border bg-cyber-dark px-4 py-3 flex flex-col gap-1">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                        <Link key={href} href={href} onClick={() => setMobileOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 text-neon-dim hover:text-neon-green text-sm transition-all hover:bg-neon-green/5 rounded">
                            <Icon className="w-4 h-4" />
                            {label}
                        </Link>
                    ))}
                </div>
            )}
        </nav>
    )
}
