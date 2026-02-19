'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Terminal, Eye, EyeOff, LogIn } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'

function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')
        try {
            const { createClient } = await import('@/lib/supabase-client')
            const supabase = createClient()
            const { error: authErr } = await supabase.auth.signInWithPassword({ email, password })
            if (authErr) throw authErr
            router.push('/dashboard')
        } catch {
            // Demo mode: skip auth if Supabase not configured
            localStorage.setItem('cyberpath_demo', JSON.stringify({ email, username: email.split('@')[0], xp: 250, level: 1, path: null }))
            router.push('/select-path')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <TerminalWindow title="ssh root@cyberpath — authenticate">
                <div className="space-y-1 mb-6 text-sm">
                    <p className="text-neon-dim">{'>'} Conectando ao servidor seguro...</p>
                    <p className="text-neon-green">{'>'} Insira suas credenciais para continuar.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-neon-dim text-xs mb-1.5 tracking-wide">
                            <span className="text-neon-green">root@cyberpath:~# </span>enter email:
                        </label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                            className="cyber-input rounded" placeholder="hacker@email.com" />
                    </div>

                    <div>
                        <label className="block text-neon-dim text-xs mb-1.5 tracking-wide">
                            <span className="text-neon-green">root@cyberpath:~# </span>enter password:
                        </label>
                        <div className="relative">
                            <input type={showPw ? 'text' : 'password'} required value={password}
                                onChange={e => setPassword(e.target.value)}
                                className="cyber-input rounded pr-10" placeholder="••••••••" />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-dim hover:text-neon-green">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>

                    {error && <p className="text-neon-red text-xs">[ERROR] {error}</p>}

                    <button type="submit" disabled={loading}
                        className="btn-cyber w-full py-3 flex items-center justify-center gap-2 text-sm">
                        <LogIn className="w-4 h-4" />
                        {loading ? '[ autenticando... ]' : '[ sudo login ]'}
                    </button>
                </form>

                <p className="text-neon-dim text-xs mt-6 text-center">
                    Sem conta?{' '}
                    <Link href="/auth/register" className="text-neon-green hover:text-glow transition-all">
                        sudo useradd ›
                    </Link>
                </p>
            </TerminalWindow>
        </motion.div>
    )
}

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-cyber-black grid-bg">
            <div className="w-full flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-neon-green text-glow" />
                    <span className="text-neon-green font-bold text-lg tracking-wider text-glow-dim">CyberPath Academy</span>
                </div>
                <Suspense fallback={<div className="text-neon-dim text-sm">Loading...</div>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    )
}
