export interface Challenge {
    id: string
    title: string
    difficulty: 'Fácil' | 'Médio' | 'Difícil' | 'Elite'
    xp: number
    tags: string[]
    desc: string
    hint: string
    answer: string
    task: string
    solution: string
}

export const CHALLENGES: Challenge[] = [
    {
        id: 'hash-crack', title: 'Hash Cracker', difficulty: 'Fácil', xp: 100, tags: ['crypto', 'hash'],
        desc: 'Um arquivo de texto foi protegido com MD5. Encontre a senha original.',
        hint: 'A senha é uma palavra comum em inglês com 4 letras.',
        answer: 'flag{md5_r0cky0u_wins}',
        task: 'O hash MD5 abaixo esconde uma senha. Hash: 5f4dcc3b5aa765d61d8327deb882cf99',
        solution: 'A senha é "password". Flag: flag{md5_r0cky0u_wins}'
    },
    {
        id: 'port-scan', title: 'Network Discovery', difficulty: 'Fácil', xp: 150, tags: ['recon', 'nmap'],
        desc: 'Identifique os serviços rodando em portas escondidas.',
        hint: 'Use o comando nmap no alvo 10.10.10.5.',
        answer: 'flag{open_ports_22_80_443_3306}',
        task: 'Execute "nmap 10.10.10.5" e submeta os serviços abertos.',
        solution: 'Portas: 22, 80, 443, 3306. Flag: flag{open_ports_22_80_443_3306}'
    },
    {
        id: 'log-analysis', title: 'Log Investigator', difficulty: 'Médio', xp: 200, tags: ['blue', 'dfir'],
        desc: 'Analise os logs e encontre o IP do atacante bruteforcing.',
        hint: 'Procure por múltiplas tentativas de login falhas no auth.log.',
        answer: 'flag{attacker_203.0.113.42}',
        task: 'Digite "cat auth.log" para investigar o tráfego.',
        solution: 'IP: 203.0.113.42. Flag: flag{attacker_203.0.113.42}'
    },
    {
        id: 'hidden-backup', title: 'Deep Search', difficulty: 'Médio', xp: 250, tags: ['linux', 'recon'],
        desc: 'Um sysadmin descuidado deixou um backup em algum lugar.',
        hint: 'Use "find" com o termo "secret".',
        answer: 'flag{hidden_in_the_shadows}',
        task: 'Encontre a localização do backup secreto no sistema.',
        solution: 'Encontrado em /var/backups/. Flag: flag{hidden_in_the_shadows}'
    },
    {
        id: 'metasploit-basics', title: 'EternalBlue Sim', difficulty: 'Elite', xp: 500, tags: ['red', 'exploit'],
        desc: 'Simule a exploração de uma vulnerabilidade SMB.',
        hint: 'Use o msfconsole para carregar o framework.',
        answer: 'flag{eternal_blue_ms17_010}',
        task: 'Digite "msfconsole" e depois "submit flag{eternal_blue_ms17_010}".',
        solution: 'A vulnerabilidade MS17-010 é a base do exploit EternalBlue. Flag: flag{eternal_blue_ms17_010}'
    },
    {
        id: 'web-fuzzing', title: 'Admin Finder', difficulty: 'Médio', xp: 200, tags: ['web', 'recon'],
        desc: 'Encontre o diretório oculto do administrador.',
        hint: 'Use gobuster no domínio victim.cyber.',
        answer: 'flag{admin_panel_found_301}',
        task: 'Execute "gobuster victim.cyber" para achar o painel.',
        solution: 'Diretório /admin encontrado com status 301. Flag: flag{admin_panel_found_301}'
    },
    {
        id: 'base64-decode', title: 'Encoded Secret', difficulty: 'Fácil', xp: 100, tags: ['crypto', 'encoding'],
        desc: 'A flag foi encoded em Base64 para "segurança".',
        hint: 'Decifre a string: ZmxhZ3tiYXNlNjRfaXNfbm90X2VuY3J5cHRpb259',
        answer: 'flag{base64_is_not_encryption}',
        task: 'Decodifique a string Base64 fornecida.',
        solution: 'Flag: flag{base64_is_not_encryption}'
    },
    {
        id: 'ssh-brute', title: 'SSH Brute Force', difficulty: 'Médio', xp: 300, tags: ['red', 'auth'],
        desc: 'Simule um ataque de força bruta contra o serviço SSH.',
        hint: 'A ferramenta clássica é o Hydra.',
        answer: 'flag{hydra_ssh_brute_success}',
        task: 'Identifique a ferramenta ideal e submeta a flag.',
        solution: 'Hydra é amplamente usado para brute force. Flag: flag{hydra_ssh_brute_success}'
    },
    {
        id: 'reverse-shell', title: 'Payload Crafting', difficulty: 'Médio', xp: 350, tags: ['red', 'reverse-shell'],
        desc: 'Crie um payload para um reverse shell em Python.',
        hint: 'Procure por payloads de it-security no Google/GitHub.',
        answer: 'flag{python_rev_shell_c2}',
        task: 'Submeta a flag para o comando: python -c "import socket,os,pty;..."',
        solution: 'Payloads em uma linha são úteis para exploradores. Flag: flag{python_rev_shell_c2}'
    },
    {
        id: 'wireshark-tcp', title: 'Packet Capture', difficulty: 'Difícil', xp: 400, tags: ['blue', 'wireshark'],
        desc: 'Analise um handshake TCP e encontre o número de sequência.',
        hint: 'O handshake follow: SYN -> SYN/ACK -> ACK.',
        answer: 'flag{tcp_handshake_seq_zero}',
        task: 'Qual o Relative Sequence Number inicial no Wireshark?',
        solution: 'O Wireshark usa zero relativo por padrão. Flag: flag{tcp_handshake_seq_zero}'
    }
]
