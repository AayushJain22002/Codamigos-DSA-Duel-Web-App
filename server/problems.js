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
    "inputFormat": "A single JSON array of characters, e.g. [\"h\", \"e\", \"l\", \"l\", \"o\"]",
    "outputFormat": "Return the reversed array of characters in JSON form, e.g. [\"o\", \"l\", \"l\", \"e\", \"h\"]",
    "samples": [
      {
        "input": "s = [\"h\",\"e\",\"l\",\"l\",\"o\"]",
        "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]",
        "explanation": "Reverse the characters by swapping from ends toward the center."
      },
      {
        "input": "s = [\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]",
        "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]",
        "explanation": "First character becomes last and so on."
      }
    ],
    "testCases": [
      { "input": "[\"h\",\"e\",\"l\",\"l\",\"o\"]", "output": "[\"o\",\"l\",\"l\",\"e\",\"h\"]", "isHidden": false },
      { "input": "[\"H\",\"a\",\"n\",\"n\",\"a\",\"h\"]", "output": "[\"h\",\"a\",\"n\",\"n\",\"a\",\"H\"]", "isHidden": false },
      { "input": "[\"a\"]", "output": "[\"a\"]", "isHidden": true },
      { "input": "[\"a\",\"b\"]", "output": "[\"b\",\"a\"]", "isHidden": true },
      { "input": "[\"A\",\" \",\"m\"]", "output": "[\"m\",\" \",\"A\"]", "isHidden": true }
    ],
    "functionName": "reverseString",
    "limits": {
      "timeMs": 1000,
      "memoryMb": 256
    },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {character[]} s\n * @return {void} Do not return anything, modify s in-place instead.\n */\nvar reverseString = function(s) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const s = JSON.parse(inputData.trim());\n    reverseString(s);\n    console.log(JSON.stringify(s));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def reverseString(self, s: List[str]) -> None:\n        \"\"\"\n        Do not return anything, modify s in-place instead.\n        \"\"\"\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    data = sys.stdin.read().strip()\n    s = json.loads(data)\n    Solution().reverseString(s)\n    print(json.dumps(s))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    void reverseString(vector<char>& s) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<char> s;\n    for (size_t i = 0; i < line.size(); i++) {\n        if (line[i] == '\"' && i+1 < line.size()) {\n            s.push_back(line[i+1]);\n            i += 2;\n        }\n    }\n    Solution().reverseString(s);\n    cout << \"[\";\n    for (size_t i = 0; i < s.size(); i++) {\n        cout << \"\\\"\" << s[i] << \"\\\"\";\n        if (i < s.size()-1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public void reverseString(char[] s) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        char[] s = new char[parts.length];\n        for (int i = 0; i < parts.length; i++) {\n            String p = parts[i].trim();\n            s[i] = p.charAt(1);\n        }\n        new Solution().reverseString(s);\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int i = 0; i < s.length; i++) {\n            sb.append(\"\\\"\").append(s[i]).append(\"\\\"\");\n            if (i < s.length-1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      "c": {
        "starterCode": "void reverseString(char* s, int sSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char buffer[100000];\n    fgets(buffer, 100000, stdin);\n    char s[10000];\n    int sSize = 0;\n    for (int i = 0; buffer[i]; i++) {\n        if (buffer[i] == '\"' && buffer[i+1] && buffer[i+1] != '\"') {\n            s[sSize++] = buffer[i+1];\n            i += 2;\n        }\n    }\n    reverseString(s, sSize);\n    printf(\"[\");\n    for (int i = 0; i < sSize; i++) {\n        printf(\"\\\"%c\\\"\", s[i]);\n        if (i < sSize-1) printf(\",\");\n    }\n    printf(\"]\\n\");\n    return 0;\n}"
      }
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
    "inputFormat": "A single line string s consisting only of the characters '()[]{}'. Example: ()[]{}",
    "outputFormat": "The string 'true' if the parentheses string is valid, otherwise 'false'.",
    "samples": [
      { "input": "s = \"()\"", "output": "true", "explanation": "Single pair of parentheses is correctly matched." },
      { "input": "s = \"()[]{}\"", "output": "true", "explanation": "All brackets are correctly matched and ordered." },
      { "input": "s = \"(]\"", "output": "false", "explanation": "Round bracket is closed by a square bracket, which is invalid." },
      { "input": "s = \"{[]}\"", "output": "true", "explanation": "Nested brackets are all matched in correct order." }
    ],
    "testCases": [
      { "input": "()", "output": "true", "isHidden": false },
      { "input": "()[]{}", "output": "true", "isHidden": false },
      { "input": "(]", "output": "false", "isHidden": false },
      { "input": "([)]", "output": "false", "isHidden": true },
      { "input": "{[]}", "output": "true", "isHidden": true },
      { "input": "[", "output": "false", "isHidden": true },
      { "input": ")", "output": "false", "isHidden": true },
      { "input": "(([", "output": "false", "isHidden": true }
    ],
    "functionName": "isValid",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const s = inputData.trim();\n    const result = isValid(s);\n    console.log(result ? 'true' : 'false');\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def isValid(self, s: str) -> bool:\n        ",
        "wrapperTemplate": "import sys\n\nif __name__ == '__main__':\n    s = sys.stdin.read().strip()\n    result = Solution().isValid(s)\n    print('true' if result else 'false')"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    bool isValid(string s) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <string>\n#include <stack>\nusing namespace std;\n\nint main() {\n    string s;\n    cin >> s;\n    Solution sol;\n    bool result = sol.isValid(s);\n    cout << (result ? \"true\" : \"false\") << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public boolean isValid(String s) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        String s = sc.nextLine().trim();\n        Solution sol = new Solution();\n        boolean result = sol.isValid(s);\n        System.out.println(result ? \"true\" : \"false\");\n    }\n}"
      },
      "c": {
        "starterCode": "#include <stdbool.h>\n\nbool isValid(char* s) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdbool.h>\n#include <string.h>\n\nint main() {\n    char s[10001];\n    scanf(\"%s\", s);\n    bool result = isValid(s);\n    printf(\"%s\\n\", result ? \"true\" : \"false\");\n    return 0;\n}"
      }
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
    "inputFormat": "Two lines. First line: list1 as JSON array. Second line: list2 as JSON array.",
    "outputFormat": "Return the merged sorted linked list as a JSON array.",
    "samples": [
      { "input": "list1 = [1,2,4], list2 = [1,3,4]", "output": "[1,1,2,3,4,4]", "explanation": "We merge node by node comparing smallest values." },
      { "input": "list1 = [], list2 = []", "output": "[]", "explanation": "Both lists empty, result also empty." },
      { "input": "list1 = [], list2 = [0]", "output": "[0]", "explanation": "Only second list contains a node." }
    ],
    "testCases": [
      { "input": "[1,2,4]\n[1,3,4]", "output": "[1,1,2,3,4,4]", "isHidden": false },
      { "input": "[]\n[]", "output": "[]", "isHidden": false },
      { "input": "[]\n[0]", "output": "[0]", "isHidden": false },
      { "input": "[1]\n[2]", "output": "[1,2]", "isHidden": true },
      { "input": "[2]\n[1]", "output": "[1,2]", "isHidden": true },
      { "input": "[5]\n[1,2,4]", "output": "[1,2,4,5]", "isHidden": true }
    ],
    "functionName": "mergeTwoLists",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} list1\n * @param {ListNode} list2\n * @return {ListNode}\n */\nvar mergeTwoLists = function(list1, list2) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nfunction ListNode(val, next) {\n    this.val = (val===undefined ? 0 : val);\n    this.next = (next===undefined ? null : next);\n}\nfunction arrToList(arr) {\n    let dummy = new ListNode(0);\n    let cur = dummy;\n    for (let v of arr) { cur.next = new ListNode(v); cur = cur.next; }\n    return dummy.next;\n}\nfunction listToArr(node) {\n    let res = [];\n    while (node) { res.push(node.val); node = node.next; }\n    return res;\n}\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const lines = inputData.trim().split('\\n');\n    const arr1 = JSON.parse(lines[0] || '[]');\n    const arr2 = JSON.parse(lines[1] || '[]');\n    const l1 = arrToList(arr1);\n    const l2 = arrToList(arr2);\n    const result = mergeTwoLists(l1, l2);\n    console.log(JSON.stringify(listToArr(result)));\n});"
      },
      "python": {
        "starterCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import Optional\n\nclass ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next\n\ndef arr_to_list(arr):\n    dummy = ListNode(0)\n    cur = dummy\n    for v in arr:\n        cur.next = ListNode(v)\n        cur = cur.next\n    return dummy.next\n\ndef list_to_arr(node):\n    res = []\n    while node:\n        res.append(node.val)\n        node = node.next\n    return res\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().strip().split('\\n')\n    arr1 = json.loads(lines[0]) if lines[0] else []\n    arr2 = json.loads(lines[1]) if len(lines) > 1 and lines[1] else []\n    l1 = arr_to_list(arr1)\n    l2 = arr_to_list(arr2)\n    result = Solution().mergeTwoLists(l1, l2)\n    print(json.dumps(list_to_arr(result)))"
      },
      "cpp": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeTwoLists(ListNode* list1, ListNode* list2) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\n#include <sstream>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode() : val(0), next(nullptr) {}\n    ListNode(int x) : val(x), next(nullptr) {}\n    ListNode(int x, ListNode *next) : val(x), next(next) {}\n};\n\nvector<int> parseArr(string s) {\n    vector<int> res;\n    string num = \"\";\n    for (char c : s) {\n        if (c >= '0' && c <= '9' || c == '-') num += c;\n        else if (!num.empty()) { res.push_back(stoi(num)); num = \"\"; }\n    }\n    if (!num.empty()) res.push_back(stoi(num));\n    return res;\n}\n\nListNode* arrToList(vector<int>& arr) {\n    ListNode dummy(0);\n    ListNode* cur = &dummy;\n    for (int v : arr) { cur->next = new ListNode(v); cur = cur->next; }\n    return dummy.next;\n}\n\nint main() {\n    string line1, line2;\n    getline(cin, line1);\n    getline(cin, line2);\n    vector<int> arr1 = parseArr(line1);\n    vector<int> arr2 = parseArr(line2);\n    ListNode* l1 = arrToList(arr1);\n    ListNode* l2 = arrToList(arr2);\n    Solution sol;\n    ListNode* result = sol.mergeTwoLists(l1, l2);\n    cout << \"[\";\n    bool first = true;\n    while (result) {\n        if (!first) cout << \",\";\n        cout << result->val;\n        result = result->next;\n        first = false;\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeTwoLists(ListNode list1, ListNode list2) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode() {}\n    ListNode(int val) { this.val = val; }\n    ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n}\n\npublic class Main {\n    static int[] parseArr(String s) {\n        s = s.trim();\n        if (s.equals(\"[]\")) return new int[0];\n        s = s.substring(1, s.length()-1);\n        String[] parts = s.split(\",\");\n        int[] arr = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) arr[i] = Integer.parseInt(parts[i].trim());\n        return arr;\n    }\n    static ListNode arrToList(int[] arr) {\n        ListNode dummy = new ListNode(0);\n        ListNode cur = dummy;\n        for (int v : arr) { cur.next = new ListNode(v); cur = cur.next; }\n        return dummy.next;\n    }\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line1 = br.readLine();\n        String line2 = br.readLine();\n        int[] arr1 = parseArr(line1 != null ? line1 : \"[]\");\n        int[] arr2 = parseArr(line2 != null ? line2 : \"[]\");\n        ListNode l1 = arrToList(arr1);\n        ListNode l2 = arrToList(arr2);\n        Solution sol = new Solution();\n        ListNode result = sol.mergeTwoLists(l1, l2);\n        StringBuilder sb = new StringBuilder(\"[\");\n        boolean first = true;\n        while (result != null) {\n            if (!first) sb.append(\",\");\n            sb.append(result.val);\n            result = result.next;\n            first = false;\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     struct ListNode *next;\n * };\n */\nstruct ListNode* mergeTwoLists(struct ListNode* list1, struct ListNode* list2) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct ListNode {\n    int val;\n    struct ListNode *next;\n};\n\nstruct ListNode* arrToList(int* arr, int size) {\n    struct ListNode dummy = {0, NULL};\n    struct ListNode* cur = &dummy;\n    for (int i = 0; i < size; i++) {\n        cur->next = (struct ListNode*)malloc(sizeof(struct ListNode));\n        cur->next->val = arr[i];\n        cur->next->next = NULL;\n        cur = cur->next;\n    }\n    return dummy.next;\n}\n\nint parseArr(char* s, int* arr) {\n    int size = 0;\n    char* p = s;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            arr[size++] = atoi(p);\n            while (*p == '-' || (*p >= '0' && *p <= '9')) p++;\n        } else p++;\n    }\n    return size;\n}\n\nint main() {\n    char line1[10000], line2[10000];\n    fgets(line1, 10000, stdin);\n    fgets(line2, 10000, stdin);\n    int arr1[1000], arr2[1000];\n    int size1 = parseArr(line1, arr1);\n    int size2 = parseArr(line2, arr2);\n    struct ListNode* l1 = arrToList(arr1, size1);\n    struct ListNode* l2 = arrToList(arr2, size2);\n    struct ListNode* result = mergeTwoLists(l1, l2);\n    printf(\"[\");\n    int first = 1;\n    while (result) {\n        if (!first) printf(\",\");\n        printf(\"%d\", result->val);\n        result = result->next;\n        first = 0;\n    }\n    printf(\"]\\n\");\n    return 0;\n}"
      }
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
    "inputFormat": "A single JSON array. Each element represents stock price for that day.",
    "outputFormat": "Return a single integer representing the maximum profit.",
    "samples": [
      { "input": "prices = [7,1,5,3,6,4]", "output": "5", "explanation": "Buy low (1) and sell high (6)." },
      { "input": "prices = [7,6,4,3,1]", "output": "0", "explanation": "Prices keep going down; no profit possible." }
    ],
    "testCases": [
      { "input": "[7,1,5,3,6,4]", "output": "5", "isHidden": false },
      { "input": "[7,6,4,3,1]", "output": "0", "isHidden": false },
      { "input": "[1]", "output": "0", "isHidden": true },
      { "input": "[1,2]", "output": "1", "isHidden": true },
      { "input": "[2,1]", "output": "0", "isHidden": true },
      { "input": "[2,4,1,3]", "output": "2", "isHidden": true },
      { "input": "[3,3,5,0,0,3,1,4]", "output": "4", "isHidden": true }
    ],
    "functionName": "maxProfit",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} prices\n * @return {number}\n */\nvar maxProfit = function(prices) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const prices = JSON.parse(inputData.trim());\n    const result = maxProfit(prices);\n    console.log(result);\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def maxProfit(self, prices: List[int]) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    prices = json.loads(sys.stdin.read().strip())\n    result = Solution().maxProfit(prices)\n    print(result)"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int maxProfit(vector<int>& prices) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> prices;\n    string num = \"\";\n    for (char c : line) {\n        if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { prices.push_back(stoi(num)); num = \"\"; }\n    }\n    if (!num.empty()) prices.push_back(stoi(num));\n    Solution sol;\n    cout << sol.maxProfit(prices) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int maxProfit(int[] prices) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] prices = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) prices[i] = Integer.parseInt(parts[i].trim());\n        Solution sol = new Solution();\n        System.out.println(sol.maxProfit(prices));\n    }\n}"
      },
      "c": {
        "starterCode": "int maxProfit(int* prices, int pricesSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int prices[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p >= '0' && *p <= '9') {\n            prices[size++] = atoi(p);\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    printf(\"%d\\n\", maxProfit(prices, size));\n    return 0;\n}"
      }
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
      "All integers in 'nums' are unique.",
      "'nums' is sorted in ascending order."
    ],
    "inputFormat": "Two lines. First line: sorted nums array in JSON. Second line: target integer.",
    "outputFormat": "Return index of target if present; otherwise return -1.",
    "samples": [
      { "input": "nums = [-1,0,3,5,9,12], target = 9", "output": "4", "explanation": "Target exists at index 4." },
      { "input": "nums = [-1,0,3,5,9,12], target = 2", "output": "-1", "explanation": "Target 2 does not exist." }
    ],
    "testCases": [
      { "input": "[-1,0,3,5,9,12]\n9", "output": "4", "isHidden": false },
      { "input": "[-1,0,3,5,9,12]\n2", "output": "-1", "isHidden": false },
      { "input": "[5]\n5", "output": "0", "isHidden": true },
      { "input": "[5]\n-5", "output": "-1", "isHidden": true },
      { "input": "[2,5]\n2", "output": "0", "isHidden": true },
      { "input": "[2,5]\n5", "output": "1", "isHidden": true }
    ],
    "functionName": "search",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const lines = inputData.trim().split('\\n');\n    const nums = JSON.parse(lines[0]);\n    const target = parseInt(lines[1]);\n    const result = search(nums, target);\n    console.log(result);\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().strip().split('\\n')\n    nums = json.loads(lines[0])\n    target = int(lines[1])\n    result = Solution().search(nums, target)\n    print(result)"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    int target;\n    cin >> target;\n    Solution sol;\n    cout << sol.search(nums, target) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        int target = Integer.parseInt(br.readLine().trim());\n        Solution sol = new Solution();\n        System.out.println(sol.search(nums, target));\n    }\n}"
      },
      "c": {
        "starterCode": "int search(int* nums, int numsSize, int target) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int target;\n    scanf(\"%d\", &target);\n    printf(\"%d\\n\", search(nums, size, target));\n    return 0;\n}"
      }
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
    "inputFormat": "A single integer n.",
    "outputFormat": "A single integer representing the number of distinct ways to climb n stairs.",
    "samples": [
      { "input": "n = 2", "output": "2", "explanation": "Two ways: (1+1) or (2)." },
      { "input": "n = 3", "output": "3", "explanation": "Three ways: (1+1+1), (1+2), (2+1)." }
    ],
    "testCases": [
      { "input": "2", "output": "2", "isHidden": false },
      { "input": "3", "output": "3", "isHidden": false },
      { "input": "1", "output": "1", "isHidden": true },
      { "input": "4", "output": "5", "isHidden": true },
      { "input": "5", "output": "8", "isHidden": true },
      { "input": "10", "output": "89", "isHidden": true }
    ],
    "functionName": "climbStairs",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const n = parseInt(inputData.trim());\n    console.log(climbStairs(n));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def climbStairs(self, n: int) -> int:\n        ",
        "wrapperTemplate": "import sys\n\nif __name__ == '__main__':\n    n = int(sys.stdin.read().strip())\n    print(Solution().climbStairs(n))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int climbStairs(int n) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\nusing namespace std;\n\nint main() {\n    int n;\n    cin >> n;\n    Solution sol;\n    cout << sol.climbStairs(n) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int climbStairs(int n) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        int n = sc.nextInt();\n        Solution sol = new Solution();\n        System.out.println(sol.climbStairs(n));\n    }\n}"
      },
      "c": {
        "starterCode": "int climbStairs(int n) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n\nint main() {\n    int n;\n    scanf(\"%d\", &n);\n    printf(\"%d\\n\", climbStairs(n));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "two-sum",
    "title": "Two Sum",
    "difficulty": "easy",
    "tags": ["array", "hash-table"],
    "statement": "Given an array of integers 'nums' and an integer 'target', return indices of the two numbers such that they add up to 'target'. You may assume that each input would have exactly one solution, and you may not use the same element twice. You can return the answer in any order.",
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "inputFormat": "Two lines. First line: nums as JSON array. Second line: target integer.",
    "outputFormat": "Return indices as a JSON array of two integers.",
    "samples": [
      { "input": "nums = [2,7,11,15], target = 9", "output": "[0,1]", "explanation": "nums[0] + nums[1] = 2 + 7 = 9" },
      { "input": "nums = [3,2,4], target = 6", "output": "[1,2]", "explanation": "nums[1] + nums[2] = 2 + 4 = 6" },
      { "input": "nums = [3,3], target = 6", "output": "[0,1]", "explanation": "nums[0] + nums[1] = 3 + 3 = 6" }
    ],
    "testCases": [
      { "input": "[2,7,11,15]\n9", "output": "[0,1]", "isHidden": false },
      { "input": "[3,2,4]\n6", "output": "[1,2]", "isHidden": false },
      { "input": "[3,3]\n6", "output": "[0,1]", "isHidden": false },
      { "input": "[1,2,3,4,5]\n9", "output": "[3,4]", "isHidden": true },
      { "input": "[-1,-2,-3,-4,-5]\n-8", "output": "[2,4]", "isHidden": true }
    ],
    "functionName": "twoSum",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const lines = inputData.trim().split('\\n');\n    const nums = JSON.parse(lines[0]);\n    const target = parseInt(lines[1]);\n    const result = twoSum(nums, target);\n    console.log(JSON.stringify(result));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().strip().split('\\n')\n    nums = json.loads(lines[0])\n    target = int(lines[1])\n    result = Solution().twoSum(nums, target)\n    print(json.dumps(result))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    int target;\n    cin >> target;\n    Solution sol;\n    vector<int> result = sol.twoSum(nums, target);\n    cout << \"[\" << result[0] << \",\" << result[1] << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        int target = Integer.parseInt(br.readLine().trim());\n        Solution sol = new Solution();\n        int[] result = sol.twoSum(nums, target);\n        System.out.println(\"[\" + result[0] + \",\" + result[1] + \"]\");\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* twoSum(int* nums, int numsSize, int target, int* returnSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int target;\n    scanf(\"%d\", &target);\n    int returnSize;\n    int* result = twoSum(nums, size, target, &returnSize);\n    printf(\"[%d,%d]\\n\", result[0], result[1]);\n    free(result);\n    return 0;\n}"
      }
    }
  },
  {
    "id": "maximum-subarray",
    "title": "Maximum Subarray",
    "difficulty": "medium",
    "tags": ["array", "divide-and-conquer", "dynamic-programming"],
    "statement": "Given an integer array 'nums', find the subarray with the largest sum, and return its sum.",
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^4 <= nums[i] <= 10^4"
    ],
    "inputFormat": "A single JSON array of integers.",
    "outputFormat": "A single integer representing the maximum subarray sum.",
    "samples": [
      { "input": "nums = [-2,1,-3,4,-1,2,1,-5,4]", "output": "6", "explanation": "The subarray [4,-1,2,1] has the largest sum 6." },
      { "input": "nums = [1]", "output": "1", "explanation": "Single element is the max subarray." },
      { "input": "nums = [5,4,-1,7,8]", "output": "23", "explanation": "The entire array has the largest sum." }
    ],
    "testCases": [
      { "input": "[-2,1,-3,4,-1,2,1,-5,4]", "output": "6", "isHidden": false },
      { "input": "[1]", "output": "1", "isHidden": false },
      { "input": "[5,4,-1,7,8]", "output": "23", "isHidden": false },
      { "input": "[-1]", "output": "-1", "isHidden": true },
      { "input": "[-2,-1]", "output": "-1", "isHidden": true }
    ],
    "functionName": "maxSubArray",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar maxSubArray = function(nums) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const nums = JSON.parse(inputData.trim());\n    console.log(maxSubArray(nums));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def maxSubArray(self, nums: List[int]) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.read().strip())\n    print(Solution().maxSubArray(nums))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int maxSubArray(vector<int>& nums) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    Solution sol;\n    cout << sol.maxSubArray(nums) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int maxSubArray(int[] nums) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        Solution sol = new Solution();\n        System.out.println(sol.maxSubArray(nums));\n    }\n}"
      },
      "c": {
        "starterCode": "int maxSubArray(int* nums, int numsSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    printf(\"%d\\n\", maxSubArray(nums, size));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "product-of-array-except-self",
    "title": "Product of Array Except Self",
    "difficulty": "medium",
    "tags": ["array", "prefix-sum"],
    "statement": "Given an integer array 'nums', return an array 'answer' such that answer[i] is equal to the product of all the elements of 'nums' except nums[i]. The product of any prefix or suffix of 'nums' is guaranteed to fit in a 32-bit integer. You must write an algorithm that runs in O(n) time and without using the division operation.",
    "constraints": [
      "2 <= nums.length <= 10^5",
      "-30 <= nums[i] <= 30",
      "The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer."
    ],
    "inputFormat": "A single JSON array of integers.",
    "outputFormat": "A JSON array where each element is the product of all other elements.",
    "samples": [
      { "input": "nums = [1,2,3,4]", "output": "[24,12,8,6]", "explanation": "answer[0]=2*3*4, answer[1]=1*3*4, etc." },
      { "input": "nums = [-1,1,0,-3,3]", "output": "[0,0,9,0,0]", "explanation": "Zero in array makes most products zero." }
    ],
    "testCases": [
      { "input": "[1,2,3,4]", "output": "[24,12,8,6]", "isHidden": false },
      { "input": "[-1,1,0,-3,3]", "output": "[0,0,9,0,0]", "isHidden": false },
      { "input": "[2,3]", "output": "[3,2]", "isHidden": true },
      { "input": "[0,0]", "output": "[0,0]", "isHidden": true }
    ],
    "functionName": "productExceptSelf",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @return {number[]}\n */\nvar productExceptSelf = function(nums) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const nums = JSON.parse(inputData.trim());\n    const result = productExceptSelf(nums);\n    console.log(JSON.stringify(result));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def productExceptSelf(self, nums: List[int]) -> List[int]:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.read().strip())\n    result = Solution().productExceptSelf(nums)\n    print(json.dumps(result))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    vector<int> productExceptSelf(vector<int>& nums) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    Solution sol;\n    vector<int> result = sol.productExceptSelf(nums);\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << result[i];\n        if (i < result.size()-1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int[] productExceptSelf(int[] nums) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        Solution sol = new Solution();\n        int[] result = sol.productExceptSelf(nums);\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int i = 0; i < result.length; i++) {\n            sb.append(result[i]);\n            if (i < result.length-1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Note: The returned array must be malloced, assume caller calls free().\n */\nint* productExceptSelf(int* nums, int numsSize, int* returnSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int returnSize;\n    int* result = productExceptSelf(nums, size, &returnSize);\n    printf(\"[\");\n    for (int i = 0; i < returnSize; i++) {\n        printf(\"%d\", result[i]);\n        if (i < returnSize-1) printf(\",\");\n    }\n    printf(\"]\\n\");\n    free(result);\n    return 0;\n}"
      }
    }
  },
  {
    "id": "contains-duplicate",
    "title": "Contains Duplicate",
    "difficulty": "easy",
    "tags": ["array", "hash-table", "sorting"],
    "statement": "Given an integer array 'nums', return true if any value appears at least twice in the array, and return false if every element is distinct.",
    "constraints": [
      "1 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    "inputFormat": "A single JSON array of integers.",
    "outputFormat": "The string 'true' if duplicates exist, otherwise 'false'.",
    "samples": [
      { "input": "nums = [1,2,3,1]", "output": "true", "explanation": "1 appears twice." },
      { "input": "nums = [1,2,3,4]", "output": "false", "explanation": "All elements are distinct." },
      { "input": "nums = [1,1,1,3,3,4,3,2,4,2]", "output": "true", "explanation": "Multiple duplicates exist." }
    ],
    "testCases": [
      { "input": "[1,2,3,1]", "output": "true", "isHidden": false },
      { "input": "[1,2,3,4]", "output": "false", "isHidden": false },
      { "input": "[1,1,1,3,3,4,3,2,4,2]", "output": "true", "isHidden": false },
      { "input": "[1]", "output": "false", "isHidden": true },
      { "input": "[1,1]", "output": "true", "isHidden": true }
    ],
    "functionName": "containsDuplicate",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar containsDuplicate = function(nums) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const nums = JSON.parse(inputData.trim());\n    const result = containsDuplicate(nums);\n    console.log(result ? 'true' : 'false');\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def containsDuplicate(self, nums: List[int]) -> bool:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.read().strip())\n    result = Solution().containsDuplicate(nums)\n    print('true' if result else 'false')"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\n#include <unordered_set>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    Solution sol;\n    cout << (sol.containsDuplicate(nums) ? \"true\" : \"false\") << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        Solution sol = new Solution();\n        System.out.println(sol.containsDuplicate(nums) ? \"true\" : \"false\");\n    }\n}"
      },
      "c": {
        "starterCode": "#include <stdbool.h>\n\nbool containsDuplicate(int* nums, int numsSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    printf(\"%s\\n\", containsDuplicate(nums, size) ? \"true\" : \"false\");\n    return 0;\n}"
      }
    }
  },
  {
    "id": "invert-binary-tree",
    "title": "Invert Binary Tree",
    "difficulty": "easy",
    "tags": ["tree", "dfs", "bfs", "binary-tree"],
    "statement": "Given the 'root' of a binary tree, invert the tree, and return its root.",
    "constraints": [
      "The number of nodes in the tree is in the range [0, 100].",
      "-100 <= Node.val <= 100"
    ],
    "inputFormat": "A single JSON array representing the binary tree in level-order (use null for missing nodes).",
    "outputFormat": "A JSON array representing the inverted binary tree in level-order.",
    "samples": [
      { "input": "root = [4,2,7,1,3,6,9]", "output": "[4,7,2,9,6,3,1]", "explanation": "Swap left and right children at every node." },
      { "input": "root = [2,1,3]", "output": "[2,3,1]", "explanation": "Simple three-node tree inverted." },
      { "input": "root = []", "output": "[]", "explanation": "Empty tree remains empty." }
    ],
    "testCases": [
      { "input": "[4,2,7,1,3,6,9]", "output": "[4,7,2,9,6,3,1]", "isHidden": false },
      { "input": "[2,1,3]", "output": "[2,3,1]", "isHidden": false },
      { "input": "[]", "output": "[]", "isHidden": false },
      { "input": "[1]", "output": "[1]", "isHidden": true },
      { "input": "[1,2]", "output": "[1,null,2]", "isHidden": true }
    ],
    "functionName": "invertTree",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {TreeNode}\n */\nvar invertTree = function(root) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nfunction TreeNode(val, left, right) {\n    this.val = (val===undefined ? 0 : val);\n    this.left = (left===undefined ? null : left);\n    this.right = (right===undefined ? null : right);\n}\nfunction arrToTree(arr) {\n    if (!arr.length || arr[0] === null) return null;\n    let root = new TreeNode(arr[0]);\n    let queue = [root];\n    let i = 1;\n    while (i < arr.length) {\n        let node = queue.shift();\n        if (i < arr.length && arr[i] !== null) {\n            node.left = new TreeNode(arr[i]);\n            queue.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null) {\n            node.right = new TreeNode(arr[i]);\n            queue.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArr(root) {\n    if (!root) return [];\n    let result = [];\n    let queue = [root];\n    while (queue.length) {\n        let node = queue.shift();\n        if (node) {\n            result.push(node.val);\n            queue.push(node.left);\n            queue.push(node.right);\n        } else {\n            result.push(null);\n        }\n    }\n    while (result.length && result[result.length-1] === null) result.pop();\n    return result;\n}\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const arr = JSON.parse(inputData.trim());\n    const root = arrToTree(arr);\n    const result = invertTree(root);\n    console.log(JSON.stringify(treeToArr(result)));\n});"
      },
      "python": {
        "starterCode": "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def invertTree(self, root: Optional[TreeNode]) -> Optional[TreeNode]:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import Optional\nfrom collections import deque\n\nclass TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right\n\ndef arr_to_tree(arr):\n    if not arr or arr[0] is None:\n        return None\n    root = TreeNode(arr[0])\n    queue = deque([root])\n    i = 1\n    while i < len(arr):\n        node = queue.popleft()\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\ndef tree_to_arr(root):\n    if not root:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node:\n            result.append(node.val)\n            queue.append(node.left)\n            queue.append(node.right)\n        else:\n            result.append(None)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\nif __name__ == '__main__':\n    arr = json.loads(sys.stdin.read().strip())\n    root = arr_to_tree(arr)\n    result = Solution().invertTree(root)\n    print(json.dumps(tree_to_arr(result)))"
      },
      "cpp": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    TreeNode* invertTree(TreeNode* root) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode() : val(0), left(nullptr), right(nullptr) {}\n    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n};\n\nTreeNode* arrToTree(vector<int>& arr, vector<bool>& isNull) {\n    if (arr.empty() || isNull[0]) return nullptr;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (i < arr.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < arr.size() && !isNull[i]) {\n            node->left = new TreeNode(arr[i]);\n            q.push(node->left);\n        }\n        i++;\n        if (i < arr.size() && !isNull[i]) {\n            node->right = new TreeNode(arr[i]);\n            q.push(node->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nvoid treeToArr(TreeNode* root, vector<string>& result) {\n    if (!root) return;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* node = q.front(); q.pop();\n        if (node) {\n            result.push_back(to_string(node->val));\n            q.push(node->left);\n            q.push(node->right);\n        } else {\n            result.push_back(\"null\");\n        }\n    }\n    while (!result.empty() && result.back() == \"null\") result.pop_back();\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> arr;\n    vector<bool> isNull;\n    string token = \"\";\n    bool inNull = false;\n    for (size_t i = 0; i < line.size(); i++) {\n        char c = line[i];\n        if (c == 'n') { inNull = true; continue; }\n        if (inNull && c == 'l') { continue; }\n        if (inNull && (c == ',' || c == ']')) { arr.push_back(0); isNull.push_back(true); inNull = false; continue; }\n        if (c == '-' || (c >= '0' && c <= '9')) token += c;\n        else if (!token.empty()) { arr.push_back(stoi(token)); isNull.push_back(false); token = \"\"; }\n    }\n    if (!token.empty()) { arr.push_back(stoi(token)); isNull.push_back(false); }\n    TreeNode* root = arrToTree(arr, isNull);\n    Solution sol;\n    TreeNode* result = sol.invertTree(root);\n    vector<string> out;\n    treeToArr(result, out);\n    cout << \"[\";\n    for (size_t i = 0; i < out.size(); i++) {\n        cout << out[i];\n        if (i < out.size()-1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public TreeNode invertTree(TreeNode root) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode() {}\n    TreeNode(int val) { this.val = val; }\n}\n\npublic class Main {\n    static TreeNode arrToTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        int i = 1;\n        while (i < tokens.length) {\n            TreeNode node = queue.poll();\n            if (i < tokens.length && !tokens[i].equals(\"null\")) {\n                node.left = new TreeNode(Integer.parseInt(tokens[i]));\n                queue.add(node.left);\n            }\n            i++;\n            if (i < tokens.length && !tokens[i].equals(\"null\")) {\n                node.right = new TreeNode(Integer.parseInt(tokens[i]));\n                queue.add(node.right);\n            }\n            i++;\n        }\n        return root;\n    }\n    static String treeToArr(TreeNode root) {\n        if (root == null) return \"[]\";\n        List<String> result = new ArrayList<>();\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        while (!queue.isEmpty()) {\n            TreeNode node = queue.poll();\n            if (node != null) {\n                result.add(String.valueOf(node.val));\n                queue.add(node.left);\n                queue.add(node.right);\n            } else {\n                result.add(\"null\");\n            }\n        }\n        while (!result.isEmpty() && result.get(result.size()-1).equals(\"null\")) result.remove(result.size()-1);\n        return \"[\" + String.join(\",\", result) + \"]\";\n    }\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] tokens = line.isEmpty() ? new String[0] : line.split(\",\");\n        for (int i = 0; i < tokens.length; i++) tokens[i] = tokens[i].trim();\n        TreeNode root = arrToTree(tokens);\n        Solution sol = new Solution();\n        TreeNode result = sol.invertTree(root);\n        System.out.println(treeToArr(result));\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     struct TreeNode *left;\n *     struct TreeNode *right;\n * };\n */\nstruct TreeNode* invertTree(struct TreeNode* root) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\nint main() {\n    char line[10000];\n    fgets(line, 10000, stdin);\n    printf(\"[]\\n\");\n    return 0;\n}"
      }
    }
  },
  {
    "id": "linked-list-cycle",
    "title": "Linked List Cycle",
    "difficulty": "easy",
    "tags": ["linked-list", "two-pointers"],
    "statement": "Given 'head', the head of a linked list, determine if the linked list has a cycle in it. There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the 'next' pointer.",
    "constraints": [
      "The number of nodes in the list is in the range [0, 10^4].",
      "-10^5 <= Node.val <= 10^5"
    ],
    "inputFormat": "First line: JSON array of node values. Second line: pos (index where tail connects, -1 if no cycle).",
    "outputFormat": "The string 'true' if cycle exists, otherwise 'false'.",
    "samples": [
      { "input": "[3,2,0,-4]\n1", "output": "true", "explanation": "Tail connects to index 1." },
      { "input": "[1,2]\n0", "output": "true", "explanation": "Tail connects to index 0." },
      { "input": "[1]\n-1", "output": "false", "explanation": "No cycle." }
    ],
    "testCases": [
      { "input": "[3,2,0,-4]\n1", "output": "true", "isHidden": false },
      { "input": "[1,2]\n0", "output": "true", "isHidden": false },
      { "input": "[1]\n-1", "output": "false", "isHidden": false },
      { "input": "[]\n-1", "output": "false", "isHidden": true }
    ],
    "functionName": "hasCycle",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * function ListNode(val) {\n *     this.val = val;\n *     this.next = null;\n * }\n */\n/**\n * @param {ListNode} head\n * @return {boolean}\n */\nvar hasCycle = function(head) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nfunction ListNode(val) {\n    this.val = val;\n    this.next = null;\n}\nfunction createListWithCycle(arr, pos) {\n    if (!arr.length) return null;\n    let nodes = arr.map(v => new ListNode(v));\n    for (let i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i+1];\n    if (pos >= 0) nodes[nodes.length-1].next = nodes[pos];\n    return nodes[0];\n}\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const lines = inputData.trim().split('\\n');\n    const arr = JSON.parse(lines[0]);\n    const pos = parseInt(lines[1]);\n    const head = createListWithCycle(arr, pos);\n    const result = hasCycle(head);\n    console.log(result ? 'true' : 'false');\n});"
      },
      "python": {
        "starterCode": "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, x):\n#         self.val = x\n#         self.next = None\nclass Solution:\n    def hasCycle(self, head: Optional[ListNode]) -> bool:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import Optional\n\nclass ListNode:\n    def __init__(self, x):\n        self.val = x\n        self.next = None\n\ndef create_list_with_cycle(arr, pos):\n    if not arr:\n        return None\n    nodes = [ListNode(v) for v in arr]\n    for i in range(len(nodes) - 1):\n        nodes[i].next = nodes[i+1]\n    if pos >= 0:\n        nodes[-1].next = nodes[pos]\n    return nodes[0]\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().strip().split('\\n')\n    arr = json.loads(lines[0])\n    pos = int(lines[1])\n    head = create_list_with_cycle(arr, pos)\n    result = Solution().hasCycle(head)\n    print('true' if result else 'false')"
      },
      "cpp": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode(int x) : val(x), next(NULL) {}\n * };\n */\nclass Solution {\npublic:\n    bool hasCycle(ListNode *head) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nstruct ListNode {\n    int val;\n    ListNode *next;\n    ListNode(int x) : val(x), next(NULL) {}\n};\n\nListNode* createListWithCycle(vector<int>& arr, int pos) {\n    if (arr.empty()) return NULL;\n    vector<ListNode*> nodes;\n    for (int v : arr) nodes.push_back(new ListNode(v));\n    for (size_t i = 0; i < nodes.size() - 1; i++) nodes[i]->next = nodes[i+1];\n    if (pos >= 0) nodes.back()->next = nodes[pos];\n    return nodes[0];\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> arr;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { arr.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) arr.push_back(neg ? -stoi(num) : stoi(num));\n    int pos;\n    cin >> pos;\n    ListNode* head = createListWithCycle(arr, pos);\n    Solution sol;\n    cout << (sol.hasCycle(head) ? \"true\" : \"false\") << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode(int x) {\n *         val = x;\n *         next = null;\n *     }\n * }\n */\npublic class Solution {\n    public boolean hasCycle(ListNode head) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\nclass ListNode {\n    int val;\n    ListNode next;\n    ListNode(int x) { val = x; next = null; }\n}\n\npublic class Main {\n    static ListNode createListWithCycle(int[] arr, int pos) {\n        if (arr.length == 0) return null;\n        ListNode[] nodes = new ListNode[arr.length];\n        for (int i = 0; i < arr.length; i++) nodes[i] = new ListNode(arr[i]);\n        for (int i = 0; i < nodes.length - 1; i++) nodes[i].next = nodes[i+1];\n        if (pos >= 0) nodes[nodes.length-1].next = nodes[pos];\n        return nodes[0];\n    }\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        int[] arr;\n        if (line.isEmpty()) {\n            arr = new int[0];\n        } else {\n            String[] parts = line.split(\",\");\n            arr = new int[parts.length];\n            for (int i = 0; i < parts.length; i++) arr[i] = Integer.parseInt(parts[i].trim());\n        }\n        int pos = Integer.parseInt(br.readLine().trim());\n        ListNode head = createListWithCycle(arr, pos);\n        Solution sol = new Solution();\n        System.out.println(sol.hasCycle(head) ? \"true\" : \"false\");\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     struct ListNode *next;\n * };\n */\nbool hasCycle(struct ListNode *head) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <stdbool.h>\n#include <string.h>\n\nstruct ListNode {\n    int val;\n    struct ListNode *next;\n};\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int arr[10000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            arr[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int pos;\n    scanf(\"%d\", &pos);\n    if (size == 0) { printf(\"false\\n\"); return 0; }\n    struct ListNode** nodes = malloc(size * sizeof(struct ListNode*));\n    for (int i = 0; i < size; i++) {\n        nodes[i] = malloc(sizeof(struct ListNode));\n        nodes[i]->val = arr[i];\n        nodes[i]->next = NULL;\n    }\n    for (int i = 0; i < size - 1; i++) nodes[i]->next = nodes[i+1];\n    if (pos >= 0) nodes[size-1]->next = nodes[pos];\n    struct ListNode* head = nodes[0];\n    printf(\"%s\\n\", hasCycle(head) ? \"true\" : \"false\");\n    return 0;\n}"
      }
    }
  },
  {
    "id": "longest-substring-without-repeating-characters",
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "medium",
    "tags": ["hash-table", "string", "sliding-window"],
    "statement": "Given a string 's', find the length of the longest substring without repeating characters.",
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "inputFormat": "A single string s.",
    "outputFormat": "A single integer representing the length of the longest substring without repeating characters.",
    "samples": [
      { "input": "s = \"abcabcbb\"", "output": "3", "explanation": "The answer is 'abc', with length 3." },
      { "input": "s = \"bbbbb\"", "output": "1", "explanation": "The answer is 'b', with length 1." },
      { "input": "s = \"pwwkew\"", "output": "3", "explanation": "The answer is 'wke', with length 3." }
    ],
    "testCases": [
      { "input": "abcabcbb", "output": "3", "isHidden": false },
      { "input": "bbbbb", "output": "1", "isHidden": false },
      { "input": "pwwkew", "output": "3", "isHidden": false },
      { "input": "", "output": "0", "isHidden": true },
      { "input": " ", "output": "1", "isHidden": true },
      { "input": "au", "output": "2", "isHidden": true }
    ],
    "functionName": "lengthOfLongestSubstring",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const s = inputData.trimEnd().replace(/\\r?\\n$/, '');\n    console.log(lengthOfLongestSubstring(s));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        ",
        "wrapperTemplate": "import sys\n\nif __name__ == '__main__':\n    s = sys.stdin.read().rstrip('\\n')\n    print(Solution().lengthOfLongestSubstring(s))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <string>\n#include <unordered_map>\nusing namespace std;\n\nint main() {\n    string s;\n    getline(cin, s);\n    Solution sol;\n    cout << sol.lengthOfLongestSubstring(s) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String s = br.readLine();\n        if (s == null) s = \"\";\n        Solution sol = new Solution();\n        System.out.println(sol.lengthOfLongestSubstring(s));\n    }\n}"
      },
      "c": {
        "starterCode": "int lengthOfLongestSubstring(char* s) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <string.h>\n\nint main() {\n    char s[50001];\n    if (fgets(s, 50001, stdin)) {\n        int len = strlen(s);\n        if (len > 0 && s[len-1] == '\\n') s[len-1] = '\\0';\n    } else {\n        s[0] = '\\0';\n    }\n    printf(\"%d\\n\", lengthOfLongestSubstring(s));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "3sum",
    "title": "3Sum",
    "difficulty": "medium",
    "tags": ["array", "two-pointers", "sorting"],
    "statement": "Given an integer array 'nums', return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0. Notice that the solution set must not contain duplicate triplets.",
    "constraints": [
      "3 <= nums.length <= 3000",
      "-10^5 <= nums[i] <= 10^5"
    ],
    "inputFormat": "A single JSON array of integers.",
    "outputFormat": "A JSON array of triplets (arrays of 3 integers each) that sum to zero.",
    "samples": [
      { "input": "nums = [-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]", "explanation": "Two triplets sum to zero." },
      { "input": "nums = [0,1,1]", "output": "[]", "explanation": "No triplets sum to zero." },
      { "input": "nums = [0,0,0]", "output": "[[0,0,0]]", "explanation": "One triplet of zeros." }
    ],
    "testCases": [
      { "input": "[-1,0,1,2,-1,-4]", "output": "[[-1,-1,2],[-1,0,1]]", "isHidden": false },
      { "input": "[0,1,1]", "output": "[]", "isHidden": false },
      { "input": "[0,0,0]", "output": "[[0,0,0]]", "isHidden": false },
      { "input": "[0,0,0,0]", "output": "[[0,0,0]]", "isHidden": true }
    ],
    "functionName": "threeSum",
    "limits": { "timeMs": 2000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const nums = JSON.parse(inputData.trim());\n    const result = threeSum(nums);\n    console.log(JSON.stringify(result));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def threeSum(self, nums: List[int]) -> List[List[int]]:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    nums = json.loads(sys.stdin.read().strip())\n    result = Solution().threeSum(nums)\n    print(json.dumps(result))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\n#include <algorithm>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    Solution sol;\n    vector<vector<int>> result = sol.threeSum(nums);\n    cout << \"[\";\n    for (size_t i = 0; i < result.size(); i++) {\n        cout << \"[\";\n        for (size_t j = 0; j < result[i].size(); j++) {\n            cout << result[i][j];\n            if (j < result[i].size()-1) cout << \",\";\n        }\n        cout << \"]\";\n        if (i < result.size()-1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        Solution sol = new Solution();\n        List<List<Integer>> result = sol.threeSum(nums);\n        StringBuilder sb = new StringBuilder(\"[\");\n        for (int i = 0; i < result.size(); i++) {\n            sb.append(\"[\");\n            for (int j = 0; j < result.get(i).size(); j++) {\n                sb.append(result.get(i).get(j));\n                if (j < result.get(i).size()-1) sb.append(\",\");\n            }\n            sb.append(\"]\");\n            if (i < result.size()-1) sb.append(\",\");\n        }\n        sb.append(\"]\");\n        System.out.println(sb.toString());\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Return an array of arrays of size *returnSize.\n * The sizes of the arrays are returned as *returnColumnSizes array.\n * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().\n */\nint** threeSum(int* nums, int numsSize, int* returnSize, int** returnColumnSizes) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[3001];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int returnSize;\n    int* returnColumnSizes;\n    int** result = threeSum(nums, size, &returnSize, &returnColumnSizes);\n    printf(\"[\");\n    for (int i = 0; i < returnSize; i++) {\n        printf(\"[\");\n        for (int j = 0; j < returnColumnSizes[i]; j++) {\n            printf(\"%d\", result[i][j]);\n            if (j < returnColumnSizes[i]-1) printf(\",\");\n        }\n        printf(\"]\");\n        if (i < returnSize-1) printf(\",\");\n    }\n    printf(\"]\\n\");\n    return 0;\n}"
      }
    }
  },
  {
    "id": "coin-change",
    "title": "Coin Change",
    "difficulty": "medium",
    "tags": ["array", "dynamic-programming", "bfs"],
    "statement": "You are given an integer array 'coins' representing coins of different denominations and an integer 'amount' representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1. You may assume that you have an infinite number of each kind of coin.",
    "constraints": [
      "1 <= coins.length <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4"
    ],
    "inputFormat": "Two lines. First line: coins as JSON array. Second line: amount as integer.",
    "outputFormat": "A single integer representing the minimum number of coins, or -1 if impossible.",
    "samples": [
      { "input": "coins = [1,2,5], amount = 11", "output": "3", "explanation": "11 = 5 + 5 + 1" },
      { "input": "coins = [2], amount = 3", "output": "-1", "explanation": "Cannot make 3 with only 2s." },
      { "input": "coins = [1], amount = 0", "output": "0", "explanation": "0 amount needs 0 coins." }
    ],
    "testCases": [
      { "input": "[1,2,5]\n11", "output": "3", "isHidden": false },
      { "input": "[2]\n3", "output": "-1", "isHidden": false },
      { "input": "[1]\n0", "output": "0", "isHidden": false },
      { "input": "[1]\n1", "output": "1", "isHidden": true },
      { "input": "[1,2,5]\n100", "output": "20", "isHidden": true }
    ],
    "functionName": "coinChange",
    "limits": { "timeMs": 2000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = function(coins, amount) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const lines = inputData.trim().split('\\n');\n    const coins = JSON.parse(lines[0]);\n    const amount = parseInt(lines[1]);\n    console.log(coinChange(coins, amount));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def coinChange(self, coins: List[int], amount: int) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().strip().split('\\n')\n    coins = json.loads(lines[0])\n    amount = int(lines[1])\n    print(Solution().coinChange(coins, amount))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> coins;\n    string num = \"\";\n    for (char c : line) {\n        if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { coins.push_back(stoi(num)); num = \"\"; }\n    }\n    if (!num.empty()) coins.push_back(stoi(num));\n    int amount;\n    cin >> amount;\n    Solution sol;\n    cout << sol.coinChange(coins, amount) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] coins = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) coins[i] = Integer.parseInt(parts[i].trim());\n        int amount = Integer.parseInt(br.readLine().trim());\n        Solution sol = new Solution();\n        System.out.println(sol.coinChange(coins, amount));\n    }\n}"
      },
      "c": {
        "starterCode": "int coinChange(int* coins, int coinsSize, int amount) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[10000];\n    fgets(line, 10000, stdin);\n    int coins[12];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p >= '0' && *p <= '9') {\n            coins[size++] = atoi(p);\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int amount;\n    scanf(\"%d\", &amount);\n    printf(\"%d\\n\", coinChange(coins, size, amount));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "number-of-islands",
    "title": "Number of Islands",
    "difficulty": "medium",
    "tags": ["array", "dfs", "bfs", "union-find", "matrix"],
    "statement": "Given an 'm x n' 2D binary grid 'grid' which represents a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is '0' or '1'."
    ],
    "inputFormat": "A single JSON 2D array of characters '0' or '1', e.g. [[\"1\",\"1\",\"0\"],[\"0\",\"1\",\"0\"]].",
    "outputFormat": "A single integer representing the number of islands.",
    "samples": [
      { "input": "grid = [[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", "output": "1" },
      { "input": "grid = [[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "output": "3" }
    ],
    "testCases": [
      { "input": "[[\"1\",\"1\",\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"1\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"0\",\"0\"]]", "output": "1", "isHidden": false },
      { "input": "[[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"1\",\"1\",\"0\",\"0\",\"0\"],[\"0\",\"0\",\"1\",\"0\",\"0\"],[\"0\",\"0\",\"0\",\"1\",\"1\"]]", "output": "3", "isHidden": false },
      { "input": "[[\"0\"]]", "output": "0", "isHidden": true }
    ],
    "functionName": "numIslands",
    "limits": { "timeMs": 2000, "memoryMb": 512 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {character[][]} grid\n * @return {number}\n */\nvar numIslands = function(grid) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const grid = JSON.parse(inputData.trim());\n    console.log(numIslands(grid));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    grid = json.loads(sys.stdin.read().strip())\n    print(Solution().numIslands(grid))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<vector<char>> grid;\n    vector<char> row;\n    for (size_t i = 0; i < line.size(); i++) {\n        if (line[i] == '0' || line[i] == '1') {\n            row.push_back(line[i]);\n        } else if (line[i] == ']' && !row.empty()) {\n            grid.push_back(row);\n            row.clear();\n        }\n    }\n    Solution sol;\n    cout << sol.numIslands(grid) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int numIslands(char[][] grid) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        List<List<Character>> rows = new ArrayList<>();\n        List<Character> row = new ArrayList<>();\n        for (int i = 0; i < line.length(); i++) {\n            char c = line.charAt(i);\n            if (c == '0' || c == '1') row.add(c);\n            else if (c == ']' && !row.isEmpty()) { rows.add(new ArrayList<>(row)); row.clear(); }\n        }\n        char[][] grid = new char[rows.size()][];\n        for (int i = 0; i < rows.size(); i++) {\n            grid[i] = new char[rows.get(i).size()];\n            for (int j = 0; j < rows.get(i).size(); j++) grid[i][j] = rows.get(i).get(j);\n        }\n        Solution sol = new Solution();\n        System.out.println(sol.numIslands(grid));\n    }\n}"
      },
      "c": {
        "starterCode": "int numIslands(char** grid, int gridSize, int* gridColSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    char** grid = malloc(300 * sizeof(char*));\n    int* colSizes = malloc(300 * sizeof(int));\n    int rows = 0;\n    char row[300];\n    int col = 0;\n    for (int i = 0; line[i]; i++) {\n        if (line[i] == '0' || line[i] == '1') row[col++] = line[i];\n        else if (line[i] == ']' && col > 0) {\n            grid[rows] = malloc(col + 1);\n            memcpy(grid[rows], row, col);\n            grid[rows][col] = '\\0';\n            colSizes[rows] = col;\n            rows++;\n            col = 0;\n        }\n    }\n    printf(\"%d\\n\", numIslands(grid, rows, colSizes));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "container-with-most-water",
    "title": "Container With Most Water",
    "difficulty": "medium",
    "tags": ["array", "two-pointers", "greedy"],
    "statement": "You are given an integer array 'height' of length 'n'. There are 'n' vertical lines drawn such that the two endpoints of the 'i-th' line are '(i, 0)' and '(i, height[i])'. Find two lines that together with the x-axis form a container, such that the container contains the most water. Return the maximum amount of water a container can store.",
    "constraints": [
      "n == height.length",
      "2 <= n <= 10^5",
      "0 <= height[i] <= 10^4"
    ],
    "inputFormat": "A single JSON array of integers height.",
    "outputFormat": "A single integer representing the maximum area of water the container can store.",
    "samples": [
      { "input": "height = [1,8,6,2,5,4,8,3,7]", "output": "49", "explanation": "Max area is 49 with lines at indices 1 and 8 (height = 8 and 7, width = 7)." },
      { "input": "height = [1,1]", "output": "1" }
    ],
    "testCases": [
      { "input": "[1,8,6,2,5,4,8,3,7]", "output": "49", "isHidden": false },
      { "input": "[1,1]", "output": "1", "isHidden": false },
      { "input": "[4,3,2,1,4]", "output": "16", "isHidden": true },
      { "input": "[1,2,1]", "output": "2", "isHidden": true }
    ],
    "functionName": "maxArea",
    "limits": { "timeMs": 1500, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const height = JSON.parse(inputData.trim());\n    console.log(maxArea(height));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def maxArea(self, height: List[int]) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    height = json.loads(sys.stdin.read().strip())\n    print(Solution().maxArea(height))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> height;\n    string num = \"\";\n    for (char c : line) {\n        if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { height.push_back(stoi(num)); num = \"\"; }\n    }\n    if (!num.empty()) height.push_back(stoi(num));\n    Solution sol;\n    cout << sol.maxArea(height) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int maxArea(int[] height) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] height = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) height[i] = Integer.parseInt(parts[i].trim());\n        Solution sol = new Solution();\n        System.out.println(sol.maxArea(height));\n    }\n}"
      },
      "c": {
        "starterCode": "int maxArea(int* height, int heightSize) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int height[100000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p >= '0' && *p <= '9') {\n            height[size++] = atoi(p);\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    printf(\"%d\\n\", maxArea(height, size));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "search-in-rotated-sorted-array",
    "title": "Search in Rotated Sorted Array",
    "difficulty": "medium",
    "tags": ["array", "binary-search"],
    "statement": "There is an integer array 'nums' sorted in ascending order (with distinct values). Prior to being passed to your function, 'nums' is possibly rotated at an unknown pivot index 'k' (1 <= k < nums.length). Given the array 'nums' after the possible rotation and an integer 'target', return the index of 'target' if it is in 'nums', or '-1' if it is not in 'nums'. You must write an algorithm with O(log n) runtime complexity.",
    "constraints": [
      "1 <= nums.length <= 5000",
      "-10^4 <= nums[i] <= 10^4",
      "All values of nums are unique.",
      "nums is an ascending array that is possibly rotated.",
      "-10^4 <= target <= 10^4"
    ],
    "inputFormat": "Two lines. First line: nums as a JSON array. Second line: target as integer.",
    "outputFormat": "A single integer: index of target if found, otherwise -1.",
    "samples": [
      { "input": "nums = [4,5,6,7,0,1,2], target = 0", "output": "4" },
      { "input": "nums = [4,5,6,7,0,1,2], target = 3", "output": "-1" }
    ],
    "testCases": [
      { "input": "[4,5,6,7,0,1,2]\n0", "output": "4", "isHidden": false },
      { "input": "[4,5,6,7,0,1,2]\n3", "output": "-1", "isHidden": false },
      { "input": "[1]\n0", "output": "-1", "isHidden": true }
    ],
    "functionName": "search",
    "limits": { "timeMs": 1000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const lines = inputData.trim().split('\\n');\n    const nums = JSON.parse(lines[0]);\n    const target = parseInt(lines[1]);\n    console.log(search(nums, target));\n});"
      },
      "python": {
        "starterCode": "class Solution:\n    def search(self, nums: List[int], target: int) -> int:\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom typing import List\n\nif __name__ == '__main__':\n    lines = sys.stdin.read().strip().split('\\n')\n    nums = json.loads(lines[0])\n    target = int(lines[1])\n    print(Solution().search(nums, target))"
      },
      "cpp": {
        "starterCode": "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\nusing namespace std;\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> nums;\n    string num = \"\";\n    bool neg = false;\n    for (char c : line) {\n        if (c == '-') neg = true;\n        else if (c >= '0' && c <= '9') num += c;\n        else if (!num.empty()) { nums.push_back(neg ? -stoi(num) : stoi(num)); num = \"\"; neg = false; }\n    }\n    if (!num.empty()) nums.push_back(neg ? -stoi(num) : stoi(num));\n    int target;\n    cin >> target;\n    Solution sol;\n    cout << sol.search(nums, target) << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "class Solution {\n    public int search(int[] nums, int target) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] parts = line.split(\",\");\n        int[] nums = new int[parts.length];\n        for (int i = 0; i < parts.length; i++) nums[i] = Integer.parseInt(parts[i].trim());\n        int target = Integer.parseInt(br.readLine().trim());\n        Solution sol = new Solution();\n        System.out.println(sol.search(nums, target));\n    }\n}"
      },
      "c": {
        "starterCode": "int search(int* nums, int numsSize, int target) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    int nums[5000];\n    int size = 0;\n    char* p = line;\n    while (*p) {\n        if (*p == '-' || (*p >= '0' && *p <= '9')) {\n            nums[size++] = atoi(p);\n            if (*p == '-') p++;\n            while (*p >= '0' && *p <= '9') p++;\n        } else p++;\n    }\n    int target;\n    scanf(\"%d\", &target);\n    printf(\"%d\\n\", search(nums, size, target));\n    return 0;\n}"
      }
    }
  },
  {
    "id": "serialize-and-deserialize-binary-tree",
    "title": "Serialize and Deserialize Binary Tree",
    "difficulty": "hard",
    "tags": ["tree", "design", "string", "bfs", "dfs"],
    "statement": "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment. Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.",
    "constraints": [
      "The number of nodes in the tree is in the range [0, 10^4].",
      "-1000 <= Node.val <= 1000"
    ],
    "inputFormat": "A single JSON array representing the binary tree in level-order (use null for missing nodes), e.g. [1,2,3,null,null,4,5].",
    "outputFormat": "A JSON array representing the deserialized tree serialized back to the same level-order format. In tests we typically check that deserialize(serialize(root)) preserves structure.",
    "samples": [
      { "input": "root = [1,2,3,null,null,4,5]", "output": "[1,2,3,null,null,4,5]" },
      { "input": "root = []", "output": "[]" }
    ],
    "testCases": [
      { "input": "[1,2,3,null,null,4,5]", "output": "[1,2,3,null,null,4,5]", "isHidden": false },
      { "input": "[]", "output": "[]", "isHidden": true }
    ],
    "functionName": "Codec",
    "limits": { "timeMs": 2000, "memoryMb": 256 },
    "languages": {
      "javascript": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n\n/**\n * Encodes a tree to a single string.\n *\n * @param {TreeNode} root\n * @return {string}\n */\nvar serialize = function(root) {\n    \n};\n\n/**\n * Decodes your encoded data to tree.\n *\n * @param {string} data\n * @return {TreeNode}\n */\nvar deserialize = function(data) {\n    \n};",
        "wrapperTemplate": "const readline = require('readline');\nfunction TreeNode(val) {\n    this.val = val;\n    this.left = this.right = null;\n}\nfunction arrToTree(arr) {\n    if (!arr.length || arr[0] === null) return null;\n    let root = new TreeNode(arr[0]);\n    let queue = [root];\n    let i = 1;\n    while (i < arr.length) {\n        let node = queue.shift();\n        if (i < arr.length && arr[i] !== null) {\n            node.left = new TreeNode(arr[i]);\n            queue.push(node.left);\n        }\n        i++;\n        if (i < arr.length && arr[i] !== null) {\n            node.right = new TreeNode(arr[i]);\n            queue.push(node.right);\n        }\n        i++;\n    }\n    return root;\n}\nfunction treeToArr(root) {\n    if (!root) return [];\n    let result = [];\n    let queue = [root];\n    while (queue.length) {\n        let node = queue.shift();\n        if (node) {\n            result.push(node.val);\n            queue.push(node.left);\n            queue.push(node.right);\n        } else {\n            result.push(null);\n        }\n    }\n    while (result.length && result[result.length-1] === null) result.pop();\n    return result;\n}\nlet inputData = '';\nprocess.stdin.on('data', d => inputData += d);\nprocess.stdin.on('end', () => {\n    const arr = JSON.parse(inputData.trim());\n    const root = arrToTree(arr);\n    const serialized = serialize(root);\n    const deserialized = deserialize(serialized);\n    console.log(JSON.stringify(treeToArr(deserialized)));\n});"
      },
      "python": {
        "starterCode": "# Definition for a binary tree node.\n# class TreeNode(object):\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\nclass Codec:\n\n    def serialize(self, root):\n        \"\"\"Encodes a tree to a single string.\n        \n        :type root: TreeNode\n        :rtype: str\n        \"\"\"\n        \n\n    def deserialize(self, data):\n        \"\"\"Decodes your encoded data to tree.\n        \n        :type data: str\n        :rtype: TreeNode\n        \"\"\"\n        ",
        "wrapperTemplate": "import sys\nimport json\nfrom collections import deque\n\nclass TreeNode(object):\n    def __init__(self, x):\n        self.val = x\n        self.left = None\n        self.right = None\n\ndef arr_to_tree(arr):\n    if not arr or arr[0] is None:\n        return None\n    root = TreeNode(arr[0])\n    queue = deque([root])\n    i = 1\n    while i < len(arr):\n        node = queue.popleft()\n        if i < len(arr) and arr[i] is not None:\n            node.left = TreeNode(arr[i])\n            queue.append(node.left)\n        i += 1\n        if i < len(arr) and arr[i] is not None:\n            node.right = TreeNode(arr[i])\n            queue.append(node.right)\n        i += 1\n    return root\n\ndef tree_to_arr(root):\n    if not root:\n        return []\n    result = []\n    queue = deque([root])\n    while queue:\n        node = queue.popleft()\n        if node:\n            result.append(node.val)\n            queue.append(node.left)\n            queue.append(node.right)\n        else:\n            result.append(None)\n    while result and result[-1] is None:\n        result.pop()\n    return result\n\nif __name__ == '__main__':\n    arr = json.loads(sys.stdin.read().strip())\n    root = arr_to_tree(arr)\n    codec = Codec()\n    serialized = codec.serialize(root)\n    deserialized = codec.deserialize(serialized)\n    print(json.dumps(tree_to_arr(deserialized)))"
      },
      "cpp": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Codec {\npublic:\n\n    // Encodes a tree to a single string.\n    string serialize(TreeNode* root) {\n        \n    }\n\n    // Decodes your encoded data to tree.\n    TreeNode* deserialize(string data) {\n        \n    }\n};",
        "wrapperTemplate": "#include <iostream>\n#include <vector>\n#include <string>\n#include <queue>\nusing namespace std;\n\nstruct TreeNode {\n    int val;\n    TreeNode *left;\n    TreeNode *right;\n    TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n};\n\nTreeNode* arrToTree(vector<int>& arr, vector<bool>& isNull) {\n    if (arr.empty() || isNull[0]) return NULL;\n    TreeNode* root = new TreeNode(arr[0]);\n    queue<TreeNode*> q;\n    q.push(root);\n    int i = 1;\n    while (i < arr.size()) {\n        TreeNode* node = q.front(); q.pop();\n        if (i < arr.size() && !isNull[i]) {\n            node->left = new TreeNode(arr[i]);\n            q.push(node->left);\n        }\n        i++;\n        if (i < arr.size() && !isNull[i]) {\n            node->right = new TreeNode(arr[i]);\n            q.push(node->right);\n        }\n        i++;\n    }\n    return root;\n}\n\nvoid treeToArr(TreeNode* root, vector<string>& result) {\n    if (!root) return;\n    queue<TreeNode*> q;\n    q.push(root);\n    while (!q.empty()) {\n        TreeNode* node = q.front(); q.pop();\n        if (node) {\n            result.push_back(to_string(node->val));\n            q.push(node->left);\n            q.push(node->right);\n        } else {\n            result.push_back(\"null\");\n        }\n    }\n    while (!result.empty() && result.back() == \"null\") result.pop_back();\n}\n\nint main() {\n    string line;\n    getline(cin, line);\n    vector<int> arr;\n    vector<bool> isNull;\n    string token = \"\";\n    bool inNull = false;\n    for (size_t i = 0; i < line.size(); i++) {\n        char c = line[i];\n        if (c == 'n') { inNull = true; continue; }\n        if (inNull && c == 'l') { continue; }\n        if (inNull && (c == ',' || c == ']')) { arr.push_back(0); isNull.push_back(true); inNull = false; continue; }\n        if (c == '-' || (c >= '0' && c <= '9')) token += c;\n        else if (!token.empty()) { arr.push_back(stoi(token)); isNull.push_back(false); token = \"\"; }\n    }\n    if (!token.empty()) { arr.push_back(stoi(token)); isNull.push_back(false); }\n    TreeNode* root = arrToTree(arr, isNull);\n    Codec codec;\n    string serialized = codec.serialize(root);\n    TreeNode* deserialized = codec.deserialize(serialized);\n    vector<string> out;\n    treeToArr(deserialized, out);\n    cout << \"[\";\n    for (size_t i = 0; i < out.size(); i++) {\n        cout << out[i];\n        if (i < out.size()-1) cout << \",\";\n    }\n    cout << \"]\" << endl;\n    return 0;\n}"
      },
      "java": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode(int x) { val = x; }\n * }\n */\npublic class Codec {\n\n    // Encodes a tree to a single string.\n    public String serialize(TreeNode root) {\n        \n    }\n\n    // Decodes your encoded data to tree.\n    public TreeNode deserialize(String data) {\n        \n    }\n}",
        "wrapperTemplate": "import java.util.*;\nimport java.io.*;\n\nclass TreeNode {\n    int val;\n    TreeNode left;\n    TreeNode right;\n    TreeNode(int x) { val = x; }\n}\n\npublic class Main {\n    static TreeNode arrToTree(String[] tokens) {\n        if (tokens.length == 0 || tokens[0].equals(\"null\")) return null;\n        TreeNode root = new TreeNode(Integer.parseInt(tokens[0]));\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        int i = 1;\n        while (i < tokens.length) {\n            TreeNode node = queue.poll();\n            if (i < tokens.length && !tokens[i].equals(\"null\")) {\n                node.left = new TreeNode(Integer.parseInt(tokens[i]));\n                queue.add(node.left);\n            }\n            i++;\n            if (i < tokens.length && !tokens[i].equals(\"null\")) {\n                node.right = new TreeNode(Integer.parseInt(tokens[i]));\n                queue.add(node.right);\n            }\n            i++;\n        }\n        return root;\n    }\n    static String treeToArr(TreeNode root) {\n        if (root == null) return \"[]\";\n        List<String> result = new ArrayList<>();\n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.add(root);\n        while (!queue.isEmpty()) {\n            TreeNode node = queue.poll();\n            if (node != null) {\n                result.add(String.valueOf(node.val));\n                queue.add(node.left);\n                queue.add(node.right);\n            } else {\n                result.add(\"null\");\n            }\n        }\n        while (!result.isEmpty() && result.get(result.size()-1).equals(\"null\")) result.remove(result.size()-1);\n        return \"[\" + String.join(\",\", result) + \"]\";\n    }\n    public static void main(String[] args) throws Exception {\n        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));\n        String line = br.readLine().trim();\n        line = line.substring(1, line.length()-1);\n        String[] tokens = line.isEmpty() ? new String[0] : line.split(\",\");\n        for (int i = 0; i < tokens.length; i++) tokens[i] = tokens[i].trim();\n        TreeNode root = arrToTree(tokens);\n        Codec codec = new Codec();\n        String serialized = codec.serialize(root);\n        TreeNode deserialized = codec.deserialize(serialized);\n        System.out.println(treeToArr(deserialized));\n    }\n}"
      },
      "c": {
        "starterCode": "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     struct TreeNode *left;\n *     struct TreeNode *right;\n * };\n */\n\n/** Encodes a tree to a single string. */\nchar* serialize(struct TreeNode* root) {\n    \n}\n\n/** Decodes your encoded data to tree. */\nstruct TreeNode* deserialize(char* data) {\n    \n}",
        "wrapperTemplate": "#include <stdio.h>\n#include <stdlib.h>\n#include <string.h>\n\nstruct TreeNode {\n    int val;\n    struct TreeNode *left;\n    struct TreeNode *right;\n};\n\nint main() {\n    char line[100000];\n    fgets(line, 100000, stdin);\n    printf(\"[]\\n\");\n    return 0;\n}"
      }
    }
  }
];
