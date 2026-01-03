---
title: Construct Binary Search Tree from Preorder Traversal
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

Given an array of integers preorder, which represents the **preorder traversal** of a BST (i.e., **binary search tree**), construct the tree and return *its root*.

It is **guaranteed** that there is always possible to find a binary search tree with the given requirements for the given test cases.

A **binary search tree** is a binary tree where for every node, any descendant of `Node.left` has a value **strictly less than** `Node.val`, and any descendant of `Node.right` has a value **strictly greater than** `Node.val`.

A **preorder traversal** of a binary tree displays the value of the node first, then traverses `Node.left`, then traverses `Node.right`.

**Example 1:**

![](https://assets.leetcode.com/uploads/2019/03/06/1266.png)

```
Input: preorder = [8,5,1,7,10,12]
Output: [8,5,10,1,7,null,12]

```

**Example 2:**

```
Input: preorder = [1,3]
Output: [1,null,3]
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive (Preorder + Inorder Approach)

```cpp
class Solution {
public:
    TreeNode* construct(vector<int>& preorder, int preStart, int preEnd, vector<int>& inorder, int inStart, int inEnd, map<int, int>& inorderIndexMap) {
        if(preStart > preEnd || inStart > inEnd) return NULL;

        TreeNode* node = new TreeNode(preorder[preStart]);
        int inRootIndex = inorderIndexMap[node->val];
        int leftSubtreeSize = inRootIndex - inStart;

        node->left = construct(preorder, preStart + 1, preStart + leftSubtreeSize,
                               inorder, inStart, inRootIndex - 1, inorderIndexMap);

        node->right = construct(preorder, preStart + leftSubtreeSize + 1, preEnd,
                                inorder, inRootIndex + 1, inEnd, inorderIndexMap);

        return node;
    }

    TreeNode* bstFromPreorder(vector<int>& preorder) {
        vector<int> inorder = preorder;
        sort(inorder.begin(), inorder.end());

        map<int, int> inorderIndexMap;
        for(int i = 0; i < inorder.size(); i++) {
            inorderIndexMap[inorder[i]] = i;
        }

        return construct(preorder, 0, preorder.size() - 1, inorder, 0, inorder.size() - 1, inorderIndexMap);
    }
};

```

---

## 📝 How It Works

- **Preorder traversal** is given. BST property allows us to derive the inorder by sorting preorder.
- By applying the classic **preorder + inorder** construction technique:
    - First element of preorder is always the root.
    - In inorder, elements left of root belong to the left subtree, and right elements belong to the right subtree.
- We recursively construct the left and right subtrees.

---

## 🧩 Key Formula / Recurrence

- For every recursive call:
    
    ```
    root = preorder[preStart]
    inRootIndex = map[root]
    leftSize = inRootIndex - inStart
    
    ```
    
- Subtree Ranges:
    - Left: `preStart + 1` to `preStart + leftSize`
    - Right: `preStart + leftSize + 1` to `preEnd`

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N log N) |
| Space | O(N) |

---

## ⚠️ Edge Cases

- Only one element → root is that element.
- Sorted preorder (like an increasing array) → skewed right tree.
- Reverse sorted preorder → skewed left tree.

---

## 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Preorder + Inorder ✅ | O(N log N) | O(N) | Works for BST using sort |
| Preorder Only (Bounded Recursion) | O(N) | O(H) | More optimized using value bounds |

---

## 🔁 Related Problems

- Leetcode 1008: [Construct BST from Preorder Traversal](https://leetcode.com/problems/construct-binary-search-tree-from-preorder-traversal/)
- Leetcode 105: Construct Binary Tree from Preorder and Inorder
- Leetcode 106: Construct Binary Tree from Inorder and Postorder

---