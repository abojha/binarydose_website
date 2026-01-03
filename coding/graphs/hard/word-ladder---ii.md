---
title: Word Ladder - II
description: ""
tags:
  - bfs
  - dfs
  - graphs
  - hard
---

### Problem Statement:

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words `beginWord -> s1 -> s2 -> ... -> sk` such that:

- Every adjacent pair of words differs by a single letter.
- Every `si` for `1 <= i <= k` is in `wordList`. Note that `beginWord` does not need to be in `wordList`.
- `sk == endWord`

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *all the **shortest transformation sequences** from* `beginWord` *to* `endWord`*, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words* `[beginWord, s1, s2, ..., sk]`.

- Example:
    
    ```
    Example 1:
    
    Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
    Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
    Explanation: There are 2 shortest transformation sequences:
    "hit" -> "hot" -> "dot" -> "dog" -> "cog"
    "hit" -> "hot" -> "lot" -> "log" -> "cog"
    Example 2:
    
    Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
    Output: []
    Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
    ```
    

---

## ✅ Solution: BFS with Level Tracking — Word Ladder II (All Shortest Transformation Sequences)

```cpp
class Solution {
public:
    vector<vector<string>> findLadders(string beginWord, string endWord, vector<string>& wordList) {
        vector<vector<string>> res;
        unordered_set<string> st(wordList.begin(), wordList.end());

        if (st.find(endWord) == st.end()) return res;

        queue<vector<string>> q;
        q.push({beginWord});

        int level = 1;
        unordered_set<string> visitedInLevel;

        while (!q.empty()) {
            int size = q.size();
            unordered_set<string> localVisited;

            for (int i = 0; i < size; i++) {
                vector<string> path = q.front();
                q.pop();

                string word = path.back();

                if (word == endWord) {
                    if (res.empty() || path.size() == res[0].size()) {
                        res.push_back(path);
                    } else if (path.size() < res[0].size()) {
                        res.clear();
                        res.push_back(path);
                    }
                    continue;
                }

                for (int j = 0; j < word.size(); j++) {
                    char original = word[j];
                    for (char ch = 'a'; ch <= 'z'; ch++) {
                        word[j] = ch;
                        if (st.count(word) && !visitedInLevel.count(word)) {
                            path.push_back(word);
                            q.push(path);
                            path.pop_back();
                            localVisited.insert(word);
                        }
                    }
                    word[j] = original;
                }
            }

            for (const auto& w : localVisited) {
                st.erase(w);
                visitedInLevel.insert(w);
            }
            if (!res.empty()) break;
        }

        return res;
    }
};

```

---

## 📝 How It Works

- **Objective:** Find all shortest transformation sequences from `beginWord` to `endWord`.
- **Technique:**
    - Standard BFS with queue of paths.
    - Use `unordered_set` for O(1) lookups.
    - Level-based visited tracking:
        - Only remove visited words **after processing the entire level** to avoid blocking valid paths in the same level.
- **Why Level Visited is Important:**
    - It avoids prematurely deleting words needed for parallel paths in the current level.
    - Guarantees that all shortest sequences are collected.

---

## 🧩 Key Formula / Recurrence

- BFS Level Processing:
    
    ```
    queue of paths → expand last word → push new path if valid transformation
    
    ```
    
- Stop expanding once the first valid transformation sequence is found.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(N × L²) |
| Space Complexity | O(N × L) |

Where:

- N = size of `wordList`
- L = length of each word

---

## ⚠️ Edge Cases

- `beginWord == endWord` → Should return `[[beginWord]]` if allowed.
- `endWord` not in `wordList` → Return empty result.
- Multiple shortest sequences → Collect all.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Bi-directional BFS | O(N × L) | Optimizes searching but harder to track paths. |
| DFS + Pruning | Exponential | Not suitable for shortest-path problems. |

---

## 🔁 Related Problems

- LeetCode 126: Word Ladder II (Exact Problem)
- LeetCode 127: Word Ladder I
- LeetCode 433: Minimum Genetic Mutation
- LeetCode 752: Open the Lock

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:** Finding all shortest routes between two stations where each step changes one character in a valid dictionary.
- ✅ Level-wise visited handling is a must for **collecting all shortest paths** in graph problems.
- ✅ Compared to Word Ladder I, Word Ladder II adds complexity because we’re interested in all minimal paths, not just the first one found.