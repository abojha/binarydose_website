---
title: Root to Given Leaf  Path
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

A Binary Tree and a reference to a root belonging to it. Return the path from the root node to the given leaf node.

**No two nodes in the tree have the same data value.It is assured that the given node is present and a path always exists.**

- No two nodes in the tree have the same data value.
- It is assured that the given node is present and a path always exists.
- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: DFS with Backtracking (Single Path to Given Leaf)

```cpp
class Solution {
  public:
    // Helper function to find the path to the target leaf node
    bool solve(Node* currentNode, int targetLeaf, vector<int>& currentPath) {
        if (currentNode == NULL) return false;

        // Add current node to path
        currentPath.push_back(currentNode->data);

        // Check if it's the target leaf node
        if (currentNode->data == targetLeaf && currentNode->left == NULL && currentNode->right == NULL)
            return true;

        // Recurse to left and right
        if (solve(currentNode->left, targetLeaf, currentPath) || solve(currentNode->right, targetLeaf, currentPath))
            return true;

        // Backtrack if path does not lead to the target leaf
        currentPath.pop_back();
        return false;
    }

    // Function to return path from root to a given leaf node
    vector<int> PathToLeaf(Node* root, int targetLeaf) {
        vector<int> path;
        solve(root, targetLeaf, path);
        return path;
    }
};

```

---

## 📝 How It Works

- Performs a **depth-first traversal** while maintaining the current path.
- Adds each node visited to `currentPath`.
- If the current node is the **target leaf**, it returns `true` and stops further recursion.
- If the path doesn't lead to the target, we **backtrack** by removing the last added node.
- Only the **first valid path** to the given leaf is returned.

---

## 🧩 Key Condition

```cpp
if (currentNode->data == targetLeaf && currentNode->left == NULL && currentNode->right == NULL)

```

- Ensures the path ends at a **leaf node** with the specified value.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) – every node may be visited once |
| Space | O(H) – due to recursion stack and path list |
- `N` = number of nodes
- `H` = height of the tree

---

## ⚠️ Edge Cases

- If the target leaf doesn't exist → returns empty path.
- Tree has only one node → returns `[root]` if it matches target.
- Target is not a leaf (i.e., internal node) → path is not returned.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| DFS + Backtracking ✅ | O(N) | O(H) |
| BFS with parent mapping | O(N) | O(N) |

> DFS is preferred for path-building since it's naturally recursive and easy to backtrack.
> 

---

## 🔁 Related Problems

- Leetcode 112: Path Sum
- Leetcode 113: Path Sum II
- Leetcode 257: Binary Tree Paths
- GFG: Root to a Given Leaf Path

---