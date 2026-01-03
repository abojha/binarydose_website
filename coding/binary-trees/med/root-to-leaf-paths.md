---
title: Root to Leaf Paths
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a **Binary Tree**, you need to **find all the possible paths** from the **root node** to all the **leaf nodes** of the binary tree.

**Note:** The paths should be returned such that paths from the left subtree of any node are **listed first**, followed by paths from the right subtree.

**Examples:**

```
Input:root[] = [1, 2, 3, 4, 5, N, N]
Output:[[1, 2, 4], [1, 2, 5], [1, 3]]
Explanation:All the possible paths from root node to leaf nodes are: 1 -> 2 -> 4, 1 -> 2 -> 5 and 1 -> 3
```

![ex-3](https://media.geeksforgeeks.org/wp-content/uploads/20241007105251989873/ex-3.webp)

```
Input:root[] = [1, 2, 3]

Output:[[1, 2], [1, 3]]
Explanation:All the possible paths from root node to leaf nodes are: 1 -> 2 and 1 -> 3
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700553/Web/Other/blobid0_1745821559.jpg)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: DFS with Backtracking

```cpp
class Solution {
  public:
    // Helper function to collect all root-to-leaf paths
    void solve(Node *currentNode, vector<int> currentPath, vector<vector<int>> &allPaths){
        if(currentNode == NULL) return;  // Base case: null node

        currentPath.push_back(currentNode->data); // Add current node to path

        // If it's a leaf node, store the complete path
        if(currentNode->left == NULL && currentNode->right == NULL){
            allPaths.push_back(currentPath);
            return;
        }

        // Recurse to the left and right subtree
        solve(currentNode->left, currentPath, allPaths);
        solve(currentNode->right, currentPath, allPaths);
    }

    // Main function to return all root-to-leaf paths
    vector<vector<int>> Paths(Node* root) {
        vector<vector<int>> allPaths;     // Stores all the resulting paths
        vector<int> currentPath;          // Tracks current traversal path

        solve(root, currentPath, allPaths);
        return allPaths;
    }
};

```

---

## 📝 How It Works

- Performs a **recursive depth-first traversal** of the binary tree.
- Maintains a `currentPath` list that accumulates the nodes on the path from root to current node.
- On reaching a **leaf node**, the path is stored in `allPaths`.
- The recursion unwinds and backtracks to explore all root-to-leaf paths.

---

## 🧩 Key Concept

- Traverse from root to every leaf, recording each unique path.
- This is a standard **DFS + backtracking** pattern.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) — Every node is visited once |
| Space | O(H) for recursion stack, plus O(P × L) for storing paths |
- `N`: number of nodes
- `H`: height of the tree
- `P`: number of paths (leaf nodes)
- `L`: average length of a path

---

## ⚠️ Edge Cases

- Tree is empty → returns an empty list.
- Tree has only one node → returns a single path with that node.
- Skewed trees → still correctly records paths.

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| DFS + backtracking (this) ✅ | O(N) | O(H) |
| BFS (level-order path build) | O(N) | O(N) — more space-heavy |

---

## 🔁 Related Problems

- [Leetcode 257: Binary Tree Paths](https://leetcode.com/problems/binary-tree-paths/)
- [Leetcode 113: Path Sum II](https://leetcode.com/problems/path-sum-ii/)
- [GFG: Root to Leaf Paths](https://practice.geeksforgeeks.org/problems/root-to-leaf-paths/1)

---