'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Book, Shield, Zap, Terminal, Hash } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'

const TERMS = [
    { title: 'Zero Trust', desc: 'Modelo de segurança que assume que nenhuma entidade é confiável por padrão, exigindo verificação contínua.', tag: 'Arquitetura' },
    { title: 'Prompt Injection', desc: 'Ataque contra modelos de IA onde o atacante insere comandos maliciosos para manipular a resposta.', tag: 'AI Threats' },
    { title: 'MITRE ATT&CK', desc: 'Base de conhecimento global de táticas e técnicas de adversários baseada em observações do mundo real.', tag: 'Framework' },
    { title: 'NIST CSF', desc: 'Framework de Cibersegurança que fornece diretrizes baseadas em riscos para gerenciar a segurança cibernética.', tag: 'Compliance' },
    { title: 'Purple Team', desc: 'Integração colaborativa entre Red e Blue teams para otimizar a detecção e resposta a ameaças.', tag: 'Estratégia' },
    { title: 'SQL Injection', desc: 'Exploração de vulnerabilidades em consultas de banco de dados para extrair ou manipular dados.', tag: 'Web Sec' },
    { title: 'Cross-Site Scripting (XSS)', desc: 'Injeção de scripts maliciosos em páginas web visualizadas por outros usuários.', tag: 'Web Sec' },
    { title: 'WannaCry', desc: 'Ransomware global de 2017 que explorou a vulnerabilidade EternalBlue do Windows.', tag: 'Case Study' },
    { title: 'SIEM', desc: 'Security Information and Event Management. Sistema que agrega e analisa logs de segurança em tempo real.', tag: 'Blue Team' },
    { title: 'Nmap', desc: 'Network Mapper. Ferramenta essencial para descoberta de redes e auditoria de segurança.', tag: 'Recon' },
]

export default function GlossaryPage() {
    const [search, setSearch] = useState('')

    const filtered = TERMS.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.tag.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="p-4 lg:p-10 max-w-6xl mx-auto space-y-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-[0.3em] text-neon-green opacity-40 mb-2">
                        <Book className="w-3 h-3" /> [ KNOWLEDGE_BASE_V1.2 ]
                    </div>
                    <h1 className="text-4xl font-black text-neon-green text-glow mb-1">Cyber_Glossary</h1>
                    <p className="text-neon-green/40 text-xs uppercase tracking-widest font-bold">Terminologia ESSENCIAL para a Prova de 2026</p>
                </div>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-green/40" />
                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search Intelligence..."
                        className="w-full bg-black/40 border border-neon-green/20 rounded-xl py-3 pl-10 pr-4 text-neon-green text-sm outline-none focus:border-neon-green/50 transition-all placeholder:text-neon-green/20"
                    />
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filtered.map((term, i) => (
                    <motion.div
                        key={term.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                    >
                        <TerminalWindow title={`DEF_${term.title.toUpperCase().replace(/\s/g, '_')}`} className="h-full group hover:-translate-y-1">
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-neon-green/40 tracking-tighter">Category: {term.tag}</span>
                                    <Hash className="w-3 h-3 text-neon-green/20" />
                                </div>
                                <h3 className="text-xl font-bold text-neon-green group-hover:text-glow transition-all">{term.title}</h3>
                                <p className="text-xs text-white/60 leading-relaxed font-mono">
                                    {term.desc}
                                </p>
                                <div className="pt-4 border-t border-white/5 flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-neon-green animate-pulse" />
                                    <span className="text-[8px] uppercase font-bold opacity-30">verified_source: cyberpath_hq</span>
                                </div>
                            </div>
                        </TerminalWindow>
                    </motion.div>
                ))}

                {filtered.length === 0 && (
                    <div className="col-span-full py-20 text-center space-y-4">
                        <Terminal className="w-12 h-12 text-neon-red mx-auto opacity-20" />
                        <h2 className="text-neon-red font-bold uppercase tracking-widest">No Intelligence Found</h2>
                        <p className="text-white/20 text-xs font-mono">Query: "{search}" returned 0 matches in database.</p>
                    </div>
                )}
            </div>
        </div>
    )
}
