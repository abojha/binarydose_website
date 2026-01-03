---
title: Largest Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - hard
---

### Problem Statement:

You're given a binary tree. Your task is to find the **size** of the largest subtree within this binary tree that also satisfies the properties of a Binary Search Tree (BST). The size of a subtree is defined as the number of nodes it contains.

**Note:** A subtree of the binary tree is considered a BST if for every node in that subtree, the left child is less than the node, and the right child is greater than the node, without any duplicate values in the subtree.

**Examples :**

```
Input: root = [5, 2, 4, 1, 3]

Output: 3
Explanation:The following sub-tree is a BST of size 3

```

![Root-to-leaf-path-sum-equal-to-a-given-number-copy](https://media.geeksforgeeks.org/wp-content/uploads/20241007154946544659/Root-to-leaf-path-sum-equal-to-a-given-number-copy.webp)

![Balance-a-Binary-Search-Tree-3-copy](https://media.geeksforgeeks.org/wp-content/uploads/20241008164418969970/Balance-a-Binary-Search-Tree-3-copy.webp)

```
Input: root = [6, 7, 3, N, 2, 2, 4]

Output: 3
Explanation: The following sub-tree is a BST of size 3:

```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700351/Web/Other/blobid0_1732253153.png)

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700351/Web/Other/blobid1_1732253193.png)

- Example:
    
    ```
    
    ```
    

---

## ✅ Solution: Largest BST in Binary Tree Using Bottom-Up DFS

```cpp
/* Tree node structure used in the program

struct Node {
    int data;
    Node *left;
    Node *right;

    Node(int val) {
        data = val;
        left = right = NULL;
    }
};*/

class NodeValue {
public:
    int minNode;   // Minimum value in the subtree
    int maxNode;   // Maximum value in the subtree
    int maxSize;   // Size of largest BST in the subtree

    NodeValue(int minNode, int maxNode, int maxSize) {
        this->minNode = minNode;
        this->maxNode = maxNode;
        this->maxSize = maxSize;
    }
};

class Solution {
public:
    NodeValue Helper(Node *root) {
        if (!root) {
            return NodeValue(INT_MAX, INT_MIN, 0);
        }

        auto left = Helper(root->left);
        auto right = Helper(root->right);

        // Check if the current subtree is a BST
        if (left.maxNode < root->data && root->data < right.minNode) {
            int totalSize = left.maxSize + right.maxSize + 1;
            int minVal = min(root->data, left.minNode);
            int maxVal = max(root->data, right.maxNode);
            return NodeValue(minVal, maxVal, totalSize);
        }

        // If not BST, propagate the largest BST size found so far
        return NodeValue(INT_MIN, INT_MAX, max(left.maxSize, right.maxSize));
    }

    int largestBst(Node *root) {
        return Helper(root).maxSize;
    }
};

```

---

## ✅ Revision Notes

### 📝 How It Works

- **Goal:** Find the size of the largest subtree in a binary tree that is a BST.
- **Bottom-up DFS approach:**
    - For each node, gather info from left and right children:
        - Minimum value in subtree
        - Maximum value in subtree
        - Size of largest BST in subtree
    - If `left.maxNode < root->data < right.minNode`, it's a BST → update size.
    - If not, pass up `max(left.maxSize, right.maxSize)` and invalidate min/max for current node.
- **NodeValue structure:**
    
    Custom struct to carry necessary data during DFS.
    

---

### 🧩 Key Formula / Recurrence

- At each node:
    
    **If left.maxNode < root->data < right.minNode:**
    
    `maxSize = left.maxSize + right.maxSize + 1`
    
    `minNode = min(left.minNode, root->data)`
    
    `maxNode = max(right.maxNode, root->data)`
    
- Otherwise:
    
    `maxSize = max(left.maxSize, right.maxSize)`
    
    `minNode = INT_MIN`
    
    `maxNode = INT_MAX`
    

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(h) |
- N = number of nodes
- h = height of the tree (due to recursion stack)

---

### ⚠️ Edge Cases

- Empty tree → largest BST size is 0.
- Tree where every node is a valid BST → full tree size.
- Skewed trees (left or right heavy).

---

### 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Brute Force (check every subtree with inorder) | O(N²) | O(h) |
| Bottom-up DFS (used here) | O(N) | O(h) |
| Morris Traversal | Not practical for this problem. |  |

---

### 🔁 Related Problems

- LeetCode 333: Largest BST Subtree
- LeetCode 98: Validate Binary Search Tree
- LeetCode 99: Recover Binary Search Tree

---

### ✅ Real-World Analogy

- **Land Survey Example:** Imagine surveying different patches of land. You want to find the largest rectangular plot that meets specific rules (sorted values = height constraints, etc.).

---

If you'd like a visual diagram or markdown-friendly table format for Notion, just say the word!