'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, Move } from 'lucide-react'
import dynamic from 'next/dynamic'
import { terminalInterpreter } from '@/utils/terminalInterpreter'

const TerminalSimulator = dynamic(() => import('./TerminalSimulator'), {
    ssr: false,
    loading: () => <div className="h-full w-full bg-black flex items-center justify-center text-neon-green/20 text-[10px] font-black uppercase tracking-widest">Loading_Core_Console...</div>
})

export default function GlobalTerminalOverlay() {
    const [isOpen, setIsOpen] = useState(false)
    const [isMaximized, setIsMaximized] = useState(false)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'j') {
                e.preventDefault()
                setIsOpen(prev => !prev)
            }
        }
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [])

    const handleCommand = (cmd: string) => {
        const res = terminalInterpreter(cmd)
        if (cmd.toLowerCase() === 'exit' || cmd.toLowerCase() === 'quit') {
            setIsOpen(false)
        }
        return res.output
    }

    return (
        <>
            {/* Toggle Button (Floating) */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 w-12 h-12 bg-neon-green rounded-full shadow-[0_0_20px_rgba(0,255,65,0.4)] flex items-center justify-center z-50 group border-2 border-black"
            >
                <TerminalIcon className="w-6 h-6 text-black" />
                <span className="absolute -top-10 right-0 bg-black/80 text-neon-green text-[8px] font-black py-1 px-2 rounded border border-neon-green/40 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    [ CTRL + J ] COMMAND_CENTER
                </span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 100 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 100 }}
                        className={`fixed z-[100] bg-black/90 backdrop-blur-md border border-neon-green/40 shadow-[0_0_50px_rgba(0,255,65,0.2)] flex flex-col overflow-hidden
                            ${isMaximized
                                ? 'inset-4 rounded-2xl'
                                : 'bottom-20 right-6 w-[600px] h-[400px] rounded-xl'
                            }`}
                    >
                        {/* Custom Titlebar */}
                        <div className="bg-neon-green/10 border-b border-neon-green/20 p-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
                                </div>
                                <span className="text-[10px] font-black text-neon-green uppercase tracking-[0.2em] flex items-center gap-2">
                                    <TerminalIcon className="w-3 h-3" />
                                    Global_HUD_Session.bash
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => setIsMaximized(!isMaximized)} className="p-1 hover:bg-white/5 rounded transition-colors">
                                    {isMaximized ? <Minimize2 className="w-3 h-3" /> : <Maximize2 className="w-3 h-3" />}
                                </button>
                                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-neon-red/20 rounded transition-colors">
                                    <X className="w-3 h-3 text-neon-red" />
                                </button>
                            </div>
                        </div>

                        {/* Terminal Window */}
                        <div className="flex-1">
                            <TerminalSimulator
                                onCommand={handleCommand}
                                initialMessage="GLOBAL INTERFACE READY\nAccessing local node encryption... [OK]\nType 'exit' to terminate session."
                                prompt="root@global-hud:~# "
                            />
                        </div>

                        {/* Footer Status */}
                        <div className="bg-black border-t border-white/5 px-4 py-1.5 flex items-center justify-between">
                            <span className="text-[8px] font-bold text-neon-green/40 uppercase">Latency: 2ms | Session: 0x8F2A</span>
                            <span className="text-[8px] font-bold text-neon-green/20 uppercase">CyberPath_HQ // Secure_Bridge</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    )
}
