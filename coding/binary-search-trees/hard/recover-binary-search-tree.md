---
title: Recover Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - hard
---

### Problem Statement:

You are given the `root` of a binary search tree (BST), where the values of **exactly** two nodes of the tree were swapped by mistake. *Recover the tree without changing its structure*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/28/recover1.jpg)

```
Input: root = [1,3,null,null,2]
Output: [3,1,null,null,2]
Explanation: 3 cannot be a left child of 1 because 3 > 1. Swapping 1 and 3 makes the BST valid.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/28/recover2.jpg)

```
Input: root = [3,1,4,null,null,2]
Output: [2,1,4,null,null,3]
Explanation: 2 cannot be in the right subtree of 3 because 2 < 3. Swapping 2 and 3 makes the BST valid.
```

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Recover Binary Search Tree Using Inorder Traversal (Morris Traversal Style Observation)

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */

class Solution {
private:
    TreeNode *first;   // First incorrect node
    TreeNode *middle;  // Middle node for adjacent swap case
    TreeNode *last;    // Last incorrect node
    TreeNode *prev;    // Previously visited node in inorder traversal

public:
    void inorder(TreeNode *root) {
        if (root == NULL) return;

        inorder(root->left);

        // Detect swapped nodes during inorder traversal
        if (prev != NULL && root->val < prev->val) {
            if (!first) {
                first = prev;
                middle = root;
            } else {
                last = root;
            }
        }
        prev = root;

        inorder(root->right);
    }

    void recoverTree(TreeNode* root) {
        first = middle = last = NULL;
        prev = new TreeNode(INT_MIN); // Initialize prev with the smallest possible value

        inorder(root);

        // Swap values back to fix the BST
        if (first && last) swap(first->val, last->val);
        else if (first && middle) swap(first->val, middle->val);
    }
};

```

---

## ✅ Structured Revision Notes

---

## 📝 How It Works

- **Problem:** Two nodes of a BST are swapped by mistake. Recover the tree without changing its structure.
- **Idea:** In-order traversal of a BST gives a sorted sequence.
- If two nodes are swapped:
    - One or two violations will occur in the in-order sequence.
    - We track these violations using four pointers:
        - `first`: First node where `prev->val > root->val` is detected.
        - `middle`: Node right after `first` in violation.
        - `last`: Second violation node (if not adjacent).
        - `prev`: Keeps track of the last visited node.
- After traversal:
    - If `first` and `last` are found → swap their values.
    - If only `first` and `middle` are found (adjacent swap) → swap their values.

---

## 🧩 Key Formula / Recurrence

- **In-order property:** `prev->val <= current->val` must hold true in all steps.
- Detect violations:
    - First violation → `first = prev`, `middle = root`
    - Second violation → `last = root`

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(h) |
- **N = number of nodes in the tree.**
- Space is due to recursion stack (height of BST = h).
- Morris Traversal can reduce space to O(1) but is more complex.

---

## ⚠️ Edge Cases

- Swapped nodes are adjacent (e.g., 1 3 2 4).
- Swapped nodes are far apart (e.g., 1 4 3 2 5).
- Tree with only two nodes (swapped).

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Inorder + Array | O(N) | O(N) | Store inorder values, sort, refill |
| Morris Traversal | O(N) | O(1) | Space optimized, no recursion |

---

## 🔁 Related Problems

- LeetCode 99: Recover Binary Search Tree
- LeetCode 530: Minimum Absolute Difference in BST
- LeetCode 501: Find Mode in Binary Search Tree

---

## ✅ Real-World Analogy

Imagine a sorted bookshelf where two books were accidentally placed in the wrong position. Scanning left to right, you would notice breaks in order and fix them by swapping.

---