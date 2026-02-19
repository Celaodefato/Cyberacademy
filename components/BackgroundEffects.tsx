'use client'
import { useEffect, useRef } from 'react'

export default function BackgroundEffects() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext('2d')
        if (!ctx) return

        let animationFrameId: number

        const resize = () => {
            canvas.width = window.innerWidth
            canvas.height = window.innerHeight
        }

        resize()
        window.addEventListener('resize', resize)

        // Matrix Rain Setup
        const fontSize = 14
        const columns = Math.floor(canvas.width / fontSize)
        const drops = new Array(columns).fill(1)
        const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ'

        const particles: { x: number; y: number; speed: number; size: number; opacity: number }[] = []
        const particleCount = 15 // Optimized for performace
        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: 0.2 + Math.random() * 0.5,
                size: Math.random() * 2,
                opacity: 0.1 + Math.random() * 0.3
            })
        }

        const draw = () => {
            // Sutil background fade to keep trail effect
            ctx.fillStyle = 'rgba(10, 10, 10, 0.1)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            // Draw Matrix Rain (Very sutil/dim)
            ctx.font = `${fontSize}px monospace`
            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)]

                // Varying green intensities
                ctx.fillStyle = Math.random() > 0.98 ? '#00ff41' : 'rgba(0, 255, 65, 0.05)'

                ctx.fillText(text, i * fontSize, drops[i] * fontSize)

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0
                }
                drops[i]++
            }

            // Draw Floating Particles
            particles.forEach(p => {
                ctx.fillStyle = `rgba(0, 255, 65, ${p.opacity})`
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
                ctx.fill()

                p.y -= p.speed
                if (p.y < -10) {
                    p.y = canvas.height + 10
                    p.x = Math.random() * canvas.width
                }
            })

            animationFrameId = requestAnimationFrame(draw)
        }

        draw()

        return () => {
            window.removeEventListener('resize', resize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 z-[-1] pointer-events-none"
            style={{ opacity: 0.4 }}
        />
    )
}
