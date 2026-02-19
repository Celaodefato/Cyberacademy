export interface InterpreterResult {
    output: string
    isElite?: boolean
    xpAwarded?: number
    clear?: boolean
}

interface UserStats {
    xp: number
    completedLabs: string[]
}

export const terminalInterpreter = (
    cmd: string,
    activeChallenge?: any,
    stats?: UserStats | null
): InterpreterResult => {
    const parts = cmd.trim().split(' ')
    const command = parts[0].toLowerCase()
    const args = parts.slice(1)

    const FAKE_FS: Record<string, string> = {
        'auth.log': `Feb 19 02:31:44 sshd: Failed password for root from 203.0.113.42\nFeb 19 02:33:52 sshd: Accepted password for admin from 192.168.1.101`,
        'welcome.txt': 'CYBERPATH LAB TERMINAL v4.2. [ENCRYPTED_LINK_ACTIVE]',
        'flag.txt': 'Forbidden: Root access required. (Tente usar "sudo")',
        '/var/backups/secret_backup.txt': 'Backup content: flag{hidden_in_the_shadows}',
        'hint.txt': 'Procure por arquivos de backup ocultos.'
    }

    switch (command) {
        case 'help':
            return {
                output: `AVAILABLE SYSTEM COMMANDS:
  ls              - List directory contents
  cat <file>      - Read file contents
  find <pattern>  - Search for files
  clear           - Clear terminal screen
  whoami          - Print current user
  hostname        - Print system hostname

SECURITY TOOLS:
  nmap <target>   - Network exploration and security auditing
  gobuster <url>  - Directory/File, DNS and VHost busting
  msfconsole      - Metasploit Framework Console
  hashcat <hash>  - Advanced Password Recovery
  submit <flag>   - Commit challenge flag`
            }

        case 'clear':
            return { output: '', clear: true }

        case 'whoami':
            return { output: 'root' }

        case 'hostname':
            return { output: 'cyberpath-workstation' }

        case 'ls':
            return { output: 'auth.log  welcome.txt  flag.txt  hint.txt  logs/' }

        case 'cat':
            if (!args[0]) return { output: 'cat: missing file operand' }
            const content = FAKE_FS[args[0]] || FAKE_FS['/' + args[0]]
            return { output: content || `cat: ${args[0]}: No such file or directory` }

        case 'find':
            if (!args[0]) return { output: 'find: missing pattern' }
            if (args[0].includes('secret')) return { output: '/var/backups/secret_backup.txt' }
            return { output: '' }

        case 'nmap':
            if (!args[0]) return { output: 'Usage: nmap <target_ip>' }
            return {
                output: `Starting Nmap 7.92 ( https://nmap.org )
Nmap scan report for ${args[0]}
Host is up (0.0021s latency).
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https
3306/tcp open  mysql

Nmap done: 1 IP address (1 host up) scanned in 1.45 seconds`
            }

        case 'gobuster':
            if (!args[0]) return { output: 'Usage: gobuster dir -u <url> -w <wordlist>' }
            return {
                output: `===============================================================
Gobuster v3.1.0
===============================================================
[+] Url:                     ${args[1] || 'http://target.local'}
[+] Method:                  GET
[+] Wordlist:                common.txt
===============================================================
/index.html           (Status: 200)
/admin                (Status: 301) --> /admin/
/login.php            (Status: 200)
/robots.txt           (Status: 200)
===============================================================`
            }

        case 'msfconsole':
            return {
                output: `
      .                                           .
    .o88b  db d8b   .d8888b.  .d8888b. d888b.  .d8888b. .d8888b.
   d8'  '  88 888b d88'  '88 d88'  '88 88  '8b d88'  '88 d88'  '88
   88      88 88'8b888    88 888    88 88   88 888    88 888    88
   88      88 88  8888    88 888    88 88   88 888    88 888    88
   Y8.  .  88 88  88Y88.  .88 Y88.  .88 88  .8P Y88.  .88 Y88.  .88
    'Y88P' VP VP  VP 'Y8888P'  'Y8888P' d888P'   'Y8888P'  'Y8888P'

       =[ metasploit v6.1.35-dev                          ]
+ -- --=[ 2215 exploits - 1171 auxiliary - 396 post       ]
+ -- --=[ 613 payloads - 45 encoders - 11 nops            ]

msf6 > `
            }

        case 'submit':
            const flag = args.join(' ')
            if (!activeChallenge) return { output: 'Error: No active mission context.' }
            if (flag === activeChallenge.answer) {
                return {
                    output: `[+] ACCESS_GRANTED\n[+] MISSION_COMPLETE: ${activeChallenge.title}\n[+] REWARD: +${activeChallenge.xp} XP\n\n${activeChallenge.solution}`,
                    xpAwarded: activeChallenge.xp,
                    isElite: true
                }
            }
            return { output: '[-] ACCESS_DENIED: INVALID_FLAG' }

        default:
            return { output: `bash: ${command}: command not found` }
    }
}
