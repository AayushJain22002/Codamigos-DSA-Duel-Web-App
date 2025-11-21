export const dataset = [
  {
    "id": "reverse-string",
    "title": "Reverse String",
    "difficulty": "easy",
    "tags": ["string", "two-pointers"],
    "statement": "Write a function that reverses a string. The input string is given as an array of characters 's'. You must do this by modifying the input array in-place with O(1) extra memory.",
    "constraints": [
      "1 <= s.length <= 10^5",
      "s[i] is a printable ASCII character."
    ],
    "samples": [
      {
        "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]"
      },
      {
        "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]"
      }
    ],
    "tests": [
      { "input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]" },
      { "input": "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]" },
      { "input": "[\"a\"]", "output": "[\"a\"]" },
      { "input": "[\"a\",\"b\"]", "output": "[\"b\",\"a\"]" },
      { "input": "[\"A\",\" \",\"m\"]", "output": "[\"m\",\" \",\"A\"]" }
    ],
    "starterCode": {
      "javascript": "function reverseString(s) {\n  // Write your code here\n}\n",
      "python": "def reverseString(s):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nvoid reverseString(vector<char>& s) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public void reverseString(char[] s) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "valid-parentheses",
    "title": "Valid Parentheses",
    "difficulty": "easy",
    "tags": ["string", "stack"],
    "statement": "Given a string 's' containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if: \n1. Open brackets must be closed by the same type of brackets. \n2. Open brackets must be closed in the correct order. \n3. Every close bracket has a corresponding open bracket of the same type.",
    "constraints": [
      "1 <= s.length <= 10^4",
      "s consists of parentheses only '()[]{}'."
    ],
    "samples": [
      {
        "input": "s = \"()\"",
        "output": "true"
      },
      {
        "input": "s = \"()[]{}\"",
        "output": "true"
      },
      {
        "input": "s = \"(]\"",
        "output": "false"
      },
      {
        "input": "s = \"{[]}\"",
        "output": "true"
      }
    ],
    "tests": [
      { "input": "\"()\"", "output": "true" },
      { "input": "\"()[]{}\"", "output": "true" },
      { "input": "\"(]\"", "output": "false" },
      { "input": "\"([)]\"", "output": "false" },
      { "input": "\"{[]}\"", "output": "true" },
      { "input": "\"[\"", "output": "false" },
      { "input": "\")\"", "output": "false" },
      { "input": "\"(([\"", "output": "false" }
    ],
    "starterCode": {
      "javascript": "function isValid(s) {\n  // Write your code here\n}\n",
      "python": "def isValid(s):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nbool isValid(string s) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public boolean isValid(String s) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "merge-two-sorted-lists",
    "title": "Merge Two Sorted Lists",
    "difficulty": "easy",
    "tags": ["linked-list", "recursion", "pointers"],
    "statement": "You are given the heads of two sorted linked lists 'list1' and 'list2'. Merge the two lists into one sorted list. The list should be made by splicing together the nodes of the first two lists. Return the head of the merged linked list.",
    "constraints": [
      "The number of nodes in both lists is in the range [0, 50].",
      "-100 <= Node.val <= 100",
      "Both list1 and list2 are sorted in non-decreasing order."
    ],
    "samples": [
      {
        "input": "list1 = [1,2,4], list2 = [1,3,4]",
        "output": "[1,1,2,3,4,4]"
      },
      {
        "input": "list1 = [], list2 = []",
        "output": "[]"
      },
      {
        "input": "list1 = [], list2 = [0]",
        "output": "[0]"
      }
    ],
    "tests": [
      { "input": "[1,2,4]\n[1,3,4]", "output": "[1,1,2,3,4,4]" },
      { "input": "[]\n[]", "output": "[]" },
      { "input": "[]\n[0]", "output": "[0]" },
      { "input": "[1]\n[2]", "output": "[1,2]" },
      { "input": "[2]\n[1]", "output": "[1,2]" },
      { "input": "[5]\n[1,2,4]", "output": "[1,2,4,5]" }
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n * this.val = (val===undefined ? 0 : val)\n * this.next = (next===undefined ? null : next)\n * }\n */\nfunction mergeTwoLists(list1, list2) {\n  // Write your code here\n}\n",
      "python": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\ndef mergeTwoLists(list1, list2):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n/* Definition for singly-linked list. */\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n    // Write your code here\n}\n",
      "java": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n * int val;\n * ListNode next;\n * ListNode() {}\n * ListNode(int val) { this.val = val; }\n * ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "best-time-to-buy-and-sell-stock",
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "easy",
    "tags": ["array", "dynamic-programming", "greedy"],
    "statement": "You are given an array 'prices' where prices[i] is the price of a given stock on the 'i-th' day. You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock. Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.",
    "constraints": [
      "1 <= prices.length <= 10^5",
      "0 <= prices[i] <= 10^4"
    ],
    "samples": [
      {
        "input": "prices = [7,1,5,3,6,4]",
        "output": "5",
        "explanation": "Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5. Note that buying on day 2 and selling on day 1 is not allowed because you must buy before you sell."
      },
      {
        "input": "prices = [7,6,4,3,1]",
        "output": "0",
        "explanation": "In this case, no transactions are done and the max profit = 0."
      }
    ],
    "tests": [
      { "input": "[7,1,5,3,6,4]", "output": "5" },
      { "input": "[7,6,4,3,1]", "output": "0" },
      { "input": "[1]", "output": "0" },
      { "input": "[1,2]", "output": "1" },
      { "input": "[2,1]", "output": "0" },
      { "input": "[2,4,1,3]", "output": "2" },
      { "input": "[3,3,5,0,0,3,1,4]", "output": "4" }
    ],
    "starterCode": {
      "javascript": "function maxProfit(prices) {\n  // Write your code here\n}\n",
      "python": "def maxProfit(prices):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint maxProfit(vector<int>& prices) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public int maxProfit(int[] prices) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "binary-search",
    "title": "Binary Search",
    "difficulty": "easy",
    "tags": ["array", "binary-search"],
    "statement": "Given an array of integers 'nums' which is sorted in ascending order, and an integer 'target', write a function to search 'target' in 'nums'. If 'target' exists, then return its index. Otherwise, return -1. You must write an algorithm with O(log n) runtime complexity.",
    "constraints": [
      "1 <= nums.length <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "All the integers in 'nums' are unique.",
      "'nums' is sorted in ascending order."
    ],
    "samples": [
      {
        "input": "nums = [-1,0,3,5,9,12], target = 9",
        "output": "4",
        "explanation": "9 exists in nums and its index is 4"
      },
      {
        "input": "nums = [-1,0,3,5,9,12], target = 2",
        "output": "-1",
        "explanation": "2 does not exist in nums so return -1"
      }
    ],
    "tests": [
      { "input": "[-1,0,3,5,9,12]\n9", "output": "4" },
      { "input": "[-1,0,3,5,9,12]\n2", "output": "-1" },
      { "input": "[5]\n5", "output": "0" },
      { "input": "[5]\n-5", "output": "-1" },
      { "input": "[2,5]\n2", "output": "0" },
      { "input": "[2,5]\n5", "output": "1" }
    ],
    "starterCode": {
      "javascript": "function search(nums, target) {\n  // Write your code here\n}\n",
      "python": "def search(nums, target):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint search(vector<int>& nums, int target) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public int search(int[] nums, int target) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "climbing-stairs",
    "title": "Climbing Stairs",
    "difficulty": "easy",
    "tags": ["dynamic-programming", "math", "memoization"],
    "statement": "You are climbing a staircase. It takes 'n' steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
    "constraints": [
      "1 <= n <= 45"
    ],
    "samples": [
      {
        "input": "n = 2",
        "output": "2",
        "explanation": "There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps"
      },
      {
        "input": "n = 3",
        "output": "3",
        "explanation": "There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step"
      }
    ],
    "tests": [
      { "input": "2", "output": "2" },
      { "input": "3", "output": "3" },
      { "input": "1", "output": "1" },
      { "input": "4", "output": "5" },
      { "input": "5", "output": "8" },
      { "input": "45", "output": "1836311903" }
    ],
    "starterCode": {
      "javascript": "function climbStairs(n) {\n  // Write your code here\n}\n",
      "python": "def climbStairs(n):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint climbStairs(int n) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public int climbStairs(int n) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "medium",
    "tags": ["string", "sliding-window", "hash-map"],
    "statement": "Given a string 's', find the length of the longest substring without repeating characters. A substring is a contiguous non-empty sequence of characters within a string.",
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "samples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with the length of 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with the length of 1."
      },
      {
        "input": "s = \"pwwkew\"",
        "output": "3",
        "explanation": "The answer is \"wke\", with the length of 3. Notice that the answer must be a substring, \"pwke\" is a subsequence and not a substring."
      }
    ],
    "tests": [
      { "input": "\"abcabcbb\"", "output": "3" },
      { "input": "\"bbbbb\"", "output": "1" },
      { "input": "\"pwwkew\"", "output": "3" },
      { "input": "\"\"", "output": "0" },
      { "input": "\" \"", "output": "1" },
      { "input": "\"au\"", "output": "2" },
      { "input": "\"dvdf\"", "output": "3" },
      { "input": "\"aab\"", "output": "2" }
    ],
    "starterCode": {
      "javascript": "function lengthOfLongestSubstring(s) {\n  // Write your code here\n}\n",
      "python": "def lengthOfLongestSubstring(s):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nint lengthOfLongestSubstring(string s) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "medium",
    "tags": ["array", "prefix-sum"],
    "statement": "Given an integer array 'nums', return an array 'answer' such that 'answer[i]' is equal to the product of all the elements of 'nums' except 'nums[i]'. The product of any prefix or suffix of 'nums' is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    "constraints": [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of 'nums' is guaranteed to fit in a 32-bit integer."
    ],
    "samples": [
      {
        "input": "nums = [1,2,3,4]",
        "output": "[24,12,8,6]"
      },
      {
        "input": "nums = [-1,1,0,-3,3]",
        "output": "[0,0,9,0,0]",
        "explanation": "Note that 'answer[2]' is 0 because nums[2] is 0, but the product of all other elements (-1 * 1 * -3 * 3) is 9."
      }
    ],
    "tests": [
      { "input": "[1,2,3,4]", "output": "[24,12,8,6]" },
      { "input": "[-1,1,0,-3,3]", "output": "[0,0,9,0,0]" },
      { "input": "[0,0]", "output": "[0,0]" },
      { "input": "[1,0]", "output": "[0,1]" },
      { "input": "[5,2]", "output": "[2,5]" },
      { "input": "[1,1,1,1]", "output": "[1,1,1,1]" }
    ],
    "starterCode": {
      "javascript": "function productExceptSelf(nums) {\n  // Write your code here\n}\n",
      "python": "def productExceptSelf(nums):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\nvector<int> productExceptSelf(vector<int>& nums) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "kth-smallest-element-in-a-bst",
    "title": "Kth Smallest Element in a BST",
    "difficulty": "medium",
    "tags": ["tree", "bst", "dfs", "inorder-traversal", "binary-search-tree"],
    "statement": "Given the 'root' of a binary search tree (BST) and an integer 'k', return the 'k-th' smallest element (1-indexed) in the BST. Note that a BST's inorder traversal yields its elements in sorted order.",
    "constraints": [
      "The number of nodes in the tree is 'n'.",
      "1 <= k <= n <= 10^5",
      "0 <= Node.val <= 10^5"
    ],
    "samples": [
      {
        "input": "root = [3,1,4,null,2], k = 1",
        "output": "1",
        "explanation": "The BST has nodes 1, 2, 3, 4. Inorder traversal is [1, 2, 3, 4]. The 1st smallest is 1."
      },
      {
        "input": "root = [5,3,6,2,4,null,null,1], k = 3",
        "output": "3",
        "explanation": "Inorder traversal is [1, 2, 3, 4, 5, 6]. The 3rd smallest is 3."
      }
    ],
    "tests": [
      { "input": "[3,1,4,null,2]\n1", "output": "1" },
      { "input": "[5,3,6,2,4,null,null,1]\n3", "output": "3" },
      { "input": "[1]\n1", "output": "1" },
      { "input": "[2,1]\n2", "output": "2" },
      { "input": "[5,3,7,2,4,6,8]\n7", "output": "8" }
    ],
    "starterCode": {
      "javascript": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n * this.val = (val===undefined ? 0 : val)\n * this.left = (left===undefined ? null : left)\n * this.right = (right===undefined ? null : right)\n * }\n */\nfunction kthSmallest(root, k) {\n  // Write your code here\n}\n",
      "python": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\ndef kthSmallest(root, k):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\n/* Definition for a binary tree node. */\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n    TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n};\n\nint kthSmallest(TreeNode* root, int k) {\n    // Write your code here\n}\n",
      "java": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n * int val;\n * TreeNode left;\n * TreeNode right;\n * TreeNode() {}\n * TreeNode(int val) { this.val = val; }\n * TreeNode(int val, TreeNode left, TreeNode right) {\n * this.val = val;\n * this.left = left;\n * this.right = right;\n * }\n * }\n */\nclass Solution {\n    public int kthSmallest(TreeNode root, int k) {\n        // Write your code here\n    }\n}\n"
    }
  },
  {
    "id": "median-of-two-sorted-arrays",
    "title": "Median of Two Sorted Arrays",
    "difficulty": "hard",
    "tags": ["array", "binary-search", "divide-and-conquer"],
    "statement": "Given two sorted arrays 'nums1' and 'nums2' of size 'm' and 'n' respectively, return the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).",
    "constraints": [
      "nums1.length == m",
      "nums2.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6"
    ],
    "samples": [
      {
        "input": "nums1 = [1,3], nums2 = [2]",
        "output": "2.00000",
        "explanation": "Merged array = [1,2,3] and median is 2."
      },
      {
        "input": "nums1 = [1,2], nums2 = [3,4]",
        "output": "2.50000",
        "explanation": "Merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5."
      }
    ],
    "tests": [
      { "input": "[1,3]\n[2]", "output": "2.00000" },
      { "input": "[1,2]\n[3,4]", "output": "2.50000" },
      { "input": "[0,0]\n[0,0]", "output": "0.00000" },
      { "input": "[]\n[1]", "output": "1.00000" },
      { "input": "[2]\n[]", "output": "2.00000" },
      { "input": "[]\n[2,3]", "output": "2.50000" },
      { "input": "[1,1,1]\n[1,1,1]", "output": "1.00000" }
    ],
    "starterCode": {
      "javascript": "function findMedianSortedArrays(nums1, nums2) {\n  // Write your code here\n}\n",
      "python": "def findMedianSortedArrays(nums1, nums2):\n    # Write your code here\n    pass\n",
      "cpp": "#include <bits/stdc++.h>\nusing namespace std;\n\ndouble findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n    // Write your code here\n}\n",
      "java": "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Write your code here\n    }\n}\n"
    }
  }
]
