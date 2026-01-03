---
title: Tree Boundary Traversal
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a Binary Tree, find its Boundary Traversal. The traversal should be in the following order:

1. **Left Boundary:** This includes all the nodes on the path from the root to the leftmost leaf node. You must prefer the left child over the right child when traversing. Do not include leaf nodes in this section.
2. **Leaf Nodes:** All leaf nodes, in left-to-right order, that are not part of the left or right boundary.
3. **Reverse Right Boundary:** This includes all the nodes on the path from the rightmost leaf node to the root, traversed in reverse order. You must prefer the right child over the left child when traversing. Do not include the root in this section if it was already included in the left boundary.

Note: If the root doesn't have a left subtree or right subtree, then the root itself is the left or right boundary.

```
Input: root[] = [1, 2, 3, 4, 5, 6, 7, N, N, 8, 9, N, N, N, N]
Output:[1, 2, 4, 8, 9, 6, 7, 3]
Explanation:

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700204/Web/Other/blobid6_1749213679.webp)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Boundary Traversal (Left + Leaves + Right)

```cpp
class Solution {
  public:
    bool isLeaf(Node *root) {
        return !root->left && !root->right;
    }

    void addLeftBoundary(Node *root, vector<int> &res) {
        Node *curr = root->left;
        while(curr) {
            if(!isLeaf(curr)) res.push_back(curr->data);
            if(curr->left) curr = curr->left;
            else curr = curr->right;
        }
    }

    void addLeaves(Node *root, vector<int> &res) {
        if(root == NULL) return;
        if(isLeaf(root)) {
            res.push_back(root->data);
            return;
        }
        addLeaves(root->left, res);
        addLeaves(root->right, res);
    }

    void addRightBoundary(Node *root, vector<int> &res) {
        Node *curr = root->right;
        vector<int> temp;
        while(curr) {
            if(!isLeaf(curr)) temp.push_back(curr->data);
            if(curr->right) curr = curr->right;
            else curr = curr->left;  // ⚠️ fix: missing assignment!
        }
        // Reverse and add to result
        res.insert(res.end(), temp.rbegin(), temp.rend());
    }

    vector<int> boundaryTraversal(Node *root) {
        vector<int> res;
        if(root == NULL) return res;

        if(!isLeaf(root)) res.push_back(root->data); // Include root if not leaf
        addLeftBoundary(root, res);
        addLeaves(root, res);
        addRightBoundary(root, res);

        return res;
    }
};

```

---

## 📝 How It Works

- The **boundary traversal** involves visiting:
    1. **Left boundary (excluding leaves)**
    2. **All leaf nodes** (from left to right)
    3. **Right boundary (excluding leaves, in reverse)**
- To avoid **duplicates**, we:
    - Skip leaves while adding left/right boundary.
    - Add all leaves separately.
    - Root is only added if it's **not a leaf**.

---

## 🧩 Key Observations

- Left boundary is top-down, right boundary is bottom-up.
- Leaf nodes may be part of both sides, so we extract them in a separate pass.

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time Complexity | **O(N)** – visit each node at most once |
| 🪄 Space Complexity | **O(H)** – due to recursion for leaves (H = height) |

---

## ⚠️ Edge Cases

- ✅ Tree with only root → add root once
- ✅ Tree with only left or right subtree → still works
- ✅ All nodes are leaves → all nodes added only once

**⚠️ Bug Fix**: In this line inside `addRightBoundary`:

```cpp
else curr->left;  // ❌ missing assignment

```

Should be:

```cpp
else curr = curr->left;  // ✅ corrected

```

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| BFS with boundary tagging | Complex to avoid duplicates |
| DFS with levels and tagging | Not efficient for boundary traversal |

---

## 🔁 Related Problems

- [GFG: Boundary Traversal of binary tree](https://practice.geeksforgeeks.org/problems/boundary-traversal-of-binary-tree/1)
- [LeetCode 545. Boundary of Binary Tree](https://leetcode.com/problems/boundary-of-binary-tree/)
- [LC 199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/)
- [LC 872. Leaf-Similar Trees](https://leetcode.com/problems/leaf-similar-trees/)

---