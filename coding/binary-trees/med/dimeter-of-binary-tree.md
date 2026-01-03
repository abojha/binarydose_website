---
title: Dimeter of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, return *the length of the **diameter** of the tree*.

The **diameter** of a binary tree is the **length** of the longest path between any two nodes in a tree. This path may or may not pass through the `root`.

The **length** of a path between two nodes is represented by the number of edges between them.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/03/06/diamtree.jpg)

```
Input: root = [1,2,3,4,5]
Output: 3
Explanation: 3 is the length of the path [4,2,1,3] or [5,2,1,3].

```

**Example 2:**

```
Input: root = [1,2]
Output: 1

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Postorder DFS (Height + Diameter in One Pass)

```cpp
class Solution {
public:
    int getHeight(TreeNode *root, int &diameter) {
        if(root == NULL) return 0;

        int leftHeight = getHeight(root->left, diameter);
        int rightHeight = getHeight(root->right, diameter);

        // Diameter through current node = longest path between two leaves
        diameter = max(diameter, leftHeight + rightHeight);

        // Return height of current node
        return 1 + max(leftHeight, rightHeight);
    }

    int diameterOfBinaryTree(TreeNode* root) {
        int diameter = 0;
        getHeight(root, diameter);
        return diameter;
    }
};

```

---

## 📝 How It Works

- The **diameter** of a binary tree is the **length of the longest path between any two nodes**.
- This path **may or may not pass through the root**.
- At each node:
    - Recursively get the **height of left and right subtrees**.
    - Update the diameter with `leftHeight + rightHeight`, which is the **number of edges** on the path through the node.
- Final result is the maximum such sum across all nodes.

---

## 🧩 Key Formula

> diameter = max(diameter, leftHeight + rightHeight)
> 
> 
> `height = 1 + max(leftHeight, rightHeight)`
> 

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time Complexity | **O(n)** — visits each node once |
| 🪄 Space Complexity | **O(h)** — height of tree recursion stack |

---

## ⚠️ Edge Cases

- ✅ Empty tree → diameter is 0
- ✅ Single node → diameter is 0
- ✅ Perfectly balanced tree → correctly finds middle diameter
- ✅ Skewed tree → correctly gives longest path

---

## 💡 Other Approaches

| Approach | Time | Notes |
| --- | --- | --- |
| Brute force (height + traversal at each node) | O(n²) | ❌ TLE on large trees |
| DFS (used here) | O(n) | ✅ Optimal and clean |

---

## 🔁 Related Problems

- [LeetCode 543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [LeetCode 124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- [LeetCode 110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
- [LeetCode 104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)

---