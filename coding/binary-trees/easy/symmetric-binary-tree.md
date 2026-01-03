---
title: Symmetric Binary Tree
description: ""
tags:
  - binary-trees
  - easy
---

### Problem Statement:

Given the `root` of a binary tree, *check whether it is a mirror of itself* (i.e., symmetric around its center).

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/02/19/symtree1.jpg)

```
Input: root = [1,2,2,3,4,4,3]
Output: true

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/02/19/symtree2.jpg)

```
Input: root = [1,2,2,null,3,null,3]
Output: false
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursion (Mirror Tree Comparison)

```cpp
class Solution {
public:
    // Helper function to compare two subtrees
    bool isMirror(TreeNode *t1, TreeNode *t2){
        if(t1 == NULL && t2 == NULL) return true;
        if(t1 == NULL || t2 == NULL) return false;

        return (t1->val == t2->val &&
                isMirror(t1->left, t2->right) &&
                isMirror(t1->right, t2->left));
    }

    bool isSymmetric(TreeNode* root) {
        if(root == NULL) return true;
        return isMirror(root->left, root->right);
    }
};

```

---

## 📝 How It Works

- A binary tree is **symmetric** if the left and right subtrees are **mirror images**.
- The helper function `isMirror(left, right)` checks:
    - If both nodes are `NULL`, they are symmetric at that level.
    - If one is `NULL` and the other is not, it's asymmetric.
    - Otherwise, check:
        - values of `left->val == right->val`
        - `left->left` vs `right->right`
        - `left->right` vs `right->left`

---

## 🧩 Key Concept

We recursively compare:

- **Outer pair**: `left.left` vs `right.right`
- **Inner pair**: `left.right` vs `right.left`

The recurrence:

```
isSymmetric(root) = isMirror(root->left, root->right)

isMirror(t1, t2) =
    t1 == NULL && t2 == NULL → true
    t1 == NULL || t2 == NULL → false
    t1->val == t2->val &&
    isMirror(t1->left, t2->right) &&
    isMirror(t1->right, t2->left)

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space (stack) | O(H), H=height of tree (worst O(N) for skewed) |

---

## ⚠️ Edge Cases

- Empty tree → symmetric
- Only root → symmetric
- One child missing in left/right → not symmetric

---

## 💡 Other Approaches

| Approach | Description |
| --- | --- |
| Iterative BFS | Use a queue and push mirror pairs |
| DFS Recursion | Clean and intuitive (used here) |

---

## 🔁 Related Problems

- [Leetcode 101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/)
- [Leetcode 100. Same Tree](https://leetcode.com/problems/same-tree/)
- [Check if Tree is Foldable]
- [Mirror of Binary Tree]

---