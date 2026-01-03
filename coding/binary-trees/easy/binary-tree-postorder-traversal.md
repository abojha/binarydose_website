---
title: Binary Tree Postorder Traversal
description: ""
tags:
  - binary-trees
  - easy
---

### Problem Statement:

Given the `root` of a binary tree, return *the postorder traversal of its nodes' values*.

**Example 1:**

**Input:** root = [1,null,2,3]

**Output:** [3,2,1]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/08/29/screenshot-2024-08-29-202743.png)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Recursive Postorder Traversal

```cpp
class Solution {
public:
    void postOrd(TreeNode* root, vector<int> &res){
        if(root == NULL) return;

        postOrd(root->left, res);   // Left
        postOrd(root->right, res);  // Right
        res.push_back(root->val);   // Root
    }

    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        postOrd(root, res);
        return res;
    }
};

```

---

## ✅ Solution 2: Iterative Postorder Using Two Stacks

```cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        if(root == NULL) return res;

        stack<TreeNode*> st1, st2;
        st1.push(root);

        while(!st1.empty()){
            root = st1.top(); st1.pop();
            st2.push(root);

            if(root->left)  st1.push(root->left);
            if(root->right) st1.push(root->right);
        }

        while(!st2.empty()){
            res.push_back(st2.top()->val);
            st2.pop();
        }

        return res;
    }
};

```

---

## ✅ Solution 3: Iterative Postorder Using One Stack

```cpp
class Solution {
public:
    vector<int> postorderTraversal(TreeNode* root) {
        vector<int> res;
        if(root == NULL) return res;

        stack<TreeNode*> st;
        TreeNode* curr = root;

        while(curr != NULL || !st.empty()) {
            while(curr != NULL) {
                if(curr->right) st.push(curr->right); // Push right child first
                st.push(curr);                         // Push current node
                curr = curr->left;                     // Move to left child
            }

            curr = st.top(); st.pop();

            // Check if the right child is next in stack
            if(!st.empty() && curr->right != NULL && curr->right == st.top()) {
                st.pop();               // Remove right child
                st.push(curr);          // Push root back for later processing
                curr = curr->right;     // Process right child next
            } else {
                res.push_back(curr->val);
                curr = NULL;
            }
        }

        return res;
    }
};

```

---

## 📝 How It Works

### Recursive:

- Simple and natural: Traverse left, then right, then visit root.

### Two Stacks:

- First stack processes nodes in `Root → Right → Left`.
- Second stack reverses this to `Left → Right → Root`.

### One Stack:

- Tricky but optimized.
- Use one stack to simulate the recursion with careful checks to delay visiting root until after both subtrees are processed.

---

## 🧩 Key Order Rule

> Postorder Traversal = [ Left, Right, Root ]
> 

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Recursive | O(n) | O(h) recursion stack |
| Two-stack | O(n) | O(n) |
| One-stack | O(n) | O(n) (worst-case skewed) |

---

## ⚠️ Edge Cases

- ✅ Empty tree → returns empty vector
- ✅ Tree with one node → returns single-element vector
- ✅ Only left or only right skewed trees → still works
- ✅ Balanced trees → handles recursion depth and stack growth efficiently

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Morris Postorder Traversal | O(1) space, very tricky and not common in interviews |
| Marked-Node Stack | Push command/state with node, similar to iterative simulation of recursion |

---

## 🔁 Related Problems

- [LeetCode 145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)
- [LeetCode 144. Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
- [LeetCode 94. Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [LeetCode 102. Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/)

---