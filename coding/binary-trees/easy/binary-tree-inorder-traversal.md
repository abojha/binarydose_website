---
title: Binary Tree Inorder Traversal
description: ""
tags:
  - binary-trees
  - easy
---

### Problem Statement:

Given the `root` of a binary tree, return *the inorder traversal of its nodes' values*.

**Example 1:**

**Input:** root = [1,null,2,3]

**Output:** [1,3,2]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/08/29/screenshot-2024-08-29-202743.png)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Recursive Inorder Traversal

```cpp
class Solution {
public:
    void inOrd(TreeNode *root, vector<int> &res){
        if(root == NULL) return;

        inOrd(root->left, res);   // Traverse left subtree
        res.push_back(root->val); // Visit root
        inOrd(root->right, res);  // Traverse right subtree
    }

    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        inOrd(root, res);
        return res;
    }
};

```

---

## ✅ Solution 2: Iterative Inorder Traversal (Using Stack)

```cpp
class Solution {
public:
    vector<int> inorderTraversal(TreeNode* root) {
        vector<int> res;
        stack<TreeNode*> st;
        TreeNode *curr = root;

        while(curr != NULL || !st.empty()){
            while(curr != NULL){
                st.push(curr);       // Go as left as possible
                curr = curr->left;
            }

            curr = st.top();         // Backtrack
            st.pop();
            res.push_back(curr->val); // Visit the node

            curr = curr->right;      // Now go to right subtree
        }

        return res;
    }
};

```

---

## 📝 How It Works

### Recursive:

- Uses the **natural recursive structure** of trees.
- Traverses in **Left → Root → Right** order.
- Uses the function call stack implicitly.

### Iterative:

- Uses a **manual stack** to simulate recursion.
- Repeatedly pushes left children to stack until reaching NULL.
- Then processes node and moves to the right child.

---

## 🧩 Key Order Rule

> Inorder Traversal = [ Left, Root, Right ]
> 

This is particularly useful in **Binary Search Trees**, where inorder gives sorted order.

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Recursive | O(n) | O(h) → call stack (height of tree) |
| Iterative | O(n) | O(h) → stack for traversal |

> In worst case (skewed tree), space is O(n).
> 

---

## ⚠️ Edge Cases

- ✅ Empty tree → returns empty vector
- ✅ Tree with one node → returns single-element vector
- ✅ Left-skewed tree → stack grows linearly
- ✅ Right-skewed tree → same behavior

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| **Morris Inorder Traversal** | O(n) | O(1) | Uses threaded binary trees, modifies structure temporarily |

---

## 🔁 Related Problems

- [LeetCode 94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [LeetCode 144. Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
- [LeetCode 145. Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)
- [LeetCode 230. Kth Smallest Element in BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/)

---