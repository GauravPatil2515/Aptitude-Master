/**
 * data/dsa/index.js — DSA Tracker Manifest
 */
export default {
  id: 'dsa',
  label: 'DSA Tracker',
  icon: '📊',
  topics: [
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      icon: '📊',
      problems: [
        { id: 'two-sum',          name: 'Two Sum',                  difficulty: 'easy',   importance: 'Must Do', link: 'https://leetcode.com/problems/two-sum/', pattern: 'Hash Map' },
        { id: 'best-time-stock', name: 'Best Time to Buy & Sell Stock', difficulty: 'easy', importance: 'Must Do', link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', pattern: 'Sliding Window' },
        { id: 'contains-dup',    name: 'Contains Duplicate',        difficulty: 'easy',   importance: 'High',    link: 'https://leetcode.com/problems/contains-duplicate/', pattern: 'Hash Set' },
        { id: 'product-except',  name: 'Product of Array Except Self', difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/product-of-array-except-self/', pattern: 'Prefix Product' },
        { id: 'max-subarray',    name: 'Maximum Subarray',           difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/maximum-subarray/', pattern: 'Kadane\'s Algorithm' },
        { id: 'valid-anagram',   name: 'Valid Anagram',              difficulty: 'easy',   importance: 'High',    link: 'https://leetcode.com/problems/valid-anagram/', pattern: 'Frequency Count' },
        { id: 'group-anagrams',  name: 'Group Anagrams',             difficulty: 'medium', importance: 'High',    link: 'https://leetcode.com/problems/group-anagrams/', pattern: 'Hash Map + Sort' },
      ]
    },
    {
      id: 'two-pointers',
      title: 'Two Pointers',
      icon: '➡️',
      problems: [
        { id: 'valid-palindrome',  name: 'Valid Palindrome',           difficulty: 'easy',   importance: 'Must Do', link: 'https://leetcode.com/problems/valid-palindrome/', pattern: 'Two Pointers' },
        { id: 'three-sum',         name: '3Sum',                       difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/3sum/', pattern: 'Sort + Two Pointers' },
        { id: 'container-water',   name: 'Container With Most Water',  difficulty: 'medium', importance: 'High',    link: 'https://leetcode.com/problems/container-with-most-water/', pattern: 'Two Pointers' },
      ]
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      icon: '🪟',
      problems: [
        { id: 'longest-no-repeat', name: 'Longest Substring Without Repeating', difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', pattern: 'Sliding Window + Set' },
        { id: 'min-window-sub',    name: 'Minimum Window Substring',   difficulty: 'hard',   importance: 'High',    link: 'https://leetcode.com/problems/minimum-window-substring/', pattern: 'Sliding Window + Map' },
      ]
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      icon: '🔍',
      problems: [
        { id: 'binary-search-lc',  name: 'Binary Search',              difficulty: 'easy',   importance: 'Must Do', link: 'https://leetcode.com/problems/binary-search/', pattern: 'Classic BS' },
        { id: 'find-min-rotated',  name: 'Find Minimum in Rotated Array', difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', pattern: 'Binary Search' },
        { id: 'search-rotated',    name: 'Search in Rotated Array',    difficulty: 'medium', importance: 'High',    link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', pattern: 'Binary Search' },
      ]
    },
    {
      id: 'trees',
      title: 'Trees',
      icon: '🌳',
      problems: [
        { id: 'invert-tree',       name: 'Invert Binary Tree',         difficulty: 'easy',   importance: 'Must Do', link: 'https://leetcode.com/problems/invert-binary-tree/', pattern: 'DFS Recursion' },
        { id: 'max-depth',         name: 'Maximum Depth of Binary Tree', difficulty: 'easy', importance: 'Must Do', link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', pattern: 'DFS/BFS' },
        { id: 'lca-bst',           name: 'Lowest Common Ancestor (BST)', difficulty: 'medium', importance: 'High',  link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', pattern: 'BST Property' },
        { id: 'level-order',       name: 'Binary Tree Level Order Traversal', difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', pattern: 'BFS + Queue' },
      ]
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      icon: '🧩',
      problems: [
        { id: 'climbing-stairs',   name: 'Climbing Stairs',            difficulty: 'easy',   importance: 'Must Do', link: 'https://leetcode.com/problems/climbing-stairs/', pattern: 'DP / Fibonacci' },
        { id: 'coin-change',       name: 'Coin Change',                difficulty: 'medium', importance: 'Must Do', link: 'https://leetcode.com/problems/coin-change/', pattern: 'Bottom-up DP' },
        { id: 'longest-inc-sub',   name: 'Longest Increasing Subsequence', difficulty: 'medium', importance: 'High', link: 'https://leetcode.com/problems/longest-increasing-subsequence/', pattern: 'DP / Patience Sort' },
      ]
    }
  ]
};
