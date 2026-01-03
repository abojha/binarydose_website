---
title: Left/Right View of Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given the `root` of a binary tree, imagine yourself standing on the **right side** of it, return *the values of the nodes you can see ordered from top to bottom*.

**Example 1:**

**Input:** root = [1,2,3,null,5,null,4]

**Output:** [1,3,4]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/11/24/tmpd5jn43fs-1.png)

**Example 2:**

**Input:** root = [1,2,3,4,null,null,null,5]

**Output:** [1,3,4,5]

**Explanation:**

![](https://assets.leetcode.com/uploads/2024/11/24/tmpkpe40xeh-1.png)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Left View (Recursive DFS)

```cpp
class Solution {
public:
    void collectLeftView(TreeNode* node, int level, vector<int>& view) {
        if (!node) return;

        // Add the first node at this level
        if (view.size() == level) {
            view.push_back(node->val);
        }

        // Traverse left first to ensure leftmost is picked
        collectLeftView(node->left, level + 1, view);
        collectLeftView(node->right, level + 1, view);
    }

    vector<int> leftSideView(TreeNode* root) {
        vector<int> leftView;
        collectLeftView(root, 0, leftView);
        return leftView;
    }
};

```

---

## ✅ Solution 2: Right View (Recursive DFS)

```cpp
class Solution {
public:
    void collectRightView(TreeNode* node, int level, vector<int>& view) {
        if (!node) return;

        // Add the first node at this level
        if (view.size() == level) {
            view.push_back(node->val);
        }

        // Traverse right first to ensure rightmost is picked
        collectRightView(node->right, level + 1, view);
        collectRightView(node->left, level + 1, view);
    }

    vector<int> rightSideView(TreeNode* root) {
        vector<int> rightView;
        collectRightView(root, 0, rightView);
        return rightView;
    }
};

```

---

## ✅ Solution 3: Left View (Iterative BFS)

```cpp
class Solution {
public:
    vector<int> leftSideView(TreeNode* root) {
        vector<int> leftView;
        if (!root) return leftView;

        queue<TreeNode*> nodeQueue;
        nodeQueue.push(root);

        while (!nodeQueue.empty()) {
            int levelSize = nodeQueue.size();

            for (int i = 0; i < levelSize; ++i) {
                TreeNode* current = nodeQueue.front();
                nodeQueue.pop();

                if (i == 0) leftView.push_back(current->val); // first node at this level

                if (current->left) nodeQueue.push(current->left);
                if (current->right) nodeQueue.push(current->right);
            }
        }
        return leftView;
    }
};

```

---

## ✅ Solution 4: Right View (Iterative BFS)

```cpp
class Solution {
public:
    vector<int> rightSideView(TreeNode* root) {
        vector<int> rightView;
        if (!root) return rightView;

        queue<TreeNode*> nodeQueue;
        nodeQueue.push(root);

        while (!nodeQueue.empty()) {
            int levelSize = nodeQueue.size();

            for (int i = 0; i < levelSize; ++i) {
                TreeNode* current = nodeQueue.front();
                nodeQueue.pop();

                if (i == levelSize - 1) rightView.push_back(current->val); // last node at this level

                if (current->left) nodeQueue.push(current->left);
                if (current->right) nodeQueue.push(current->right);
            }
        }
        return rightView;
    }
};

```

---

## 📝 How It Works

- In **DFS**, we keep track of the level during recursion.
    - For **left view**, go left first and record the first node seen at that level.
    - For **right view**, go right first and do the same.
- In **BFS**, we use level-order traversal.
    - For **left view**, pick the first node in each level.
    - For **right view**, pick the last node in each level.

---

## 🧩 Key Observation

- Use a queue for BFS.
- Use recursion + level for DFS.
- For any side view: **track the first/last node at each level**.

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| DFS (left/right) | O(N) | O(H) |
| BFS (left/right) | O(N) | O(W) |

Where:

- **N** is total number of nodes
- **H** is tree height (recursion stack)
- **W** is tree width (queue size)

---

## ⚠️ Edge Cases

- Empty tree → returns an empty vector.
- Skewed trees (left/right) → returns all nodes linearly.
- Multiple nodes at same depth → only one (first/last) considered depending on view.

---

## 🔁 Related Problems

- **Top View of Binary Tree**
- **Bottom View of Binary Tree**
- **Vertical Order Traversal**
- **Diagonal Traversal**

---