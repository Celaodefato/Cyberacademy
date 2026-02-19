'use client'
import { useEffect, useState, use } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronRight, CheckCircle, PlayCircle, BookOpen, Zap, ArrowLeft, Terminal } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'
import { CURRICULUM } from '@/data/curriculum'

interface Params { path: string; level: string }

export default function RoadmapPage({ params }: { params: Promise<Params> }) {
    const { path, level } = use(params)
    const levelNum = parseInt(level)

    const [user, setUser] = useState({ username: 'hacker', xp: 0, path: path as 'red' | 'blue' | 'purple' })
    const [activeLesson, setActiveLesson] = useState(0)
    const [completed, setCompleted] = useState<string[]>([])

    const levelData = CURRICULUM.find(l => l.path === (levelNum === 1 ? 'shared' : path as 'red' | 'blue') && l.id === levelNum)
        ?? CURRICULUM.find(l => l.id === levelNum && (l.path === path || l.path === 'shared'))
        ?? CURRICULUM[0]

    useEffect(() => {
        const stored = localStorage.getItem('cyberpath_stats')
        if (stored) {
            const d = JSON.parse(stored)
            setUser({ username: d.username || 'hacker', xp: d.xp || 0, path: d.path || path as 'red' | 'blue' | 'purple' })
            setCompleted(d.completedLessons || [])
        }
    }, [path])

    function completeLesson(id: string) {
        if (completed.includes(id)) return
        const newCompleted = [...completed, id]
        setCompleted(newCompleted)
        const stored = localStorage.getItem('cyberpath_stats')
        const d = stored ? JSON.parse(stored) : {}
        const newXp = (d.xp || 0) + 50
        localStorage.setItem('cyberpath_stats', JSON.stringify({ ...d, xp: newXp, completedLessons: newCompleted }))
        setUser(u => ({ ...u, xp: newXp }))
    }

    const lesson = levelData.lessons[activeLesson]

    return (
        <div className="min-h-screen p-4 lg:p-10">
            <main className="max-w-[1400px] mx-auto">
                <div className="flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest text-neon-green/40 mb-8">
                    <Link href="/dashboard" className="hover:text-neon-green transition-colors">[ DASHBOARD ]</Link>
                    <ChevronRight className="w-3 h-3" />
                    <span className="text-neon-green">LEVEL_0{levelNum}: {levelData.title.toUpperCase()}</span>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    {/* Sidebar: lesson list */}
                    <div className="lg:col-span-1 space-y-6">
                        <TerminalWindow title="CURRICULUM.VFS">
                            <div className="space-y-2">
                                {levelData.lessons.map((l, i) => (
                                    <button key={l.id} onClick={() => setActiveLesson(i)}
                                        className={`w-full text-left p-3 rounded-xl text-xs flex items-start gap-3 transition-all border ${i === activeLesson
                                            ? 'border-neon-green/40 bg-neon-green/10 text-neon-green'
                                            : 'border-transparent text-neon-green/40 hover:bg-white/5 hover:text-neon-green'
                                            }`}>
                                        <div className="mt-0.5 flex-shrink-0">
                                            {completed.includes(l.id)
                                                ? <CheckCircle className="w-4 h-4 text-neon-green" />
                                                : <PlayCircle className="w-4 h-4 opacity-50" />
                                            }
                                        </div>
                                        <span className="leading-tight font-bold">{l.title}</span>
                                    </button>
                                ))}
                                <div className="pt-4 mt-2 border-t border-white/5">
                                    <Link href={`/quiz/${path}/${level}`}
                                        className="w-full text-left p-3 rounded-xl text-xs flex items-center gap-3 text-neon-yellow border border-neon-yellow/20 hover:bg-neon-yellow/10 transition-all font-bold">
                                        <Zap className="w-4 h-4" />
                                        COMMENCE_QUIZ
                                    </Link>
                                </div>
                            </div>
                        </TerminalWindow>

                        {/* Lab link */}
                        <TerminalWindow title="ENVIRONMENT.CFG" glowColor="blue">
                            <p className="text-neon-blue font-bold text-xs mb-2">🧪 {levelData.labTitle}</p>
                            <p className="text-white/40 text-[10px] mb-4 leading-relaxed">{levelData.labDescription}</p>
                            <a href={levelData.labLink} target="_blank" rel="noopener noreferrer"
                                className="btn-cyber-blue text-[10px] py-1.5 w-full block text-center">
                                [ DEPLOY_LAB ]
                            </a>
                        </TerminalWindow>
                    </div>

                    {/* Main lesson content */}
                    <div className="lg:col-span-3">
                        <motion.div key={activeLesson} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                            <TerminalWindow title={`SEC_0${activeLesson + 1}.MD — ${lesson.title.toLowerCase()}`}>
                                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <BookOpen className="w-4 h-4 text-neon-green/40" />
                                            <span className="text-neon-green/60 text-[10px] font-bold uppercase tracking-widest">{lesson.duration} READ</span>
                                        </div>
                                        <span className="xp-pill">+{lesson.xp} XP</span>

                                        {/* Compliance Tags */}
                                        <div className="flex gap-2">
                                            {lesson.nistTags?.map(tag => (
                                                <span key={tag} className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[8px] font-black uppercase text-neon-blue">NIST: {tag}</span>
                                            ))}
                                            {lesson.mitreTechniques?.map(t => (
                                                <span key={t} className="px-2 py-0.5 rounded border border-white/10 bg-white/5 text-[8px] font-black uppercase text-neon-red">MITRE: {t}</span>
                                            ))}
                                        </div>
                                    </div>
                                    {completed.includes(lesson.id) && (
                                        <div className="px-3 py-1 bg-neon-green/10 border border-neon-green/20 rounded-full text-neon-green text-[10px] font-bold flex items-center gap-2 animate-pulse-neon">
                                            <CheckCircle className="w-3 h-3" /> ARCHIVED
                                        </div>
                                    )}
                                </div>

                                <h1 className="text-4xl font-black text-neon-green text-glow mb-8 tracking-tight">{lesson.title}</h1>

                                {/* Content Body */}
                                <div className="prose-cyber max-w-none mb-10">
                                    {lesson.content.split('\n').map((line, i) => {
                                        if (line.startsWith('## ')) return <h2 key={i}>{line.slice(3)}</h2>
                                        if (line.startsWith('### ')) return <h3 key={i}>{line.slice(4)}</h3>
                                        if (line.startsWith('```')) return null
                                        if (line.startsWith('**') && line.endsWith('**')) return <p key={i} className="text-neon-green font-bold text-lg">{line.slice(2, -2)}</p>
                                        if (line.startsWith('- ')) return <li key={i} className="ml-4 list-none flex gap-3 mb-2"><span className="text-neon-green/40 font-black">»</span>{line.slice(2)}</li>
                                        if (line.trim() === '') return <div key={i} className="h-4" />
                                        return <p key={i} className="text-white/80">{line}</p>
                                    })}
                                </div>

                                {/* Code HUD */}
                                {lesson.codeExample && (
                                    <div className="mb-10">
                                        <div className="flex items-center gap-2 mb-2 px-1">
                                            <Terminal className="w-3.5 h-3.5 text-neon-green/40" />
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-neon-green/40">Shell_Output_Preview</span>
                                        </div>
                                        <div className="bg-black/60 rounded-2xl border border-neon-green/20 p-6 shadow-inner">
                                            <pre className="text-neon-green text-xs overflow-x-auto leading-relaxed whitespace-pre-wrap font-mono">
                                                <code>{lesson.codeExample}</code>
                                            </pre>
                                        </div>
                                    </div>
                                )}

                                {/* Video Placeholder */}
                                {lesson.videoId && (
                                    <div className="aspect-video rounded-3xl overflow-hidden glass-card p-1 mb-10">
                                        <div className="w-full h-full rounded-[20px] bg-black/60 flex flex-col items-center justify-center text-center p-8 group overflow-hidden relative">
                                            <div className="absolute inset-0 bg-gradient-to-t from-neon-green/10 to-transparent opacity-40" />
                                            <PlayCircle className="w-20 h-20 text-neon-green/20 group-hover:text-neon-green/40 transition-all duration-500 transform group-hover:scale-110 mb-4" />
                                            <p className="text-neon-green font-black uppercase tracking-[0.3em] text-sm group-hover:text-glow transition-all">[ MULTIMEDIA_DECRYPTING ]</p>
                                            <p className="text-white/20 text-[10px] uppercase font-bold mt-2">Classified Instructor Footage - Pending Sync</p>
                                        </div>
                                    </div>
                                )}

                                {/* Footer Action */}
                                <div className="mt-12 flex items-center justify-between border-t border-white/5 pt-8">
                                    <div className="flex gap-4">
                                        {!completed.includes(lesson.id) ? (
                                            <button onClick={() => completeLesson(lesson.id)}
                                                className="btn-cyber flex items-center gap-2">
                                                <CheckCircle className="w-4 h-4" />
                                                [ COMMIT_PHASE ]
                                            </button>
                                        ) : (
                                            activeLesson < levelData.lessons.length - 1 && (
                                                <button onClick={() => setActiveLesson(a => a + 1)}
                                                    className="btn-cyber flex items-center gap-2">
                                                    INITIALIZE_NEXT
                                                    <ChevronRight className="w-4 h-4" />
                                                </button>
                                            )
                                        )}
                                    </div>

                                    {activeLesson === levelData.lessons.length - 1 && (
                                        <Link href={`/quiz/${path}/${level}`}
                                            className="btn-cyber-blue flex items-center gap-2">
                                            <Zap className="w-4 h-4" />
                                            [ COMMENCE_FINAL_EVAL ]
                                        </Link>
                                    )}
                                </div>
                            </TerminalWindow>
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}
