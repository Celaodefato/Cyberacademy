'use client'
import { useState, useEffect } from 'react'

export interface UserProgress {
    completedLessons: string[] // IDs of lessons
    completedLabs: string[] // IDs of labs
    lastActive: string
}

const INITIAL_PROGRESS: UserProgress = {
    completedLessons: [],
    completedLabs: [],
    lastActive: new Date().toISOString()
}

export function useProgress() {
    const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS)

    useEffect(() => {
        const saved = localStorage.getItem('cyberpath_progress')
        if (saved) {
            try {
                setProgress(JSON.parse(saved))
            } catch (e) {
                console.error('Failed to parse progress', e)
            }
        }
    }, [])

    const saveProgress = (updated: UserProgress) => {
        setProgress(updated)
        localStorage.setItem('cyberpath_progress', JSON.stringify(updated))
    }

    const completeLesson = (lessonId: string) => {
        if (!progress.completedLessons.includes(lessonId)) {
            const updated = {
                ...progress,
                completedLessons: [...progress.completedLessons, lessonId],
                lastActive: new Date().toISOString()
            }
            saveProgress(updated)
        }
    }

    const completeLab = (labId: string) => {
        if (!progress.completedLabs.includes(labId)) {
            const updated = {
                ...progress,
                completedLabs: [...progress.completedLabs, labId],
                lastActive: new Date().toISOString()
            }
            saveProgress(updated)
        }
    }

    const isLessonCompleted = (lessonId: string) => progress.completedLessons.includes(lessonId)
    const isLabCompleted = (labId: string) => progress.completedLabs.includes(labId)

    return {
        ...progress,
        progress,
        completeLesson,
        completeLab,
        isLessonCompleted,
        isLabCompleted
    }
}
