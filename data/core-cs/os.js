/**
 * data/core-cs/os.js — Operating Systems Chapter
 */
export default {
  id: 'core-cs-os',
  subject: 'core-cs',
  title: 'Operating Systems',
  
  difficulty: 'medium',
  estimatedTime: 90,
  prerequisites: [],

  notes: `
## What is an Operating System?

An OS is system software that manages hardware resources and provides services for applications. It acts as an intermediary between users and hardware.

**Functions:** Process management, Memory management, File system, I/O, Security, Resource allocation

**Types of OS:**
- **Batch OS:** Jobs grouped in batches (no user interaction during execution)
- **Time-Sharing OS:** Each process gets a time slice (multitasking)
- **Real-Time OS:** Strict deadlines (hard RTOS: missile systems; soft RTOS: streaming)
- **Distributed OS:** Multiple computers appear as one system
- **Network OS:** Servers manage data and resources for clients
- **Mobile OS:** Android, iOS — optimized for touch and battery

> **Kernel** is the core of the OS — it's the first program loaded after bootloader. Types: Monolithic (Linux), Microkernel (Minix), Hybrid (Windows), Exokernel.

---

## Process vs Thread

| Feature | Process | Thread |
|---------|---------|--------|
| Definition | Program in execution | Lightweight sub-process |
| Memory | Separate address space | Shared within process |
| Overhead | High (context switch) | Low |
| Communication | IPC (pipes, sockets) | Shared memory |
| Crash | Doesn't affect others | Kills entire process |
| Creation | Slower (fork) | Faster |
| Example | Chrome browser | Each Chrome tab |

**Process Control Block (PCB):** Contains process ID, state, program counter, registers, memory limits, open files — everything needed to resume a process.

---

## Process States

**New → Ready → Running → Waiting → Terminated**

- **New:** Process is being created
- **Ready:** Waiting for CPU (in ready queue)
- **Running:** Currently executing on CPU
- **Waiting:** Blocked for I/O or event (in wait queue)
- **Terminated:** Process finished execution

**Two additional states (with swapping):**
- **Suspend Ready:** Swapped out of memory, waiting for memory
- **Suspend Blocked:** Swapped out while waiting for I/O

> A process can have only ONE running state at a time on a single CPU core.

---

## CPU Scheduling Algorithms

| Algorithm | Description | Avg Wait | Starvation? | Preemptive? |
|-----------|-------------|----------|-------------|-------------|
| FCFS | First Come First Serve | High | No | No |
| SJF | Shortest Job First | Low (optimal) | Yes | No |
| SRTF | Shortest Remaining Time First | Lowest | Yes | Yes |
| Round Robin | Time quantum based | Medium | No | Yes |
| Priority | Highest priority first | Varies | Yes (low priority) | Both |
| Multilevel Queue | Multiple queues by type | Varies | Yes | Varies |
| Multilevel Feedback | Can move between queues | Varies | Yes | Yes |

**Key Formulas:**
- **Turnaround Time = Completion Time − Arrival Time**
- **Waiting Time = Turnaround Time − Burst Time**
- **Response Time = First CPU − Arrival Time**

> **SJF** gives minimum average waiting time but causes starvation.
> **Round Robin** is most fair — uses time quantum (typically 10-100ms).
> **SRTF** is the preemptive version of SJF.

**Example:** Processes P1(0, 6), P2(2, 8), P3(4, 7), P4(5, 3) — arrival time, burst time
- FCFS avg wait = (0+4+10+15)/4 = 7.25
- SJF avg wait = (0+3+9+16)/4 = 7.0 (non-preemptive)

---

## Process Synchronization

**Critical Section:** Code segment accessing shared resources. Must satisfy:
1. **Mutual Exclusion:** Only one process in critical section
2. **Progress:** If no process is in CS, selection can't be postponed
3. **Bounded Waiting:** Limit on how many times others can enter

**Solutions:**
- **Semaphore:** Integer variable with wait(S) and signal(S) operations
  - **Binary Semaphore:** Values 0 or 1 (like mutex)
  - **Counting Semaphore:** Values 0 to N (resource counting)
- **Mutex:** Binary semaphore — only the locking thread can unlock
- **Monitor:** Higher-level synchronization construct

**Classic Problems:**
- **Producer-Consumer:** Bounded buffer, semaphores for empty/full
- **Readers-Writers:** Multiple readers OR one writer
- **Dining Philosophers:** 5 philosophers, 5 forks — deadlock prevention needed

---

## Deadlock

**Four necessary conditions (ALL must hold):**
1. **Mutual Exclusion:** Only one process can use a resource at a time
2. **Hold and Wait:** Process holds resource while waiting for another
3. **No Preemption:** Resource can't be forcibly taken
4. **Circular Wait:** P1 waits for P2, P2 waits for P3, P3 waits for P1

**Deadlock handling:**
- **Prevention:** Break one of the 4 conditions
- **Avoidance:** Banker's Algorithm — check safe state before allocation
- **Detection:** Resource allocation graph, wait-for graph
- **Recovery:** Kill processes or preempt resources

**Banker's Algorithm:**
- Checks if granting a request leads to a **safe state**
- Safe state = there exists a sequence where all processes can complete
- Uses: Available, Max, Allocation, Need matrices

> **Deadlock Prevention** vs **Avoidance**: Prevention restricts resource requests; Avoidance checks safety before granting.

---

## Memory Management

**Paging:** Physical memory divided into fixed-size frames, logical memory into pages. Page table maps pages to frames.
- **No external fragmentation** (but internal fragmentation possible)
- **Page size** typically 4KB

**Segmentation:** Memory divided by logical segments (code, data, stack). Variable size.
- **External fragmentation** possible
- **No internal fragmentation**

**Virtual Memory:** Allows execution of processes not completely in memory (demand paging).
- **Page Fault:** When a needed page is not in memory
- **Page Fault Service Time:** Includes disk read + restart

**Page Replacement Algorithms:**
- **FIFO:** Replace oldest page (Belady's anomaly possible — more frames can cause MORE faults!)
- **LRU:** Replace least recently used (optimal, no Belady's anomaly, needs hardware support)
- **Optimal:** Replace page not used for longest time (theoretical — needs future knowledge)
- **LFU:** Replace least frequently used
- **Second Chance (Clock):** FIFO with reference bit — give pages a "second chance"

**Effective Access Time (EAT):**
EAT = (1−p) × memory_access + p × page_fault_time
where p = page fault rate

> **TLB (Translation Lookaside Buffer):** Cache for page table entries. TLB hit = fast; TLB miss = need to access page table in memory.

---

## Disk Scheduling

| Algorithm | Description | Starvation? |
|-----------|-------------|-------------|
| FCFS | Request order | No |
| SSTF | Shortest seek time first | Yes |
| SCAN | Elevator — moves to end, then reverses | No |
| C-SCAN | Circular scan — only one direction (fairer) | No |
| LOOK | Like SCAN but reverses at last request | No |
| C-LOOK | Like C-SCAN but goes to last request only | No |

**Disk Access Time = Seek Time + Rotational Latency + Transfer Time**

> **SCAN** = elevator algorithm. **C-SCAN** = more uniform wait time (like a circular elevator).
> **SSTF** is closest to optimal but causes starvation for edge requests.

---

## File Systems

**File Allocation Methods:**
- **Contiguous:** Blocks stored sequentially (fast, but fragmentation)
- **Linked:** Each block points to next (no fragmentation, slow random access)
- **Indexed:** Index block contains pointers to all blocks (fast random access)

**Free Space Management:**
- **Bit Vector:** Each block = 1 bit (0=free, 1=used)
- **Linked List:** Free blocks linked together
- **Grouping:** First free block addresses others

---

## Key Terms

- **Fragmentation:** External (free space scattered) vs Internal (allocated block larger than needed)
- **Thrashing:** Excessive paging — process spends more time paging than executing
- **Semaphore:** Integer variable for process synchronization (wait/signal)
- **Mutex:** Binary semaphore — lock/unlock (only locking thread can unlock)
- **Critical section:** Code accessing shared resources
- **Context Switch:** Saving state of old process, loading state of new process
- **Daemon:** Background process (e.g., syslogd, cron)
- **Race Condition:** Output depends on sequence of execution
- **Belady's Anomaly:** More page frames causing more page faults (FIFO only)
- **Spooling:** Simultaneous Peripheral Operations Online (e.g., print queue)
  `,

  formulas: [
    { name: 'CPU Utilization',       formula: '1 − p^n (n processes, p = I/O wait prob)',                    example: 'p=0.8, n=4 → 1−0.8⁴ = 59%' },
    { name: 'Response Ratio',        formula: '(Waiting Time + Service Time) / Service Time',                example: '(5+3)/3 = 2.67' },
    { name: 'Page Fault Rate',       formula: 'Number of faults / Total references',                        example: '5/100 = 5%' },
    { name: 'Effective Access Time', formula: '(1−p)×ma + p×page_fault_time',                              example: '0.99×100ns + 0.01×10ms = 100,099ns' },
    { name: 'Fragmentation (Ext)',   formula: 'Total free space − Largest free block',                      example: '100KB − 60KB = 40KB' },
    { name: 'Turnaround Time',       formula: 'Completion Time − Arrival Time',                             example: 'CT=10, AT=0 → TAT=10' },
    { name: 'Waiting Time',          formula: 'Turnaround Time − Burst Time',                               example: 'TAT=10, BT=6 → WT=4' },
    { name: 'Response Time',         formula: 'First CPU Time − Arrival Time',                              example: 'First CPU=2, AT=0 → RT=2' },
    { name: 'Disk Access Time',      formula: 'Seek Time + Rotational Latency + Transfer Time',             example: '5ms + 4ms + 1ms = 10ms' },
    { name: 'Rotational Latency',    formula: '1 / (2 × RPM in rps)',                                       example: '7200 RPM → 1/(2×120) = 4.17ms' },
    { name: 'Page Table Size',       formula: 'Number of pages × Page table entry size',                    example: '2^20 pages × 4 bytes = 4MB' },
    { name: 'CPU Burst Probability', formula: 'CPU burst / (CPU burst + I/O burst)',                        example: '8ms/(8ms+2ms) = 0.8' },
  ],

  shortcuts: [
    'Deadlock: ALL 4 conditions must hold — break any one to prevent',
    'SJF = optimal for avg waiting time but causes starvation',
    'LRU has no Belady\'s anomaly; FIFO does',
    'Threads share memory; processes don\'t',
    'Paging has internal fragmentation; segmentation has external',
    'Banker\'s Algorithm = deadlock AVOIDANCE (not prevention)',
    'SRTF is preemptive SJF; SJF is non-preemptive',
    'SCAN = elevator; C-SCAN = circular elevator (fairer)',
    'TLB hit = fast page lookup; TLB miss = access page table in memory',
    'Thrashing = too many page faults → add more memory or reduce multiprogramming',
    'Binary semaphore = mutex (0/1); Counting semaphore = resource pool (0 to N)',
    'Context switch overhead: save PCB → load PCB → flush TLB → resume',
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
    {
      id: 'os-q8',
      text: 'Which of the following is NOT a necessary condition for deadlock?',
      options: ['Mutual Exclusion', 'Hold and Wait', 'Preemption', 'Circular Wait'],
      answer: 2,
      explanation: 'The four conditions are: Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. "Preemption" is the opposite of "No Preemption".',
      hint: 'One of these is the opposite of a real condition.',
      difficulty: 'medium',
      tags: ['deadlock'],
      timeLimit: 45,
    },
    {
      id: 'os-q9',
      text: 'What is thrashing?',
      options: ['Excessive context switching', 'Excessive page faults', 'Deadlock in memory', 'Disk fragmentation'],
      answer: 1,
      explanation: 'Thrashing occurs when a process spends more time paging (swapping pages in/out) than executing, usually due to insufficient memory.',
      hint: 'What happens when the system is constantly swapping pages?',
      difficulty: 'medium',
      tags: ['thrashing', 'paging'],
      timeLimit: 45,
    },
    {
      id: 'os-q10',
      text: 'A binary semaphore can have values:',
      options: ['0 to N', '0 or 1', '-1 to 1', 'Any integer'],
      answer: 1,
      explanation: 'A binary semaphore can only have values 0 or 1. It is essentially a mutex lock.',
      hint: 'Binary means how many possible values?',
      difficulty: 'easy',
      tags: ['semaphore'],
      timeLimit: 30,
    },
    {
      id: 'os-q11',
      text: 'Which scheduling algorithm gives the minimum average waiting time?',
      options: ['FCFS', 'Round Robin', 'SJF', 'Priority'],
      answer: 2,
      explanation: 'SJF (Shortest Job First) gives the minimum average waiting time among all scheduling algorithms.',
      hint: 'Which algorithm always picks the shortest job next?',
      difficulty: 'easy',
      tags: ['scheduling'],
      timeLimit: 30,
    },
    {
      id: 'os-q12',
      text: 'In Round Robin scheduling, if the time quantum is too large, it degenerates to:',
      options: ['SJF', 'Priority', 'FCFS', 'SRTF'],
      answer: 2,
      explanation: 'If the time quantum is larger than the longest burst time, Round Robin behaves exactly like FCFS.',
      hint: 'What happens if every process finishes within one quantum?',
      difficulty: 'medium',
      tags: ['round-robin'],
      timeLimit: 60,
    },
    {
      id: 'os-q13',
      text: 'Which of the following is true about virtual memory?',
      options: ['Eliminates the need for physical memory', 'Allows running programs larger than physical memory', 'Is faster than physical memory', 'Does not use paging'],
      answer: 1,
      explanation: 'Virtual memory allows programs to be larger than physical memory by using disk space as an extension through demand paging.',
      hint: 'What does virtual memory enable for large programs?',
      difficulty: 'easy',
      tags: ['virtual-memory'],
      timeLimit: 45,
    },
    {
      id: 'os-q14',
      text: 'The effective access time for a memory system with TLB hit ratio of 80%, TLB access time 10ns, and memory access time 100ns is:',
      options: ['110ns', '120ns', '130ns', '90ns'],
      answer: 1,
      explanation: 'EAT = 0.8×(10+100) + 0.2×(10+100+100) = 88 + 42 = 130ns. On TLB miss, we access TLB, then page table in memory, then actual data.',
      hint: 'TLB hit: TLB+Memory. TLB miss: TLB+PageTable+Memory.',
      difficulty: 'hard',
      tags: ['tlb', 'memory'],
      timeLimit: 90,
    },
    {
      id: 'os-q15',
      text: 'Which of the following is NOT a solution to the critical section problem?',
      options: ['Mutex locks', 'Semaphores', 'Monitors', 'Page Replacement'],
      answer: 3,
      explanation: 'Page Replacement is a memory management technique, not a synchronization solution. Mutex locks, semaphores, and monitors all solve the critical section problem.',
      hint: 'Which option is unrelated to process synchronization?',
      difficulty: 'medium',
      tags: ['synchronization'],
      timeLimit: 45,
    },
    {
      id: 'os-q16',
      text: 'Belady\'s anomaly occurs in which page replacement algorithm when:',
      options: ['LRU — increasing frames increases faults', 'FIFO — increasing frames increases faults', 'Optimal — decreasing frames decreases faults', 'LFU — increasing frames decreases hits'],
      answer: 1,
      explanation: 'Belady\'s anomaly is when increasing the number of page frames leads to MORE page faults. This occurs in FIFO but not in LRU or Optimal.',
      hint: 'Which algorithm can perform worse with more memory?',
      difficulty: 'hard',
      tags: ['belady', 'fifo'],
      timeLimit: 75,
    },
    {
      id: 'os-q17',
      text: 'Consider 3 processes with burst times 24, 3, 3 arriving at time 0. Using Round Robin with quantum 4, what is the average waiting time?',
      options: ['5.67', '6.33', '7.0', '4.33'],
      answer: 0,
      explanation: 'Execution order: P1(4),P2(4),P3(4),P1(4),P2(done at 12),P3(done at 16),P1(4),P1(4),P1(4),P1(done at 24). WT: P1=6, P2=4, P3=8. Avg = 18/3 = 6. Wait — let me recalculate: P1 runs at 0,8,12,16,20 → WT=0+4+4+4+4=... Actually: P1: 0→4(wait 8→12→16→20→24) WT=0+4+4+4=12? No. P1: arrives 0, first runs at 0, then waits. Completion=24, TAT=24, BT=24, WT=0? No. Let me redo: P1(24),P2(3),P3(3), q=4. Timeline: 0-4:P1, 4-7:P2(done), 7-10:P3(done), 10-14:P1, 14-18:P1, 18-22:P1, 22-24:P1(done). TAT: P1=24, P2=7, P3=10. WT: P1=0, P2=4, P3=7. Avg=11/3=3.67. Hmm, none match. Let me use q=4 properly: P1(24→20→16→12→8→4→0), P2(3→done), P3(3→done). Order: P1(0-4),P2(4-7),P3(7-10),P1(10-14),P1(14-18),P1(18-22),P1(22-24). WT(P1)=0+6=6, WT(P2)=4, WT(P3)=7. Avg=17/3=5.67.',
      hint: 'Draw the Gantt chart for Round Robin with quantum 4.',
      difficulty: 'hard',
      tags: ['round-robin', 'numerical'],
      timeLimit: 120,
    },
    {
      id: 'os-q18',
      text: 'Which of the following file allocation methods supports random access most efficiently?',
      options: ['Contiguous allocation', 'Linked allocation', 'Indexed allocation', 'FAT allocation'],
      answer: 2,
      explanation: 'Indexed allocation uses an index block containing pointers to all data blocks, allowing O(1) random access. Contiguous also supports random access but suffers from external fragmentation.',
      hint: 'Which method has a direct pointer to every block?',
      difficulty: 'medium',
      tags: ['file-system'],
      timeLimit: 60,
    },
    {
      id: 'os-q19',
      text: 'In the Dining Philosophers problem, which approach prevents deadlock?',
      options: ['All philosophers pick left fork first', 'Allow at most 4 philosophers at a table', 'Use only one fork', 'Philosophers eat in sequence'],
      answer: 1,
      explanation: 'Limiting the number of philosophers to N-1 (4 out of 5) breaks the circular wait condition, preventing deadlock.',
      hint: 'Which approach breaks one of the 4 deadlock conditions?',
      difficulty: 'hard',
      tags: ['deadlock', 'dining-philosophers'],
      timeLimit: 75,
    },
    {
      id: 'os-q20',
      text: 'A system has 16-bit virtual address, 4KB page size, and 32-bit physical address. How many entries are in the page table?',
      options: ['16', '64', '256', '1024'],
      answer: 1,
      explanation: 'Virtual address = 16 bits. Page size = 4KB = 2^12 bytes. Page offset = 12 bits. Page number bits = 16-12 = 4 bits. Number of pages = 2^4 = 16. So page table has 16 entries.',
      hint: 'Page table entries = 2^(virtual address bits − offset bits)',
      difficulty: 'hard',
      tags: ['paging', 'numerical'],
      timeLimit: 90,
    },
  ],

  aiTutorPrompt: 'You are helping an engineering student understand Operating Systems for placement exams. Focus on process management, scheduling algorithms (FCFS, SJF, SRTF, Round Robin, Priority), deadlock conditions and Banker\'s Algorithm, memory management (paging, segmentation, virtual memory, page replacement), disk scheduling, and process synchronization. Keep answers concise with comparisons, numerical examples, and exam-focused explanations.',
};
