---
title: Morris Inorder Traversal of a Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Morris Inorder Traversal (O(1) Space)

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
    vector<int> inorderTraversal(TreeNode* root) {
        TreeNode* current = root;
        vector<int> inorder;

        while (current != NULL) {
            if (current->left == NULL) {
                // No left child: visit current node and move right
                inorder.push_back(current->val);
                current = current->right;
            } else {
                // Find the inorder predecessor of current
                TreeNode* predecessor = current->left;

                while (predecessor->right && predecessor->right != current) {
                    predecessor = predecessor->right;
                }

                if (predecessor->right == NULL) {
                    // Make a thread (temporary link) back to current
                    predecessor->right = current;
                    current = current->left;
                } else {
                    // Thread already exists → remove it and visit current
                    predecessor->right = NULL;
                    inorder.push_back(current->val);
                    current = current->right;
                }
            }
        }
        return inorder;
    }
};

```

---

## 📝 How It Works

- This is **Morris Traversal** for **inorder**, which avoids recursion and stack.
- It leverages temporary **right-threaded pointers** to backtrack to the root after left subtree.
- For each node:
    - If no left child → **visit and move right**.
    - If left child exists → find predecessor (rightmost node in left subtree):
        - If thread doesn't exist → create it and move left.
        - If thread exists → remove it, **visit current**, and move right.

---

## 🧩 Key Idea

- Threads are temporary and restore the tree after traversal.
- Inorder means we visit nodes **after** exploring their left subtree.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – Each node visited at most twice |
| Space | O(1) – No recursion or extra stack used |

---

## ⚠️ Edge Cases

- Empty tree → returns empty vector
- Single node → directly visited
- Skewed trees → still works in constant space

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| ✅ Morris Traversal | O(N) | O(1) | Most space efficient |
| Recursive DFS | O(N) | O(H) | Simple but uses stack |
| Iterative with Stack | O(N) | O(H) | Common and easier to understand |

---

## 🔁 Related Problems

- Leetcode 94: [Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- Leetcode 144: Preorder Traversal
- Leetcode 145: Postorder Traversal
- GFG: Morris Inorder Traversal

---