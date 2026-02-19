'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Terminal, Shield, Target, Zap, ChevronRight, Lock, Globe, Cpu } from 'lucide-react'
import BackgroundEffects from '@/components/BackgroundEffects'

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-cyber-black overflow-hidden selection:bg-neon-green selection:text-black">
      <BackgroundEffects />

      {/* HUD Scanline Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />

      {/* Hero Section */}
      <main className="relative z-10 pt-20 pb-32 px-6">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 p-3 rounded-2xl bg-neon-green/10 border border-neon-green/40 shadow-[0_0_20px_rgba(0,255,65,0.2)]"
          >
            <Terminal className="w-10 h-10 text-neon-green animate-flicker" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black mb-6 tracking-tighter"
          >
            <span className="text-white">CYBER</span>
            <span className="text-neon-green text-glow italic">PATH</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-neon-green/60 text-lg md:text-xl font-mono uppercase tracking-[0.3em] mb-12 max-w-2xl"
          >
            Domine a Arte da Guerra Digital em um Ecossistema de Elite Kali-Inspired.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 mb-24"
          >
            <Link href="/auth/register" className="btn-cyber text-lg px-12 py-4 group">
              <span className="flex items-center gap-3">
                [ INITIALIZE_TRAINING ]
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link href="/auth/login" className="px-12 py-4 rounded-xl border border-white/10 hover:bg-white/5 transition-all text-white/60 font-bold uppercase tracking-widest text-sm flex items-center justify-center">
              ACCESS_GATEWAY
            </Link>
          </motion.div>

          {/* Feature Grid */}
          <div className="grid md:grid-cols-3 gap-8 w-full">
            <FeatureCard
              icon={<Shield className="w-8 h-8" />}
              title="BLUE TEAM AREA"
              desc="Defesa profunda, análise de logs e resposta a incidentes em tempo real."
              color="blue"
            />
            <FeatureCard
              icon={<SkullIcon className="w-8 h-8" />}
              title="RED TEAM AREA"
              desc="Exploração ativa, pentest avançado e desenvolvimento de exploits."
              color="red"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="XP & RANKING"
              desc="Gamificação hardcore. Suba no ranking global e conquiste certificações."
              color="green"
            />
          </div>
        </div>
      </main>

      {/* Floating HUD Elements */}
      <div className="hidden lg:block">
        <div className="fixed top-1/2 left-10 -translate-y-1/2 flex flex-col gap-10 opacity-20">
          <div className="w-px h-20 bg-neon-green mx-auto" />
          <span className="[writing-mode:vertical-lr] text-[8px] font-black uppercase tracking-[0.5em] text-neon-green">SYSTEM_MODE_ACTIVE</span>
          <div className="w-px h-20 bg-neon-green mx-auto" />
        </div>
        <div className="fixed bottom-10 right-10 flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity">
          <div className="text-right">
            <p className="text-[10px] font-black uppercase text-neon-green">Kernel_Status</p>
            <p className="text-[10px] font-bold text-neon-blue">ENCRYPTED_SSL_ENABLED</p>
          </div>
          <div className="w-12 h-12 rounded-xl border border-neon-blue/40 flex items-center justify-center">
            <Lock className="w-5 h-5 text-neon-blue" />
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, desc, color }: { icon: any, title: string, desc: string, color: 'red' | 'blue' | 'green' }) {
  const borderColors = {
    red: 'hover:border-neon-red/50 shadow-neon-red/10',
    blue: 'hover:border-neon-blue/50 shadow-neon-blue/10',
    green: 'hover:border-neon-green/50 shadow-neon-green/10'
  }
  const textColors = {
    red: 'text-neon-red',
    blue: 'text-neon-blue',
    green: 'text-neon-green'
  }

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      className={`glass-card p-10 text-center flex flex-col items-center border-white/5 transition-all duration-500 group ${borderColors[color]}`}
    >
      <div className={`mb-6 p-4 rounded-2xl bg-white/5 border border-white/10 group-hover:bg-white/10 transition-all ${textColors[color]}`}>
        {icon}
      </div>
      <h3 className={`text-xl font-black mb-4 tracking-tighter ${textColors[color]}`}>{title}</h3>
      <p className="text-white/40 text-sm leading-relaxed">{desc}</p>
    </motion.div>
  )
}

function SkullIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
    </svg>
  )
}
