'use client'

interface XPBarProps {
    xp: number
    level: number
    size?: number
}

const XP_PER_LEVEL = 500

export default function XPBar({ xp, level, size = 140 }: XPBarProps) {
    const levelXp = xp % XP_PER_LEVEL
    const pct = Math.min(levelXp / XP_PER_LEVEL, 1)
    const r = (size / 2) - 14
    const circ = 2 * Math.PI * r
    const dash = pct * circ

    return (
        <div className="flex flex-col items-center gap-2">
            <div className="relative" style={{ width: size, height: size }}>
                <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
                    {/* Track */}
                    <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1a3a1a" strokeWidth="8" />
                    {/* Progress */}
                    <circle
                        cx={size / 2} cy={size / 2} r={r}
                        fill="none"
                        stroke="#00ff41"
                        strokeWidth="8"
                        strokeLinecap="round"
                        strokeDasharray={circ}
                        strokeDashoffset={circ - dash}
                        style={{ filter: 'drop-shadow(0 0 6px #00ff41)', transition: 'stroke-dashoffset 0.8s ease' }}
                    />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-neon-dim text-xs tracking-widest">LVL</span>
                    <span className="text-neon-green font-bold text-3xl text-glow" style={{ lineHeight: 1 }}>{level}</span>
                    <span className="text-neon-dim text-xs mt-0.5">{levelXp}/{XP_PER_LEVEL}</span>
                </div>
            </div>
            <span className="text-neon-dim text-xs tracking-widest uppercase">{xp} XP Total</span>
        </div>
    )
}
