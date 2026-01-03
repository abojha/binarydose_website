---
title: Inorder, Preorder & Postorder Traversal in One Traversal
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

## ✅ Solution: All Tree Traversals in One Pass (Using Stack with State)

```cpp
class Solution {
public:
    vector<int> preorder;
    vector<int> inorder;
    vector<int> postorder;

    // Pair of node and state:
    // 1 = Preorder, 2 = Inorder, 3 = Postorder
    void allTraversals(TreeNode* root) {
        if(root == NULL) return;

        stack<pair<TreeNode*, int>> st;
        st.push({root, 1});

        while(!st.empty()) {
            auto &[node, state] = st.top();
            if(state == 1) {
                preorder.push_back(node->val);  // Preorder: Root
                state++;
                if(node->left)
                    st.push({node->left, 1});
            }
            else if(state == 2) {
                inorder.push_back(node->val);   // Inorder: Left processed, now root
                state++;
                if(node->right)
                    st.push({node->right, 1});
            }
            else {
                postorder.push_back(node->val); // Postorder: Both subtrees processed
                st.pop();
            }
        }
    }
};

```

---

## 📝 How It Works

- We use a **stack of pairs** where each pair is:
    - `TreeNode*` → the current node
    - `int` → a state value representing where we are in the traversal of that node:
        - **1** = Preorder stage (just entered node)
        - **2** = Inorder stage (left processed)
        - **3** = Postorder stage (left + right processed)
- At each step:
    - **Preorder**: process the node, go to left subtree
    - **Inorder**: after left is done, process node, go to right subtree
    - **Postorder**: after both left and right are done, process node and pop

This simulates the recursive traversal efficiently using just **one stack**.

---

## 🧩 Key Logic

> Use a state variable to mimic recursive traversal order:
> 
> 
> **State 1 → Preorder → Left**
> 
> **State 2 → Inorder → Right**
> 
> **State 3 → Postorder → Backtrack**
> 

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| ⏱️ Time Complexity | **O(n)** — each node is visited 3 times |
| 🪄 Space Complexity | **O(h)** — for the stack, where `h = height of tree` |

---

## ⚠️ Edge Cases

- ✅ Empty tree → returns all empty vectors
- ✅ Single node → appears in all three orders
- ✅ Left-skewed / right-skewed trees → works correctly

---

## 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Recursive | 3 separate traversals; cleaner but not optimized |
| Iterative (one at a time) | Requires 3 traversals or 3 different stack implementations |
| **One traversal (this one)** | ✅ Best for interview use, collects all in one go |

---

## 🔁 Related Problems

- [LC 94. Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/)
- [LC 144. Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/)
- [LC 145. Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/)
- [LC 589. N-ary Preorder Traversal](https://leetcode.com/problems/n-ary-tree-preorder-traversal/)

---