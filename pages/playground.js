/**
 * pages/playground.js — Python Playground Page
 * Full coding environment with Pyodide runner, challenges for all topics.
 */
export function renderPlayground() {
  const app = document.getElementById('page-content');
  app.innerHTML = `
    <div class="page page--playground">
      <div class="playground-layout">

        <!-- SIDEBAR: Challenge selector -->
        <aside class="playground-sidebar">
          <div class="card">
            <h3 class="card-title">Python Playground</h3>
            <p class="card-subtitle">Run Python in your browser — no setup needed.</p>

            <label class="form-label">Language</label>
            <select id="playground-lang-select" class="input-field" style="margin-bottom:12px">
              <option value="python">Python (Pyodide)</option>
              <option value="javascript">JavaScript</option>
            </select>

            <label class="form-label">Topic</label>
            <select id="playground-topic-select" class="input-field" style="margin-bottom:12px">
              <option value="all">All Challenges</option>
              <option value="aptitude">Aptitude — Math & Logic</option>
              <option value="dsa">DSA — Algorithms</option>
              <option value="sql">SQL — Query Practice</option>
              <option value="ml">ML — Data Science</option>
              <option value="numpy">NumPy — Array Ops</option>
            </select>

            <label class="form-label">Challenge</label>
            <select id="playground-challenge-select" class="input-field">
              <option value="custom">Custom Scratchpad</option>
              <optgroup label="── Aptitude ──">
                <option value="apt_pct">1. Percentage Calculator</option>
                <option value="apt_profit">2. Profit & Loss Solver</option>
                <option value="apt_si_ci">3. SI & CI Calculator</option>
                <option value="apt_tsd">4. Time-Speed-Distance</option>
                <option value="apt_perm">5. Permutation & Combination</option>
                <option value="apt_prob">6. Probability Calculator</option>
              </optgroup>
              <optgroup label="── DSA ──">
                <option value="dsa_twosum">1. Two Sum</option>
                <option value="dsa_bsearch">2. Binary Search</option>
                <option value="dsa_mergesort">3. Merge Sort</option>
                <option value="dsa_bfs">4. BFS Traversal</option>
                <option value="dsa_dp_fib">5. DP — Fibonacci</option>
                <option value="dsa_sliding">6. Sliding Window Max</option>
              </optgroup>
              <optgroup label="── SQL (Python simulation) ──">
                <option value="sql_select">1. SELECT & Filter</option>
                <option value="sql_group">2. GROUP BY & Aggregates</option>
                <option value="sql_join">3. JOIN Operations</option>
                <option value="sql_window">4. Window Functions</option>
              </optgroup>
              <optgroup label="── ML / NumPy ──">
                <option value="ml_mean_var">1. Mean, Variance, Std</option>
                <option value="ml_dotprod">2. Dot Product</option>
                <option value="ml_gradient">3. Gradient Descent Step</option>
                <option value="ml_sigmoid">4. Sigmoid & Softmax</option>
                <option value="ml_corr">5. Correlation Matrix</option>
              </optgroup>
              <optgroup label="── Extras ──">
                <option value="sql_company">Company‑Specific SQL (Amazon)</option>
                <option value="ml_metrics">Model Evaluation Metrics</option>
              </optgroup>
            </select>
          </div>

          <div class="card">
            <h3 class="card-title">Challenge Description</h3>
            <div id="playground-challenge-desc" class="playground-desc">
              Select a challenge from the dropdown above, or use the scratchpad to write custom code.
            </div>
          </div>

          <div class="card" style="padding:var(--space-4)">
            <div class="pyodide-status">
              <span id="pyodide-status-dot" class="status-dot"></span>
              <span id="pyodide-status-text">Pyodide: Not Loaded</span>
            </div>
            <button class="btn btn--ghost btn--sm btn--full" id="playground-load-pyodide" style="margin-top:8px">
              Load Python Runtime
            </button>
          </div>
        </aside>

        <!-- MAIN: Editor + Output -->
        <div class="playground-editor-area">
          <div class="card" style="padding:0;overflow:hidden">
            <div class="editor-toolbar">
              <span class="editor-lang" id="editor-lang-label">Python</span>
              <div style="display:flex;gap:var(--space-2)">
                <button class="btn btn--primary btn--sm" id="playground-run-btn">▶ Run</button>
                <button class="btn btn--ghost btn--sm" id="playground-reset-btn">↺ Reset</button>
                <button class="btn btn--ghost btn--sm" id="playground-clear-btn">Clear</button>
              </div>
            </div>
            <textarea
              id="playground-code"
              class="console-output"
              style="border-radius:0;border:none;min-height:360px;resize:vertical;font-size:13px;outline:none"
              spellcheck="false"
              placeholder="# Write your Python code here...&#10;print('Hello, AptitudeMaster!')"
            ></textarea>
          </div>

          <div class="card" style="padding:0;overflow:hidden">
            <div class="editor-toolbar">
              <span class="editor-lang">Output</span>
              <button class="btn btn--ghost btn--xs" id="playground-copy-output">Copy</button>
            </div>
            <pre id="playground-console" class="console-output">// Output will appear here. Click "Run" to execute.</pre>
          </div>
        </div>
      </div>
    </div>
  `;

  // ── Challenge templates ──
  const challenges = {
    custom: {
      desc: "Write any Python code. Use the scratchpad for quick calculations, testing algorithms, or exploring data.",
      code: "# Write your Python code here...\nprint('Hello, AptitudeMaster!')"
    },
    // ── Aptitude ──
    apt_pct: {
      desc: "<strong>Percentage Calculator</strong><br>Given a value and a percentage, calculate the result. Handle increase/decrease.",
      code: `# Percentage Calculator
def percentage(value, pct):
    return value * pct / 100

def increase(value, pct):
    return value * (1 + pct / 100)

def decrease(value, pct):
    return value * (1 - pct / 100)

# Example: What is 15% of 240?
print(f"15% of 240 = {percentage(240, 15)}")

# Example: 240 increased by 15%
print(f"240 + 15% = {increase(240, 15)}")

# Example: 240 decreased by 15%
print(f"240 - 15% = {decrease(240, 15)}")`
    },
    apt_profit: {
      desc: "<strong>Profit & Loss Solver</strong><br>Given cost price and selling price, calculate profit/loss percentage.",
      code: `# Profit & Loss Solver
def profit_loss(cp, sp):
    diff = sp - cp
    pct = abs(diff) / cp * 100
    if diff > 0:
        return f"Profit: {pct:.2f}%"
    elif diff < 0:
        return f"Loss: {pct:.2f}%"
    else:
        return "No profit, no loss"

# Test cases
print(profit_loss(100, 120))   # Profit: 20%
print(profit_loss(100, 80))    # Loss: 20%
print(profit_loss(250, 300))   # Profit: 20%
print(profit_loss(500, 400))   # Loss: 20%`
    },
    apt_si_ci: {
      desc: "<strong>Simple & Compound Interest</strong><br>Calculate SI and CI for given principal, rate, and time.",
      code: `# SI & CI Calculator
def simple_interest(p, r, t):
    return p * r * t / 100

def compound_interest(p, r, t, n=1):
    return p * (1 + r / (100 * n)) ** (n * t) - p

p, r, t = 10000, 10, 2
si = simple_interest(p, r, t)
ci = compound_interest(p, r, t)

print(f"Principal: ₹{p}, Rate: {r}%, Time: {t} years")
print(f"Simple Interest: ₹{si:.2f}")
print(f"Compound Interest: ₹{ci:.2f}")
print(f"CI - SI = ₹{ci - si:.2f}")`
    },
    apt_tsd: {
      desc: "<strong>Time, Speed & Distance</strong><br>Convert units, calculate time/distance, solve train and boat problems.",
      code: `# Time, Speed & Distance
def kmh_to_ms(kmh):
    return kmh * 5 / 18

def ms_to_kmh(ms):
    return ms * 18 / 5

def time_to_cover(distance_km, speed_kmh):
    return distance_km / speed_kmh  # hours

def train_crossing(train_length_m, speed_kmh):
    """Time to cross a pole"""
    speed_ms = kmh_to_ms(speed_kmh)
    return train_length_m / speed_ms

# Examples
print(f"72 km/h = {kmh_to_ms(72):.1f} m/s")
print(f"Time to cover 150 km at 60 km/h: {time_to_cover(150, 60):.1f} hours")
print(f"200m train at 72 km/h crosses pole in: {train_crossing(200, 72):.1f} sec")`
    },
    apt_perm: {
      desc: "<strong>Permutation & Combination</strong><br>Calculate nPr, nCr, factorial, and solve arrangement problems.",
      code: `# Permutation & Combination
from math import factorial, perm, comb

def nPr(n, r):
    return perm(n, r)

def nCr(n, r):
    return comb(n, r)

# Examples
print(f"5P2 = {nPr(5, 2)}")   # 20
print(f"5C2 = {nCr(5, 2)}")   # 10
print(f"10C3 = {nCr(10, 3)}") # 120

# How many ways to arrange 4 letters from "ABCDE"?
print(f"\\nArranging 4 from 5 letters: {nPr(5, 4)} ways")`
    },
    apt_prob: {
      desc: "<strong>Probability Calculator</strong><br>Calculate probabilities for dice, cards, balls, and complement events.",
      code: `# Probability Calculator
from math import comb

def P(favorable, total):
    return favorable / total

# Dice: P(sum = 7) with two dice
favorable = 6  # (1,6),(2,5),(3,4),(4,3),(5,2),(6,1)
total = 36
print(f"P(sum=7) with two dice = {favorable}/{total} = {P(favorable, total):.4f}")

# Cards: P(ace) from 52-card deck
print(f"P(Ace) = 4/52 = {P(4, 52):.4f}")

# Balls: P(2 red, 1 blue) from 5 red, 3 blue
ways_2r_1b = comb(5, 2) * comb(3, 1)
total_3 = comb(8, 3)
print(f"P(2 red, 1 blue) = {ways_2r_1b}/{total_3} = {P(ways_2r_1b, total_3):.4f}")

# Complement: P(at least 1 head in 3 tosses)
p_all_tails = (1/2)**3
print(f"P(at least 1 head in 3 tosses) = 1 - {p_all_tails} = {1 - p_all_tails:.4f}")`
    },
    // ── DSA ──
    dsa_twosum: {
      desc: "<strong>Two Sum</strong><br>Given an array and target, return indices of two numbers that add up to target.",
      code: `# Two Sum — O(n) Hash Map Solution
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test
nums = [2, 7, 11, 15]
target = 9
result = two_sum(nums, target)
print(f"Array: {nums}, Target: {target}")
print(f"Indices: {result}")
print(f"Values: {nums[result[0]]} + {nums[result[1]]} = {target}")`
    },
    dsa_bsearch: {
      desc: "<strong>Binary Search</strong><br>Find target in sorted array. Return index or -1.",
      code: `# Binary Search — O(log n)
def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

arr = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
for target in [7, 1, 19, 10]:
    idx = binary_search(arr, target)
    print(f"Search {target}: index = {idx}")`
    },
    dsa_mergesort: {
      desc: "<strong>Merge Sort</strong><br>Divide-and-conquer sorting. O(n log n) time.",
      code: `# Merge Sort — O(n log n)
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

arr = [38, 27, 43, 3, 9, 82, 10]
print(f"Input:  {arr}")
print(f"Sorted: {merge_sort(arr)}")`
    },
    dsa_bfs: {
      desc: "<strong>BFS Traversal</strong><br>Breadth-first search on a graph (adjacency list).",
      code: `# BFS Traversal
from collections import deque

def bfs(graph, start):
    visited = set([start])
    queue = deque([start])
    order = []
    while queue:
        node = queue.popleft()
        order.append(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited.add(neighbor)
                queue.append(neighbor)
    return order

graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A', 'F'],
    'D': ['B'],
    'E': ['B', 'F'],
    'F': ['C', 'E']
}

print(f"BFS from A: {' → '.join(bfs(graph, 'A'))}")`
    },
    dsa_dp_fib: {
      desc: "<strong>DP — Fibonacci</strong><br>Top-down (memo) and bottom-up approaches.",
      code: `# Fibonacci — DP Approaches

# Top-down (memoization)
def fib_memo(n, memo={}):
    if n in memo: return memo[n]
    if n <= 1: return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]

# Bottom-up (tabulation)
def fib_tab(n):
    if n <= 1: return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space-optimized
def fib_opt(n):
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

n = 20
print(f"Fib({n}) = {fib_memo(n)} (memo)")
print(f"Fib({n}) = {fib_tab(n)} (tab)")
print(f"Fib({n}) = {fib_opt(n)} (opt)")`
    },
    dsa_sliding: {
      desc: "<strong>Sliding Window Maximum</strong><br>Find max of each window of size k.",
      code: `# Sliding Window Maximum — O(n)
from collections import deque

def max_sliding_window(nums, k):
    dq = deque()  # stores indices
    result = []
    for i, num in enumerate(nums):
        # Remove elements outside window
        while dq and dq[0] <= i - k:
            dq.popleft()
        # Remove smaller elements
        while dq and nums[dq[-1]] <= num:
            dq.pop()
        dq.append(i)
        if i >= k - 1:
            result.append(nums[dq[0]])
    return result

nums = [1, 3, -1, -3, 5, 3, 6, 7]
k = 3
print(f"Array: {nums}, k={k}")
print(f"Window maxes: {max_sliding_window(nums, k)}")`
    },
    // ── SQL (Python simulation) ──
    sql_select: {
      desc: "<strong>SELECT & Filter</strong><br>Simulate SQL SELECT, WHERE, ORDER BY using Python lists/dicts.",
      code: `# SQL SELECT & Filter (Python simulation)
employees = [
    {"id": 1, "name": "Alice",   "dept": "Eng", "salary": 95000},
    {"id": 2, "name": "Bob",     "dept": "Eng", "salary": 88000},
    {"id": 3, "name": "Charlie", "dept": "HR",  "salary": 72000},
    {"id": 4, "name": "Diana",   "dept": "Eng", "salary": 105000},
    {"id": 5, "name": "Eve",     "dept": "HR",  "salary": 68000},
]

# SELECT name, salary FROM employees WHERE dept = 'Eng' ORDER BY salary DESC
result = sorted(
    [e for e in employees if e["dept"] == "Eng"],
    key=lambda x: x["salary"],
    reverse=True
)
print("Engineering team (by salary):")
for e in result:
    print(f"  {e['name']:10s} ₹{e['salary']:,}")`
    },
    sql_group: {
      desc: "<strong>GROUP BY & Aggregates</strong><br>Simulate GROUP BY with COUNT, AVG, SUM, MAX.",
      code: `# SQL GROUP BY & Aggregates (Python simulation)
from collections import defaultdict

employees = [
    {"name": "Alice",   "dept": "Eng", "salary": 95000},
    {"name": "Bob",     "dept": "Eng", "salary": 88000},
    {"name": "Charlie", "dept": "HR",  "salary": 72000},
    {"name": "Diana",   "dept": "Eng", "salary": 105000},
    {"name": "Eve",     "dept": "HR",  "salary": 68000},
    {"name": "Frank",   "dept": "Sales","salary": 78000},
]

# GROUP BY dept
groups = defaultdict(list)
for e in employees:
    groups[e["dept"]].append(e["salary"])

print(f"{'Dept':<8} {'Count':>5} {'Avg Salary':>12} {'Max':>10}")
print("-" * 40)
for dept, salaries in sorted(groups.items()):
    print(f"{dept:<8} {len(salaries):>5} {sum(salaries)/len(salaries):>12,.0f} {max(salaries):>10,}")`
    },
    sql_join: {
      desc: "<strong>JOIN Operations</strong><br>Simulate INNER JOIN, LEFT JOIN using Python.",
      code: `# SQL JOIN Operations (Python simulation)
employees = [
    {"id": 1, "name": "Alice",   "dept_id": 1},
    {"id": 2, "name": "Bob",     "dept_id": 1},
    {"id": 3, "name": "Charlie", "dept_id": 2},
    {"id": 4, "name": "Diana",   "dept_id": 3},
    {"id": 5, "name": "Eve",     "dept_id": None},
]

departments = [
    {"id": 1, "name": "Engineering"},
    {"id": 2, "name": "HR"},
    {"id": 3, "name": "Sales"},
]

# Build dept lookup
dept_map = {d["id"]: d["name"] for d in departments}

# LEFT JOIN
print("=== LEFT JOIN ===")
for e in employees:
    dept_name = dept_map.get(e["dept_id"], "—")
    print(f"  {e['name']:10s} → {dept_name}")

# INNER JOIN (exclude NULL dept_id)
print("\\n=== INNER JOIN ===")
for e in employees:
    if e["dept_id"] in dept_map:
        print(f"  {e['name']:10s} → {dept_map[e['dept_id']]}")`
    },
    sql_window: {
      desc: "<strong>Window Functions</strong><br>Simulate ROW_NUMBER, RANK, LAG, running total.",
      code: `# SQL Window Functions (Python simulation)
scores = [
    {"name": "Alice", "dept": "Eng", "score": 95},
    {"name": "Bob",   "dept": "Eng", "score": 88},
    {"name": "Charlie","dept": "HR", "score": 92},
    {"name": "Diana", "dept": "Eng", "score": 95},
    {"name": "Eve",   "dept": "HR",  "score": 85},
]

# ROW_NUMBER
print("=== ROW_NUMBER ===")
for i, s in enumerate(scores, 1):
    print(f"  Row {i}: {s['name']} ({s['score']})")

# RANK (dense)
print("\\n=== RANK ===")
sorted_scores = sorted(scores, key=lambda x: x["score"], reverse=True)
rank = 1
prev = None
for i, s in enumerate(sorted_scores):
    if s["score"] != prev:
        rank = i + 1
    prev = s["score"]
    print(f"  Rank {rank}: {s['name']} ({s['score']})")

# Running total
print("\\n=== Running Total ===")
total = 0
for s in sorted_scores:
    total += s["score"]
    print(f"  {s['name']:10s} score={s['score']:3d}  running_total={total}")`
    },
    // ── ML / NumPy ──
    ml_mean_var: {
      desc: "<strong>Mean, Variance, Std Dev</strong><br>Calculate basic statistics from scratch.",
      code: `# Mean, Variance, Standard Deviation
data = [12, 15, 18, 22, 25, 28, 30, 35, 40, 45]

n = len(data)
mean = sum(data) / n
variance = sum((x - mean) ** 2 for x in data) / n
std_dev = variance ** 0.5

print(f"Data: {data}")
print(f"Count: {n}")
print(f"Mean: {mean:.2f}")
print(f"Variance: {variance:.2f}")
print(f"Std Dev: {std_dev:.2f}")
print(f"Min: {min(data)}, Max: {max(data)}")
print(f"Range: {max(data) - min(data)}")`
    },
    ml_dotprod: {
      desc: "<strong>Dot Product & Matrix Multiply</strong><br>Implement dot product and matrix multiplication from scratch.",
      code: `# Dot Product & Matrix Multiplication
def dot(a, b):
    return sum(x * y for x, y in zip(a, b))

def matmul(A, B):
    rows_A, cols_A = len(A), len(A[0])
    cols_B = len(B[0])
    result = [[0] * cols_B for _ in range(rows_A)]
    for i in range(rows_A):
        for j in range(cols_B):
            result[i][j] = sum(A[i][k] * B[k][j] for k in range(cols_A))
    return result

# Dot product
a, b = [1, 2, 3], [4, 5, 6]
print(f"dot({a}, {b}) = {dot(a, b)}")  # 32

# Matrix multiply
A = [[1, 2], [3, 4]]
B = [[5, 6], [7, 8]]
C = matmul(A, B)
print(f"\\nA × B = {C}")  # [[19,22],[43,50]]`
    },
    ml_gradient: {
      desc: "<strong>Gradient Descent Step</strong><br>One step of gradient descent for linear regression.",
      code: `# Gradient Descent Step
# Loss = (1/2n) * Σ(y_pred - y_true)²
# y_pred = w * x + b

x = [1, 2, 3, 4, 5]
y = [2, 4, 6, 8, 10]  # y = 2x

w, b = 0.0, 0.0  # initial weights
lr = 0.01
n = len(x)

# Forward pass
y_pred = [w * xi + b for xi in x]
loss = sum((yp - yt) ** 2 for yp, yt in zip(y_pred, y)) / (2 * n)
print(f"Initial: w={w:.4f}, b={b:.4f}, loss={loss:.4f}")

# Gradients
dw = sum((yp - yt) * xi for yp, yt, xi in zip(y_pred, y, x)) / n
db = sum(yp - yt for yp, yt in zip(y_pred, y)) / n

# Update
w -= lr * dw
b -= lr * db

y_pred = [w * xi + b for xi in x]
loss = sum((yp - yt) ** 2 for yp, yt in zip(y_pred, y)) / (2 * n)
print(f"After 1 step: w={w:.4f}, b={b:.4f}, loss={loss:.4f}")`
    },
    ml_sigmoid: {
      desc: "<strong>Sigmoid & Softmax</strong><br>Implement activation functions used in neural networks.",
      code: `# Sigmoid & Softmax
import math

def sigmoid(x):
    return 1 / (1 + math.exp(-x))

def softmax(values):
    exps = [math.exp(v) for v in values]
    total = sum(exps)
    return [e / total for e in exps]

# Sigmoid
print("Sigmoid:")
for x in [-3, -1, 0, 1, 3]:
    print(f"  σ({x:+d}) = {sigmoid(x):.4f}")

# Softmax
logits = [2.0, 1.0, 0.1]
probs = softmax(logits)
print(f"\\nSoftmax of {logits}:")
for i, (l, p) in enumerate(zip(logits, probs)):
    print(f"  Class {i}: logit={l:.1f} → prob={p:.4f}")
print(f"  Sum = {sum(probs):.4f}")`
    },
    ml_corr: {
      desc: "<strong>Correlation Matrix</strong><br>Calculate Pearson correlation between features.",
      code: `# Pearson Correlation Matrix
import math

def mean(lst): return sum(lst) / len(lst)

def pearson(x, y):
    mx, my = mean(x), mean(y)
    num = sum((xi - mx) * (yi - my) for xi, yi in zip(x, y))
    dx = math.sqrt(sum((xi - mx) ** 2 for xi in x))
    dy = math.sqrt(sum((yi - my) ** 2 for yi in y))
    return num / (dx * dy) if dx and dy else 0

# Features: study_hours, mock_score, aptitude_pct
data = {
    "study_hrs":  [2, 3, 4, 5, 6, 7, 8],
    "mock_score": [45, 50, 55, 65, 70, 78, 85],
    "apt_pct":    [40, 48, 52, 60, 68, 75, 82],
}

features = list(data.keys())
print(f"{'':>12}", end="")
for f in features:
    print(f"{f:>12}", end="")
print()

for f1 in features:
    print(f"{f1:>12}", end="")
    for f2 in features:
        r = pearson(data[f1], data[f2])
        print(f"{r:>12.3f}", end="")
    print()`
    },
    // ── Extras ──
    sql_company: {
      desc: `<strong>Company‑Specific SQL (Amazon)</strong><br>Find the second highest salary using simple logic.`,
      code: `# Company‑Specific SQL (Amazon) – Second highest salary\nsalaries = [50000, 80000, 60000, 90000, 75000]\nunique_sorted = sorted(set(salaries), reverse=True)\nsecond = unique_sorted[1] if len(unique_sorted) > 1 else None\nprint(f\"Second highest salary: {second}\")`
    },
    ml_metrics: {
      desc: `<strong>Model Evaluation Metrics</strong><br>Compute accuracy, precision, recall, F1 for binary classification.`,
      code: `# Model Evaluation Metrics\n# Example predictions vs true labels\ny_true = [1, 0, 1, 1, 0, 1]\ny_pred = [1, 0, 1, 0, 0, 1]\n\n# Compute confusion matrix\nTP = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 1)\nTN = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 0)\nFP = sum(1 for t, p in zip(y_true, y_pred) if t == 0 and p == 1)\nFN = sum(1 for t, p in zip(y_true, y_pred) if t == 1 and p == 0)\n\naccuracy = (TP + TN) / (len(y_true))\nprecision = TP / (TP + FP) if (TP + FP) > 0 else 0\nrecall = TP / (TP + FN) if (TP + FN) > 0 else 0\nf1 = 2 * precision * recall / (precision + recall) if (precision + recall) > 0 else 0\n\nprint(f\"Accuracy: {accuracy:.2f}\")\nprint(f\"Precision: {precision:.2f}\")\nprint(f\"Recall: {recall:.2f}\")\nprint(f\"F1 Score: {f1:.2f}\")`
    },
    }

  // ── Helpers ──
  function loadChallenge(id) {
    const ch = challenges[id] || challenges.custom;
    document.getElementById('playground-challenge-desc').innerHTML = ch.desc;
    const codeEl = document.getElementById('playground-code');
    if (codeEl) codeEl.value = ch.code;
  }

  function runCode() {
    const code = document.getElementById('playground-code')?.value || '';
    const consoleEl = document.getElementById('playground-console');
    const lang = document.getElementById('playground-lang-select')?.value || 'python';

    if (!consoleEl) return;

    if (lang === 'javascript') {
      try {
        let output = [];
        const origLog = console.log;
        console.log = (...args) => output.push(args.map(a =>
          typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)
        ).join(' '));
        eval(code);
        console.log = origLog;
        consoleEl.textContent = output.join('\n') || '(no output)';
      } catch (e) {
        consoleEl.textContent = `Error: ${e.message}`;
      }
    } else {
      // Python via Pyodide (if loaded) or show message
      const statusText = document.getElementById('pyodide-status-text');
      if (statusText && statusText.textContent.includes('Ready')) {
        // Pyodide is loaded — run it
        runPythonCode(code, consoleEl);
      } else {
        consoleEl.textContent = '⚠️ Click "Load Python Runtime" first, or switch to JavaScript mode.\n\nYour code:\n' + code.split('\n').slice(0, 5).join('\n') + (code.split('\n').length > 5 ? '\n...' : '');
      }
    }
  }

  async function runPythonCode(code, consoleEl) {
    try {
      let output = [];
      const origLog = console.log;
      console.log = (...args) => output.push(args.join(' '));
      await window.pyodide.runPythonAsync(code);
      console.log = origLog;
      consoleEl.textContent = output.join('\n') || '(no output)';
    } catch (e) {
      consoleEl.textContent = `Error: ${e.message}`;
    }
  }

  function loadPyodideRuntime() {
    const dot = document.getElementById('pyodide-status-dot');
    const text = document.getElementById('pyodide-status-text');
    const btn = document.getElementById('playground-load-pyodide');
    if (!dot || !text) return;

    dot.className = 'status-dot loading';
    text.textContent = 'Pyodide: Loading...';
    if (btn) { btn.disabled = true; btn.textContent = 'Loading...'; }

    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/pyodide/v0.24.1/full/pyodide.js';
    script.onload = async () => {
      try {
        window.pyodide = await loadPyodide();
        dot.className = 'status-dot ready';
        text.textContent = 'Pyodide: Ready ✓';
        if (btn) { btn.textContent = 'Python Ready ✓'; btn.className = 'btn btn--ghost btn--sm btn--full'; }
      } catch (e) {
        dot.className = 'status-dot error';
        text.textContent = 'Pyodide: Error loading';
        if (btn) { btn.disabled = false; btn.textContent = 'Retry Load'; }
      }
    };
    script.onerror = () => {
      dot.className = 'status-dot error';
      text.textContent = 'Pyodide: Network error';
      if (btn) { btn.disabled = false; btn.textContent = 'Retry Load'; }
    };
    document.head.appendChild(script);
  }

  // ── Event listeners ──
  document.getElementById('playground-challenge-select')?.addEventListener('change', (e) => {
    loadChallenge(e.target.value);
  });

  document.getElementById('playground-lang-select')?.addEventListener('change', (e) => {
    const label = document.getElementById('editor-lang-label');
    if (label) label.textContent = e.target.value === 'python' ? 'Python' : 'JavaScript';
  });

  document.getElementById('playground-run-btn')?.addEventListener('click', runCode);
  document.getElementById('playground-reset-btn')?.addEventListener('click', () => {
    const id = document.getElementById('playground-challenge-select')?.value || 'custom';
    loadChallenge(id);
  });
  document.getElementById('playground-clear-btn')?.addEventListener('click', () => {
    const consoleEl = document.getElementById('playground-console');
    if (consoleEl) consoleEl.textContent = '';
  });
  document.getElementById('playground-copy-output')?.addEventListener('click', () => {
    const text = document.getElementById('playground-console')?.textContent || '';
    navigator.clipboard.writeText(text).catch(() => {});
  });
  document.getElementById('playground-load-pyodide')?.addEventListener('click', loadPyodideRuntime);

  // Keyboard shortcut: Ctrl+Enter to run
  document.getElementById('playground-code')?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      runCode();
    }
  });

  // Load first challenge
  loadChallenge('apt_pct');
  // Add extra challenge options to the dropdown
  const challengeSelect = document.getElementById('playground-challenge-select');
  if (challengeSelect) {
    const optgroup = document.createElement('optgroup');
    optgroup.label = '── Extras ──';
    const sqlOpt = document.createElement('option');
    sqlOpt.value = 'sql_company';
    sqlOpt.textContent = 'Company‑Specific SQL (Amazon)';
    optgroup.appendChild(sqlOpt);
    const mlOpt = document.createElement('option');
    mlOpt.value = 'ml_metrics';
    mlOpt.textContent = 'Model Evaluation Metrics';
    optgroup.appendChild(mlOpt);
    challengeSelect.appendChild(optgroup);
  }
}
