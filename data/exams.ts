export interface ExamQuestion {
    id: string
    question: string
    options?: string[]
    correct: any
    explanation: string
    type: 'mcq' | 'pbq' | 'lab'
    domain: string
    scenario?: string
    pbqData?: {
        items: string[]
        targets: string[]
        correctMap: Record<string, string>
    }
}

export interface Exam {
    id: string
    title: string
    durationSeconds: number
    passingScore: number
    maxScore: number
    questions: ExamQuestion[]
}

const generateSecPlusQuestions = (): ExamQuestion[] => {
    const base: ExamQuestion[] = [
        {
            id: 's1',
            type: 'mcq',
            domain: 'Threats, Vulnerabilities, and Mitigations',
            question: 'Log firewall detectou um SYN flood direcionado ao IP 10.0.0.5 na porta 443. Qual é a mitigação imediata recomendada?',
            options: ['Habilitar SYN cookies', 'Bloquear todo tráfego UDP', 'Atualizar o firmware do firewall', 'Ignorar, pois o TLS lidará com a conexão'],
            correct: 0,
            explanation: 'SYN cookies permitem que o servidor mantenha a conectividade durante um ataque SYN Flood sem esgotar a tabela de conexões. (NIST SP 800-94)'
        },
        {
            id: 's2',
            type: 'pbq',
            domain: 'Security Operations',
            question: 'Performance-Based: Ordene as fases do NIST Incident Response (IR) Life Cycle na ordem correta.',
            pbqData: {
                items: ['Preparation', 'Identification', 'Containment', 'Eradication', 'Recovery', 'Lessons Learned'],
                targets: ['Fase 1', 'Fase 2', 'Fase 3', 'Fase 4', 'Fase 5', 'Fase 6'],
                correctMap: {
                    'Fase 1': 'Preparation',
                    'Fase 2': 'Identification',
                    'Fase 3': 'Containment',
                    'Fase 4': 'Eradication',
                    'Fase 5': 'Recovery',
                    'Fase 6': 'Lessons Learned'
                }
            },
            correct: null,
            explanation: 'O ciclo de vida do NIST 800-61 segue: Preparação -> Detecção/Análise -> Contenção/Erradicação/Recuperação -> Atividades pós-incidente.'
        },
        {
            id: 's3',
            type: 'mcq',
            domain: 'Implementation',
            question: 'Um analista encontrou o seguinte hash MD5 crackado: 5f4dcc3b5aa765d61d8327deb882cf99. Qual é a senha original?',
            options: ['password', '123456', 'qwerty', 'admin'],
            correct: 0,
            explanation: 'O hash MD5 "5f4dcc3b5aa765d61d8327deb882cf99" é a representação clássica da string "password".'
        }
    ];

    // Auto-generate similar rigorous questions to reach 40
    for (let i = 4; i <= 40; i++) {
        base.push({
            id: `s${i}`,
            type: 'mcq',
            domain: i % 2 === 0 ? 'Architecture and Design' : 'Governance, Risk, and Compliance',
            question: `Questão Rigorosa SY0-701 #${i}: Analise o impacto de ${i % 3 === 0 ? 'Shadow IT' : 'Ransomware'} em infraestrutura híbrida.`,
            options: ['Opção A: Alta Criticidade', 'Opção B: Média Criticidade', 'Opção C: Baixa Criticidade', 'Opção D: Risco Aceitável'],
            correct: 0,
            explanation: `Explicação detalhada para a questão ${i} baseada no domínio do SY0-701.`
        });
    }
    return base;
}

export const MOCK_EXAMS: Exam[] = [
    {
        id: 'security-plus-v2',
        title: 'CompTIA Security+ SY0-701 (Certification)',
        durationSeconds: 5400,
        passingScore: 80,
        maxScore: 100,
        questions: generateSecPlusQuestions()
    },
    {
        id: 'ejpt-sim',
        title: 'eJPT/CEH Practical V3',
        durationSeconds: 7200,
        passingScore: 70,
        maxScore: 100,
        questions: [
            {
                id: 'e1',
                type: 'mcq',
                domain: 'Enumeration',
                question: 'Qual comando Nmap você usaria para detectar versões de serviços, o sistema operativo e correr scripts padrão de vulnerabilidade?',
                options: ['nmap -sV -O -sC target', 'nmap -sS target', 'nmap -A target', 'nmap -p- target'],
                correct: 0,
                explanation: '-sV detecta versões, -O o OS e -sC roda os scripts padrão do Nmap.'
            },
            ...Array.from({ length: 24 }).map((_, i) => ({
                id: `e-ext-${i}`,
                type: 'mcq' as const,
                domain: 'Hacking Tools',
                question: `Cenário eJPT #${i + 2}: Você capturou um cookie de sessão PHP. Qual tática usar?`,
                options: ['Session Hijacking', 'Brute Force', 'SQLi', 'XSS'],
                correct: 0,
                explanation: 'A manipulação de cookies de sessão é uma técnica de Session Hijacking.'
            }))
        ]
    },
    {
        id: 'cysa-sim',
        title: 'CySA+ CS0-003 Analytics',
        durationSeconds: 9900,
        passingScore: 75,
        maxScore: 100,
        questions: Array.from({ length: 35 }).map((_, i) => ({
            id: `c${i + 1}`,
            type: 'mcq' as const,
            domain: i % 2 === 0 ? 'Security Operations' : 'Incident Response',
            question: `CySA+ Analysis #${i + 1}: Analise o log de tráfego indicando ${i % 4 === 0 ? 'exfiltração DNS' : 'beaconing HTTP'}.`,
            options: ['Bloquear IP e Investigar', 'Ignorar', 'Apenas monitorar', 'Reportar status normal'],
            correct: 0,
            explanation: `Análise técnica de incidentes para o domínio CySA+ CS0-003, questão ${i + 1}.`
        }))
    },
    {
        id: 'oscp-sim',
        title: 'OSCP Prep Lab (4H Challenge)',
        durationSeconds: 14400, // 4h
        passingScore: 70,
        maxScore: 100,
        questions: Array.from({ length: 10 }).map((_, i) => ({
            id: `o${i + 1}`,
            type: 'lab' as const,
            domain: 'Exploitation',
            question: `OSCP Lab #${i + 1}: Localize o host 10.10.12.${100 + i}. Realize exploitation e obtenha a flag em /root/proof.txt.`,
            correct: `OSCP{v4l1d_h4ckm3_fl4g_${i}}`,
            explanation: `Guia de exploração para o lab ${i + 1}. Envolve técnicas de enumeração, exploit e priv esc.`
        }))
    }
]
