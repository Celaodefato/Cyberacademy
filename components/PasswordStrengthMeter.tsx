'use client'
import { useState, useEffect } from 'react'
import zxcvbn from 'zxcvbn'
import { Check, X, ShieldAlert, ShieldCheck, Shield } from 'lucide-react'

interface StrengthMeterProps {
    password: string
    onStrengthChange?: (score: number) => void
}

export default function PasswordStrengthMeter({ password, onStrengthChange }: StrengthMeterProps) {
    const [result, setResult] = useState<any>(null)

    const requirements = [
        { label: 'Mínimo 12 caracteres', valid: password.length >= 12 },
        { label: 'Letra Maiúscula & Minúscula', valid: /[a-z]/.test(password) && /[A-Z]/.test(password) },
        { label: 'Número (0-9)', valid: /\d/.test(password) },
        { label: 'Símbolo (!@#$%^&*)', valid: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password) },
    ]

    useEffect(() => {
        const evaluation = zxcvbn(password)
        setResult(evaluation)
        onStrengthChange?.(evaluation.score)
    }, [password, onStrengthChange])

    const getStrengthColor = (score: number) => {
        switch (score) {
            case 0: return 'bg-white/10'
            case 1: return 'bg-neon-red shadow-[0_0_10px_#ff4444]'
            case 2: return 'bg-neon-orange shadow-[0_0_10px_#ff6600]'
            case 3: return 'bg-neon-yellow shadow-[0_0_10px_#ffff00]'
            case 4: return 'bg-neon-green shadow-[0_0_10px_#00ff41]'
            default: return 'bg-white/10'
        }
    }

    const getStrengthLabel = (score: number) => {
        switch (score) {
            case 0: return 'INSEGURA'
            case 1: return 'FRACA'
            case 2: return 'MODERADA'
            case 3: return 'FORTE'
            case 4: return 'EXTREMA'
            default: return 'ANALISANDO'
        }
    }

    return (
        <div className="space-y-4">
            {/* ProgressBar */}
            <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                    <div className="flex items-center gap-1.5">
                        {result?.score === 4 ? <ShieldCheck className="w-3 h-3 text-neon-green" /> : <Shield className="w-3 h-3 text-white/40" />}
                        <span className="text-[9px] uppercase font-black tracking-widest text-white/40">Neural Strength:</span>
                    </div>
                    <span className={`text-[9px] font-black tracking-widest ${result?.score >= 3 ? 'text-neon-green' : result?.score === 2 ? 'text-neon-yellow' : 'text-neon-red'
                        }`}>{getStrengthLabel(result?.score ?? 0)}</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden flex gap-1">
                    {[0, 1, 2, 3].map((i) => (
                        <div key={i} className={`flex-1 h-full transition-all duration-500 rounded-full ${(result?.score ?? 0) > i ? getStrengthColor(result.score) : 'bg-white/5'
                            }`} />
                    ))}
                </div>
            </div>

            {/* Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-3 bg-black/20 border border-white/5 rounded-xl">
                {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2">
                        {req.valid ? (
                            <Check className="w-3 h-3 text-neon-green" />
                        ) : (
                            <div className="w-3 h-3 flex items-center justify-center">
                                <span className="w-1 h-1 bg-white/20 rounded-full" />
                            </div>
                        )}
                        <span className={`text-[10px] font-bold tracking-tight transition-colors ${req.valid ? 'text-neon-green' : 'text-white/20'}`}>
                            {req.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* Warnings */}
            {result?.feedback?.warning && (
                <div className="flex items-start gap-2 p-2 bg-neon-red/10 border border-neon-red/20 rounded-lg">
                    <ShieldAlert className="w-3 h-3 text-neon-red mt-0.5 shrink-0" />
                    <p className="text-[10px] text-neon-red/80 italic font-medium leading-tight">
                        {result.feedback.warning}
                    </p>
                </div>
            )}
        </div>
    )
}
