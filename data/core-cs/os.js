/**
 * data/core-cs/os.js — Operating Systems Chapter
 */
export default {
  id: 'core-cs-os',
  subject: 'core-cs',
  title: 'Operating Systems',
  icon: '⚙️',
  difficulty: 'medium',
  estimatedTime: 90,
  prerequisites: [],

  notes: `
## What is an Operating System?

An OS is system software that manages hardware resources and provides services for applications. It acts as an intermediary between users and hardware.

**Functions:** Process management, Memory management, File system, I/O, Security

---

## Process vs Thread

| Feature | Process | Thread |
|---------|---------|--------|
| Definition | Program in execution | Lightweight sub-process |
| Memory | Separate address space | Shared within process |
| Overhead | High (context switch) | Low |
| Communication | IPC (pipes, sockets) | Shared memory |
| Crash | Doesn't affect others | Kills entire process |

---

## Process States

**New → Ready → Running → Waiting → Terminated**

- **Ready:** Waiting for CPU
- **Running:** Currently executing
- **Waiting:** Blocked for I/O or event

---

## CPU Scheduling Algorithms

| Algorithm | Description | Avg Wait | Starvation? |
|-----------|-------------|----------|-------------|
| FCFS | First Come First Serve | High | No |
| SJF | Shortest Job First | Low (optimal) | Yes |
| SRTF | Shortest Remaining Time First | Lowest | Yes |
| Round Robin | Time quantum based | Medium | No |
| Priority | Highest priority first | Varies | Yes (low priority) |

> 💡 **SJF** gives minimum average waiting time but causes starvation.
> **Round Robin** is most fair — uses time quantum.

---

## Deadlock

**Four necessary conditions (ALL must hold):**
1. **Mutual Exclusion:** Only one process can use a resource at a time
2. **Hold and Wait:** Process holds resource while waiting for another
3. **No Preemption:** Resource can't be forcibly taken
4. **Circular Wait:** P1 waits for P2, P2 waits for P3, P3 waits for P1

**Deadlock handling:** Prevention, Avoidance (Banker's Algorithm), Detection, Recovery

---

## Memory Management

**Paging:** Physical memory divided into fixed-size frames, logical memory into pages. Page table maps pages to frames.

**Segmentation:** Memory divided by logical segments (code, data, stack). Variable size.

**Virtual Memory:** Allows execution of processes not completely in memory (demand paging).

**Page Replacement:**
- **FIFO:** Replace oldest page (Belady's anomaly possible)
- **LRU:** Replace least recently used (optimal, no Belady's)
- **Optimal:** Replace page not used for longest time (theoretical)

---

## Disk Scheduling

| Algorithm | Description |
|-----------|-------------|
| FCFS | Request order |
| SSTF | Shortest seek time first |
| SCAN | Elevator — moves to end, then reverses |
| C-SCAN | Circular scan — only one direction |
| LOOK | Like SCAN but reverses at last request |

---

## Key Terms

- **Fragmentation:** External (free space scattered) vs Internal (allocated block larger than needed)
- **Thrashing:** Excessive paging — process spends more time paging than executing
- **Semaphore:** Integer variable for process synchronization (wait/signal)
- **Mutex:** Binary semaphore — lock/unlock (only locking thread can unlock)
- **Critical section:** Code accessing shared resources
  `,

  formulas: [
    { name: 'CPU Utilization',    formula: '1 − p^n (n processes, p = I/O wait prob)', example: 'p=0.8, n=4 → 1−0.8⁴ = 59%' },
    { name: 'Response Ratio',     formula: '(Waiting Time + Service Time) / Service Time', example: '(5+3)/3 = 2.67' },
    { name: 'Page Fault Rate',    formula: 'Number of faults / Total references',           example: '5/100 = 5%' },
    { name: 'Effective Access',   formula: '(1−p)×ma + p×page_fault_time',                 example: '0.99×100ns + 0.01×10ms' },
    { name: 'Fragmentation',      formula: 'Total free space − Largest free block',         example: '100KB − 60KB = 40KB' },
  ],

  shortcuts: [
    'Deadlock: ALL 4 conditions must hold — break any one to prevent',
    'SJF = optimal for avg waiting time but causes starvation',
    'LRU has no Belady\'s anomaly; FIFO does',
    'Threads share memory; processes don\'t',
    'Paging has internal fragmentation; segmentation has external',
    'Banker\'s Algorithm = deadlock AVOIDANCE (not prevention)',
  ],

  questions: [
    {
      id: 'os-q1',
      text: 'Which CPU scheduling algorithm can cause starvation?',
      options: ['FCFS', 'Round Robin', 'SJF', 'None of these'],
      answer: 2,
      explanation: 'SJF (Shortest Job First) can cause starvation — long jobs may never get CPU if short jobs keep arriving.',
      hint: 'Which algorithm prioritizes certain jobs indefinitely?',
      difficulty: 'easy',
      tags: ['scheduling', 'starvation'],
      timeLimit: 45,
    },
    {
      id: 'os-q2',
      text: 'How many conditions are necessary for deadlock?',
      options: ['2', '3', '4', '5'],
      answer: 2,
      explanation: 'Four conditions: Mutual Exclusion, Hold and Wait, No Preemption, Circular Wait. All must hold simultaneously.',
      hint: 'Remember: MHNC (Mutual, Hold, No-preemption, Circular)',
      difficulty: 'easy',
      tags: ['deadlock'],
      timeLimit: 30,
    },
    {
      id: 'os-q3',
      text: 'Which page replacement algorithm suffers from Belady\'s anomaly?',
      options: ['LRU', 'Optimal', 'FIFO', 'LFU'],
      answer: 2,
      explanation: 'FIFO can have more page faults when more frames are allocated (Belady\'s anomaly). LRU and Optimal do not.',
      hint: 'Which algorithm replaces the oldest page regardless of usage?',
      difficulty: 'medium',
      tags: ['paging', 'belady'],
      timeLimit: 60,
    },
    {
      id: 'os-q4',
      text: 'What is the main advantage of threads over processes?',
      options: ['Better security', 'Lower context switching overhead', 'Independent address space', 'No synchronization needed'],
      answer: 1,
      explanation: 'Threads share the same address space and have lower context switching overhead compared to processes.',
      hint: 'Threads share memory — what does that save?',
      difficulty: 'easy',
      tags: ['threads'],
      timeLimit: 45,
    },
    {
      id: 'os-q5',
      text: 'Banker\'s Algorithm is used for:',
      options: ['Deadlock Prevention', 'Deadlock Avoidance', 'Deadlock Detection', 'Deadlock Recovery'],
      answer: 1,
      explanation: 'Banker\'s Algorithm ensures the system never enters an unsafe state — this is deadlock avoidance.',
      hint: 'Does it prevent, avoid, detect, or recover?',
      difficulty: 'easy',
      tags: ['deadlock', 'banker'],
      timeLimit: 45,
    },
    {
      id: 'os-q6',
      text: 'In paging, the page table is stored in:',
      options: ['CPU cache', 'Main memory', 'Hard disk', 'TLB only'],
      answer: 1,
      explanation: 'The page table is stored in main memory. TLB (Translation Lookaside Buffer) caches recent translations for speed.',
      hint: 'Where does the OS keep its mapping tables?',
      difficulty: 'medium',
      tags: ['paging'],
      timeLimit: 45,
    },
    {
      id: 'os-q7',
      text: 'Which disk scheduling algorithm is known as the elevator algorithm?',
      options: ['FCFS', 'SSTF', 'SCAN', 'C-SCAN'],
      answer: 2,
      explanation: 'SCAN moves the disk arm in one direction servicing requests, then reverses — like an elevator going up then down.',
      hint: 'Which algorithm moves to the end and then reverses direction?',
      difficulty: 'easy',
      tags: ['disk-scheduling'],
      timeLimit: 30,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Operating Systems for placement exams. Focus on process management, scheduling algorithms, deadlock conditions, memory management (paging/segmentation), and disk scheduling. Keep answers concise with comparisons and exam-focused explanations.',
};
