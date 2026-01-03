---
title: Morris Preorder Traversal of a Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a Binary Tree, implement Morris Preorder Traversal and return the array containing its preorder sequence.

Morris Preorder Traversal is a tree traversal algorithm aiming to achieve a space complexity of O(1) without recursion or an external data structure. The algorithm should efficiently visit each node in the binary tree in preorder sequence, printing or processing the node values as it traverses, without using a stack or recursion.

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Morris Preorder Traversal (O(1) Space)

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
    vector<int> preorderTraversal(TreeNode* root) {
        TreeNode* current = root;
        vector<int> preorder;

        while (current != NULL) {
            if (current->left == NULL) {
                // No left child: visit current and go right
                preorder.push_back(current->val);
                current = current->right;
            } else {
                // Find the inorder predecessor of current
                TreeNode* predecessor = current->left;
                while (predecessor->right && predecessor->right != current) {
                    predecessor = predecessor->right;
                }

                if (predecessor->right == NULL) {
                    // Create thread and visit current
                    preorder.push_back(current->val);
                    predecessor->right = current;
                    current = current->left;
                } else {
                    // Thread already exists: remove it
                    predecessor->right = NULL;
                    current = current->right;
                }
            }
        }
        return preorder;
    }
};

```

---

## 📝 How It Works

- This is **Morris Traversal** adapted for **preorder**.
- It avoids using recursion or a stack by creating temporary **threads** between a node's predecessor and the current node.
- For each node:
    - If there's no left child, **visit it and move right**.
    - If a left child exists, **find the rightmost node in the left subtree (predecessor)**:
        - If no thread exists, create one and **visit** the current node, then move left.
        - If thread exists, **remove it** and move right.

---

## 🧩 Key Idea

- Use **threads** (temporary right pointers) to simulate backtracking from the left subtree.
- In preorder, you **visit the node before traversing the left**.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – Each node is visited at most twice |
| Space | O(1) – No recursion or stack used |

---

## ⚠️ Edge Cases

- Empty tree → returns empty vector
- Single-node tree → returns that node
- Left/right skewed trees → handled efficiently

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| ✅ Morris Traversal | O(N) | O(1) | Best space-efficient solution |
| Recursive DFS | O(N) | O(H) | Clean but uses stack space |
| Iterative with Stack | O(N) | O(H) | Easy to implement |

---

## 🔁 Related Problems

- Leetcode 144: [Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
- Leetcode 94: Inorder Traversal
- Leetcode 145: Postorder Traversal
- GFG: Morris Traversal for Inorder

---