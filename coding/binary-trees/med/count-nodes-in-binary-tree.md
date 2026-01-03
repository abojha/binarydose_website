---
title: Count Nodes in Binary Tree
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

You are given the root of a **complete** binary tree. Your task is to find the **count** of nodes.

A complete binary tree is a binary tree whose, all levels except the last one are completely filled, the last level may or may not be completely filled and Nodes in the last level are as left as possible.

Design an algorithm that runs better than O(n).

**Example:**

```
Input:
root = [1,2,3,4,5,6]
Output:
6
Explanation:
There are a total of 6 nodes in the given tree.
```

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: Iterative BFS (Level Order Traversal)

```cpp
class Solution {
  public:
    int countNodes(Node* root) {
        // Level-order traversal using queue
        queue<Node*> q;
        q.push(root);
        int countNode = 1;

        while(!q.empty()){
            Node *curr = q.front();
            q.pop();

            if(curr->left){
                q.push(curr->left);
                countNode++;
            }

            if(curr->right){
                q.push(curr->right);
                countNode++;
            }
        }

        return countNode;
    }
};

```

---

## ✅ Solution 2: Recursive DFS

```cpp
class Solution {
  public:
    int countNodes(Node* root) {
        // Base case: if node is null, return 0
        if (root == NULL) return 0;

        // Recursive case: 1 (current node) + left + right
        return 1 + countNodes(root->left) + countNodes(root->right);
    }
};

```

---

## 📝 How It Works

### ✅ Iterative (BFS)

- Perform level order traversal using a queue.
- For each node visited, increment a counter.
- Explore both left and right children.

### ✅ Recursive (DFS)

- Use postorder recursion.
- For each node, recursively count the nodes in its left and right subtrees.
- Return `1 + left_count + right_count` for each node.

---

## 🧩 Key Formula

- **Recursive:**
    
    `count(root) = 1 + count(left) + count(right)`
    
- **Iterative:**
    
    BFS traversal → count each node encountered.
    

---

## ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Iterative BFS ✅ | O(N) | O(N) – queue |
| Recursive DFS ✅ | O(N) | O(H) – recursion stack |
- `N`: number of nodes
- `H`: height of the tree

---

## ⚠️ Edge Cases

- `root == NULL` → should return `0`
- Skewed tree (all left or all right) → handled correctly
- Perfect binary tree → still works for both

---

## 💡 Other Approaches

| Approach | Time | Space | Comment |
| --- | --- | --- | --- |
| DFS Recursive ✅ | O(N) | O(H) | Simple and clean |
| BFS Iterative ✅ | O(N) | O(N) | Useful for large trees |
| Optimized for Complete Binary Tree | O(log²N) | O(logN) | Compare heights of left/right |

---

## 🔁 Related Problems

- Leetcode 222: Count Complete Tree Nodes
- Leetcode 104: Maximum Depth of Binary Tree
- GFG: Count the Number of Nodes in a Binary Tree
- Leetcode 110: Balanced Binary Tree

---