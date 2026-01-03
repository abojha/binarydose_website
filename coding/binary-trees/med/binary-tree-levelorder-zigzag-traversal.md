---
title: Binary Tree Levelorder Zigzag Traversal
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, return *the zigzag level order traversal of its nodes' values*. (i.e., from left to right, then right to left for the next level and alternate between).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/tree1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[20,9],[15,7]]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Iterative Zigzag Level Order Traversal (Using `queue` + `flip` flag)

```cpp
class Solution {
public:
    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> res;
        if(root == NULL) return res;

        queue<TreeNode*> Q;
        Q.push(root);
        int flip = 0; // 0: left to right, 1: right to left

        while(!Q.empty()) {
            int size = Q.size();
            vector<int> temp;

            for(int i = 0; i < size; i++) {
                TreeNode* node = Q.front();
                Q.pop();
                temp.push_back(node->val);

                if(node->left)  Q.push(node->left);
                if(node->right) Q.push(node->right);
            }

            if(flip) reverse(temp.begin(), temp.end()); // reverse if right to left
            flip = !flip; // toggle direction

            res.push_back(temp);
        }

        return res;
    }
};

```

---

## ✅ Solution 2: Recursive Zigzag Level Order Traversal

```cpp
class Solution {
public:
    void solve(queue<TreeNode*> &q, vector<vector<int>> &ans, int level) {
        if(q.empty()) return;

        int size = q.size();
        vector<int> temp;

        for(int i = 0; i < size; i++) {
            TreeNode* node = q.front(); q.pop();
            temp.push_back(node->val);

            if(node->left)  q.push(node->left);
            if(node->right) q.push(node->right);
        }

        if(level % 2 == 0) {
            reverse(temp.begin(), temp.end()); // even level → right to left
        }

        ans.push_back(temp);
        solve(q, ans, level + 1);
    }

    vector<vector<int>> zigzagLevelOrder(TreeNode* root) {
        vector<vector<int>> ans;
        if(root == NULL) return ans;

        queue<TreeNode*> q;
        q.push(root);
        solve(q, ans, 1); // level starts from 1 (left to right)
        return ans;
    }
};

```

---

## 📝 How It Works

- Performs **level order traversal**, but alternates the direction at each level:
    - **Odd levels**: left → right (normal)
    - **Even levels**: right → left (reversed)
- Iterative approach uses a **queue + flip flag** to toggle direction.
- Recursive version:
    - Uses level number to decide whether to reverse.
    - Recursively processes the queue after each level.

---

## 🧩 Key Rule

> Zigzag Order = Level Order with alternating left→right and right→left directions
> 

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | O(n) |
| 🪄 Space (Aux) | O(w) where `w` is max width of tree (for queue) |
| 🪄 Space (Rec) | O(h) recursion stack (in recursive version) |

---

## ⚠️ Edge Cases

- ✅ Empty tree → returns empty list
- ✅ Only root node → returns list with one list
- ✅ Left/right skewed tree → still works fine
- ✅ Perfect binary tree → full zigzag pattern

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Deque-based approach | Push to front/back based on direction (no reverse) |
| Stack-based (2 stacks) | Used to simulate levels manually |

---

## 🔁 Related Problems

- [LeetCode 103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/)
- [LeetCode 102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)
- [LeetCode 429. N-ary Tree Level Order Traversal](https://leetcode.com/problems/n-ary-tree-level-order-traversal/)
- [LeetCode 107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/)

---