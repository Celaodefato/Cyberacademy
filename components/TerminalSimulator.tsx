'use client'
import { useEffect, useRef, useState } from 'react'
import { Terminal } from 'xterm'
import { FitAddon } from 'xterm-addon-fit'
import { WebLinksAddon } from 'xterm-addon-web-links'
import 'xterm/css/xterm.css'

interface TerminalSimulatorProps {
    onCommand?: (cmd: string) => string | void
    initialMessage?: string
    prompt?: string
}

export default function TerminalSimulator({
    onCommand,
    initialMessage = 'Welcome to CyberPath OS v4.0.0-LTS\nType "help" for a list of available commands.',
    prompt = 'root@cyberpath:~# '
}: TerminalSimulatorProps) {
    const terminalRef = useRef<HTMLDivElement>(null)
    const xtermRef = useRef<Terminal | null>(null)
    const fitAddonRef = useRef<FitAddon | null>(null)
    const [inputBuffer, setInputBuffer] = useState('')

    useEffect(() => {
        if (!terminalRef.current) return

        const term = new Terminal({
            cursorBlink: true,
            theme: {
                background: '#0a0a0a',
                foreground: '#00ff41',
                cursor: '#00ff41',
                selectionBackground: 'rgba(0, 255, 65, 0.3)',
                black: '#1a1a1a',
                red: '#ff4444',
                green: '#00ff41',
                yellow: '#ffcc00',
                blue: '#00ccff',
                magenta: '#a855f7',
                cyan: '#00ffff',
                white: '#ffffff',
            },
            fontFamily: '"Fira Code", monospace',
            fontSize: 14,
            lineHeight: 1.2,
        })

        const fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        term.loadAddon(new WebLinksAddon())

        term.open(terminalRef.current)
        fitAddon.fit()

        xtermRef.current = term
        fitAddonRef.current = fitAddon

        term.writeln(initialMessage)
        term.write(prompt)

        let currentInput = ''

        term.onKey(({ key, domEvent }) => {
            const printable = !domEvent.altKey && !domEvent.ctrlKey && !domEvent.metaKey &&
                domEvent.keyCode !== 8 && // Backspace
                domEvent.keyCode !== 13 && // Enter
                domEvent.keyCode !== 37 && // Left
                domEvent.keyCode !== 38 && // Up
                domEvent.keyCode !== 39 && // Right
                domEvent.keyCode !== 40; // Down

            if (domEvent.keyCode === 13) { // Enter
                term.write('\r\n')
                if (currentInput.trim()) {
                    const result = onCommand ? onCommand(currentInput) : null
                    if (result) {
                        term.writeln(result)
                    }
                }
                currentInput = ''
                term.write(prompt)
            } else if (domEvent.keyCode === 8) { // Backspace
                if (currentInput.length > 0) {
                    currentInput = currentInput.slice(0, -1)
                    term.write('\b \b')
                }
            } else if (printable) {
                currentInput += key
                term.write(key)
            }
        })

        const handleResize = () => {
            fitAddon.fit()
        }
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
            term.dispose()
        }
    }, [])

    return (
        <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-neon-green/20 relative">
            {/* HUD Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(transparent_0%,rgba(0,255,65,0.02)_50%,transparent_100%)] bg-[length:100%_4px] animate-scan z-10" style={{ animation: 'scan 4s linear infinite' }} />

            <div ref={terminalRef} className="w-full h-full" />

            <style jsx global>{`
                .xterm-viewport {
                    background-color: transparent !important;
                }
                .xterm-screen {
                    padding: 10px;
                }
                @keyframes scan {
                    from { background-position: 0 0; }
                    to { background-position: 0 100%; }
                }
            `}</style>
        </div>
    )
}
