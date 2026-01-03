---
title: Check for Children Sum Property - II
description: ""
tags:
  - binary-trees
  - hard
---

### Problem Statement:

Given a Binary Tree, convert the value of its nodes to follow the Children Sum Property. The Children Sum Property in a binary tree states that for every node, the sum of its children's values (if they exist) should be equal to the node's value. If a child is missing, it is considered as having a value of 0.

**Note:**

**The node values can be increased by any positive integer any number of times, but decrementing any node value is not allowed.A value for a NULL node can be assumed as 0.We cannot change the structure of the given binary tree.**

- The node values can be increased by any positive integer any number of times, but decrementing any node value is not allowed.
- A value for a NULL node can be assumed as 0.
- We cannot change the structure of the given binary tree.
- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: DFS (Preorder + Postorder Adjustment)

```cpp
// Function to change the values of the nodes
// based on the sum of its children's values.
void changeTree(TreeNode* root) {
    // Base case: If the current node is NULL, do nothing.
    if (root == NULL) {
        return;
    }

    // Step 1: Preorder Logic — enforce the Children Sum Property top-down
    int child = 0;
    if (root->left) {
        child += root->left->val;
    }
    if (root->right) {
        child += root->right->val;
    }

    if (child >= root->val) {
        root->val = child;
    } else {
        // If child sum is smaller, push the root's value downward
        if (root->left) {
            root->left->val = root->val;
        } else if (root->right) {
            root->right->val = root->val;
        }
    }

    // Step 2: Recur down the left and right subtrees
    changeTree(root->left);
    changeTree(root->right);

    // Step 3: Postorder Logic — aggregate child values bottom-up
    int tot = 0;
    if (root->left) tot += root->left->val;
    if (root->right) tot += root->right->val;

    // If not a leaf, set root to total child sum
    if (root->left || root->right) {
        root->val = tot;
    }
}

```

---

## 📝 How It Works

This function **modifies a binary tree** so that it satisfies the **Children Sum Property**, i.e.,

**every node's value becomes the sum of its left and right child values.**

The logic involves **two passes** combined:

1. **Top-down (Preorder phase)**: Push values down to children when necessary.
2. **Bottom-up (Postorder phase)**: After fixing children, update the current node to reflect their final values.

---

## 🧩 Key Concept / Formula

- If `childSum >= root->val` → set `root->val = childSum`
- Else → propagate `root->val` downward to child nodes.
- After recursion, update:
    
    `root->val = left->val + right->val` (if not a leaf)
    

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – each node visited once |
| Space | O(H) – recursion stack (`H` = tree height) |

---

## ⚠️ Edge Cases

- Tree is empty → no change
- Single node (leaf) → no change needed
- Only one child → handles correctly
- Already satisfying sum property → still valid

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| DFS ✅ | O(N) | Efficient, in-place |
| Level Order (BFS) | O(N) | Harder to propagate updates correctly |

---

## 🔁 Related Problems

- GFG: [Children Sum Property](https://practice.geeksforgeeks.org/problems/children-sum-parent/1)
- Leetcode 124: Binary Tree Maximum Path Sum
- Leetcode 543: Diameter of Binary Tree
- Leetcode 437: Path Sum III

---

## 🛠️ Real-Life Analogy

Think of a manager (`root`) who must always earn the **sum of the salaries** of their team (`left` and `right`). If the team’s salaries are too low, the manager splits their own salary to balance the structure.

---