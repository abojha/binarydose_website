---
title: Maximum Depth of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, return *its maximum depth*.

A binary tree's **maximum depth** is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Example 1:**

![](https://assets.leetcode.com/uploads/2020/11/26/tmp-tree.jpg)

```
Input: root = [3,9,20,null,null,15,7]
Output: 3
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Recursive Depth-First Search (DFS)

```cpp
class Solution {
public:
    int solve(TreeNode *root){
        if(root == NULL) return 0;
        return 1 + max(solve(root->left), solve(root->right));
    }

    int maxDepth(TreeNode* root) {
        return solve(root);
    }
};

```

---

## ✅ Solution 2: Iterative Level Order Traversal (BFS)

```cpp
class Solution {
public:
    int solve(TreeNode *root){
        if(root == NULL) return 0;

        queue<TreeNode*> qu;
        qu.push(root);
        int level = 0;

        while(!qu.empty()){
            int size = qu.size();
            level++;
            for(int i = 0; i < size; i++){
                TreeNode* node = qu.front();
                qu.pop();
                if(node->left)  qu.push(node->left);
                if(node->right) qu.push(node->right);
            }
        }

        return level;
    }

    int maxDepth(TreeNode* root) {
        return solve(root);
    }
};

```

---

## 📝 How It Works

### Recursive (DFS):

- **Postorder-style** traversal.
- At each node, you ask for the depth of the left and right subtrees.
- Return `1 + max(left, right)` as the depth of the current node.
- Base case: if `root == NULL`, return 0.

### Iterative (BFS):

- Performs **level order traversal** using a queue.
- Counts the number of levels visited.
- For each level, process all nodes and enqueue their children.
- The total number of levels visited is the depth.

---

## 🧩 Key Formula

> Depth = 1 + max(depth(left), depth(right))
> 

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Recursive DFS | O(n) | O(h) → height of tree (stack space) |
| Iterative BFS | O(n) | O(w) → max width (queue size) |
- `n` = total nodes
- `h` = height
- `w` = width of the widest level

---

## ⚠️ Edge Cases

- ✅ Empty tree → returns `0`
- ✅ Only one node → returns `1`
- ✅ Left- or right-skewed tree → works for both DFS and BFS

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Top-down DFS | Pass current depth as parameter and track max |
| DFS with global variable | Update max depth during traversal (less clean) |

---

## 🔁 Related Problems

- [LeetCode 104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/)
- [LeetCode 111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/)
- [LeetCode 110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/)
- [LeetCode 543. Diameter of Binary Tree](https://leetcode.com/problems/diameter-of-binary-tree/)

---