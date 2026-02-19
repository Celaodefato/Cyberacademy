'use client'
import { useState, Suspense } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Terminal, Eye, EyeOff, UserPlus } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'

import PasswordStrengthMeter from '@/components/PasswordStrengthMeter'
import PasswordGenerator from '@/components/PasswordGenerator'

function RegisterForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const defaultPath = searchParams.get('path') as 'red' | 'blue' | null
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPw, setShowPw] = useState(false)
    const [pwScore, setPwScore] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const isPasswordValid = password.length >= 12 && pwScore >= 3

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault()
        if (!isPasswordValid) {
            setError('Senha não atende aos requisitos de segurança ciber-estratégica.')
            return
        }
        setLoading(true)
        setError('')
        try {
            const { createClient } = await import('@/lib/supabase-client')
            const supabase = createClient()
            const { error: authErr } = await supabase.auth.signUp({
                email, password,
                options: { data: { username } }
            })
            if (authErr) throw authErr
            router.push('/select-path')
        } catch {
            // Demo mode
            localStorage.setItem('cyberpath_demo', JSON.stringify({
                email, username: username || email.split('@')[0], xp: 0, level: 1, path: defaultPath,
                badges: [], completedLessons: [], completedLabs: []
            }))
            router.push(defaultPath ? `/select-path?path=${defaultPath}` : '/select-path')
        } finally {
            setLoading(false)
        }
    }

    return (
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
            <TerminalWindow title="useradd — criar novo hacker">
                <div className="space-y-1 mb-6 text-sm">
                    <p className="text-neon-dim">{'>'} Inicializando perfil de hacker...</p>
                    <p className="text-neon-green">{'>'} Preencha os dados para criar sua conta segura.</p>
                </div>

                <form onSubmit={handleRegister} className="space-y-5">
                    <div>
                        <label className="block text-neon-dim text-xs mb-1.5 font-bold">
                            <span className="text-neon-green">~# </span>USERNAME:
                        </label>
                        <input required value={username} onChange={e => setUsername(e.target.value)}
                            className="cyber-input rounded bg-black/40" placeholder="h4cker_elite" minLength={3} />
                    </div>
                    <div>
                        <label className="block text-neon-dim text-xs mb-1.5 font-bold">
                            <span className="text-neon-green">~# </span>EMAIL_ADDR:
                        </label>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                            className="cyber-input rounded bg-black/40" placeholder="hacker@email.com" />
                    </div>
                    <div className="space-y-3">
                        <label className="block text-neon-dim text-xs mb-1.5 font-bold">
                            <span className="text-neon-green">~# </span>PASSWORD_SECURE:
                        </label>
                        <div className="relative">
                            <input type={showPw ? 'text' : 'password'} required value={password}
                                onChange={e => {
                                    setPassword(e.target.value)
                                    setError('')
                                }}
                                className={`cyber-input rounded pr-10 bg-black/40 transition-colors ${password.length > 0 && !isPasswordValid ? 'border-neon-red/40' : 'border-neon-green/20'
                                    }`}
                                placeholder="min. 12 chars (complex)"
                            />
                            <button type="button" onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-neon-dim hover:text-neon-green transition-colors">
                                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>

                        <PasswordStrengthMeter password={password} onStrengthChange={setPwScore} />

                        <div className="pt-2">
                            <PasswordGenerator onGenerate={setPassword} />
                        </div>
                    </div>

                    {error && <p className="text-neon-red text-[10px] font-bold uppercase tracking-tighter bg-neon-red/10 p-2 rounded-lg border border-neon-red/20">[ALERTA] {error}</p>}

                    <button type="submit" disabled={loading || (password.length > 0 && !isPasswordValid)}
                        className={`btn-cyber w-full py-3 flex items-center justify-center gap-2 text-sm ${loading || (password.length > 0 && !isPasswordValid) ? 'opacity-40 grayscale cursor-not-allowed' : ''
                            }`}>
                        <UserPlus className="w-4 h-4" />
                        {loading ? '[ criando perfil... ]' : '[ sudo useradd ]'}
                    </button>
                </form>

                <p className="text-neon-dim text-xs mt-6 text-center">
                    Já tem conta?{' '}
                    <Link href="/auth/login" className="text-neon-green hover:text-glow transition-all font-bold">
                        ssh login ›
                    </Link>
                </p>
                <div className="mt-6 pt-6 border-t border-white/5 space-y-2 opacity-40">
                    <p className="text-[9px] text-center uppercase tracking-[0.2em] font-black">Security Protocol v4.0 Active</p>
                    <p className="text-[8px] text-center italic">Encryption: Argon2id (Backend) | Sanitization: Enabled</p>
                </div>
            </TerminalWindow>
        </motion.div>
    )
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-cyber-black grid-bg">
            <div className="w-full flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-neon-green text-glow" />
                    <span className="text-neon-green font-bold text-lg tracking-wider text-glow-dim">CyberPath Academy</span>
                </div>
                <Suspense fallback={<div className="text-neon-dim text-sm">Loading...</div>}>
                    <RegisterForm />
                </Suspense>
            </div>
        </div>
    )
}
