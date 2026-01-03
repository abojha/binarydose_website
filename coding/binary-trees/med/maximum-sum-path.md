---
title: Maximum Sum Path
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

A **path** in a binary tree is a sequence of nodes where each pair of adjacent nodes in the sequence has an edge connecting them. A node can only appear in the sequence **at most once**. Note that the path does not need to pass through the root.

The **path sum** of a path is the sum of the node's values in the path.

Given the `root` of a binary tree, return *the maximum **path sum** of any **non-empty** path*.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/10/13/exx1.jpg)

```
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

```

**Example 2:**

![](https://assets.leetcode.com/uploads/2020/10/13/exx2.jpg)

```
Input: root = [-10,9,20,null,null,15,7]
Output: 42
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.

```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Postorder DFS (Max Path Sum via Recursion)

```cpp
class Solution {
public:
    int findMaxPathSum(TreeNode *root, int &sum){
        if(root == NULL) return 0;

        // Only consider positive contributions; discard negatives
        int leftMaxPath = max(0, findMaxPathSum(root->left, sum));
        int rightMaxPath = max(0, findMaxPathSum(root->right, sum));

        // Update global max: current node as the root of the path
        sum = max(sum, leftMaxPath + rightMaxPath + root->val);

        // Return max path sum including current node and one subtree
        return root->val + max(leftMaxPath, rightMaxPath);
    }

    int maxPathSum(TreeNode* root) {
        int sum = INT_MIN;
        findMaxPathSum(root, sum);
        return sum;
    }
};

```

---

## 📝 How It Works

- This problem finds the **maximum sum path between any two nodes** in a binary tree.
- At each node:
    - Compute the **max path sum from left and right subtrees**.
    - Ignore negative paths by using `max(0, …)` to avoid reducing total sum.
    - Update the **global max** (`sum`) with `left + right + root->val` (when the path goes through the current node).
- Finally, return the maximum **one-sided path sum** that can be extended upwards (used in recursive return).

---

## 🧩 Key Formula

```cpp
// 1. Local sum at current node
sum = max(sum, left + right + root->val);

// 2. Return to parent only one side (left or right path)
return root->val + max(left, right);

```

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time Complexity | **O(n)** — each node visited once |
| 🪄 Space Complexity | **O(h)** — recursion stack (h = height) |

---

## ⚠️ Edge Cases

- ✅ Tree with all negative nodes → picks the **least negative node**
- ✅ Tree with one node → returns node value
- ✅ Balanced and skewed trees → handled properly

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Brute Force | Exponential, very inefficient |
| DFS with global tracking ✅ | Optimal, clean, used here |

---

## 🔁 Related Problems

- [LeetCode 124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/)
- [LeetCode 543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)
- [LeetCode 687. Longest Univalue Path](https://leetcode.com/problems/longest-univalue-path/)
- [LeetCode 437. Path Sum III](https://leetcode.com/problems/path-sum-iii/)

---