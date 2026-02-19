'use client'
import { useState } from 'react'
import { RefreshCcw, Copy, Check } from 'lucide-react'

interface PasswordGeneratorProps {
    onGenerate: (password: string) => void
}

export default function PasswordGenerator({ onGenerate }: PasswordGeneratorProps) {
    const [copied, setCopied] = useState(false)

    const generateStrongPassword = () => {
        const length = 16
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-="
        let retVal = ""
        for (let i = 0, n = charset.length; i < length; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n))
        }

        // Ensure at least one of each category
        const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
        const lower = "abcdefghijklmnopqrstuvwxyz"
        const num = "0123456789"
        const sym = "!@#$%^&*()_+~"

        const arr = retVal.split('')
        arr[0] = upper.charAt(Math.floor(Math.random() * upper.length))
        arr[1] = lower.charAt(Math.floor(Math.random() * lower.length))
        arr[2] = num.charAt(Math.floor(Math.random() * num.length))
        arr[3] = sym.charAt(Math.floor(Math.random() * sym.length))

        // Shuffle
        const final = arr.sort(() => Math.random() - 0.5).join('')

        onGenerate(final)
        setCopied(false)
    }

    return (
        <div className="flex items-center gap-2">
            <button
                type="button"
                onClick={generateStrongPassword}
                className="flex flex-1 items-center justify-center gap-2 px-3 py-1.5 bg-neon-green/10 border border-neon-green/30 rounded-lg group hover:bg-neon-green/20 transition-all active:scale-95"
            >
                <RefreshCcw className="w-3 h-3 text-neon-green group-hover:rotate-180 transition-transform duration-500" />
                <span className="text-[10px] uppercase font-black tracking-widest text-neon-green">Gerar Senha Ciber-Forte</span>
            </button>

            <p className="text-[9px] text-white/20 italic max-w-[120px] leading-tight">
                Recomendado para máxima segurança de rede.
            </p>
        </div>
    )
}
