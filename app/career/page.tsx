'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Briefcase, FileText, BadgeCheck, TrendingUp, ExternalLink, Download, User, Star } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'
import { useXP } from '@/hooks/useXP'

export default function CareerHubPage() {
    const user = useXP()
    const [stats, setStats] = useState({ labsSolved: 0, certsEarned: 0 })

    useEffect(() => {
        const stored = localStorage.getItem('cyberpath_stats')
        if (stored) {
            const d = JSON.parse(stored)
            setStats({
                labsSolved: (d.completedLabs || []).length,
                certsEarned: (d.badges || []).length
            })
        }
    }, [])

    const handleExportPDF = () => {
        window.print()
    }

    return (
        <div className="p-4 lg:p-10 space-y-10">
            {/* Global Print Style */}
            <style jsx global>{`
                @media print {
                    nav, sidebar, header, .btn-cyber-blue, .market-analytics-hud, .target-ops, .background-effects, .fixed, .floating-hud {
                        display: none !important;
                    }
                    body, .min-h-screen {
                        background: white !important;
                        color: black !important;
                    }
                    .cv-printable {
                        display: block !important;
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        background: white !important;
                        color: black !important;
                        padding: 40px !important;
                        border: none !important;
                    }
                    .cv-printable * {
                        color: black !important;
                        border-color: #eee !important;
                    }
                    .cv-printable h1, .cv-printable h2 {
                        color: #0066cc !important;
                    }
                }
            `}</style>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 no-print">
                <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-neon-blue opacity-40 mb-2">
                        <Briefcase className="w-3 h-3" /> [ CAREER_OPERATIONS_CENTER_V1 ]
                    </div>
                    <h1 className="text-4xl font-black text-neon-blue drop-shadow-[0_0_10px_#00ccff] mb-1">Career_Hub</h1>
                    <p className="text-neon-blue/40 text-xs uppercase tracking-widest font-bold">Bridging Training to Workforce - 2026 Market Standard</p>
                </div>

                <div className="flex gap-4 no-print">
                    <button className="btn-cyber-blue text-[10px] py-1.5 px-6">
                        [ RECRUITER_HUD ]
                    </button>
                </div>
            </div>

            <section className="grid md:grid-cols-3 gap-6">
                {/* CV Builder Preview */}
                <TerminalWindow title="cyber_cv_builder.exe" className="md:col-span-2 cv-printable" glowColor="blue">
                    <div className="flex items-start gap-8">
                        <div className="w-32 h-32 rounded-2xl bg-neon-blue/10 border-2 border-neon-blue/20 flex items-center justify-center relative group overflow-hidden no-print">
                            <User className="w-16 h-16 text-neon-blue/40" />
                            <div className="absolute inset-0 bg-gradient-to-t from-neon-blue/20 to-transparent" />
                        </div>

                        <div className="flex-1 space-y-4">
                            <div className="border-b border-white/5 pb-4">
                                <h2 className="text-2xl font-black text-neon-blue tracking-tight">{user.username.toUpperCase()}</h2>
                                <p className="text-xs text-white/40 uppercase font-bold">Junior Cybersecurity Professional | {user.path?.toUpperCase()} Path</p>
                                <p className="text-[10px] text-neon-blue mt-1 uppercase font-black print:block hidden">Platform Validated Profile - CyberPath Academy v4.2</p>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-2">
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-neon-blue opacity-40 uppercase">Platform Status</p>
                                    <p className="text-xs font-bold font-mono">Level {user.level} · {user.xp} XP</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-neon-blue opacity-40 uppercase">Validated Skills</p>
                                    <p className="text-xs font-bold font-mono">{stats.labsSolved} Labs · {stats.certsEarned} Badges</p>
                                </div>
                            </div>

                            <div className="space-y-2 pt-4 print:block hidden">
                                <p className="text-[10px] font-black text-neon-blue/40 uppercase">Professional Summary</p>
                                <p className="text-[10px] leading-relaxed italic">
                                    Profissional formado pela CyberPath Academy, com foco em {user.path === 'red' ? 'Pentesting e Offensive Security' : 'Defesa Cibernética e Forense'}.
                                    Especialista em ferramentas simuladas como Nmap, Metasploit e Volatility. Histórico de {stats.labsSolved} invasões éticas validadas em laboratório.
                                </p>
                            </div>

                            <div className="pt-6 no-print">
                                <button onClick={handleExportPDF} className="btn-cyber-blue text-xs w-full flex items-center justify-center gap-2">
                                    <Download className="w-4 h-4" /> [ GEN_PROFESSIONAL_PDF ]
                                </button>
                            </div>
                        </div>
                    </div>
                </TerminalWindow>

                {/* Market Analytics */}
                <div className="space-y-4 market-analytics-hud no-print">
                    <TerminalWindow title="market_intel.db" glowColor="blue">
                        <div className="space-y-6">
                            <div className="flex items-center justify-between">
                                <span className="text-[10px] font-black uppercase text-white/40">Market Readiness</span>
                                <span className="text-neon-blue font-bold">{Math.min(20 + user.level * 10, 98)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden border border-white/5">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(20 + user.level * 10, 98)}%` }}
                                    className="h-full bg-neon-blue shadow-[0_0_10px_#00ccff]"
                                />
                            </div>

                            {/* Competitive Edge Analytics */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="w-3 h-3 text-neon-green" />
                                    <span className="text-[10px] font-black uppercase text-neon-green">Competitive_Edge.sh</span>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-black/40 p-2 border border-white/5 rounded">
                                        <p className="text-[8px] text-white/40 uppercase font-bold">Lab Speed</p>
                                        <p className="text-xs font-bold text-neon-green">TOP 5%</p>
                                    </div>
                                    <div className="bg-black/40 p-2 border border-white/5 rounded">
                                        <p className="text-[8px] text-white/40 uppercase font-bold">Cert Rate</p>
                                        <p className="text-xs font-bold text-neon-green">FAST_TRACK</p>
                                    </div>
                                </div>
                                <p className="text-[9px] text-neon-green/60 font-medium leading-tight">
                                    &gt; "Você resolve labs {user.level > 5 ? '42%' : '15%'} mais rápido que a média da plataforma. Perfil altamente desejado por recrutadores Tier 1."
                                </p>
                            </div>

                            <p className="text-[10px] text-white/40 italic leading-relaxed pt-2 border-t border-white/5">
                                {user.level < 5
                                    ? `"Sua progressão no path ${user.path} está no início. Complete mais 3 labs de nível médio para atingir o match de 80% em vagas Jr."`
                                    : `"Você atingiu o nível de prontidão para o mercado! Seu perfil para ${user.path === 'red' ? 'Pentester' : 'SOC Analyst'} está no Top 10% da plataforma."`
                                }
                            </p>
                            <div className="pt-4 border-t border-white/5 space-y-3">
                                <a href="#" className="flex items-center justify-between group">
                                    <span className="text-[10px] font-bold uppercase text-white/40 group-hover:text-neon-blue transition-colors">Vagas Cyber Jr - LinkedIn</span>
                                    <ExternalLink className="w-3 h-3 text-white/20" />
                                </a>
                                <a href="#" className="flex items-center justify-between group">
                                    <span className="text-[10px] font-bold uppercase text-white/40 group-hover:text-neon-blue transition-colors">Currículos Elite 2026</span>
                                    <TrendingUp className="w-3 h-3 text-white/20" />
                                </a>
                            </div>
                        </div>
                    </TerminalWindow>
                </div>
            </section>

            {/* Recommended Positions */}
            <section className="space-y-4 target-ops no-print">
                <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-neon-yellow" />
                    <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-white opacity-40">TARGET_OPPORTUNITIES</span>
                    <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { role: 'Analista Blue Team Jr', corp: 'Nubank (Remote)', stack: 'SIEM · Cloud Sec', match: '95%' },
                        { role: 'SOC Analyst Tier 1', corp: 'Itau Unibanco', stack: 'Wireshark · Incident Response', match: '88%' },
                        { role: 'Pentester Junior', corp: 'Cipher (SafeGuard)', stack: 'Nmap · Metasploit · Web', match: '84%' },
                    ].map(job => (
                        <div key={job.role} className="glass-card p-5 border-white/5 hover:border-neon-blue/40 transition-all cursor-pointer group">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h4 className="text-sm font-bold text-white group-hover:text-neon-blue transition-colors">{job.role}</h4>
                                    <p className="text-[10px] text-white/40 font-bold uppercase">{job.corp}</p>
                                </div>
                                <span className="text-[9px] font-black text-neon-green bg-neon-green/10 px-2 py-0.5 rounded border border-neon-green/20">{job.match} MATCH</span>
                            </div>
                            <p className="text-[9px] text-white/30 uppercase font-bold mb-4">Required Stack: {job.stack}</p>
                            <button className="text-[10px] font-black text-neon-blue/60 uppercase tracking-widest flex items-center gap-2 group-hover:text-neon-blue">
                                [ ANALYZE_OPPORTUNITY ]
                                <ChevronRight className="w-3 h-3" />
                            </button>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

function ChevronRight({ className }: { className?: string }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
    )
}
