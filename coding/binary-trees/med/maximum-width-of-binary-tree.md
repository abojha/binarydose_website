---
title: Maximum Width of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, return *the **maximum width** of the given tree*.

The **maximum width** of a tree is the maximum **width** among all levels.

The **width** of one level is defined as the length between the end-nodes (the leftmost and rightmost non-null nodes), where the null nodes between the end-nodes that would be present in a complete binary tree extending down to that level are also counted into the length calculation.

It is **guaranteed** that the answer will in the range of a **32-bit** signed integer.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/05/03/width1-tree.jpg)

```
Input: root = [1,3,2,5,3,null,9]
Output: 4
Explanation: The maximum width exists in the third level with length 4 (5,3,null,9).

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2022/03/14/maximum-width-of-binary-tree-v3.jpg)

```
Input: root = [1,3,2,5,null,null,9,6,null,7]
Output: 7
Explanation: The maximum width exists in the fourth level with length 7 (6,null,null,null,null,null,7).

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Level Order Traversal (BFS with Indexing)

```cpp
class Solution {
public:
    int widthOfBinaryTree(TreeNode* root) {
        // Queue stores node and its index based on complete binary tree rules
        queue<pair<TreeNode*, long long>> qu;
        long long maxWidth = INT_MIN;

        qu.push({root, 0}); // Start with root node at index 0

        while (!qu.empty()) {
            int levelSize = qu.size();
            long long minIndex = qu.front().second; // Index normalization to avoid overflow

            long long firstIndex = 0, lastIndex = 0;

            for (int i = 0; i < levelSize; i++) {
                auto currentPair = qu.front();
                TreeNode* currentNode = currentPair.first;
                long long currIndex = currentPair.second - minIndex; // Normalize to 0-based index
                qu.pop();

                if (i == 0) firstIndex = currIndex;
                if (i == levelSize - 1) lastIndex = currIndex;

                if (currentNode->left) {
                    qu.push({currentNode->left, 2 * currIndex + 1}); // Left child index
                }
                if (currentNode->right) {
                    qu.push({currentNode->right, 2 * currIndex + 2}); // Right child index
                }
            }

            // Update maximum width for this level
            maxWidth = max(maxWidth, lastIndex - firstIndex + 1);
        }

        return maxWidth;
    }
};

```

---

## 📝 How It Works

- Performs **level order traversal (BFS)** while keeping track of node indices based on complete binary tree rules:
    - Left child index = `2 * idx + 1`
    - Right child index = `2 * idx + 2`
- At each level, the **first and last index** are recorded to compute width.
- The index is **normalized (shifted)** by subtracting `minIndex` to prevent overflow.
- **Width** = `lastIndex - firstIndex + 1`

---

## 🧩 Key Formula

- **Child Indexing** (like heap):
    - Left: `2 * i + 1`
    - Right: `2 * i + 2`
- **Width of level** = `last - first + 1`

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – Each node visited once |
| Space | O(N) – For queue storing nodes |

---

## ⚠️ Edge Cases

- Skewed trees (all left or right) → width is always 1
- Sparse trees → width is calculated based on position, not node count

---

## 💡 Other Approaches

| Approach | Time | Space | Comment |
| --- | --- | --- | --- |
| BFS + Indexing ✅ | O(N) | O(N) | Best for full/sparse width |
| DFS with map (level to first index) | O(N) | O(H) | Needs extra logic to track min/max |

---

## 🔁 Related Problems

- [Leetcode 662: Maximum Width of Binary Tree](https://leetcode.com/problems/maximum-width-of-binary-tree/)
- Leetcode 102: Binary Tree Level Order Traversal
- Leetcode 515: Find Largest Value in Each Tree Row

---