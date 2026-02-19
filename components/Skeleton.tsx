'use client'
import { motion } from 'framer-motion'

export function Skeleton({ className }: { className?: string }) {
    return (
        <div className={`relative overflow-hidden bg-white/5 rounded-lg ${className}`}>
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                animate={{
                    x: ['-100%', '100%'],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'linear',
                }}
            />
        </div>
    )
}

export function DashboardSkeleton() {
    return (
        <div className="p-4 lg:p-10 space-y-10 animate-fade-in">
            <section className="grid md:grid-cols-3 gap-6">
                <Skeleton className="md:col-span-2 h-40" />
                <div className="grid grid-cols-2 gap-4">
                    <Skeleton className="h-20" />
                    <Skeleton className="h-20" />
                    <Skeleton className="col-span-2 h-16" />
                </div>
            </section>

            <section className="space-y-4">
                <Skeleton className="h-4 w-48" />
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-6">
                    {[...Array(6)].map((_, i) => (
                        <Skeleton key={i} className="aspect-square" />
                    ))}
                </div>
            </section>

            <section className="space-y-6">
                <Skeleton className="h-8 w-64" />
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, i) => (
                        <Skeleton key={i} className="h-60" />
                    ))}
                </div>
            </section>
        </div>
    )
}
