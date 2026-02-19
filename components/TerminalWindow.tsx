'use client'
import { motion } from 'framer-motion'
import { Terminal } from 'lucide-react'

interface TerminalWindowProps {
    children: React.ReactNode
    title?: string
    className?: string
    noPadding?: boolean
    glass?: boolean
    glowColor?: 'green' | 'blue' | 'red' | 'yellow' | 'purple'
}

export default function TerminalWindow({
    children,
    title = 'terminal',
    className = '',
    noPadding = false,
    glass = true,
    glowColor = 'green'
}: TerminalWindowProps) {
    const borderColors = {
        green: 'border-neon-green/20 hover:border-neon-green/40 shadow-[0_0_15px_rgba(0,255,65,0.05)]',
        blue: 'border-neon-blue/20 hover:border-neon-blue/40 shadow-[0_0_15px_rgba(0,204,255,0.05)]',
        red: 'border-neon-red/20 hover:border-neon-red/40 shadow-[0_0_15px_rgba(255,68,68,0.05)]',
        yellow: 'border-neon-yellow/20 hover:border-neon-yellow/40 shadow-[0_0_15px_rgba(255,255,0,0.05)]',
        purple: 'border-neon-purple/20 hover:border-neon-purple/40 shadow-[0_0_15px_rgba(168, 85, 247, 0.05)]'
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`
                relative overflow-hidden group 
                ${glass ? 'bg-black/40 backdrop-blur-xl' : 'bg-cyber-black'} 
                border rounded-2xl transition-all duration-300
                ${borderColors[glowColor]}
                ${className}
            `}
        >
            {/* Header / Titlebar */}
            <div className="flex items-center justify-between px-4 py-3 bg-white/5 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                    </div>
                    <div className="flex items-center gap-2 ml-4">
                        <Terminal className={`w-3.5 h-3.5 ${glowColor === 'red' ? 'text-neon-red' :
                                glowColor === 'blue' ? 'text-neon-blue' :
                                    glowColor === 'purple' ? 'text-neon-purple' : 'text-neon-green'
                            } opacity-60`} />
                        <span className="text-[10px] uppercase tracking-widest font-bold opacity-60 font-mono">{title}</span>
                    </div>
                </div>

                {/* HUD Detail */}
                <div className="flex gap-1">
                    <div className="w-8 h-[2px] bg-white/10" />
                    <div className="w-2 h-[2px] bg-white/10" />
                </div>
            </div>

            {/* Content Area */}
            <div className={`${noPadding ? '' : 'p-6'} relative z-10 font-mono`}>
                {children}
            </div>

            {/* Corner Decorative Element */}
            <div className={`absolute bottom-0 right-0 w-8 h-8 pointer-events-none opacity-20`}>
                <div className={`absolute bottom-2 right-2 w-2 h-2 border-r-2 border-b-2 ${glowColor === 'red' ? 'border-neon-red' :
                        glowColor === 'blue' ? 'border-neon-blue' :
                            glowColor === 'purple' ? 'border-neon-purple' : 'border-neon-green'
                    }`} />
            </div>
        </motion.div>
    )
}
