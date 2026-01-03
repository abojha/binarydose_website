---
title: Search in a Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - easy
---

### Problem Statement:

You are given the `root` of a binary search tree (BST) and an integer `val`.

Find the node in the BST that the node's value equals `val` and return the subtree rooted with that node. If such a node does not exist, return `null`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/12/tree1.jpg)

```
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2021/01/12/tree2.jpg)

```
Input: root = [4,2,7,1,3], val = 5
Output: []
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Iterative BST Search

```cpp
class Solution {
public:
    TreeNode* searchBST(TreeNode* root, int val) {
        // Traverse the tree until you find the target value or reach NULL
        while(root != NULL && root->val != val){
            // Go left if val is smaller, right if greater
            root = val < root->val ? root->left : root->right;
        }
        return root;  // Found or NULL
    }
};

```

---

## ✅ Solution 2: Recursive BST Search

```cpp
class Solution {
public:
    TreeNode *bst(TreeNode *root, int val){
        if(root == NULL) return NULL;
        if(root->val == val) return root;

        // Recurse into left or right based on BST property
        if(root->val < val) return bst(root->right, val);
        else return bst(root->left, val);
    }

    TreeNode* searchBST(TreeNode* root, int val) {
        return bst(root, val);
    }
};

```

---

## 📝 How It Works

- We take advantage of the **BST property**: for any node, all values in the left subtree are smaller, and all in the right are larger.
- **Iterative Version**: Traverse using a loop, moving left or right based on comparison.
- **Recursive Version**: Call recursively on the left or right subtree until you find the value or reach `NULL`.

---

## 🧩 Key Logic / Formula

- If `val == root->val`: return root.
- If `val < root->val`: search in the left subtree.
- If `val > root->val`: search in the right subtree.

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Iterative | O(H) | O(1) ✅ |
| Recursive | O(H) | O(H) (stack) |

Where **H** is the height of the tree → `O(log N)` for balanced, `O(N)` for skewed trees.

---

## ⚠️ Edge Cases

- Tree is empty → return `NULL`.
- `val` does not exist in tree → return `NULL`.
- Tree has only one node.

---

## 💡 Other Approaches

| Approach | Space | Notes |
| --- | --- | --- |
| Recursive | O(H) | Simpler, uses call stack |
| Iterative | O(1) | More efficient in space ✅ |

---

## 🔁 Related Problems

- [Leetcode 700](https://leetcode.com/problems/search-in-a-binary-search-tree/)
- Insert into BST
- Delete from BST
- Lowest Common Ancestor in BST
- Validate Binary Search Tree

---