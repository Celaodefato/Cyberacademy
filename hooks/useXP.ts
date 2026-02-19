'use client'
import { useState, useEffect } from 'react'

export interface UserStats {
    xp: number
    level: number
    rank: string
    path: 'red' | 'blue' | 'purple' | 'none'
    glowIntensity: number
    username: string
    email: string
}

const INITIAL_STATS: UserStats = {
    xp: 200,
    level: 1,
    rank: '#1337',
    path: 'red',
    glowIntensity: 50,
    username: 'jetski_tester',
    email: 'jetski@cyberpath.io'
}

export function useXP() {
    const [stats, setStats] = useState<UserStats>(INITIAL_STATS)

    useEffect(() => {
        const saved = localStorage.getItem('cyberpath_stats')
        if (saved) {
            try {
                setStats(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse stats', e)
            }
        }
    }, [])

    const updateStats = (newStats: Partial<UserStats>) => {
        const updated = { ...stats, ...newStats }

        // Level up logic (Example: 1000 XP per level)
        if (updated.xp >= updated.level * 1000) {
            updated.level += 1
        }

        setStats(updated)
        localStorage.setItem('cyberpath_stats', JSON.stringify(updated))
    }

    const addXP = (amount: number) => {
        updateStats({ xp: stats.xp + amount })
    }

    const setGlow = (intensity: number) => {
        updateStats({ glowIntensity: intensity })
        document.documentElement.style.setProperty('--glow-opacity', (intensity / 100).toString())
    }

    return {
        ...stats,
        stats,
        addXP,
        updateStats,
        setGlow
    }
}
