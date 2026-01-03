---
title: Lowest Common Ancestor of a Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

Given a binary search tree (BST), find the lowest common ancestor (LCA) node of two given nodes in the BST.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**).”

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png)

```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarysearchtree_improved.png)

```
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the LCA definition.

```

**Example 3:**

```
Input: root = [2,1], p = 2, q = 1
Output: 2
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive (Using BST Property)

```cpp
TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if(root == NULL) return root;

    if(root->val > p->val && root->val > q->val){
        // Both nodes lie in the left subtree
        return lowestCommonAncestor(root->left, p, q);
    }

    if(root->val < p->val && root->val < q->val){
        // Both nodes lie in the right subtree
        return lowestCommonAncestor(root->right, p, q);
    }

    // One node lies in the left subtree and one in the right, or root is p or q
    return root;
}

```

---

## 📝 How It Works

- We utilize the **BST property** where:
    - Left subtree values < root value.
    - Right subtree values > root value.
- If both `p` and `q` are less than `root`, move left.
- If both `p` and `q` are greater than `root`, move right.
- If they split or equal `root`, then `root` is the **lowest common ancestor (LCA)**.

---

## 🧩 Key Formula / Observation

- If `root` lies **between** `p` and `q` → `root` is the LCA.
- Traversal continues until the split point is found:
    
    ```
    LCA(p, q) = root when p ≤ root ≤ q or q ≤ root ≤ p
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(H) |
| Space | O(H) (Recursion stack) |
- `H` = Height of the BST (`O(log N)` in balanced BST).

---

## ⚠️ Edge Cases

- One node is ancestor of the other → handled naturally.
- `p == q` → root will match `p` or `q`.
- Tree is empty → return `NULL`.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Recursive ✅ | O(H) | O(H) | Clean, standard method for BST |
| Iterative | O(H) | O(1) | Saves recursion stack |
| General Binary Tree LCA (DFS) | O(N) | O(H) | Slower, not BST optimized |

---

## 🔁 Related Problems

- Leetcode 235: [Lowest Common Ancestor of a BST](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/)
- Leetcode 236: LCA in Binary Tree (non-BST)
- Leetcode 701: Insert into BST
- BST Path Sum Problems

---