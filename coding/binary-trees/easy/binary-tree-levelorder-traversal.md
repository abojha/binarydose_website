---
title: Binary Tree Levelorder Traversal
description: ""
tags:
  - binary-trees
  - easy
---

### Problem Statement:

Given the `root` of a binary tree, return *the level order traversal of its nodes' values*. (i.e., from left to right, level by level).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Level Order Traversal (BFS using Queue)

```cpp
class Solution {
public:
    vector<vector<int>> levelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if(root == NULL) return res;

        queue<TreeNode*> Q;
        Q.push(root);

        while(!Q.empty()) {
            int size = Q.size();          // Number of nodes in the current level
            vector<int> temp;

            for(int i = 0; i < size; i++) {
                TreeNode* node = Q.front(); Q.pop();

                if(node->left)  Q.push(node->left);   // Enqueue left child
                if(node->right) Q.push(node->right);  // Enqueue right child

                temp.push_back(node->val); // Add node value to current level
            }

            res.push_back(temp); // Push current level to result
        }

        return res;
    }
};

```

---

## 📝 How It Works

- This is a **Breadth-First Search** traversal.
- It uses a **queue** to visit each level of the tree from top to bottom.
- For each level:
    - Record the number of nodes (`size`).
    - Process all those nodes:
        - Add their children to the queue.
        - Store their values in a temporary list for that level.
- After processing a level, push the collected values into the final result.

---

## 🧩 Key Idea

> Traverse the tree level by level using a queue: enqueue children, dequeue parent.
> 

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | O(n) — visit every node once |
| 🪄 Space | O(w) — where `w` is the maximum width of the tree (i.e., max queue size) |

---

## ⚠️ Edge Cases

- ✅ Empty tree → returns empty list
- ✅ Tree with only one node → returns list with single list
- ✅ Left-skewed or right-skewed tree → each level contains only one node

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Recursive Level Order | Use DFS with level tracking, harder to manage |
| Zigzag Level Order | Variation using deque or direction toggle |

---

## 🔁 Related Problems

- [LeetCode 102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- [LeetCode 103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- [LeetCode 107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)
- [LeetCode 429. N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)

---