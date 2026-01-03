---
title: Validate Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, *determine if it is a valid binary search tree (BST)*.

A **valid BST** is defined as follows:

- The left  of a node contains only nodes with keys **less than** the node's key.
    
    subtree
    
- The right subtree of a node contains only nodes with keys **greater than** the node's key.
- Both the left and right subtrees must also be binary search trees.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/12/01/tree1.jpg)

```
Input: root = [2,1,3]
Output: true

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/12/01/tree2.jpg)

```
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Validate Binary Search Tree — Recursion with Range Limits

---

```cpp
// ✅ Validate BST using Recursion with Min/Max Range

class Solution {
public:
    bool validate(TreeNode* currentNode, long minValue, long maxValue) {
        if (currentNode == nullptr) return true;

        // The current value must lie strictly between minValue and maxValue
        if (currentNode->val <= minValue || currentNode->val >= maxValue) return false;

        // Recursively check left and right subtrees with updated ranges
        return validate(currentNode->left, minValue, currentNode->val) &&
               validate(currentNode->right, currentNode->val, maxValue);
    }

    bool isValidBST(TreeNode* root) {
        return validate(root, LONG_MIN, LONG_MAX);
    }
};

```

---

---

### 📝 How It Works

- **Core Idea:**
    
    Each node must fall within a valid range:
    
    - Left subtree values must be less than the current node value.
    - Right subtree values must be greater than the current node value.
- **How Ranges Update:**
    - For left child: `maxValue` gets updated to `currentNode->val`.
    - For right child: `minValue` gets updated to `currentNode->val`.
- **Why Use LONG_MIN and LONG_MAX:**
    
    Handles edge cases where node values could be at integer limits.
    

---

### 🧩 Key Formula / Recurrence

- `validate(node, minValue, maxValue)`
    - Check `node->val > minValue && node->val < maxValue`
    - Recurse:
        - `validate(node->left, minValue, node->val)`
        - `validate(node->right, node->val, maxValue)`

---

### ⏱️ Time & Space Complexity

| Aspect | Complexity |
| --- | --- |
| **Time** | O(N) |
| **Space** | O(H) (Recursion stack) |
- **N** = Number of nodes
- **H** = Height of BST

---

### ⚠️ Edge Cases

- Single-node tree → Valid BST.
- Skewed tree (all left or all right) → Still valid.
- Nodes with `INT_MIN` or `INT_MAX` → Use `LONG_MIN`/`LONG_MAX` to avoid overflow issues.
- Duplicates → Not allowed in strict BST.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Inorder Traversal | O(N) | O(N) | Store elements, check sorted. |
| Morris Traversal | O(N) | O(1) | Harder to implement. |

---

### 🔁 Related Problems

- LeetCode 98 — Validate Binary Search Tree
- LeetCode 653 — Two Sum IV — Input is a BST
- LeetCode 530 — Minimum Absolute Difference in BST

---

If you'd like this turned into a formatted Notion card or a revision PDF, just let me know!