---
title: Find kth Min/Max element in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Inorder & Reverse Inorder Traversal (Counter-Based & Vector-Based)

---

## ✅ 1️⃣ kth Smallest — Counter-Based (Optimized for Space)

```cpp
// ✅ kth Smallest Element in BST — Counter-Based

class Solution {
public:
    int findKthSmallest(TreeNode* currentNode, int& visitedCount, int k) {
        if (currentNode == nullptr) return -1;

        int leftResult = findKthSmallest(currentNode->left, visitedCount, k);
        if (leftResult != -1) return leftResult;

        visitedCount++;
        if (visitedCount == k) return currentNode->val;

        int rightResult = findKthSmallest(currentNode->right, visitedCount, k);
        return rightResult;
    }

    int kthSmallest(TreeNode* root, int k) {
        int visitedCount = 0;
        return findKthSmallest(root, visitedCount, k);
    }
};

```

---

## ✅ 2️⃣ kth Smallest — Vector-Based (Simple Implementation)

```cpp
// ✅ kth Smallest Element in BST — Vector-Based

class Solution {
public:
    void inorderTraversal(TreeNode* currentNode, vector<int>& inorderList) {
        if (currentNode == nullptr) return;

        inorderTraversal(currentNode->left, inorderList);
        inorderList.push_back(currentNode->val);
        inorderTraversal(currentNode->right, inorderList);
    }

    int kthSmallest(TreeNode* root, int k) {
        vector<int> inorderList;
        inorderTraversal(root, inorderList);
        return inorderList[k - 1];
    }
};

```

---

## ✅ 3️⃣ kth Largest — Vector-Based

```cpp
// ✅ kth Largest Element in BST — Vector-Based

class Solution {
public:
    void inorderTraversal(TreeNode* currentNode, vector<int>& inorderList) {
        if (currentNode == nullptr) return;

        inorderTraversal(currentNode->left, inorderList);
        inorderList.push_back(currentNode->val);
        inorderTraversal(currentNode->right, inorderList);
    }

    int kthLargest(TreeNode* root, int k) {
        vector<int> inorderList;
        inorderTraversal(root, inorderList);
        return inorderList[inorderList.size() - k];
    }
};

```

---

## ✅ 4️⃣ kth Largest — Counter-Based (Optimized for Space)

```cpp
// ✅ kth Largest Element in BST — Counter-Based

class Solution {
public:
    int findKthLargest(TreeNode* currentNode, int& visitedCount, int k) {
        if (currentNode == nullptr) return -1;

        int rightResult = findKthLargest(currentNode->right, visitedCount, k);
        if (rightResult != -1) return rightResult;

        visitedCount++;
        if (visitedCount == k) return currentNode->val;

        int leftResult = findKthLargest(currentNode->left, visitedCount, k);
        return leftResult;
    }

    int kthLargest(TreeNode* root, int k) {
        int visitedCount = 0;
        return findKthLargest(root, visitedCount, k);
    }
};

```

---

## ✅ Required Notes Template

---

### 📝 How It Works

- **kth Smallest**
    
    → Use inorder traversal (Left → Root → Right).
    
    → Either count up to k or store all values and access the (k−1)th.
    
- **kth Largest**
    
    → Use reverse inorder traversal (Right → Root → Left).
    
    → Either count up to k or store all values and access the (size−k)th.
    

---

### 🧩 Key Formula / Recurrence

- kth Smallest: `inorder(node) → left → node → right`
- kth Largest: `reverseInorder(node) → right → node → left`

---

### ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Counter-Based | O(H + k) | O(H) |
| Vector-Based | O(N) | O(N) |

Where H = height of the tree, N = total nodes.

---

### ⚠️ Edge Cases

- k = 1 (smallest/largest)
- k = total nodes (largest/smallest)
- Highly unbalanced BST (skewed trees)

---

### 💡 Other Approaches

| Approach | Notes |
| --- | --- |
| Morris Traversal | O(1) space, harder to write |
| Iterative Stack | O(H) space, avoids recursion |

---

### 🔁 Related Problems

- LeetCode 230 — Kth Smallest Element in BST
- LeetCode 703 — Kth Largest Element in a Stream
- LeetCode 538 — Convert BST to Greater Tree

---

If you'd like, I can prepare this as a Notion database table or exportable Markdown/PDF. Would you prefer that?