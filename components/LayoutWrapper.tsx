'use client'
import { usePathname } from 'next/navigation'
import Sidebar from '@/components/Sidebar'
import Header from '@/components/Header'
import BackgroundEffects from '@/components/BackgroundEffects'
import GlobalTerminalOverlay from '@/components/GlobalTerminalOverlay'
import { motion, AnimatePresence } from 'framer-motion'

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    // Public pages without Side/Header
    const isPublic = pathname === '/' || pathname.startsWith('/auth')

    if (isPublic) {
        return (
            <div className="relative min-h-screen">
                <BackgroundEffects />
                {children}
            </div>
        )
    }

    return (
        <div className="relative min-h-screen">
            <BackgroundEffects />
            <Header />
            <Sidebar />

            {/* Content wrapper with Sidebar + Header offsets */}
            <motion.main
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="pt-14 lg:pl-20 min-h-screen relative z-10"
            >
                <div className="max-w-[1600px] mx-auto">
                    {children}
                </div>
            </motion.main>

            {/* Grid Scanline Overlay (Visual Polish) */}
            <div className="fixed inset-0 pointer-events-none z-[100] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

            <GlobalTerminalOverlay />
        </div>
    )
}
