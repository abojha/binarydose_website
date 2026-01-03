---
title: Binary Tree Preorder Traversal
description: ""
tags:
  - binary-trees
  - easy
---

### Problem Statement:

Given the `root` of a binary tree, return *the preorder traversal of its nodes' values*.

**Example 1:**

**Input:** root = [1,null,2,3]

**Output:** [1,2,3]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/08/29/screenshot-2024-08-29-202743.png)

**Example 2:**

**Input:** root = [1,2,3,4,5,null,8,null,null,6,7,9]

**Output:** [1,2,4,5,6,7,3,8,9]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/08/29/tree_2.png)

**Example 3:**

**Input:** root = []

**Output:** []

**Example 4:**

**Input:** root = [1]

**Output:** [1]

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: **Recursive Preorder Traversal**

```cpp
class Solution {
public:
    void preOrd(TreeNode *root, vector<int> &res){
        if(root == NULL)
            return;

        res.push_back(root->val);      // Visit the root
        preOrd(root->left, res);       // Traverse left subtree
        preOrd(root->right, res);      // Traverse right subtree
    }

    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        preOrd(root, res);
        return res;
    }
};

```

---

## ✅ Solution 2: **Iterative Preorder Traversal (Using Stack)**

```cpp
class Solution {
public:
    vector<int> preorderTraversal(TreeNode* root) {
        vector<int> res;
        if(root == NULL) return res;

        stack<TreeNode*> st;
        st.push(root);

        while(!st.empty()){
            root = st.top();
            st.pop();
            res.push_back(root->val);  // Visit the root

            // Push right first so that left is processed first
            if(root->right != NULL)
                st.push(root->right);
            if(root->left != NULL)
                st.push(root->left);
        }

        return res;
    }
};

```

---

## 📝 How It Works

### Recursive:

- Traverses the tree in **Root → Left → Right** order.
- Uses function call stack for recursion.
- Appends current node value before recursive calls to left and right.

### Iterative:

- Simulates recursion using an explicit **stack**.
- Push `right` child first so that `left` is processed before it (stack is LIFO).
- Pop node, visit it, then push its children.

---

## 🧩 Key Order Rule

> Preorder Traversal = [ Root, Left, Right ]
> 

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Recursive | O(n) | O(h) where h = height of tree |
| Iterative | O(n) | O(h) due to stack |

> In worst case (skewed tree), space is O(n).
> 

---

## ⚠️ Edge Cases

- ✅ Empty tree (`root == NULL`) → returns empty list
- ✅ Tree with only root node
- ✅ Left-skewed and right-skewed trees

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Morris Preorder Traversal | O(n) time, O(1) space (threaded binary tree) |
| Color Marking / Command Stack | Simulation of recursion with more control |

---

## 🔁 Related Problems

- [LC 144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
- [LC 94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [LC 145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)
- [LC 102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

---