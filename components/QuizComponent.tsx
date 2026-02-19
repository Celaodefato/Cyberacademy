'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, ChevronRight, Trophy, Terminal as TerminalIcon } from 'lucide-react'
import { QuizQuestion } from '@/data/curriculum'

interface QuizProps {
    questions: QuizQuestion[]
    onComplete: (score: number, passed: boolean) => void
    pathId: string
    levelId: number
}

export default function QuizComponent({ questions, onComplete, pathId, levelId }: QuizProps) {
    const [current, setCurrent] = useState(0)
    const [selected, setSelected] = useState<number | null>(null)
    const [answers, setAnswers] = useState<number[]>([])
    const [showExplanation, setShowExplanation] = useState(false)
    const [finished, setFinished] = useState(false)
    const [streak, setStreak] = useState(0)
    const [isEliteMode, setIsEliteMode] = useState(false)

    const q = questions[current]
    const score = finished ? answers.filter((a, i) => a === questions[i].correct).length : 0
    const pct = finished ? Math.round((score / questions.length) * 100) : 0
    const passed = pct >= 80

    function handleSelect(idx: number) {
        if (selected !== null) return
        setSelected(idx)
        setShowExplanation(true)

        if (idx === q.correct) {
            const newStreak = streak + 1
            setStreak(newStreak)
            if (newStreak >= 2) setIsEliteMode(true)
        } else {
            setStreak(0)
            setIsEliteMode(false)
        }
    }

    function handleNext() {
        const newAnswers = [...answers, selected ?? -1]
        setAnswers(newAnswers)
        setSelected(null)
        setShowExplanation(false)
        if (current + 1 >= questions.length) {
            setFinished(true)
            const s = newAnswers.filter((a, i) => a === questions[i].correct).length
            const p = s / questions.length >= 0.8
            onComplete(s, p)
        } else {
            setCurrent(c => c + 1)
        }
    }

    if (finished) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                className="terminal-window p-8 text-center">
                <div className="mb-4">
                    {passed ? (
                        <Trophy className="w-16 h-16 text-neon-green mx-auto text-glow" />
                    ) : (
                        <XCircle className="w-16 h-16 text-neon-red mx-auto" />
                    )}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${passed ? 'text-neon-green text-glow' : 'text-neon-red'}`}>
                    {passed ? 'QUIZ CONCLUÍDO!' : 'TENTE NOVAMENTE'}
                </h2>
                <p className="text-neon-dim mb-1">
                    {score}/{questions.length} corretas — {pct}%
                </p>
                <p className="text-neon-dim text-sm mb-6">
                    {passed ? `+100 XP ganhos! Nível desbloqueado.` : `Precisou de 80%. Revise o módulo e tente de novo.`}
                </p>
                <div className="w-full cyber-progress mb-6">
                    <div className="cyber-progress-fill" style={{ width: `${pct}%` }} />
                </div>
                {!passed && (
                    <button className="btn-cyber text-sm" onClick={() => { setCurrent(0); setSelected(null); setAnswers([]); setShowExplanation(false); setFinished(false) }}>
                        [ retry_quiz ]
                    </button>
                )}
            </motion.div>
        )
    }

    return (
        <div className={`terminal-window transition-all duration-500 ${isEliteMode ? 'border-neon-purple shadow-[0_0_30px_rgba(168,85,247,0.2)] scale-[1.02]' : ''}`}>
            {isEliteMode && (
                <div className="bg-neon-purple text-black text-[8px] font-black uppercase tracking-[0.4em] py-1 text-center animate-pulse">
                    ELITE_STREAK DETECTED: difficulty adapted
                </div>
            )}
            <div className={`terminal-titlebar ${isEliteMode ? 'bg-neon-purple/20' : ''}`}>
                <span className="terminal-dot terminal-dot-red" />
                <span className="terminal-dot terminal-dot-yellow" />
                <span className="terminal-dot terminal-dot-green" />
                <span className="terminal-title">quiz — pergunta {current + 1}/{questions.length}</span>
            </div>
            <div className="terminal-body">
                {/* Progress */}
                <div className="cyber-progress mb-6">
                    <div className="cyber-progress-fill" style={{ width: `${((current) / questions.length) * 100}%` }} />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                        <p className="text-neon-green font-semibold text-base mb-6 leading-relaxed">
                            <span className="text-neon-dim mr-2">Q{current + 1}.</span>
                            {q.question}
                        </p>

                        <div className="flex flex-col gap-3 mb-6">
                            {q.options.map((opt, idx) => {
                                let cls = 'border border-terminal-border text-neon-dim hover:border-neon-green hover:text-neon-green'
                                if (selected !== null) {
                                    if (idx === q.correct) cls = 'border border-neon-green bg-neon-green/10 text-neon-green'
                                    else if (idx === selected && selected !== q.correct) cls = 'border border-neon-red bg-neon-red/10 text-neon-red'
                                    else cls = 'border border-terminal-border text-neon-dim opacity-50'
                                }
                                return (
                                    <button key={idx} onClick={() => handleSelect(idx)}
                                        className={`text-left px-4 py-3 rounded text-sm font-mono transition-all flex items-center gap-3 ${cls}`}>
                                        <span className="text-xs opacity-60">[{String.fromCharCode(65 + idx)}]</span>
                                        <span>{opt}</span>
                                        {selected !== null && idx === q.correct && <CheckCircle className="ml-auto w-4 h-4 flex-shrink-0" />}
                                        {selected !== null && idx === selected && selected !== q.correct && <XCircle className="ml-auto w-4 h-4 flex-shrink-0" />}
                                    </button>
                                )
                            })}
                        </div>

                        {showExplanation && (
                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className={`rounded p-4 mb-6 text-sm border ${selected === q.correct
                                    ? 'bg-neon-green/5 border-neon-green/20 text-neon-green'
                                    : 'bg-neon-red/5 border-neon-red/20 text-neon-red'}`}>
                                <div className="flex items-center gap-2 mb-1">
                                    <TerminalIcon className="w-3 h-3" />
                                    <span className="font-bold uppercase tracking-wider text-[10px]">
                                        {selected === q.correct ? 'Feedback: Sucesso' : 'Feedback: Erro de Lógica'}
                                    </span>
                                </div>
                                <p className="opacity-90 leading-relaxed">{q.explanation}</p>
                            </motion.div>
                        )}

                        {selected !== null && (
                            <button onClick={handleNext} className="btn-cyber text-sm flex items-center gap-2">
                                {current + 1 < questions.length ? '[ próxima ]' : '[ ver resultado ]'}
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    )
}
