---
title: Count Complete Binary Tree Nodes
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a **complete** binary tree, return the number of the nodes in the tree.

According to [**Wikipedia**](http://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees), every level, except possibly the last, is completely filled in a complete binary tree, and all nodes in the last level are as far left as possible. It can have between `1` and `2h` nodes inclusive at the last level `h`.

Design an algorithm that runs in less than `O(n)` time complexity.

**Example 1:**

![](https://assets.leetcode.com/uploads/2021/01/14/complete.jpg)

```
Input: root = [1,2,3,4,5,6]
Output: 6

```

**Example 2:**

```
Input: root = []
Output: 0

```

**Example 3:**

```
Input: root = [1]
Output: 1
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Optimized for Complete Binary Tree (O(log²N))

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
public:
    // Function to compute height from leftmost path
    int funcLeftHeight(TreeNode *root){
        int height = 0;
        while(root){
            height++;
            root = root->left;
        }
        return height;
    }

    // Function to compute height from rightmost path
    int funcRightHeight(TreeNode *root){
        int height = 0;
        while(root){
            height++;
            root = root->right;
        }
        return height;
    }

    int countNodes(TreeNode* root) {
        if(root == NULL) return 0;

        int leftHeight = funcLeftHeight(root);
        int rightHeight = funcRightHeight(root);

        // If left and right heights are same → it's a perfect binary tree
        if(leftHeight == rightHeight){
            return (1 << leftHeight) - 1; // 2^h - 1
        }

        // Otherwise, recursively count nodes in left and right subtrees
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};

```

---

## 📝 How It Works

- This solution is optimized for **complete binary trees**, where:
    - All levels are completely filled except possibly the last, and
    - Nodes are as left as possible.
- Key idea:
    - For each subtree, calculate the **leftmost and rightmost heights**.
    - If they’re equal → the subtree is **perfect**, and node count = `2^height - 1`.
    - If not, recursively apply the logic to left and right children.

---

## 🧩 Key Formula

- For a perfect binary tree of height `h`:
    $$
    **Nodes = (1 << h) - 1 = 2^h - 1**
    $$
    
- General recurrence:
    
    ```cpp
    count(root) = 1 + count(root->left) + count(root->right)
    
    ```
    

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(log²N) – logN levels × logN height calculation |
| Space | O(logN) – recursion stack (in worst case) |

---

## ⚠️ Edge Cases

- Tree is `NULL` → return `0`
- Single-node tree → return `1`
- Perfect tree → optimized to direct formula
- Skewed trees → still falls back to recursion

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| BFS Iterative | O(N) | O(N) | Traverse all nodes |
| DFS Recursive | O(N) | O(H) | Simple and clean |
| ✅ Optimized for Complete Tree | O(log²N) | O(logN) | Best for large complete trees |

---

## 🔁 Related Problems

- Leetcode 222: [Count Complete Tree Nodes](https://leetcode.com/problems/count-complete-tree-nodes/)
- Leetcode 104: Maximum Depth of Binary Tree
- Leetcode 110: Balanced Binary Tree
- GFG: Count the Number of Nodes in a Binary Tree

---