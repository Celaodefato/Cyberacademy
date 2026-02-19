'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Shield, Skull, Zap, Eye, EyeOff, Settings, Sliders } from 'lucide-react'
import TerminalWindow from '@/components/TerminalWindow'

import { useXP } from '@/hooks/useXP'

export default function ProfilePage() {
    const user = useXP()
    const [saved, setSaved] = useState(false)

    function handleSave() {
        // Sync logic is now managed by the hook's updateStats call
        // We just show the UI feedback here.
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
    }

    return (
        <div className="p-4 lg:p-10 max-w-4xl mx-auto space-y-8">
            <div className="flex items-center gap-3 mb-6">
                <Settings className="w-6 h-6 text-neon-green" />
                <h1 className="text-2xl font-black uppercase tracking-[0.2em]">Neural_Interface_Settings</h1>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {/* Left: Avatar & Identity */}
                <div className="space-y-6">
                    <TerminalWindow title="identity_card.png" className="text-center py-8">
                        <div className="relative mx-auto w-32 h-32 mb-4 group">
                            <div className="absolute inset-0 rounded-3xl border-2 border-neon-green/40 shadow-[0_0_20px_rgba(0,255,65,0.2)] animate-pulse-neon pointer-events-none" />
                            <div className="w-full h-full rounded-3xl bg-black/40 flex items-center justify-center overflow-hidden">
                                {user.path === 'red' ? <Skull className="w-16 h-16 text-neon-red" /> :
                                    user.path === 'blue' ? <Shield className="w-16 h-16 text-neon-blue" /> :
                                        user.path === 'purple' ? (
                                            <div className="relative">
                                                <Skull className="w-16 h-16 text-neon-purple opacity-40 absolute inset-0" />
                                                <Shield className="w-16 h-16 text-neon-purple" />
                                            </div>
                                        ) :
                                            <Zap className="w-16 h-16 text-neon-green/40" />}
                            </div>
                        </div>
                        <h3 className="text-xl font-bold text-glow mb-1">{user.username}</h3>
                        <p className="text-[10px] text-neon-green/40 uppercase font-black tracking-widest">{user.path ? user.path + ' team operante' : 'trainee'}</p>
                    </TerminalWindow>

                    <div className="glass-card p-4 space-y-4">
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="opacity-40">ACC STATUS</span>
                            <span className="text-neon-green">VERIFIED</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px] font-bold">
                            <span className="opacity-40">EXPERIENCE</span>
                            <span className="text-neon-blue">{user.xp} XP</span>
                        </div>
                    </div>
                </div>

                {/* Right: Settings Form */}
                <div className="md:col-span-2 space-y-6">
                    <TerminalWindow title="user_config.cfg">
                        <div className="space-y-6">
                            {/* Username Input */}
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-neon-green/60 px-1">Codename</label>
                                <input
                                    type="text"
                                    value={user.username}
                                    onChange={e => user.updateStats({ username: e.target.value })}
                                    className="w-full bg-black/40 border border-neon-green/20 rounded-xl px-4 py-3 text-sm text-neon-green outline-none focus:border-neon-green/60 transition-all font-mono"
                                />
                            </div>

                            {/* Email (Readonly) */}
                            <div className="space-y-2 opacity-60">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-neon-green/60 px-1">Comm_Link (Email)</label>
                                <div className="w-full bg-black/20 border border-white/5 rounded-xl px-4 py-3 text-sm font-mono cursor-not-allowed">
                                    {user.email}
                                </div>
                            </div>

                            {/* Visual Calibration (Intensity Slider) */}
                            <div className="pt-6 border-t border-white/5 space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Sliders className="w-4 h-4 text-neon-green" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Glow Intensity Control</span>
                                    </div>
                                    <span className="text-xs font-bold text-neon-green">{user.glowIntensity}%</span>
                                </div>
                                <p className="text-[10px] text-neon-green/40 leading-relaxed italic">
                                    Adjust the neural feedback intensity (glow effects). Low values are recommended for long coding sessions.
                                </p>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={user.glowIntensity}
                                    onChange={e => user.setGlow(parseInt(e.target.value))}
                                    className="w-full h-1.5 bg-black/60 rounded-lg appearance-none cursor-pointer accent-neon-green border border-neon-green/20"
                                />
                                <div className="flex justify-between text-[8px] font-bold uppercase opacity-40">
                                    <span>Minimal (Stealth)</span>
                                    <span>Extreme (Overdose)</span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-end pt-4">
                                <button
                                    onClick={handleSave}
                                    className="btn-cyber flex items-center gap-2 group"
                                >
                                    <Save className={`w-4 h-4 ${saved ? 'animate-bounce' : 'group-hover:animate-pulse'}`} />
                                    {saved ? '[ SYNC_COMPLETE ]' : '[ SYNC_PROFILE ]'}
                                </button>
                            </div>
                        </div>
                    </TerminalWindow>

                    <div className="glass-card p-6 border-neon-red/20 flex items-center justify-between">
                        <div>
                            <h4 className="text-sm font-bold text-neon-red uppercase">Self_Destruct_Protocol</h4>
                            <p className="text-[10px] opacity-40 mt-1">Erase all training data and logs from this device.</p>
                        </div>
                        <button className="px-4 py-1.5 border border-neon-red/40 text-neon-red rounded-lg text-[10px] font-bold hover:bg-neon-red hover:text-black transition-all">
                            TERMINATE_SESSION
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
