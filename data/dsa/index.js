/**
 * data/dsa/index.js — DSA Sheet Manifest (Striver's A2Z style)
 * Curated problems with LeetCode links, video/article resources, patterns,
 * company tags and TCS-NQT flags. Each problem carries a unique `id`.
 */
const LC = (slug) => `https://leetcode.com/problems/${slug}/`;

export default {
  id: 'dsa',
  label: 'DSA Sheet',

  topics: [
    /* ───────────────────────── Arrays & Strings ───────────────────────── */
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      problems: [
        { id: 'two-sum', name: 'Two Sum', difficulty: 'easy', importance: 'Must Do', link: LC('two-sum'), youtube: 'https://www.youtube.com/watch?v=UXDSeD9mN-k', article: 'https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-an-array/', pattern: 'Hash Map', companies: ['Amazon', 'Google', 'Meta'], tcsNqt: true },
        { id: 'best-time-stock', name: 'Best Time to Buy & Sell Stock', difficulty: 'easy', importance: 'Must Do', link: LC('best-time-to-buy-and-sell-stock'), youtube: 'https://www.youtube.com/watch?v=excAOvwF_hM', article: 'https://takeuforward.org/data-structure/stock-buy-and-sell/', pattern: 'Sliding Window', companies: ['Amazon', 'Microsoft'], tcsNqt: true },
        { id: 'contains-dup', name: 'Contains Duplicate', difficulty: 'easy', importance: 'High', link: LC('contains-duplicate'), youtube: 'https://www.youtube.com/watch?v=3OamzN90ipg', article: 'https://takeuforward.org/data-structure/contains-duplicate-in-an-array/', pattern: 'Hash Set', companies: ['Amazon'], tcsNqt: true },
        { id: 'product-except', name: 'Product of Array Except Self', difficulty: 'medium', importance: 'Must Do', link: LC('product-of-array-except-self'), youtube: 'https://www.youtube.com/watch?v=gZHriFXOHy4', article: 'https://leetcode.com/problems/product-of-array-except-self/discuss/', pattern: 'Prefix Product', companies: ['Amazon', 'Meta', 'Google'] },
        { id: 'max-subarray', name: 'Maximum Subarray', difficulty: 'medium', importance: 'Must Do', link: LC('maximum-subarray'), youtube: 'https://www.youtube.com/watch?v=AHtPxO18_fk', article: 'https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/', pattern: "Kadane's Algorithm", companies: ['Amazon', 'Microsoft'], tcsNqt: true },
        { id: 'valid-anagram', name: 'Valid Anagram', difficulty: 'easy', importance: 'High', link: LC('valid-anagram'), youtube: 'https://www.youtube.com/watch?v=g8c4Sj6G774', article: 'https://leetcode.com/problems/valid-anagram/discuss/', pattern: 'Frequency Count', companies: ['Amazon'], tcsNqt: true },
        { id: 'group-anagrams', name: 'Group Anagrams', difficulty: 'medium', importance: 'High', link: LC('group-anagrams'), youtube: 'https://www.youtube.com/watch?v=vzdNOK2oB2E', article: 'https://leetcode.com/problems/group-anagrams/discuss/', pattern: 'Hash Map + Sort', companies: ['Amazon', 'Meta'] },
        { id: 'majority-element', name: 'Majority Element', difficulty: 'easy', importance: 'Must Do', link: LC('majority-element'), youtube: 'https://www.youtube.com/watch?v=UT_mGlDbBbo', article: 'https://takeuforward.org/data-structure/majority-element-moores-voting-algorithm/', pattern: "Moore's Voting", companies: ['Amazon', 'Adobe'], tcsNqt: true },
        { id: 'next-permutation', name: 'Next Permutation', difficulty: 'medium', importance: 'High', link: LC('next-permutation'), youtube: 'https://www.youtube.com/watch?v=quAS1cU-neY', article: 'https://takeuforward.org/data-structure/next-permutation/', pattern: 'Math / Swap', companies: ['Amazon'] },
        { id: 'merge-intervals', name: 'Merge Intervals', difficulty: 'medium', importance: 'Must Do', link: LC('merge-intervals'), youtube: 'https://www.youtube.com/watch?v=Z0O3cLbRmkU', article: 'https://takeuforward.org/data-structure/merge-intervals/', pattern: 'Sort + Merge', companies: ['Amazon', 'Google', 'Meta'] },
      ],
    },

    /* ───────────────────────── Two Pointers ───────────────────────── */
    {
      id: 'two-pointers',
      title: 'Two Pointers',
      problems: [
        { id: 'valid-palindrome', name: 'Valid Palindrome', difficulty: 'easy', importance: 'Must Do', link: LC('valid-palindrome'), youtube: 'https://www.youtube.com/watch?v=XXpD1Z1a3cE', article: 'https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/', pattern: 'Two Pointers', companies: ['Amazon', 'Microsoft'], tcsNqt: true },
        { id: 'three-sum', name: '3Sum', difficulty: 'medium', importance: 'Must Do', link: LC('3sum'), youtube: 'https://www.youtube.com/watch?v=DhFh8Kw7ymk', article: 'https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-zero/', pattern: 'Sort + Two Pointers', companies: ['Amazon', 'Meta', 'Google'] },
        { id: 'container-water', name: 'Container With Most Water', difficulty: 'medium', importance: 'High', link: LC('container-with-most-water'), youtube: 'https://www.youtube.com/watch?v=ZHwLH2ekVyA', article: 'https://leetcode.com/problems/container-with-most-water/discuss/', pattern: 'Two Pointers', companies: ['Amazon', 'Google'] },
        { id: 'trapping-rain', name: 'Trapping Rain Water', difficulty: 'hard', importance: 'Must Do', link: LC('trapping-rain-water'), youtube: 'https://www.youtube.com/watch?v=sAmizkG9KaU', article: 'https://takeuforward.org/data-structure/trapping-rain-water/', pattern: 'Two Pointers / Stack', companies: ['Amazon', 'Google', 'Adobe'], tcsNqt: true },
        { id: 'remove-dups-sorted', name: 'Remove Duplicates from Sorted Array', difficulty: 'easy', importance: 'High', link: LC('remove-duplicates-from-sorted-array'), youtube: 'https://www.youtube.com/watch?v=A6M9dhY1vPs', article: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/discuss/', pattern: 'Two Pointers', companies: ['Amazon'] },
        { id: 'sort-colors', name: 'Sort Colors (Dutch National Flag)', difficulty: 'medium', importance: 'Must Do', link: LC('sort-colors'), youtube: 'https://www.youtube.com/watch?v=HcNFSgXa0WU', article: 'https://takeuforward.org/data-structure/sort-an-array-of-0s-1s-and-2s/', pattern: 'Three Pointers', companies: ['Microsoft', 'Amazon'], tcsNqt: true },
      ],
    },

    /* ───────────────────────── Sliding Window ───────────────────────── */
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      problems: [
        { id: 'longest-no-repeat', name: 'Longest Substring Without Repeating', difficulty: 'medium', importance: 'Must Do', link: LC('longest-substring-without-repeating-characters'), youtube: 'https://www.youtube.com/watch?v=qtVh-XEpsJo', article: 'https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/', pattern: 'Sliding Window + Set', companies: ['Amazon', 'Google', 'Meta'], tcsNqt: true },
        { id: 'min-window-sub', name: 'Minimum Window Substring', difficulty: 'hard', importance: 'High', link: LC('minimum-window-substring'), youtube: 'https://www.youtube.com/watch?v=e1HlptlipB0', article: 'https://takeuforward.org/data-structure/minimum-window-substring-discuss/', pattern: 'Sliding Window + Map', companies: ['Amazon', 'Meta'] },
        { id: 'longest-consecutive', name: 'Longest Consecutive Sequence', difficulty: 'medium', importance: 'Must Do', link: LC('longest-consecutive-sequence'), youtube: 'https://www.youtube.com/watch?v=gPkPbs9XOsk', article: 'https://takeuforward.org/data-structure/longest-consecutive-sequence/', pattern: 'Hash Set', companies: ['Amazon', 'Google'] },
        { id: 'max-vowels', name: 'Max Consecutive Ones III', difficulty: 'medium', importance: 'High', link: LC('max-consecutive-ones-iii'), youtube: 'https://www.youtube.com/watch?v=mBQDyCGHp4M', article: 'https://takeuforward.org/data-structure/maximum-consecutive-ones-iii/', pattern: 'Sliding Window', companies: ['Amazon'] },
        { id: 'subarray-sum-k', name: 'Subarray Sum Equals K', difficulty: 'medium', importance: 'Must Do', link: LC('subarray-sum-equals-k'), youtube: 'https://www.youtube.com/watch?v=HkbZ3o8hQRo', article: 'https://takeuforward.org/data-structure/subarray-sum-equals-k/', pattern: 'Prefix Sum + Map', companies: ['Amazon', 'Google', 'Adobe'], tcsNqt: true },
        { id: 'permutation-string', name: 'Permutation in String', difficulty: 'medium', importance: 'High', link: LC('permutation-in-string'), youtube: 'https://www.youtube.com/watch?v=icV4bzldz5Q', article: 'https://leetcode.com/problems/permutation-in-string/discuss/', pattern: 'Fixed Window', companies: ['Amazon'] },
      ],
    },

    /* ───────────────────────── Binary Search ───────────────────────── */
    {
      id: 'binary-search',
      title: 'Binary Search',
      problems: [
        { id: 'binary-search-lc', name: 'Binary Search', difficulty: 'easy', importance: 'Must Do', link: LC('binary-search'), youtube: 'https://www.youtube.com/watch?v=orl1n3Ny48I', article: 'https://takeuforward.org/binary-search/binary-search-explained/', pattern: 'Classic BS', companies: ['Amazon', 'Google'], tcsNqt: true },
        { id: 'find-min-rotated', name: 'Find Minimum in Rotated Array', difficulty: 'medium', importance: 'Must Do', link: LC('find-minimum-in-rotated-sorted-array'), youtube: 'https://www.youtube.com/watch?v=nhEMDKMB44g', article: 'https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/', pattern: 'Binary Search', companies: ['Amazon', 'Microsoft'] },
        { id: 'search-rotated', name: 'Search in Rotated Array', difficulty: 'medium', importance: 'High', link: LC('search-in-rotated-sorted-array'), youtube: 'https://www.youtube.com/watch?v=5qGrJbH7Rps', article: 'https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/', pattern: 'Binary Search', companies: ['Amazon', 'Meta'], tcsNqt: true },
        { id: 'first-bad-version', name: 'First Bad Version', difficulty: 'easy', importance: 'Must Do', link: LC('first-bad-version'), youtube: 'https://www.youtube.com/watch?v=7LE2ghBo5y4', article: 'https://leetcode.com/problems/first-bad-version/discuss/', pattern: 'Binary Search', companies: ['Amazon'] },
        { id: 'search-2d-matrix', name: 'Search a 2D Matrix', difficulty: 'medium', importance: 'High', link: LC('search-a-2d-matrix'), youtube: 'https://www.youtube.com/watch?v=meTz_mT7id4', article: 'https://takeuforward.org/data-structure/search-in-a-2d-matrix/', pattern: 'BS / Staircase', companies: ['Amazon', 'Microsoft'] },
        { id: 'find-peak', name: 'Find Peak Element', difficulty: 'medium', importance: 'High', link: LC('find-peak-element'), youtube: 'https://www.youtube.com/watch?v=Kl7V8K__HmI', article: 'https://leetcode.com/problems/find-peak-element/discuss/', pattern: 'Binary Search', companies: ['Google'] },
        { id: 'sqrt-x', name: 'Sqrt(x)', difficulty: 'easy', importance: 'Must Do', link: LC('sqrtx'), youtube: 'https://www.youtube.com/watch?v=DOeRYrvzFNA', article: 'https://takeuforward.org/binary-search/implement-sqrtxn-using-binary-search/', pattern: 'Binary Search', companies: ['Amazon'], tcsNqt: true },
      ],
    },

    /* ───────────────────────── Strings ───────────────────────── */
    {
      id: 'strings',
      title: 'Strings',
      problems: [
        { id: 'reverse-string', name: 'Reverse String', difficulty: 'easy', importance: 'Must Do', link: LC('reverse-string'), youtube: 'https://www.youtube.com/watch?v=lpErC8Ymor4', article: 'https://leetcode.com/problems/reverse-string/discuss/', pattern: 'Two Pointers', companies: ['Amazon'] },
        { id: 'is-subsequence', name: 'Is Subsequence', difficulty: 'easy', importance: 'High', link: LC('is-subsequence'), youtube: 'https://www.youtube.com/watch?v=Qj_mIcQCOZ8', article: 'https://takeuforward.org/data-structure/is-subsequence/', pattern: 'Two Pointers', companies: ['Amazon', 'Meta'], tcsNqt: true },
        { id: 'string-compression', name: 'String Compression', difficulty: 'medium', importance: 'High', link: LC('string-compression'), youtube: 'https://www.youtube.com/watch?v=Q4U4VktdVwU', article: 'https://leetcode.com/problems/string-compression/discuss/', pattern: 'Two Pointers', companies: ['Amazon'] },
        { id: 'multiply-strings', name: 'Multiply Strings', difficulty: 'medium', importance: 'High', link: LC('multiply-strings'), youtube: 'https://www.youtube.com/watch?v=oR6R5yfDIgk', article: 'https://takeuforward.org/data-structure/multiply-strings/', pattern: 'Simulation', companies: ['Amazon', 'Adobe'] },
        { id: 'longest-palindromic', name: 'Longest Palindromic Substring', difficulty: 'medium', importance: 'Must Do', link: LC('longest-palindromic-substring'), youtube: 'https://www.youtube.com/watch?v=XYQ15l3s2Bg', article: 'https://takeuforward.org/data-structure/longest-palindromic-substring/', pattern: 'Expand Around Center', companies: ['Amazon', 'Microsoft'] },
        { id: 'word-break', name: 'Word Break', difficulty: 'medium', importance: 'Must Do', link: LC('word-break'), youtube: 'https://www.youtube.com/watch?v=YclVsSbziYk', article: 'https://takeuforward.org/data-structure/word-break-dp-25/', pattern: 'DP / Trie', companies: ['Amazon', 'Google', 'Adobe'] },
      ],
    },

    /* ───────────────────────── Linked List ───────────────────────── */
    {
      id: 'linked-list',
      title: 'Linked List',
      problems: [
        { id: 'reverse-list', name: 'Reverse Linked List', difficulty: 'easy', importance: 'Must Do', link: LC('reverse-linked-list'), youtube: 'https://www.youtube.com/watch?v=G0_I-ZFNDUw', article: 'https://takeuforward.org/data-structure/reverse-a-linked-list/', pattern: 'Iteration / Recursion', companies: ['Amazon', 'Microsoft', 'Adobe'], tcsNqt: true },
        { id: 'middle-node', name: 'Middle of the Linked List', difficulty: 'easy', importance: 'Must Do', link: LC('middle-of-the-linked-list'), youtube: 'https://www.youtube.com/watch?v=sGp_JU5vBBU', article: 'https://takeuforward.org/data-structure/find-the-middle-of-a-linked-list/', pattern: 'Slow & Fast', companies: ['Amazon'], tcsNqt: true },
        { id: 'merge-two-list', name: 'Merge Two Sorted Lists', difficulty: 'easy', importance: 'Must Do', link: LC('merge-two-sorted-lists'), youtube: 'https://www.youtube.com/watch?v=Ip65o5T2H90', article: 'https://takeuforward.org/data-structure/merge-two-sorted-lists/', pattern: 'Two Pointers', companies: ['Amazon', 'Google'], tcsNqt: true },
        { id: 'remove-nth', name: 'Remove Nth Node From End', difficulty: 'medium', importance: 'Must Do', link: LC('remove-nth-node-from-end-of-list'), youtube: 'https://www.youtube.com/watch?v=wl0R35IK0Z0', article: 'https://takeuforward.org/data-structure/remove-nth-node-from-the-end-of-a-linked-list/', pattern: 'Two Pointers', companies: ['Amazon', 'Microsoft'] },
        { id: 'intersection-list', name: 'Intersection of Two Linked Lists', difficulty: 'easy', importance: 'High', link: LC('intersection-of-two-linked-lists'), youtube: 'https://www.youtube.com/watch?v=fb_uKDdFBCU', article: 'https://takeuforward.org/data-structure/intersection-of-two-linked-lists/', pattern: 'Two Pointers', companies: ['Amazon', 'Adobe'] },
        { id: 'cycle-list', name: 'Linked List Cycle', difficulty: 'easy', importance: 'Must Do', link: LC('linked-list-cycle'), youtube: 'https://www.youtube.com/watch?v=KvUmiRBYTv8', article: 'https://takeuforward.org/data-structure/floyd-cycle-detection-algorithm/', pattern: 'Slow & Fast', companies: ['Amazon', 'Meta'], tcsNqt: true },
        { id: 'add-two-numbers', name: 'Add Two Numbers', difficulty: 'medium', importance: 'Must Do', link: LC('add-two-numbers'), youtube: 'https://www.youtube.com/watch?v=V-wkx4P6pGw', article: 'https://takeuforward.org/data-structure/add-two-numbers/', pattern: 'Simulation', companies: ['Amazon', 'Microsoft', 'Adobe'] },
        { id: 'lru-cache', name: 'LRU Cache', difficulty: 'medium', importance: 'Must Do', link: LC('lru-cache'), youtube: 'https://www.youtube.com/watch?v=xBaQWdqic40', article: 'https://takeuforward.org/data-structure/lru-cache/', pattern: 'HashMap + DLL', companies: ['Amazon', 'Google', 'Meta', 'Adobe'] },
      ],
    },

    /* ───────────────────────── Stack & Queue ───────────────────────── */
    {
      id: 'stack-queue',
      title: 'Stack & Queue',
      problems: [
        { id: 'valid-parentheses', name: 'Valid Parentheses', difficulty: 'easy', importance: 'Must Do', link: LC('valid-parentheses'), youtube: 'https://www.youtube.com/watch?v=22I0kN_uUWU', article: 'https://takeuforward.org/data-structure/valid-parentheses/', pattern: 'Stack', companies: ['Amazon', 'Meta', 'Adobe'], tcsNqt: true },
        { id: 'min-stack', name: 'Min Stack', difficulty: 'medium', importance: 'Must Do', link: LC('min-stack'), youtube: 'https://www.youtube.com/watch?v=qbTW3-i6lj0', article: 'https://takeuforward.org/data-structure/min-stack/', pattern: 'Stack', companies: ['Amazon', 'Microsoft'] },
        { id: 'eval-rpn', name: 'Evaluate Reverse Polish Notation', difficulty: 'medium', importance: 'High', link: LC('evaluate-reverse-polish-notation'), youtube: 'https://www.youtube.com/watch?v=qMn23kvd0aI', article: 'https://takeuforward.org/data-structure/evaluate-reverse-polish-notation/', pattern: 'Stack', companies: ['Amazon'] },
        { id: 'generate-paren', name: 'Generate Parentheses', difficulty: 'medium', importance: 'Must Do', link: LC('generate-parentheses'), youtube: 'https://www.youtube.com/watch?v=9nCjwT6g-qs', article: 'https://takeuforward.org/data-structure/generate-parentheses/', pattern: 'Backtracking', companies: ['Amazon', 'Google'] },
        { id: 'daily-temperatures', name: 'Daily Temperatures', difficulty: 'medium', importance: 'High', link: LC('daily-temperatures'), youtube: 'https://www.youtube.com/watch?v=AcMF7oU0lRQ', article: 'https://takeuforward.org/data-structure/next-greater-element-ii/', pattern: 'Monotonic Stack', companies: ['Amazon', 'Microsoft'] },
        { id: 'next-greater', name: 'Next Greater Element I', difficulty: 'easy', importance: 'High', link: LC('next-greater-element-i'), youtube: 'https://www.youtube.com/watch?v=oCoz2HrZP-8', article: 'https://takeuforward.org/data-structure/next-greater-element-i/', pattern: 'Monotonic Stack', companies: ['Amazon'], tcsNqt: true },
      ],
    },

    /* ───────────────────────── Recursion & Backtracking ───────────────────────── */
    {
      id: 'recursion-bt',
      title: 'Recursion & Backtracking',
      problems: [
        { id: 'subsets', name: 'Subsets', difficulty: 'medium', importance: 'Must Do', link: LC('subsets'), youtube: 'https://www.youtube.com/watch?v=ApQ6XM0hDkM', article: 'https://takeuforward.org/data-structure/subsets/', pattern: 'Backtracking', companies: ['Amazon', 'Google', 'Adobe'] },
        { id: 'combinations', name: 'Combinations', difficulty: 'medium', importance: 'High', link: LC('combinations'), youtube: 'https://www.youtube.com/watch?v=DTtsJh2mC0o', article: 'https://takeuforward.org/data-structure/combinations/', pattern: 'Backtracking', companies: ['Amazon'] },
        { id: 'permutations', name: 'Permutations', difficulty: 'medium', importance: 'Must Do', link: LC('permutations'), youtube: 'https://www.youtube.com/watch?v=Ik2lOqQP9yg', article: 'https://takeuforward.org/data-structure/permutations/', pattern: 'Backtracking', companies: ['Amazon', 'Microsoft', 'Adobe'] },
        { id: 'nqueens', name: 'N-Queens', difficulty: 'hard', importance: 'Must Do', link: LC('n-queens'), youtube: 'https://www.youtube.com/watch?v=xouU0rDzulg', article: 'https://takeuforward.org/data-structure/n-queens/', pattern: 'Backtracking', companies: ['Amazon', 'Google', 'Meta'] },
        { id: 'word-search', name: 'Word Search', difficulty: 'medium', importance: 'Must Do', link: LC('word-search'), youtube: 'https://www.youtube.com/watch?v=Q_f7U5VuBvk', article: 'https://takeuforward.org/data-structure/word-search/', pattern: 'Backtracking + DFS', companies: ['Amazon', 'Microsoft'] },
        { id: 'palindrome-partition', name: 'Palindrome Partitioning', difficulty: 'medium', importance: 'High', link: LC('palindrome-partitioning'), youtube: 'https://www.youtube.com/watch?v=4_t9xk8Cl7k', article: 'https://takeuforward.org/data-structure/palindrome-partitioning/', pattern: 'Backtracking', companies: ['Amazon'] },
        { id: 'letter-combos', name: 'Letter Combinations of Phone Number', difficulty: 'medium', importance: 'High', link: LC('letter-combinations-of-a-phone-number'), youtube: 'https://www.youtube.com/watch?v=UGHXJLU9U2U', article: 'https://takeuforward.org/data-structure/letter-combinations-of-a-phone-number/', pattern: 'Backtracking', companies: ['Amazon', 'Google'] },
      ],
    },

    /* ───────────────────────── Trees ───────────────────────── */
    {
      id: 'trees',
      title: 'Trees',
      problems: [
        { id: 'invert-tree', name: 'Invert Binary Tree', difficulty: 'easy', importance: 'Must Do', link: LC('invert-binary-tree'), youtube: 'https://www.youtube.com/watch?v=fKgTsj3Zbxg', article: 'https://leetcode.com/problems/invert-binary-tree/discuss/', pattern: 'DFS Recursion', companies: ['Amazon', 'Google'] },
        { id: 'max-depth', name: 'Maximum Depth of Binary Tree', difficulty: 'easy', importance: 'Must Do', link: LC('maximum-depth-of-binary-tree'), youtube: 'https://www.youtube.com/watch?v=eD3tmO66aSE', article: 'https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/', pattern: 'DFS/BFS', companies: ['Amazon', 'Microsoft'] },
        { id: 'lca-bst', name: 'Lowest Common Ancestor (BST)', difficulty: 'medium', importance: 'High', link: LC('lowest-common-ancestor-of-a-binary-search-tree'), youtube: 'https://www.youtube.com/watch?v=cX_jrOPZIOM', article: 'https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/', pattern: 'BST Property', companies: ['Amazon', 'Meta', 'Google'] },
        { id: 'level-order', name: 'Binary Tree Level Order Traversal', difficulty: 'medium', importance: 'Must Do', link: LC('binary-tree-level-order-traversal'), youtube: 'https://www.youtube.com/watch?v=EoAsA1RRPPg', article: 'https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/', pattern: 'BFS + Queue', companies: ['Amazon', 'Meta'] },
        { id: 'symmetric-tree', name: 'Symmetric Tree', difficulty: 'easy', importance: 'Must Do', link: LC('symmetric-tree'), youtube: 'https://www.youtube.com/watch?v=ZfytHjBal8M', article: 'https://takeuforward.org/data-structure/symmetric-tree/', pattern: 'DFS', companies: ['Amazon'], tcsNqt: true },
        { id: 'path-sum', name: 'Path Sum', difficulty: 'easy', importance: 'High', link: LC('path-sum'), youtube: 'https://www.youtube.com/watch?v=olkH4oWbv1U', article: 'https://takeuforward.org/data-structure/path-sum/', pattern: 'DFS', companies: ['Amazon'] },
        { id: 'diameter-tree', name: 'Diameter of Binary Tree', difficulty: 'easy', importance: 'Must Do', link: LC('diameter-of-binary-tree'), youtube: 'https://www.youtube.com/watch?v=lpjEUjHcMrk', article: 'https://takeuforward.org/data-structure/diameter-of-a-binary-tree/', pattern: 'DFS', companies: ['Amazon', 'Microsoft'], tcsNqt: true },
        { id: 'bst-iterator', name: 'Binary Search Tree Iterator', difficulty: 'medium', importance: 'High', link: LC('binary-search-tree-iterator'), youtube: 'https://www.youtube.com/watch?v=GKNy0r-0Ypk', article: 'https://takeuforward.org/data-structure/binary-search-tree-iterator/', pattern: 'Stack', companies: ['Amazon', 'Google'] },
        { id: 'serialize-tree', name: 'Serialize and Deserialize Binary Tree', difficulty: 'hard', importance: 'Must Do', link: LC('serialize-and-deserialize-binary-tree'), youtube: 'https://www.youtube.com/watch?v=V8m2LeifdAM', article: 'https://takeuforward.org/data-structure/serialize-and-deserialize-binary-tree/', pattern: 'DFS + String', companies: ['Amazon', 'Meta', 'Adobe'] },
      ],
    },

    /* ───────────────────────── Heap / Priority Queue ───────────────────────── */
    {
      id: 'heap',
      title: 'Heap / Priority Queue',
      problems: [
        { id: 'kth-largest', name: 'Kth Largest Element in Array', difficulty: 'medium', importance: 'Must Do', link: LC('kth-largest-element-in-an-array'), youtube: 'https://www.youtube.com/watch?v=oEPAlilIQzQ', article: 'https://takeuforward.org/data-structure/kth-largest-element-in-an-array/', pattern: 'Heap', companies: ['Amazon', 'Google', 'Adobe'] },
        { id: 'top-k-frequent', name: 'Top K Frequent Elements', difficulty: 'medium', importance: 'Must Do', link: LC('top-k-frequent-elements'), youtube: 'https://www.youtube.com/watch?v=8i0XIDFM8SA', article: 'https://takeuforward.org/data-structure/top-k-frequent-elements/', pattern: 'Heap / Bucket', companies: ['Amazon', 'Meta'], tcsNqt: true },
        { id: 'merge-k-lists', name: 'Merge k Sorted Lists', difficulty: 'hard', importance: 'Must Do', link: LC('merge-k-sorted-lists'), youtube: 'https://www.youtube.com/watch?v=qM9p2a8Ri0Y', article: 'https://takeuforward.org/data-structure/merge-k-sorted-lists/', pattern: 'Heap', companies: ['Amazon', 'Google', 'Microsoft'] },
        { id: 'task-scheduler', name: 'Task Scheduler', difficulty: 'medium', importance: 'High', link: LC('task-scheduler'), youtube: 'https://www.youtube.com/watch?v=LCci2Bq2Sso', article: 'https://takeuforward.org/data-structure/task-scheduler/', pattern: 'Heap / Greedy', companies: ['Amazon'] },
        { id: 'reorganize-string', name: 'Reorganize String', difficulty: 'medium', importance: 'High', link: LC('reorganize-string'), youtube: 'https://www.youtube.com/watch?v=WX-aBQyWpOo', article: 'https://takeuforward.org/data-structure/reorganize-string/', pattern: 'Max Heap', companies: ['Amazon'] },
        { id: 'median-stream', name: 'Find Median from Data Stream', difficulty: 'hard', importance: 'Must Do', link: LC('find-median-from-data-stream'), youtube: 'https://www.youtube.com/watch?v=GqI_N5YwgSQ', article: 'https://takeuforward.org/data-structure/find-median-from-data-stream/', pattern: 'Two Heaps', companies: ['Amazon', 'Google', 'Meta'] },
      ],
    },

    /* ───────────────────────── Graphs ───────────────────────── */
    {
      id: 'graphs',
      title: 'Graphs',
      problems: [
        { id: 'num-islands', name: 'Number of Islands', difficulty: 'medium', importance: 'Must Do', link: LC('number-of-islands'), youtube: 'https://www.youtube.com/watch?v=oM9BaOV0oSw', article: 'https://takeuforward.org/data-structure/number-of-islands/', pattern: 'DFS/BFS', companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'], tcsNqt: true },
        { id: 'clone-graph', name: 'Clone Graph', difficulty: 'medium', importance: 'Must Do', link: LC('clone-graph'), youtube: 'https://www.youtube.com/watch?v=tnDg0knWqdU', article: 'https://takeuforward.org/data-structure/clone-graph/', pattern: 'DFS + Map', companies: ['Amazon', 'Meta'] },
        { id: 'course-schedule', name: 'Course Schedule', difficulty: 'medium', importance: 'Must Do', link: LC('course-schedule'), youtube: 'https://www.youtube.com/watch?v=0Ir-XB1isRE', article: 'https://takeuforward.org/data-structure/course-schedule/', pattern: 'Topo Sort / DFS', companies: ['Amazon', 'Google', 'Adobe'] },
        { id: 'pacific-atlantic', name: 'Pacific Atlantic Water Flow', difficulty: 'medium', importance: 'High', link: LC('pacific-atlantic-water-flow'), youtube: 'https://www.youtube.com/watch?v=QIQ6N8rY0XM', article: 'https://leetcode.com/problems/pacific-atlantic-water-flow/discuss/', pattern: 'Multi-source BFS', companies: ['Amazon'] },
        { id: 'rotting-oranges', name: 'Rotting Oranges', difficulty: 'medium', importance: 'Must Do', link: LC('rotting-oranges'), youtube: 'https://www.youtube.com/watch?v=VpifU2PH_Ss', article: 'https://takeuforward.org/data-structure/rotting-oranges/', pattern: 'BFS (multi-source)', companies: ['Amazon', 'Microsoft'] },
        { id: 'word-ladder', name: 'Word Ladder', difficulty: 'hard', importance: 'High', link: LC('word-ladder'), youtube: 'https://www.youtube.com/watch?v=zJOpR2zSCNI', article: 'https://takeuforward.org/data-structure/word-ladder/', pattern: 'BFS + Queue', companies: ['Amazon', 'Google'] },
        { id: 'redundant-conn', name: 'Redundant Connection', difficulty: 'medium', importance: 'High', link: LC('redundant-connection'), youtube: 'https://www.youtube.com/watch?v=3YUZoQTAaNM', article: 'https://takeuforward.org/data-structure/redundant-connection/', pattern: 'DSU', companies: ['Amazon'] },
      ],
    },

    /* ───────────────────────── Dynamic Programming ───────────────────────── */
    {
      id: 'dp',
      title: 'Dynamic Programming',
      problems: [
        { id: 'climbing-stairs', name: 'Climbing Stairs', difficulty: 'easy', importance: 'Must Do', link: LC('climbing-stairs'), youtube: 'https://www.youtube.com/watch?v=mLfjz32g3g4', article: 'https://takeuforward.org/dynamic-programming/climbing-stairs/', pattern: 'DP / Fibonacci', companies: ['Amazon', 'Google'], tcsNqt: true },
        { id: 'coin-change', name: 'Coin Change', difficulty: 'medium', importance: 'Must Do', link: LC('coin-change'), youtube: 'https://www.youtube.com/watch?v=HGYqy8Lk7sA', article: 'https://takeuforward.org/dynamic-programming/coin-change-dp-22/', pattern: 'Bottom-up DP', companies: ['Amazon', 'Meta'], tcsNqt: true },
        { id: 'longest-inc-sub', name: 'Longest Increasing Subsequence', difficulty: 'medium', importance: 'High', link: LC('longest-increasing-subsequence'), youtube: 'https://www.youtube.com/watch?v=ekcwMsSIzVc', article: 'https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/', pattern: 'DP / Patience Sort', companies: ['Amazon', 'Google'], tcsNqt: true },
        { id: 'house-robber', name: 'House Robber', difficulty: 'medium', importance: 'Must Do', link: LC('house-robber'), youtube: 'https://www.youtube.com/watch?v=GztHZBnjTY0', article: 'https://takeuforward.org/dynamic-programming/house-robber-dp-19/', pattern: 'DP', companies: ['Amazon', 'Microsoft'] },
        { id: 'word-break-dp', name: 'Word Break', difficulty: 'medium', importance: 'Must Do', link: LC('word-break'), youtube: 'https://www.youtube.com/watch?v=YclVsSbziYk', article: 'https://takeuforward.org/data-structure/word-break-dp-25/', pattern: 'DP', companies: ['Amazon', 'Google'] },
        { id: 'edit-distance', name: 'Edit Distance', difficulty: 'hard', importance: 'Must Do', link: LC('edit-distance'), youtube: 'https://www.youtube.com/watch?v=We3YDTBxXEN', article: 'https://takeuforward.org/dynamic-programming/edit-distance-dp-48/', pattern: '2D DP', companies: ['Amazon', 'Google', 'Meta', 'Adobe'] },
        { id: 'unique-paths', name: 'Unique Paths', difficulty: 'medium', importance: 'High', link: LC('unique-paths'), youtube: 'https://www.youtube.com/watch?v=s8yvgLdvDnw', article: 'https://takeuforward.org/dynamic-programming/unique-paths-dp-31/', pattern: '2D DP', companies: ['Amazon'] },
        { id: 'max-product-subarray', name: 'Maximum Product Subarray', difficulty: 'medium', importance: 'Must Do', link: LC('maximum-product-subarray'), youtube: 'https://www.youtube.com/watch?v=7wIYfYB7A6Q', article: 'https://takeuforward.org/dynamic-programming/maximum-product-subarray-dp-20/', pattern: 'Kadane (Product)', companies: ['Amazon', 'Microsoft'] },
        { id: 'burst-balloons', name: 'Burst Balloons', difficulty: 'hard', importance: 'High', link: LC('burst-balloons'), youtube: 'https://www.youtube.com/watch?v=IFN6WfpKGF4', article: 'https://takeuforward.org/dynamic-programming/burst-balloons-dp-55/', pattern: '2D DP', companies: ['Amazon'] },
      ],
    },

    /* ───────────────────────── Tries ───────────────────────── */
    {
      id: 'tries',
      title: 'Tries',
      problems: [
        { id: 'impl-trie', name: 'Implement Trie (Prefix Tree)', difficulty: 'medium', importance: 'Must Do', link: LC('implement-trie-prefix-tree'), youtube: 'https://www.youtube.com/watch?v=GZLcrZERKmQ', article: 'https://takeuforward.org/data-structure/implement-trie-prefix-tree/', pattern: 'Trie', companies: ['Amazon', 'Google', 'Microsoft', 'Adobe'] },
        { id: 'word-search-ii', name: 'Word Search II', difficulty: 'hard', importance: 'Must Do', link: LC('word-search-ii'), youtube: 'https://www.youtube.com/watch?v=Hft_vil8sgU', article: 'https://takeuforward.org/data-structure/word-search-ii/', pattern: 'Trie + Backtracking', companies: ['Amazon', 'Google', 'Meta'] },
        { id: 'top-dict-prefix', name: 'Longest Word in Dictionary', difficulty: 'easy', importance: 'High', link: LC('longest-word-in-dictionary'), youtube: 'https://www.youtube.com/watch?v=QpoJTHr0T5w', article: 'https://takeuforward.org/data-structure/longest-word-in-dictionary/', pattern: 'Trie', companies: ['Amazon'] },
        { id: 'replace-words', name: 'Replace Words', difficulty: 'medium', importance: 'High', link: LC('replace-words'), youtube: 'https://www.youtube.com/watch?v=dsPhDYZ8e3s', article: 'https://leetcode.com/problems/replace-words/discuss/', pattern: 'Trie', companies: ['Amazon'] },
      ],
    },

    /* ───────────────────────── Bit Manipulation ───────────────────────── */
    {
      id: 'bit-manip',
      title: 'Bit Manipulation',
      problems: [
        { id: 'single-number', name: 'Single Number', difficulty: 'easy', importance: 'Must Do', link: LC('single-number'), youtube: 'https://www.youtube.com/watch?v=yswcV6yLXnQ', article: 'https://takeuforward.org/data-structure/single-number/', pattern: 'XOR', companies: ['Amazon', 'Google'], tcsNqt: true },
        { id: 'single-number-ii', name: 'Single Number II', difficulty: 'medium', importance: 'High', link: LC('single-number-ii'), youtube: 'https://www.youtube.com/watch?v=7HOrSCQvKUY', article: 'https://takeuforward.org/data-structure/single-number-ii/', pattern: 'Bit Count', companies: ['Amazon'] },
        { id: 'subset-xor', name: 'Sum of XOR of All Subsets', difficulty: 'medium', importance: 'High', link: LC('sum-of-xor-of-all-subsets'), youtube: 'https://www.youtube.com/watch?v=2yXsUiYsgDQ', article: 'https://takeuforward.org/data-structure/sum-of-xor-of-all-subsets/', pattern: 'XOR/Math', companies: ['Amazon'] },
        { id: 'counting-bits', name: 'Counting Bits', difficulty: 'easy', importance: 'High', link: LC('counting-bits'), youtube: 'https://www.youtube.com/watch?v=HMaIuQ8KpUc', article: 'https://takeuforward.org/data-structure/counting-bits/', pattern: 'DP + Bit', companies: ['Amazon'] },
        { id: 'power-of-two', name: 'Power of Two', difficulty: 'easy', importance: 'High', link: LC('power-of-two'), youtube: 'https://www.youtube.com/watch?v=J8PQB9xWzqk', article: 'https://takeuforward.org/data-structure/power-of-two/', pattern: 'Bit Trick', companies: ['Amazon'] },
      ],
    },

    /* ───────────────────────── Greedy ───────────────────────── */
    {
      id: 'greedy',
      title: 'Greedy',
      problems: [
        { id: 'assign-cookies', name: 'Assign Cookies', difficulty: 'easy', importance: 'High', link: LC('assign-cookies'), youtube: 'https://www.youtube.com/watch?v=2sYBy4AJo1w', article: 'https://takeuforward.org/data-structure/assign-cookies/', pattern: 'Sort + Greedy', companies: ['Amazon'] },
        { id: 'gas-station', name: 'Gas Station', difficulty: 'medium', importance: 'Must Do', link: LC('gas-station'), youtube: 'https://www.youtube.com/watch?v=cZ0sk6PZITk', article: 'https://takeuforward.org/data-structure/gas-station/', pattern: 'Greedy', companies: ['Amazon', 'Microsoft'] },
        { id: 'jump-game', name: 'Jump Game', difficulty: 'medium', importance: 'Must Do', link: LC('jump-game'), youtube: 'https://www.youtube.com/watch?v=LVt3DdjbiYk', article: 'https://takeuforward.org/data-structure/jump-game/', pattern: 'Greedy', companies: ['Amazon', 'Google'] },
        { id: 'jump-game-ii', name: 'Jump Game II', difficulty: 'medium', importance: 'Must Do', link: LC('jump-game-ii'), youtube: 'https://www.youtube.com/watch?v=vB8AUk3AzfU', article: 'https://takeuforward.org/data-structure/jump-game-ii/', pattern: 'Greedy', companies: ['Amazon'] },
        { id: 'interval-schedule', name: 'Non-overlapping Intervals', difficulty: 'medium', importance: 'Must Do', link: LC('non-overlapping-intervals'), youtube: 'https://www.youtube.com/watch?v=nIDovZKnQjU', article: 'https://takeuforward.org/data-structure/non-overlapping-intervals/', pattern: 'Greedy / Sort', companies: ['Amazon', 'Microsoft'] },
        { id: 'candy', name: 'Candy', difficulty: 'hard', importance: 'High', link: LC('candy'), youtube: 'https://www.youtube.com/watch?v=tonDU9rTi6U', article: 'https://takeuforward.org/data-structure/candy/', pattern: 'Greedy (2-pass)', companies: ['Amazon', 'Google'] },
      ],
    },
  ],
};
