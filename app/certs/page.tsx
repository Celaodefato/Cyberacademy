'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown, ChevronUp, ExternalLink, Play, Award } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'
import { CERTS } from '@/data/curriculum'
import { MOCK_EXAMS } from '@/data/exams'
import dynamic from 'next/dynamic'

const ExamSimulator = dynamic(() => import('@/components/ExamSimulator'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex items-center justify-center text-neon-green font-black uppercase tracking-[0.3em] animate-pulse">Initializing_Rigor_Engine...</div>
})

export default function CertsPage() {
    const [expanded, setExpanded] = useState<string | null>(null)
    const [activeExam, setActiveExam] = useState<typeof MOCK_EXAMS[0] | null>(null)

    return (
        <div className="min-h-screen bg-cyber-black">
            {activeExam && (
                <ExamSimulator
                    exam={activeExam}
                    onClose={() => setActiveExam(null)}
                />
            )}
            <main className="pt-14 max-w-6xl mx-auto px-4 py-8">
                <div className="mb-8">
                    <p className="text-neon-dim text-xs tracking-widest mb-1">root@cyberpath:~# ls certs/</p>
                    <h1 className="text-2xl font-bold text-neon-green text-glow">Certificações em Cybersegurança</h1>
                    <p className="text-neon-dim text-sm mt-1">Guia completo de certificações reconhecidas no Brasil e no mundo.</p>
                </div>

                {/* Summary table */}
                <TerminalWindow title="certs-table.sh" className="mb-8 overflow-x-auto">
                    <table className="w-full text-xs min-w-[600px]">
                        <thead>
                            <tr className="border-b border-terminal-border text-neon-dim">
                                <th className="text-left py-2 pr-4">Certificação</th>
                                <th className="text-left py-2 pr-4">Caminho</th>
                                <th className="text-left py-2 pr-4">Nível</th>
                                <th className="text-left py-2 pr-4">Custo (BRL)</th>
                                <th className="text-left py-2">Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {CERTS.map(c => (
                                <tr key={c.id} className="border-b border-terminal-border/50 hover:bg-neon-green/2 transition-all">
                                    <td className="py-2 pr-4 text-neon-green font-semibold">{c.name}</td>
                                    <td className="py-2 pr-4">
                                        <span className={`px-2 py-0.5 rounded border text-xs ${c.path.includes('Red') ? 'border-neon-red/40 text-neon-red' :
                                            c.path.includes('Blue') ? 'border-neon-blue/40 text-neon-blue' :
                                                'border-neon-green/40 text-neon-green'
                                            }`}>{c.path}</span>
                                    </td>
                                    <td className="py-2 pr-4 text-neon-dim">{c.difficulty}</td>
                                    <td className="py-2 pr-4 text-neon-yellow">{c.cost}</td>
                                    <td className="py-2">
                                        <button onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                                            className="text-neon-green hover:text-glow text-xs flex items-center gap-1 transition-all">
                                            {expanded === c.id ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                            detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </TerminalWindow>

                {/* Expanded cert cards */}
                <div className="grid md:grid-cols-2 gap-6">
                    {CERTS.map((c, i) => (
                        <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
                            <TerminalWindow title={`${c.id}.cert`} className={expanded === c.id ? 'border-neon-green' : ''}>
                                <div className="flex items-start justify-between mb-3">
                                    <div>
                                        <Award className={`w-5 h-5 mb-1 ${c.path.includes('Red') ? 'text-neon-red' : c.path.includes('Blue') ? 'text-neon-blue' : 'text-neon-green'}`} />
                                        <h3 className="text-neon-green font-bold text-sm">{c.name}</h3>
                                        <p className="text-neon-dim text-xs mt-0.5">{c.difficulty} • {c.path}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-neon-yellow font-bold text-sm">{c.cost}</p>
                                        <p className="text-neon-dim text-xs">estimativa BRL</p>
                                    </div>
                                </div>

                                <div className="border-t border-terminal-border pt-3">
                                    <p className="text-neon-dim text-xs mb-2 font-semibold">Passos para obter:</p>
                                    <div className="space-y-1">
                                        {c.steps.split('. ').filter(Boolean).map((step, si) => (
                                            <div key={si} className="flex items-start gap-2 text-xs text-neon-dim">
                                                <span className="text-neon-green flex-shrink-0">{si + 1}.</span>
                                                <span>{step}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-3 mt-4 flex-wrap">
                                    <button
                                        onClick={() => {
                                            const exam = MOCK_EXAMS.find(e => e.id.includes(c.id.toLowerCase()))
                                            if (exam) setActiveExam(exam)
                                            else setActiveExam(MOCK_EXAMS[0]) // Fallback to Security+
                                        }}
                                        className="btn-cyber text-xs py-1.5 px-3 flex items-center gap-1">
                                        <Play className="w-3 h-3" />
                                        [ simular exame ]
                                    </button>
                                </div>
                            </TerminalWindow>
                        </motion.div>
                    ))}
                </div>

                {/* Prep tips */}
                <TerminalWindow title="prep-tips.md" className="mt-8">
                    <h3 className="text-neon-green font-bold mb-4">💡 Dicas de Preparação</h3>
                    <div className="grid md:grid-cols-3 gap-4 text-xs text-neon-dim">
                        <div>
                            <p className="text-neon-green font-semibold mb-1">📚 Estudo</p>
                            <ul className="space-y-1">
                                <li>› Professor Messer (Security+)</li>
                                <li>› TCM Security (PNPT/CEH)</li>
                                <li>› Offensive Security (PWK/OSCP)</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-neon-green font-semibold mb-1">🧪 Prática</p>
                            <ul className="space-y-1">
                                <li>› TryHackMe (guiado)</li>
                                <li>› HackTheBox (intermediário)</li>
                                <li>› DVWA + Metasploitable</li>
                            </ul>
                        </div>
                        <div>
                            <p className="text-neon-green font-semibold mb-1">💰 Custo Real</p>
                            <ul className="space-y-1">
                                <li>› eJPT: mais barata para começar</li>
                                <li>› Security+: melhor ROI global</li>
                                <li>› OSCP: mais respeitada em pentest</li>
                            </ul>
                        </div>
                    </div>
                </TerminalWindow>
            </main>
        </div>
    )
}
