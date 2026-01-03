---
title: Lowest Common Ancestor of a Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the [definition of LCA on Wikipedia](https://en.wikipedia.org/wiki/Lowest_common_ancestor): “The lowest common ancestor is defined between two nodes `p` and `q` as the lowest node in `T` that has both `p` and `q` as descendants (where we allow **a node to be a descendant of itself**).”

**Example 1:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2018/12/14/binarytree.png)

```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according to the LCA definition.

```

**Example 3:**

```
Input: root = [1,2], p = 1, q = 2
Output: 1
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive DFS – Postorder Traversal

```cpp
class Solution {
public:
    // Recursive function to find LCA of nodes p and q
    TreeNode* lowestCommonAncestor(TreeNode* currentNode, TreeNode* p, TreeNode* q) {
        // Base Case: found one of the nodes or reached the end
        if(currentNode == NULL || currentNode == p || currentNode == q)
            return currentNode;

        // Recurse for left and right subtree
        TreeNode* leftLCA = lowestCommonAncestor(currentNode->left, p, q);
        TreeNode* rightLCA = lowestCommonAncestor(currentNode->right, p, q);

        // If one node found in left and one in right, current is LCA
        if(leftLCA != NULL && rightLCA != NULL)
            return currentNode;

        // Otherwise, return non-null value
        return leftLCA != NULL ? leftLCA : rightLCA;
    }
};

```

---

## 📝 How It Works

- This is a **postorder traversal** approach (left → right → root).
- At each node, recursively check if `p` or `q` is found in the **left** and **right** subtree.
- Three key base cases:
    - If current node is `NULL`, return `NULL`.
    - If current node is `p` or `q`, return that node.
- If both left and right subtrees return non-null, it means:
    - One node was found in each subtree → current node is **Lowest Common Ancestor (LCA)**.
- If only one side returns non-null, that means **both `p` and `q` lie in that subtree**.

---

## 🧩 Key Logic

```cpp
if (left != NULL && right != NULL)
    return root;
else
    return left != NULL ? left : right;

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) — visit each node once |
| Space | O(H) — recursion stack (H = height of tree) |

---

## ⚠️ Edge Cases

- `p == q` → returns `p` or `q`.
- One node is the ancestor of the other.
- Skewed trees (linked-list like) still work.
- Tree is empty → returns `NULL`.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| DFS Recursion ✅ | O(N) | O(H) | Clean and elegant |
| Path-based Method | O(N) | O(N) | Store paths to `p` and `q`, then compare |

> Path-based is helpful if the tree is not binary or is stored externally.
> 

---

## 🔁 Related Problems

- [Leetcode 236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/)
- Leetcode 235. LCA of BST (optimized for BST)
- Leetcode 112. Path Sum
- GFG: LCA in Binary Tree

---