'use client'
import { useEffect, useRef } from 'react'

interface TypingEffectProps {
    strings: string[]
    className?: string
    showPrompt?: boolean
    typeSpeed?: number
    backSpeed?: number
    loop?: boolean
}

export default function TypingEffect({
    strings,
    className = '',
    showPrompt = true,
    typeSpeed = 45,
    backSpeed = 20,
    loop = true
}: TypingEffectProps) {
    const el = useRef<HTMLSpanElement>(null)
    const typedRef = useRef<unknown>(null)

    useEffect(() => {
        let isMounted = true
        import('typed.js').then((TypedModule) => {
            if (!isMounted || !el.current) return
            const Typed = TypedModule.default
            typedRef.current = new Typed(el.current, {
                strings,
                typeSpeed,
                backSpeed,
                loop,
                backDelay: 1800,
                startDelay: 400,
                showCursor: true,
                cursorChar: '█',
            })
        })
        return () => {
            isMounted = false
            if (typedRef.current) {
                (typedRef.current as { destroy(): void }).destroy()
            }
        }
    }, [strings, typeSpeed, backSpeed, loop])

    return (
        <span className={`font-mono ${className}`}>
            {showPrompt && (
                <span className="text-neon-dim" style={{ textShadow: '0 0 5px #00aa2a' }}>
                    root@cyberpath:~#{' '}
                </span>
            )}
            <span ref={el} />
        </span>
    )
}
