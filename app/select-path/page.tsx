'use client'
import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { Skull, Shield, ChevronRight } from 'lucide-react'

function PathSelectionContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const preselected = searchParams.get('path') as 'red' | 'blue' | null
    const [selected, setSelected] = useState<'red' | 'blue' | 'purple' | null>(preselected)
    const [confirming, setConfirming] = useState(false)

    function savePath() {
        if (!selected) return
        setConfirming(true)
        try {
            const stored = localStorage.getItem('cyberpath_stats')
            const data = stored ? JSON.parse(stored) : {}
            localStorage.setItem('cyberpath_stats', JSON.stringify({ ...data, path: selected }))
        } catch (e) {
            console.error('Failed to save to localStorage', e)
        }
        setTimeout(() => router.push('/dashboard'), 800)
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-cyber-black grid-bg">
            <div className="max-w-6xl w-full">
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
                    <p className="text-neon-dim text-xs tracking-widest mb-2 font-black uppercase">ETAPA_ALPHA_1 — DEFINIÇÃO DE CARREIRA</p>
                    <h1 className="text-4xl font-black text-neon-green text-glow italic">SELECIONE SEU CAMINHO</h1>
                    <p className="text-neon-dim text-sm mt-2 font-mono">Cada caminho desbloqueia módulos, ferramentas e CTFs exclusivos.</p>
                </motion.div>

                <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {/* Red Team */}
                    <motion.button initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
                        onClick={() => setSelected('red')}
                        className={`path-card red text-left transition-all duration-300 ${selected === 'red' ? 'selected' : ''}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Skull className={`w-10 h-10 ${selected === 'red' ? 'text-neon-red' : 'text-neon-dim'}`}
                                style={selected === 'red' ? { filter: 'drop-shadow(0 0 10px #ff0040)' } : {}} />
                            <div>
                                <h2 className={`text-xl font-bold ${selected === 'red' ? 'text-neon-red text-glow-red' : 'text-neon-dim'}`}>Red Team</h2>
                                <span className="text-[10px] uppercase font-black text-neon-dim">Ofensivo • Exploração</span>
                            </div>
                        </div>
                        <p className="text-neon-dim text-[11px] mb-4 leading-relaxed font-mono">
                            Aprenda como atacantes pensam. Pentest, exploração de vulnerabilidades, engenharia reversa e Metasploit.
                        </p>
                        <ul className="text-[10px] space-y-2">
                            {[
                                ['🔍', 'Recon & OSINT'],
                                ['💥', 'Exploração Web (OWASP)'],
                                ['🐛', 'Metasploit & Pwn'],
                                ['⬆️', 'Privilege Escalation'],
                            ].map(([emoji, t]) => (
                                <li key={t} className={`flex items-center gap-2 ${selected === 'red' ? 'text-neon-red' : 'text-neon-dim opacity-70'}`}>
                                    <span>{emoji}</span> {t}
                                </li>
                            ))}
                        </ul>
                    </motion.button>

                    {/* Blue Team */}
                    <motion.button initial={{ opacity: 0, x: 0 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                        onClick={() => setSelected('blue')}
                        className={`path-card blue text-left transition-all duration-300 ${selected === 'blue' ? 'selected' : ''}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <Shield className={`w-10 h-10 ${selected === 'blue' ? 'text-neon-blue' : 'text-neon-dim'}`}
                                style={selected === 'blue' ? { filter: 'drop-shadow(0 0 10px #00d4ff)' } : {}} />
                            <div>
                                <h2 className={`text-xl font-bold ${selected === 'blue' ? 'text-neon-blue' : 'text-neon-dim'}`}
                                    style={selected === 'blue' ? { textShadow: '0 0 7px #00d4ff' } : {}}>Blue Team</h2>
                                <span className="text-[10px] uppercase font-black text-neon-dim">Defensivo • Resposta</span>
                            </div>
                        </div>
                        <p className="text-neon-dim text-[11px] mb-4 leading-relaxed font-mono">
                            Proteja ativos, monitore ameaças e responda a incidentes. A demanda por defensores (SOC) está explodindo.
                        </p>
                        <ul className="text-[10px] space-y-2">
                            {[
                                ['📊', 'SIEM & Log Analysis'],
                                ['🔬', 'Forense Digital'],
                                ['🛡️', 'IDS/IPS Config'],
                                ['🚨', 'Incident Response'],
                            ].map(([emoji, t]) => (
                                <li key={t} className={`flex items-center gap-2 ${selected === 'blue' ? 'text-neon-blue' : 'text-neon-dim opacity-70'}`}>
                                    <span>{emoji}</span> {t}
                                </li>
                            ))}
                        </ul>
                    </motion.button>

                    {/* Purple Team */}
                    <motion.button initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}
                        onClick={() => setSelected('purple')}
                        className={`path-card purple text-left transition-all duration-300 ${selected === 'purple' ? 'selected' : ''}`}>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative">
                                <Skull className={`w-10 h-10 absolute inset-0 ${selected === 'purple' ? 'text-neon-purple opacity-40' : 'text-neon-dim opacity-20'}`} />
                                <Shield className={`w-10 h-10 ${selected === 'purple' ? 'text-neon-purple' : 'text-neon-dim'}`}
                                    style={selected === 'purple' ? { filter: 'drop-shadow(0 0 10px #a855f7)' } : {}} />
                            </div>
                            <div>
                                <h2 className={`text-xl font-bold ${selected === 'purple' ? 'text-neon-purple text-glow-purple' : 'text-neon-dim'}`}>Purple Team</h2>
                                <span className="text-[10px] uppercase font-black text-neon-dim">Híbrido • Modern Sec</span>
                            </div>
                        </div>
                        <p className="text-neon-dim text-[11px] mb-4 leading-relaxed font-mono">
                            O melhor de dois mundos. Foco em Cloud Security, AI Threats (LLM), IoT Hacking e Zero Trust.
                        </p>
                        <ul className="text-[10px] space-y-2">
                            {[
                                ['☁️', 'Cloud Sec (AWS/Azure)'],
                                ['🤖', 'AI & Prompt Injection'],
                                ['📱', 'Mobile Pentest'],
                                ['⛓️', 'Zero Trust Architecture'],
                            ].map(([emoji, t]) => (
                                <li key={t} className={`flex items-center gap-2 ${selected === 'purple' ? 'text-neon-purple' : 'text-neon-dim opacity-70'}`}>
                                    <span>{emoji}</span> {t}
                                </li>
                            ))}
                        </ul>
                        <div className={`mt-4 text-[9px] font-black tracking-widest uppercase py-1 border-t border-white/5 ${selected === 'purple' ? 'text-neon-purple' : 'text-neon-dim opacity-40'}`}>
                            {selected === 'purple' ? '[ ✓ ALPHA SELECT ]' : '[ INITIALIZE_VFS ]'}
                        </div>
                    </motion.button>
                </div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: selected ? 1 : 0.4 }} className="text-center">
                    <button onClick={savePath} disabled={!selected || confirming}
                        className={`btn-cyber px-10 py-4 text-sm flex items-center gap-3 mx-auto ${selected === 'red' ? 'btn-cyber-red' : selected === 'blue' ? 'btn-cyber-blue' : ''
                            }`}>
                        {confirming ? '[ inicializando... ]' : `[ confirmar ${selected ?? 'caminho'} ]`}
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>
            </div>
        </div>
    )
}

export default function SelectPathPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neon-dim">Loading...</div>}>
            <PathSelectionContent />
        </Suspense>
    )
}
