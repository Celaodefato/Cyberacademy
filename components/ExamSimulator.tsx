'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, CheckCircle, XCircle, Award, ArrowRight, ShieldAlert, Terminal as TerminalIcon, Database } from 'lucide-react'
import TerminalWindow from './TerminalWindow'
import TerminalSimulator from './TerminalSimulator'
import { Exam, ExamQuestion } from '@/data/exams'
import { useXP } from '@/hooks/useXP'

interface ExamSimulatorProps {
    exam: Exam
    onClose: () => void
}

export default function ExamSimulator({ exam, onClose }: ExamSimulatorProps) {
    const { addXP } = useXP()
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [selectedOption, setSelectedOption] = useState<any>(null)
    const [answers, setAnswers] = useState<any[]>([])
    const [timeLeft, setTimeLeft] = useState(exam.durationSeconds)
    const [isFinished, setIsFinished] = useState(false)
    const [isStarted, setIsStarted] = useState(false)
    const [shuffledQuestions, setShuffledQuestions] = useState<ExamQuestion[]>([])

    // PBQ Specific State
    const [pbqSelections, setPbqSelections] = useState<Record<string, string>>({})

    const shuffleArray = (array: any[]) => {
        const newArray = [...array]
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray
    }

    const startExam = () => {
        // Shuffle questions AND their options if MCQ
        const shuffled = shuffleArray(exam.questions).map(q => {
            if (q.type === 'mcq' && q.options) {
                const originalOptions = q.options.map((opt: string, idx: number) => ({ opt, idx }))
                const shuffledOpts = shuffleArray(originalOptions)
                return {
                    ...q,
                    options: shuffledOpts.map(o => o.opt),
                    correct: shuffledOpts.findIndex(o => o.idx === q.correct)
                }
            }
            return q
        })
        setShuffledQuestions(shuffled)
        setIsStarted(true)
    }

    useEffect(() => {
        if (isStarted && !isFinished && timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timer)
        } else if (timeLeft === 0 && !isFinished) {
            handleFinish()
        }
    }, [isStarted, isFinished, timeLeft])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleNext = () => {
        const question = shuffledQuestions[currentQuestion]
        let currentAnswer = selectedOption

        if (question.type === 'pbq') {
            currentAnswer = pbqSelections
        }

        const newAnswers = [...answers]
        newAnswers[currentQuestion] = currentAnswer
        setAnswers(newAnswers)

        if (currentQuestion < shuffledQuestions.length - 1) {
            setCurrentQuestion(prev => prev + 1)
            const nextAnswer = newAnswers[currentQuestion + 1]
            if (shuffledQuestions[currentQuestion + 1].type === 'pbq') {
                setPbqSelections(nextAnswer || {})
                setSelectedOption(null)
            } else {
                setSelectedOption(nextAnswer ?? null)
            }
        } else {
            handleFinish()
        }
    }

    const handlePrev = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1)
            const prevAnswer = answers[currentQuestion - 1]
            if (shuffledQuestions[currentQuestion - 1].type === 'pbq') {
                setPbqSelections(prevAnswer || {})
                setSelectedOption(null)
            } else {
                setSelectedOption(prevAnswer)
            }
        }
    }

    const handleFinish = () => {
        setIsFinished(true)
    }

    const calculateScore = () => {
        let points = 0
        const pointsPerQuestion = exam.maxScore / shuffledQuestions.length

        shuffledQuestions.forEach((q, i) => {
            if (q.type === 'mcq' && answers[i] === q.correct) {
                points += pointsPerQuestion
            } else if (q.type === 'pbq') {
                const userPbq = answers[i] || {}
                const correctMap = q.pbqData?.correctMap || {}
                let correctPairs = 0
                const totalPairs = Object.keys(correctMap).length

                Object.entries(correctMap).forEach(([target, correctItem]) => {
                    if (userPbq[target] === correctItem) correctPairs++
                })

                // Partial credit for PBQs
                points += totalPairs > 0 ? (correctPairs / totalPairs) * pointsPerQuestion : 0
            } else if (q.type === 'lab' && answers[i] === q.correct) {
                points += pointsPerQuestion
            }
        });

        return Math.round(points)
    }

    const score = calculateScore()
    const passed = score >= exam.passingScore

    const getDomainStats = () => {
        const stats: Record<string, { correct: number, total: number }> = {}
        shuffledQuestions.forEach((q, i) => {
            if (!stats[q.domain]) stats[q.domain] = { correct: 0, total: 0 }
            stats[q.domain].total++

            if (q.type === 'mcq' && answers[i] === q.correct) stats[q.domain].correct++
            if (q.type === 'lab' && answers[i] === q.correct) stats[q.domain].correct++
            if (q.type === 'pbq') {
                const userPbq = answers[i] || {}
                const correctMap = q.pbqData?.correctMap || {}
                let allCorrect = true
                Object.entries(correctMap).forEach(([target, correctItem]) => {
                    if (userPbq[target] !== correctItem) allCorrect = false
                })
                if (allCorrect) stats[q.domain].correct++
            }
        })
        return stats
    }

    if (!isStarted) {
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xl w-full">
                    <TerminalWindow title="EXAM_SECURITY_HARDENING.BAT">
                        <div className="text-center p-6">
                            <ShieldAlert className="w-12 h-12 text-neon-red mx-auto mb-4 animate-pulse" />
                            <h2 className="text-2xl font-black text-neon-green uppercase tracking-widest mb-2">{exam.title}</h2>
                            <p className="text-neon-dim text-xs mb-8 uppercase tracking-widest leading-relaxed">
                                AVISO: Este simulador segue o rigor oficial de 2026. <br />
                                Serão avaliados MCQ, PBQ (interativos) e Labs práticos.
                            </p>
                            <div className="grid grid-cols-2 gap-4 text-xs mb-8">
                                <div className="glass-card p-4 border-neon-green/20 text-left">
                                    <p className="text-neon-dim mb-1">DURAÇÃO</p>
                                    <p className="text-neon-green font-black text-xl">{exam.durationSeconds / 60} MIN</p>
                                </div>
                                <div className="glass-card p-4 border-neon-green/20 text-left">
                                    <p className="text-neon-dim mb-1">SCORE P/ PASSAR</p>
                                    <p className="text-neon-green font-black text-xl">{exam.passingScore} / {exam.maxScore}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button onClick={onClose} className="flex-1 py-4 border border-neon-red/40 text-neon-red font-bold text-xs uppercase tracking-widest hover:bg-neon-red/10 transition-colors">
                                    [ abortar ]
                                </button>
                                <button onClick={startExam} className="flex-1 py-4 bg-neon-green text-black font-black text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all">
                                    [ iniciar_sessao ]
                                </button>
                            </div>
                        </div>
                    </TerminalWindow>
                </motion.div>
            </div>
        )
    }

    if (isFinished) {
        const domainStats = getDomainStats()
        return (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4 overflow-y-auto">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl w-full my-8">
                    <TerminalWindow title="EXAM_REPORT_V4.2.LOG">
                        <div className="p-8">
                            <div className="text-center mb-10">
                                {passed ? (
                                    <CheckCircle className="w-20 h-20 text-neon-green mx-auto mb-4 drop-shadow-[0_0_15px_#00ff41]" />
                                ) : (
                                    <XCircle className="w-20 h-20 text-neon-red mx-auto mb-4 drop-shadow-[0_0_15px_#ff4444]" />
                                )}
                                <h2 className={`text-4xl font-black mb-1 uppercase tracking-[0.2em] ${passed ? 'text-neon-green text-glow' : 'text-neon-red'}`}>
                                    {passed ? 'CERTIFIED' : 'FAILED'}
                                </h2>
                                <p className="text-neon-dim text-xs uppercase tracking-[0.3em] font-bold">
                                    Score: {score} / {exam.maxScore}
                                </p>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6 mb-10">
                                <div className="space-y-4">
                                    <h3 className="text-xs font-black text-neon-green uppercase border-b border-neon-green/20 pb-2">Domain Performance</h3>
                                    {Object.entries(domainStats).map(([domain, stat]) => (
                                        <div key={domain} className="space-y-1">
                                            <div className="flex justify-between text-[10px] uppercase font-bold">
                                                <span className="text-neon-dim">{domain}</span>
                                                <span className={stat.correct / stat.total >= 0.75 ? 'text-neon-green' : 'text-neon-red'}>
                                                    {Math.round((stat.correct / stat.total) * 100)}%
                                                </span>
                                            </div>
                                            <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full ${stat.correct / stat.total >= 0.75 ? 'bg-neon-green' : 'bg-neon-red'}`}
                                                    style={{ width: `${(stat.correct / stat.total) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="glass-card p-6 border-white/5 flex flex-col justify-center text-center">
                                    <Database className="w-10 h-10 text-neon-blue mx-auto mb-4 opacity-50" />
                                    <p className="text-[10px] text-neon-dim uppercase font-bold">XP earned</p>
                                    <p className={`text-4xl font-black ${passed ? 'text-neon-green' : 'text-white'}`}>
                                        {passed ? '+1000' : '+150'}
                                    </p>
                                    <p className="text-[10px] text-neon-dim mt-4 leading-relaxed font-bold uppercase tracking-widest">
                                        {passed ? 'PROXIMO PASSO: DASHBOARD DE CARREIRA' : 'RECOMENDADO: REVER DOMÍNIOS ABAIXO DE 75%'}
                                    </p>
                                </div>
                            </div>

                            <button onClick={() => {
                                if (passed) addXP(1000)
                                else addXP(150)
                                onClose()
                            }} className="w-full py-5 bg-neon-green text-black font-black uppercase tracking-widest text-xs hover:shadow-[0_0_30px_rgba(0,255,65,0.5)] transition-all">
                                [ fechar_relatorio ]
                            </button>
                        </div>
                    </TerminalWindow>
                </motion.div>
            </div>
        )
    }

    const question = shuffledQuestions[currentQuestion]

    return (
        <div className="fixed inset-0 z-[100] bg-black/98 backdrop-blur-2xl flex flex-col p-4 md:p-8">
            {/* Header / Timer */}
            <div className="max-w-5xl mx-auto w-full flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                <div className="flex items-center gap-4">
                    <Award className="text-neon-green w-8 h-8" />
                    <div>
                        <h2 className="text-sm font-black text-neon-green uppercase tracking-widest">{exam.title}</h2>
                        <div className="flex items-center gap-4 mt-1">
                            <span className="text-[10px] font-bold text-neon-dim uppercase tracking-widest">Q{currentQuestion + 1} OF {shuffledQuestions.length}</span>
                            <div className="h-0.5 w-32 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-neon-green"
                                    animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col items-end`}>
                    <p className="text-[10px] font-bold text-neon-dim uppercase mb-1">Time Remaining</p>
                    <div className={`px-5 py-2 border rounded font-mono font-bold text-xl ${timeLeft < 300 ? 'border-neon-red text-neon-red animate-pulse' : 'border-neon-green/40 text-neon-green'}`}>
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            {/* Question Area */}
            <div className="max-w-4xl mx-auto w-full flex-1 flex flex-col pt-4 overflow-y-auto pr-2 custom-scrollbar">
                <div className="mb-4">
                    <span className="text-[10px] font-black bg-neon-green/10 text-neon-green px-2 py-1 rounded border border-neon-green/20 uppercase">
                        {shuffledQuestions[currentQuestion].domain}
                    </span>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="space-y-8 pb-10"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                            {shuffledQuestions[currentQuestion].question}
                        </h3>

                        {shuffledQuestions[currentQuestion].scenario && (
                            <div className="bg-cyber-dark p-6 border-l-4 border-neon-blue rounded-r-lg font-mono text-xs overflow-x-auto">
                                <p className="text-neon-blue/60 mb-2 font-bold text-[10px] uppercase opacity-50">// SCENARIO_DATA</p>
                                <code className="text-neon-blue break-all">{shuffledQuestions[currentQuestion].scenario}</code>
                            </div>
                        )}

                        {/* MCQ Content */}
                        {shuffledQuestions[currentQuestion].type === 'mcq' && (
                            <div className="space-y-3">
                                {shuffledQuestions[currentQuestion].options?.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedOption(i)}
                                        className={`
                                            w-full text-left p-6 transition-all duration-300 border backdrop-blur-sm relative group
                                            ${selectedOption === i
                                                ? 'bg-neon-green/5 border-neon-green shadow-[0_0_20px_rgba(0,255,65,0.1)] text-white'
                                                : 'bg-white/2 border-white/5 text-white/40 hover:border-white/20'
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className={`w-8 h-8 rounded border flex items-center justify-center text-xs font-black
                                                ${selectedOption === i ? 'bg-neon-green border-neon-green text-black' : 'border-white/10 text-white/30'}
                                            `}>
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                            <span className="text-md font-medium tracking-wide">{opt}</span>
                                        </div>
                                        {selectedOption === i && <div className="absolute top-0 right-0 w-1 h-full bg-neon-green" />}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* PBQ Content */}
                        {shuffledQuestions[currentQuestion].type === 'pbq' && shuffledQuestions[currentQuestion].pbqData && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-4">
                                        <p className="text-xs font-black text-neon-green uppercase mb-3">// AVAILABLE_ENTITIES</p>
                                        <div className="flex flex-wrap gap-2">
                                            {shuffledQuestions[currentQuestion].pbqData.items.map(item => (
                                                <button
                                                    key={item}
                                                    draggable
                                                    onDragStart={(e) => e.dataTransfer.setData('text', item)}
                                                    className="px-4 py-2 bg-white/5 border border-white/10 text-[10px] md:text-xs font-bold rounded cursor-move hover:bg-neon-green/20 hover:border-neon-green transition-all"
                                                >
                                                    {item}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="text-xs font-black text-neon-blue uppercase mb-3">// TARGET_SLOTS</p>
                                        <div className="space-y-3">
                                            {shuffledQuestions[currentQuestion].pbqData.targets.map(target => (
                                                <div
                                                    key={target}
                                                    onDragOver={(e) => e.preventDefault()}
                                                    onDrop={(e) => {
                                                        const item = e.dataTransfer.getData('text')
                                                        setPbqSelections(prev => ({ ...prev, [target]: item }))
                                                    }}
                                                    className="flex items-center justify-between p-4 bg-cyber-dark border border-white/5 rounded"
                                                >
                                                    <span className="text-[10px] md:text-xs font-bold text-white/40 uppercase">{target}</span>
                                                    <span className="text-[10px] md:text-xs font-black text-neon-green px-3 py-1 bg-neon-green/10 border border-neon-green/40 rounded">
                                                        {pbqSelections[target] || '--- DRAG HERE ---'}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setPbqSelections({})}
                                            className="text-[10px] text-neon-red uppercase font-black hover:underline"
                                        >
                                            [ clear slots ]
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Lab Content */}
                        {shuffledQuestions[currentQuestion].type === 'lab' && (
                            <div className="space-y-4">
                                <div className="bg-black/40 rounded-xl overflow-hidden border border-white/5 h-[300px] md:h-[400px]">
                                    <TerminalSimulator
                                        onCommand={(cmd) => {
                                            if (cmd.startsWith('submit ')) {
                                                const flag = cmd.replace('submit ', '').trim()
                                                setSelectedOption(flag)
                                                return `Flag stored: ${flag}. Click [ NEXT ] to continue.`
                                            }
                                            return `Command recorded at simulated host... (Try 'submit <flag>' to complete)`
                                        }}
                                        initialMessage={`OSCP PRACTICAL SESSION INITIATED.
TARGET: 10.10.12.x
USE: submit <flag> to record your answer.`}
                                    />
                                </div>
                                <div className="flex items-center gap-2 text-neon-blue">
                                    <TerminalIcon className="w-4 h-4" />
                                    <span className="text-[10px] font-black uppercase">Prática Ativa: Submeta a flag no terminal acima</span>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="max-w-5xl mx-auto w-full pt-10 border-t border-white/5 flex justify-between items-center">
                <button
                    onClick={handlePrev}
                    disabled={currentQuestion === 0}
                    className="px-6 py-3 text-white/40 hover:text-white disabled:opacity-0 transition-opacity flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]"
                >
                    <ArrowRight className="w-4 h-4 rotate-180" />
                    [ back ]
                </button>

                <div className="flex items-center gap-6">
                    <button
                        onClick={handleFinish}
                        className="text-[10px] text-neon-red/60 font-black uppercase tracking-widest hover:text-neon-red transition-colors"
                    >
                        finalize session
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={
                            (shuffledQuestions[currentQuestion].type === 'mcq' && selectedOption === null) ||
                            (shuffledQuestions[currentQuestion].type === 'pbq' && Object.keys(pbqSelections).length === 0) ||
                            (shuffledQuestions[currentQuestion].type === 'lab' && selectedOption === null)
                        }
                        className="px-6 md:px-10 py-3 md:py-4 bg-neon-green text-black font-black uppercase tracking-widest text-[10px] md:text-xs flex items-center gap-3 disabled:opacity-20 disabled:cursor-not-allowed hover:shadow-[0_0_30px_rgba(0,255,65,0.4)] transition-all"
                    >
                        {currentQuestion === shuffledQuestions.length - 1 ? '[ submit_exam ]' : '[ next_step ]'}
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </div>
    )
}
