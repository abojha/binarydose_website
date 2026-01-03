---
title: Word Ladder - I
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

Given two words, `beginWord` and `endWord`, and a dictionary `wordList`, return *the **number of words** in the **shortest transformation sequence** from* `beginWord` *to* `endWord`*, or* `0` *if no such sequence exists.*

- Example:
    
    ```
    Example 1:
    
    Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
    Output: 5
    Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", which is 5 words long.
    Example 2:
    
    Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
    Output: 0
    Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.
    ```
    

---

## ✅ Solution: BFS — Word Ladder (Shortest Path in Unweighted Graph)

```cpp
class Solution {
public:
    int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
        queue<pair<string, int>> q;
        unordered_set<string> wordSet(wordList.begin(), wordList.end());

        q.push({beginWord, 1});

        while (!q.empty()) {
            auto [word, step] = q.front();
            q.pop();

            if (word == endWord) return step;

            for (int i = 0; i < word.size(); i++) {
                char originalChar = word[i];

                for (char ch = 'a'; ch <= 'z'; ch++) {
                    word[i] = ch;

                    if (wordSet.find(word) != wordSet.end()) {
                        q.push({word, step + 1});
                        wordSet.erase(word);  // Mark visited
                    }
                }

                word[i] = originalChar;
            }
        }

        return 0;
    }
};

```

---

## 📝 How It Works

- **Objective:**
    
    Find the shortest transformation sequence from `beginWord` to `endWord`, changing only one letter at a time, with all intermediate words in `wordList`.
    
- **Approach:**
    - Treat each word as a node in a graph.
    - Add an edge between two words if they differ by exactly one letter.
    - Use **Breadth-First Search (BFS)** to find the shortest path.
- **Important Detail:**
    
    Using `unordered_set` for `wordList` makes lookup and erase O(1), improving performance compared to using a list or vector.
    
- **Step-by-Step:**
    1. Initialize BFS queue with `{beginWord, step = 1}`.
    2. For each word popped from the queue:
        - Change each letter from `'a'` to `'z'` and check if the new word exists in the set.
        - If yes, push it into the queue and erase from set (to mark visited).
    3. Return step count when `endWord` is found.

---

## 🧩 Key Formula

- BFS Level Traversal.
- For each word, try all possible one-character substitutions and check membership in `wordSet`.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time Complexity | O(N × L²) |
| Space Complexity | O(N × L) |

Where:

- N = number of words in `wordList`.
- L = length of each word.

**Explanation:**

- For each word in the queue, generate up to `L × 26` new words.
- Set lookups and queue operations are O(1) amortized.

---

## ⚠️ Edge Cases

- `beginWord == endWord`: Should return `1` if allowed (by problem definition).
- `endWord` not in `wordList`: Return `0`.
- Empty `wordList`: Return `0`.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Bidirectional BFS | O(N × L) | Speeds up search by processing from both `beginWord` and `endWord`. Useful for large datasets. |

---

## 🔁 Related Problems

- LeetCode 127: Word Ladder (Exact Problem)
- LeetCode 126: Word Ladder II
- LeetCode 433: Minimum Genetic Mutation
- LeetCode 752: Open the Lock

---

## 🛠️ Other Notes

- ✅ **Real-World Analogy:**
    
    Solving a word puzzle where each valid move is changing one letter to reach a target word using a dictionary.
    
- ✅ Breadth-First Search guarantees the **shortest path** in unweighted graphs, which is why it’s preferred here.
- ✅ Removing visited words immediately from `wordSet` is essential to avoid cycles and redundant work.