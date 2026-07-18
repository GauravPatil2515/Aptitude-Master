/**
 * data/dsa/index.js — DSA Tracker Manifest
 * Enriching problems with Striver-style Video and Article resources
 */
export default {
  id: 'dsa',
  label: 'DSA Tracker',
  
  topics: [
    {
      id: 'arrays',
      title: 'Arrays & Strings',
      
      problems: [
        { 
          id: 'two-sum', 
          name: 'Two Sum', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/two-sum/', 
          youtube: 'https://www.youtube.com/watch?v=UXDSeD9mN-k',
          article: 'https://takeuforward.org/data-structure/two-sum-check-if-a-pair-with-given-sum-exists-in-an-array/',
          pattern: 'Hash Map', 
          companies: ['Amazon', 'Google', 'Meta'], 
          tcsNqt: true 
        },
        { 
          id: 'best-time-stock', 
          name: 'Best Time to Buy & Sell Stock', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/', 
          youtube: 'https://www.youtube.com/watch?v=excAOvwF_hM',
          article: 'https://takeuforward.org/data-structure/stock-buy-and-sell/',
          pattern: 'Sliding Window', 
          companies: ['Amazon', 'Microsoft'], 
          tcsNqt: true 
        },
        { 
          id: 'contains-dup', 
          name: 'Contains Duplicate', 
          difficulty: 'easy', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/contains-duplicate/', 
          youtube: 'https://www.youtube.com/watch?v=3OamzN90ipg',
          article: 'https://takeuforward.org/data-structure/contains-duplicate-in-an-array/',
          pattern: 'Hash Set', 
          companies: ['Amazon'], 
          tcsNqt: true 
        },
        { 
          id: 'product-except', 
          name: 'Product of Array Except Self', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/product-of-array-except-self/', 
          youtube: 'https://www.youtube.com/watch?v=gZHriFXOHy4',
          article: 'https://leetcode.com/problems/product-of-array-except-self/discuss/',
          pattern: 'Prefix Product', 
          companies: ['Amazon', 'Meta', 'Google'] 
        },
        { 
          id: 'max-subarray', 
          name: 'Maximum Subarray', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/maximum-subarray/', 
          youtube: 'https://www.youtube.com/watch?v=AHtPxO18_fk',
          article: 'https://takeuforward.org/data-structure/kadanes-algorithm-maximum-subarray-sum-in-an-array/',
          pattern: 'Kadane\'s Algorithm', 
          companies: ['Amazon', 'Microsoft'], 
          tcsNqt: true 
        },
        { 
          id: 'valid-anagram', 
          name: 'Valid Anagram', 
          difficulty: 'easy', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/valid-anagram/', 
          youtube: 'https://www.youtube.com/watch?v=g8c4Sj6G774',
          article: 'https://leetcode.com/problems/valid-anagram/discuss/',
          pattern: 'Frequency Count', 
          companies: ['Amazon'], 
          tcsNqt: true 
        },
        { 
          id: 'group-anagrams', 
          name: 'Group Anagrams', 
          difficulty: 'medium', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/group-anagrams/', 
          youtube: 'https://www.youtube.com/watch?v=vzdNOK2oB2E',
          article: 'https://leetcode.com/problems/group-anagrams/discuss/',
          pattern: 'Hash Map + Sort', 
          companies: ['Amazon', 'Meta'] 
        },
      ]
    },
    {
      id: 'two-pointers',
      title: 'Two Pointers',
      
      problems: [
        { 
          id: 'valid-palindrome', 
          name: 'Valid Palindrome', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/valid-palindrome/', 
          youtube: 'https://www.youtube.com/watch?v=XXpD1Z1a3cE',
          article: 'https://takeuforward.org/data-structure/check-if-the-given-string-is-palindrome-or-not/',
          pattern: 'Two Pointers', 
          companies: ['Amazon', 'Microsoft'], 
          tcsNqt: true 
        },
        { 
          id: 'three-sum', 
          name: '3Sum', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/3sum/', 
          youtube: 'https://www.youtube.com/watch?v=DhFh8Kw7ymk',
          article: 'https://takeuforward.org/data-structure/3-sum-find-triplets-that-add-up-to-zero/',
          pattern: 'Sort + Two Pointers', 
          companies: ['Amazon', 'Meta', 'Google'] 
        },
        { 
          id: 'container-water', 
          name: 'Container With Most Water', 
          difficulty: 'medium', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/container-with-most-water/', 
          youtube: 'https://www.youtube.com/watch?v=ZHwLH2ekVyA',
          article: 'https://leetcode.com/problems/container-with-most-water/discuss/',
          pattern: 'Two Pointers', 
          companies: ['Amazon', 'Google'] 
        },
      ]
    },
    {
      id: 'sliding-window',
      title: 'Sliding Window',
      
      problems: [
        { 
          id: 'longest-no-repeat', 
          name: 'Longest Substring Without Repeating', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/', 
          youtube: 'https://www.youtube.com/watch?v=qtVh-XEpsJo',
          article: 'https://takeuforward.org/data-structure/length-of-longest-substring-without-any-repeating-character/',
          pattern: 'Sliding Window + Set', 
          companies: ['Amazon', 'Google', 'Meta'], 
          tcsNqt: true 
        },
        { 
          id: 'min-window-sub', 
          name: 'Minimum Window Substring', 
          difficulty: 'hard', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/minimum-window-substring/', 
          youtube: 'https://www.youtube.com/watch?v=e1HlptlipB0',
          article: 'https://takeuforward.org/data-structure/minimum-window-substring-discuss/',
          pattern: 'Sliding Window + Map', 
          companies: ['Amazon', 'Meta'] 
        },
      ]
    },
    {
      id: 'binary-search',
      title: 'Binary Search',
      
      problems: [
        { 
          id: 'binary-search-lc', 
          name: 'Binary Search', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/binary-search/', 
          youtube: 'https://www.youtube.com/watch?v=orl1n3Ny48I',
          article: 'https://takeuforward.org/binary-search/binary-search-explained/',
          pattern: 'Classic BS', 
          companies: ['Amazon', 'Google'], 
          tcsNqt: true 
        },
        { 
          id: 'find-min-rotated', 
          name: 'Find Minimum in Rotated Array', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/', 
          youtube: 'https://www.youtube.com/watch?v=nhEMDKMB44g',
          article: 'https://takeuforward.org/data-structure/minimum-in-rotated-sorted-array/',
          pattern: 'Binary Search', 
          companies: ['Amazon', 'Microsoft'] 
        },
        { 
          id: 'search-rotated', 
          name: 'Search in Rotated Array', 
          difficulty: 'medium', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/search-in-rotated-sorted-array/', 
          youtube: 'https://www.youtube.com/watch?v=5qGrJbH7Rps',
          article: 'https://takeuforward.org/data-structure/search-element-in-a-rotated-sorted-array/',
          pattern: 'Binary Search', 
          companies: ['Amazon', 'Meta'], 
          tcsNqt: true 
        },
      ]
    },
    {
      id: 'trees',
      title: 'Trees',
      
      problems: [
        { 
          id: 'invert-tree', 
          name: 'Invert Binary Tree', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/invert-binary-tree/', 
          youtube: 'https://www.youtube.com/watch?v=fKgTsj3Zbxg',
          article: 'https://leetcode.com/problems/invert-binary-tree/discuss/',
          pattern: 'DFS Recursion', 
          companies: ['Amazon', 'Google'] 
        },
        { 
          id: 'max-depth', 
          name: 'Maximum Depth of Binary Tree', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/', 
          youtube: 'https://www.youtube.com/watch?v=eD3tmO66aSE',
          article: 'https://takeuforward.org/data-structure/maximum-depth-of-a-binary-tree/',
          pattern: 'DFS/BFS', 
          companies: ['Amazon', 'Microsoft'] 
        },
        { 
          id: 'lca-bst', 
          name: 'Lowest Common Ancestor (BST)', 
          difficulty: 'medium', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/', 
          youtube: 'https://www.youtube.com/watch?v=cX_jrOPZIOM',
          article: 'https://takeuforward.org/data-structure/lowest-common-ancestor-for-two-given-nodes/',
          pattern: 'BST Property', 
          companies: ['Amazon', 'Meta', 'Google'] 
        },
        { 
          id: 'level-order', 
          name: 'Binary Tree Level Order Traversal', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/binary-tree-level-order-traversal/', 
          youtube: 'https://www.youtube.com/watch?v=EoAsA1RRPPg',
          article: 'https://takeuforward.org/data-structure/level-order-traversal-of-a-binary-tree/',
          pattern: 'BFS + Queue', 
          companies: ['Amazon', 'Meta'] 
        },
      ]
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      
      problems: [
        { 
          id: 'climbing-stairs', 
          name: 'Climbing Stairs', 
          difficulty: 'easy', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/climbing-stairs/', 
          youtube: 'https://www.youtube.com/watch?v=mLfjz32g3g4',
          article: 'https://takeuforward.org/dynamic-programming/climbing-stairs/',
          pattern: 'DP / Fibonacci', 
          companies: ['Amazon', 'Google'], 
          tcsNqt: true 
        },
        { 
          id: 'coin-change', 
          name: 'Coin Change', 
          difficulty: 'medium', 
          importance: 'Must Do', 
          link: 'https://leetcode.com/problems/coin-change/', 
          youtube: 'https://www.youtube.com/watch?v=HGYqy8Lk7sA',
          article: 'https://takeuforward.org/dynamic-programming/coin-change-dp-22/',
          pattern: 'Bottom-up DP', 
          companies: ['Amazon', 'Meta'], 
          tcsNqt: true 
        },
        { 
          id: 'longest-inc-sub', 
          name: 'Longest Increasing Subsequence', 
          difficulty: 'medium', 
          importance: 'High', 
          link: 'https://leetcode.com/problems/longest-increasing-subsequence/', 
          youtube: 'https://www.youtube.com/watch?v=ekcwMsSIzVc',
          article: 'https://takeuforward.org/data-structure/longest-increasing-subsequence-dp-41/',
          pattern: 'DP / Patience Sort', 
          companies: ['Amazon', 'Google'], 
          tcsNqt: true 
        },
      ]
    }
  ]
};
