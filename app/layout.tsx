import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'CyberPath Hacker Academy — Curso de Cybersegurança Iniciante Brasil',
  description: 'Aprenda cybersegurança do zero com a plataforma gamificada CyberPath. Trilhas Red Team e Blue Team, labs práticos de hacking ético e certificações.',
  keywords: ['cybersegurança iniciante brasil', 'curso de hacker', 'red team brasil', 'blue team brasil', 'hacker academy', 'pentest do zero', 'defesa cibernética'],
  openGraph: {
    title: 'CyberPath Hacker Academy — Do Zero ao Profissional',
    description: 'Domine hacking ético e defesa cibernética em uma plataforma gamificada com estilo Kali Linux.',
    type: 'website',
  },
  manifest: '/manifest.json',
  themeColor: '#00ff41',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
}

import { Fira_Code } from 'next/font/google'

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

import LayoutWrapper from '@/components/LayoutWrapper'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={firaCode.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.getRegistrations().then(function(registrations) {
                    for(let registration of registrations) {
                      registration.unregister();
                    }
                  });
                });
              }
            `
          }}
        />
      </head>
      <body className="font-mono bg-cyber-black text-neon-green min-h-screen selection:bg-neon-green/30 selection:text-neon-green">
        <div className="scanlines" />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  )
}
