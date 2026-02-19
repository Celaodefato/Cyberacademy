'use client'
import { useState, use } from 'react'
import { useRouter } from 'next/navigation'
import QuizComponent from '@/components/QuizComponent'
import TerminalWindow from '@/components/TerminalWindow'
import { CURRICULUM } from '@/data/curriculum'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface Params { path: string; level: string }

export default function QuizPage({ params }: { params: Promise<Params> }) {
    const { path, level } = use(params)
    const levelNum = parseInt(level)
    const router = useRouter()
    const [done, setDone] = useState(false)

    const levelData = CURRICULUM.find(l =>
        l.id === levelNum && (l.path === path || l.path === 'shared')
    ) ?? CURRICULUM[0]

    function handleComplete(score: number, passed: boolean) {
        setDone(true)
        const stored = localStorage.getItem('cyberpath_demo')
        const d = stored ? JSON.parse(stored) : {}
        const xpEarned = passed ? 100 : 50
        const newXp = (d.xp || 0) + xpEarned
        const newLevel = Math.floor(newXp / 500) + 1
        const newBadges = [...(d.badges || [])]
        if (passed && levelData.badge && !newBadges.includes(levelData.badge)) {
            newBadges.push(levelData.badge)
        }
        const completedQuizzes = [...(d.completedQuizzes || []), `${path}-${level}`]
        localStorage.setItem('cyberpath_demo', JSON.stringify({
            ...d, xp: newXp, level: newLevel, badges: newBadges, completedQuizzes
        }))
    }

    return (
        <div className="min-h-screen bg-cyber-black">
            <main className="pt-14 max-w-3xl mx-auto px-4 py-8">
                <Link href={`/roadmap/${path}/${level}`} className="flex items-center gap-2 text-neon-dim text-xs mb-6 hover:text-neon-green transition-all">
                    <ArrowLeft className="w-3 h-3" /> Voltar ao módulo
                </Link>

                <div className="mb-6 text-center">
                    <p className="text-neon-dim text-xs tracking-widest mb-1">NÍVEL {levelNum} — {path.toUpperCase()} TEAM</p>
                    <h1 className="text-xl font-bold text-neon-green text-glow">{levelData.title} — Quiz</h1>
                    <p className="text-neon-dim text-xs mt-1">10 perguntas. Acertar 80%+ para +100 XP e badge.</p>
                </div>

                <QuizComponent
                    questions={levelData.quiz}
                    onComplete={handleComplete}
                    pathId={path}
                    levelId={levelNum}
                />

                {done && (
                    <div className="mt-6 flex gap-4 justify-center">
                        <Link href="/dashboard" className="btn-cyber text-sm px-6 py-2">[ dashboard ]</Link>
                        <Link href={`/roadmap/${path}/${Math.min(levelNum + 1, 5)}`} className="btn-cyber text-sm px-6 py-2">[ próximo nível ]</Link>
                    </div>
                )}
            </main>
        </div>
    )
}
