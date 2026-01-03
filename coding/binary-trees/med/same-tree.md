---
title: Same Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the roots of two binary trees `p` and `q`, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/20/ex1.jpg)

```
Input: p = [1,2,3], q = [1,2,3]
Output: true
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive Tree Comparison

```cpp
class Solution {
public:
    bool isSameTree(TreeNode* p, TreeNode* q) {
        // Both trees are empty
        if(p == NULL && q == NULL) return true;

        // One of the trees is empty
        if(p == NULL || q == NULL) return false;

        // Values must be equal, and both subtrees must match
        return (p->val == q->val) &&
               isSameTree(p->left, q->left) &&
               isSameTree(p->right, q->right);
    }
};

```

---

## 📝 How It Works

- This is a **simple DFS-based recursion**.
- The function compares:
    1. **Structure**: both left and right children must be present/missing together.
    2. **Values**: corresponding nodes must hold the **same value**.
- Recursion continues until all nodes are matched or a mismatch is found.

---

## 🧩 Key Logic

```cpp
if(p == NULL && q == NULL) return true;        // both empty
if(p == NULL || q == NULL) return false;       // structure mismatch
if(p->val != q->val) return false;             // value mismatch

```

Then continue recursively on left and right subtrees.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time Complexity | O(n), where `n = number of nodes` (min of both trees) |
| 🪄 Space Complexity | O(h), where `h = height of tree` (due to recursion stack) |

---

## ⚠️ Edge Cases

- ✅ Both trees empty → return `true`
- ✅ One tree empty → return `false`
- ✅ Values same but structure different → return `false`
- ✅ Values and structure same → return `true`

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Iterative using stack/queue | Possible, but more verbose |
| BFS level-order comparison | Also valid, but recursion is cleaner and preferred |

---

## 🔁 Related Problems

- [LeetCode 100. Same Tree](https://leetcode.com/problems/same-tree/)
- [LeetCode 572. Subtree of Another Tree](https://leetcode.com/problems/subtree-of-another-tree/)
- [LeetCode 101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
- [LeetCode 226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/)

---