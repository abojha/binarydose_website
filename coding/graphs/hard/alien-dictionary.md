---
title: Alien Dictionary
description: ""
tags:
  - graphs
  - hard
  - sort
  - topo
---

### Problem Statement:

A new alien language uses the English alphabet, but the order of letters is unknown. You are given a list of **words[]** from the alien language’s dictionary, where the words are claimed to be **sorted lexicographically** according to the language’s rules.

Your task is to determine **the correct order of letters** in this alien language based on the given words. If the order is valid, return a string containing the unique letters in lexicographically increasing order as per the new language's rules. If there are multiple valid orders, return any one of them.

However, if the given arrangement of words is inconsistent with any possible letter ordering, return an empty string **("")**.

> A string a is lexicographically smaller than a string b if, at the first position where they differ, the character in a appears earlier in the alien language than the corresponding character in b. If all characters in the shorter word match the beginning of the longer word, the shorter word is considered smaller.
> 

**Note:** Your implementation will be tested using a driver code. It will print **true** if your returned order correctly follows the alien language’s lexicographic rules; otherwise, it will print **false**.

- Example:
    
    ```
    **Examples:**
    
    ```
    Input: words[] = ["baa", "abcd", "abca", "cab", "cad"]
    Output: true
    Explanation:A possible corrct order of letters in the alien dictionary is "bdac".
    The pair "baa" and "abcd" suggests 'b' appears before 'a' in the alien dictionary.
    The pair "abcd" and "abca" suggests 'd' appears before 'a' in the alien dictionary.
    The pair "abca" and "cab" suggests 'a' appears before 'c' in the alien dictionary.
    The pair "cab" and "cad" suggests 'b' appears before 'd' in the alien dictionary.
    So, 'b' → 'd' → 'a' → 'c' is a valid ordering.
    ```
    
    ```
    Input:words[] = ["caa", "aaa", "aab"]
    Output: true
    Explanation: A possible corrct order of letters in the alien dictionary is "cab".
    The pair "caa" and "aaa" suggests 'c' appears before 'a'.
    The pair "aaa" and "aab" suggests 'a' appear before 'b' in the alien dictionary.
    So, 'c' → 'a' → 'b' is a valid ordering.
    ```
    
    ```
    Input: words[] = ["ab", "cd", "ef", "ad"]
    Output: ""
    Explanation: No valid ordering of letters is possible.
    The pair "ab" and "ef" suggests "a" appears before "e".
    The pair "ef" and "ad" suggests "e" appears before "a", which contradicts the ordering rules.
    ```
    ```
    

---

## ✅ Solution: Kahn’s Algorithm — Alien Dictionary (Lexicographical Order of Characters)

---

### ✅ Solution Code:

```cpp
class Solution {
  public:
    string findOrder(vector<string> &words) {
        vector<vector<int>> graph(26);
        vector<int> inDeg(26, 0);
        vector<bool> present(26, false);

        // Mark letters that are present
        for (string &word : words) {
            for (char c : word) {
                present[c - 'a'] = true;
            }
        }

        int n = words.size();

        // Build the graph based on first different character rule
        for (int i = 0; i < n - 1; i++) {
            string word1 = words[i];
            string word2 = words[i + 1];

            int len = min(word1.size(), word2.size());
            bool foundDifference = false;

            for (int ptr = 0; ptr < len; ptr++) {
                if (word1[ptr] != word2[ptr]) {
                    graph[word1[ptr] - 'a'].push_back(word2[ptr] - 'a');
                    inDeg[word2[ptr] - 'a']++;
                    foundDifference = true;
                    break;
                }
            }

            // Invalid case: prefix check
            if (!foundDifference && word1.size() > word2.size()) {
                return "";
            }
        }

        queue<int> q;
        for (int i = 0; i < 26; i++) {
            if (present[i] && inDeg[i] == 0) {
                q.push(i);
            }
        }

        string res = "";

        while (!q.empty()) {
            int node = q.front();
            q.pop();
            res += char(node + 'a');

            for (auto neigh : graph[node]) {
                if (--inDeg[neigh] == 0) {
                    q.push(neigh);
                }
            }
        }

        // Verify all present letters are used
        int countPresent = 0;
        for (bool p : present) if (p) countPresent++;

        if (res.size() != countPresent) return "";

        return res;
    }
};

```

---

## 📝 How It Works

- **Objective:** Find a valid character ordering based on alien dictionary lexicographical rules.
- **Approach:**
    - **Build the graph** using letter-to-letter dependencies from word comparison.
    - **Detect invalid prefix cases** like `["abc", "ab"] → invalid`.
    - **Run Kahn's Algorithm (BFS Topological Sort)** to determine valid order.
    - **Check for cycles**: If not all present characters appear in the result, there’s a cycle or invalid order.

---

## 🧩 Key Formula / Recurrence

- Graph build logic:
    
    ```
    if (word1[ptr] != word2[ptr]) {
        graph[word1[ptr] - 'a'].push_back(word2[ptr] - 'a');
        inDeg[word2[ptr] - 'a']++;
    }
    
    ```
    
- Kahn's Algorithm traversal:
    
    ```
    while (!q.empty()):
        res += node;
        for (neighbor in graph[node]):
            inDeg[neighbor]--;
            if (inDeg[neighbor] == 0):
                q.push(neighbor);
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(N × L + 26²) |
| Space Complexity | O(26² + 26) |

Where:

- N = number of words.
- L = average word length.
- 26 is constant because we have lowercase English letters only.

---

## ⚠️ Edge Cases

- `["abc", "ab"]` → Invalid case, should return empty string.
- All words the same → Return all characters in any valid order respecting no dependency.
- Disconnected letters → Correctly handles letters with no dependencies.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| DFS + Recursion Stack | O(N × L + 26²) | Uses visited and pathVisited arrays instead of in-degree. |

---

## 🔁 Related Problems

- LeetCode 269: Alien Dictionary (Exact Problem)
- LeetCode 210: Course Schedule II
- LeetCode 207: Course Schedule
- LeetCode 785: Is Graph Bipartite?

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Alphabet ordering in an unknown language based on dictionary samples.
    
- ✅ Important: Always handle the prefix rule (`word1 > word2` but `word1` starts with `word2`) as it invalidates the order.
- ✅ Kahn’s Algorithm fits perfectly when the problem involves **finding valid ordering from partial order rules**.