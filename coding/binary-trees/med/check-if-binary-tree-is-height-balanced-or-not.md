---
title: Check if Binary Tree is Height Balanced or Not
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a binary tree, determine if it is **height-balanced**.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/06/balance_1.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: true

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/06/balance_2.jpg)

```
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

```

**Example 3:**

```
Input: root = []
Output: true
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Naive Recursive Approach (Height + Balance Check Separately)

```cpp
class Solution {
public:
    int getHeight(TreeNode *root){
        if(root == NULL) return 0;
        return 1 + max(getHeight(root->left), getHeight(root->right));
    }

    bool solve(TreeNode *root){
        if(root == NULL) return true;

        int leftHeight  = getHeight(root->left);
        int rightHeight = getHeight(root->right);

        if(abs(leftHeight - rightHeight) <= 1 &&
           solve(root->left) && solve(root->right))
            return true;

        return false;
    }

    bool isBalanced(TreeNode* root) {
        return solve(root);
    }
};

```

---

## ✅ Solution 2: Optimized DFS Approach (Postorder Height + Balance Check in One Pass)

```cpp
class Solution {
public:
    int dfsHeight(TreeNode *root){
        if(root == NULL) return 0;

        int leftHeight = dfsHeight(root->left);
        if(leftHeight == -1) return -1;  // left subtree is unbalanced

        int rightHeight = dfsHeight(root->right);
        if(rightHeight == -1) return -1; // right subtree is unbalanced

        if(abs(leftHeight - rightHeight) > 1)
            return -1; // current node is unbalanced

        return 1 + max(leftHeight, rightHeight); // return height if balanced
    }

    bool isBalanced(TreeNode* root) {
        return dfsHeight(root) != -1;
    }
};

```

---

## 📝 How It Works

### Naive Approach:

- At each node:
    - Compute the height of left and right subtrees.
    - Check if difference is ≤ 1.
    - Recurse on both subtrees.
- Problem: **`getHeight()` is called for each node**, resulting in repeated work.

### Optimized DFS:

- Do a **postorder traversal**.
- While calculating height, check if the subtree is balanced.
- If any subtree is unbalanced, propagate `1` immediately to **stop early**.
- This avoids redundant height computations.

---

## 🧩 Key Formula

> Height = 1 + max(leftHeight, rightHeight)
> 
> 
> Unbalanced if `abs(leftHeight - rightHeight) > 1`
> 

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Naive Recursive | O(n²) | O(h) |
| Optimized DFS | **O(n)** ✅ | O(h) |
- `n`: number of nodes
- `h`: height of tree

---

## ⚠️ Edge Cases

- ✅ Empty tree → considered balanced
- ✅ Tree with one node → balanced
- ✅ Skewed tree → returns `false`
- ✅ Perfectly balanced binary tree → returns `true`

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Bottom-up DFS | ✅ Optimal and clean (used above) |
| Top-down DFS | Like naive, less efficient |
| BFS with height map | Possible, but adds extra storage overhead |

---

## 🔁 Related Problems

- [LeetCode 110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
- [LeetCode 104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [LeetCode 543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [LeetCode 124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)

---

Let me know if you’d like to extend this to **checking if a tree is a complete binary tree** or other tree properties!