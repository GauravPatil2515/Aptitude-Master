/**
 * data/core-cs/networks.js — Computer Networks Chapter
 */
export default {
  id: 'core-cs-networks',
  subject: 'core-cs',
  title: 'Computer Networks',
  
  difficulty: 'medium',
  estimatedTime: 75,
  prerequisites: [],

  notes: `
## OSI Model (7 Layers)

| Layer | Name | Function | Protocol/Device |
|-------|------|----------|-----------------|
| 7 | Application | User interface | HTTP, FTP, SMTP, DNS |
| 6 | Presentation | Data formatting, encryption | SSL/TLS, JPEG |
| 5 | Session | Session management | NetBIOS, RPC |
| 4 | Transport | End-to-end delivery | TCP, UDP |
| 3 | Network | Routing, IP addressing | IP, ICMP, ARP, Router |
| 2 | Data Link | Frame delivery, MAC | Ethernet, Switch, Bridge |
| 1 | Physical | Bit transmission | Cables, Hub, Repeater |

> **Mnemonic:** "All People Seem To Need Data Processing" (top to bottom)

---

## TCP vs UDP

| Feature | TCP | UDP |
|---------|-----|-----|
| Connection | Connection-oriented | Connectionless |
| Reliability | Reliable (ACK) | Unreliable |
| Ordering | Guaranteed | No guarantee |
| Speed | Slower | Faster |
| Header | 20 bytes | 8 bytes |
| Use case | Web, email, file transfer | Streaming, gaming, DNS |

---

## IP Addressing (IPv4)

**32-bit address:** Written as 4 octets (e.g., 192.168.1.1)

| Class | Range | Default Subnet | Use |
|-------|-------|----------------|-----|
| A | 1-126 | 255.0.0.0 | Large networks |
| B | 128-191 | 255.255.0.0 | Medium networks |
| C | 192-223 | 255.255.255.0 | Small networks |
| D | 224-239 | — | Multicast |
| E | 240-255 | — | Experimental |

> Class A: 1.x.x.x to 126.x.x.x (network = first octet)

---

## Subnetting

**Subnet Mask:** Divides IP into network and host portions.

**CIDR Notation:** 192.168.1.0/24 means 24 bits for network, 8 for hosts.

**Number of hosts = 2^(32−CIDR) − 2** (subtract 2 for network and broadcast)

> /24 → 2^8 − 2 = **254 usable hosts**

---

## Key Protocols

| Protocol | Port | Purpose |
|----------|------|---------|
| HTTP | 80 | Web browsing |
| HTTPS | 443 | Secure web |
| FTP | 21 | File transfer |
| SSH | 22 | Secure remote login |
| Telnet | 23 | Remote login (insecure) |
| SMTP | 25 | Send email |
| DNS | 53 | Domain resolution |
| DHCP | 67/68 | Dynamic IP allocation |
| POP3 | 110 | Receive email |
| IMAP | 143 | Email (server sync) |

---

## TCP 3-Way Handshake

1. **SYN:** Client → Server (I want to connect)
2. **SYN-ACK:** Server → Client (I acknowledge, let's connect)
3. **ACK:** Client → Server (Acknowledged, connection established)

---

## DNS Resolution

1. Browser cache → OS cache → Router cache → ISP DNS → Root DNS → TLD DNS → Authoritative DNS
2. Returns IP address for the domain name

---

## Network Devices

| Device | Layer | Function |
|--------|-------|----------|
| Hub | 1 | Broadcasts to all ports |
| Switch | 2 | Forwards by MAC address |
| Router | 3 | Routes between networks |
| Bridge | 2 | Connects two LAN segments |
| Gateway | All | Protocol translation |

> Switch > Hub (switch sends only to intended recipient, hub broadcasts to all)
  `,

  formulas: [
    { name: 'Hosts per subnet',   formula: '2^(32−CIDR) − 2',                   example: '/24 → 2^8−2 = 254' },
    { name: 'Subnets',            formula: '2^(borrowed bits)',                  example: '/26 → 2^2 = 4 subnets' },
    { name: 'TCP throughput',     formula: 'Window Size / RTT',                  example: '64KB / 100ms = 640KB/s' },
    { name: 'Bandwidth delay',    formula: 'Bandwidth × RTT',                    example: '1Mbps × 100ms = 100Kb' },
    { name: 'Transmission time',  formula: 'Packet Size / Bandwidth',            example: '1KB / 1Mbps = 8ms' },
  ],

  shortcuts: [
    'OSI mnemonic: "All People Seem To Need Data Processing"',
    'TCP: reliable, connection-oriented. UDP: fast, connectionless',
    'Class A: 1-126, Class B: 128-191, Class C: 192-223',
    'Hosts = 2^(host bits) − 2. /24 = 254 hosts.',
    'HTTPS = HTTP + SSL/TLS (port 443)',
    'Switch (Layer 2) > Hub (Layer 1) — smarter forwarding',
    'TCP handshake: SYN → SYN-ACK → ACK',
  ],

  questions: [
    {
      id: 'cn-q1',
      text: 'Which layer of the OSI model handles routing?',
      options: ['Data Link', 'Network', 'Transport', 'Application'],
      answer: 1,
      explanation: 'The Network layer (Layer 3) handles routing and IP addressing.',
      hint: 'Which layer deals with IP addresses?',
      difficulty: 'easy',
      tags: ['osi'],
      timeLimit: 30,
    },
    {
      id: 'cn-q2',
      text: 'How many usable hosts are there in a /26 subnet?',
      options: ['64', '62', '32', '30'],
      answer: 1,
      explanation: 'Host bits = 32−26 = 6. Usable hosts = 2^6 − 2 = 64 − 2 = 62',
      hint: 'Hosts = 2^(host bits) − 2',
      difficulty: 'easy',
      tags: ['subnetting'],
      timeLimit: 45,
    },
    {
      id: 'cn-q3',
      text: 'Which protocol is connectionless?',
      options: ['TCP', 'HTTP', 'UDP', 'FTP'],
      answer: 2,
      explanation: 'UDP is connectionless. TCP, HTTP, and FTP use TCP which is connection-oriented.',
      hint: 'Which protocol doesn\'t establish a connection first?',
      difficulty: 'easy',
      tags: ['tcp-udp'],
      timeLimit: 30,
    },
    {
      id: 'cn-q4',
      text: 'What is the default port for HTTPS?',
      options: ['80', '8080', '443', '22'],
      answer: 2,
      explanation: 'HTTPS uses port 443. HTTP uses port 80, SSH uses 22.',
      hint: 'Which port is standard for secure web traffic?',
      difficulty: 'easy',
      tags: ['ports'],
      timeLimit: 30,
    },
    {
      id: 'cn-q5',
      text: 'Which device operates at the Data Link layer?',
      options: ['Router', 'Hub', 'Switch', 'Gateway'],
      answer: 2,
      explanation: 'Switches operate at Layer 2 (Data Link) and forward frames based on MAC addresses.',
      hint: 'Which device uses MAC addresses to forward data?',
      difficulty: 'easy',
      tags: ['devices'],
      timeLimit: 30,
    },
    {
      id: 'cn-q6',
      text: 'In TCP 3-way handshake, what is the second message?',
      options: ['SYN', 'SYN-ACK', 'ACK', 'FIN'],
      answer: 1,
      explanation: 'The sequence is: SYN (client) → SYN-ACK (server) → ACK (client).',
      hint: 'What does the server send in response to SYN?',
      difficulty: 'easy',
      tags: ['tcp'],
      timeLimit: 30,
    },
    {
      id: 'cn-q7',
      text: 'Which protocol translates domain names to IP addresses?',
      options: ['DHCP', 'DNS', 'FTP', 'SMTP'],
      answer: 1,
      explanation: 'DNS (Domain Name System) resolves domain names to IP addresses.',
      hint: 'What does www.google.com get converted to?',
      difficulty: 'easy',
      tags: ['dns'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Computer Networks for placement exams. Focus on OSI model layers, TCP vs UDP, IP addressing and subnetting, common ports, and network devices. Keep answers concise with comparisons and mnemonics.',
};
