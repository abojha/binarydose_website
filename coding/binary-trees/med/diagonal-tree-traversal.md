---
title: Diagonal Tree Traversal
description: ""
tags:
  - binary-trees
  - med
---

### Problem Statement:

Given a Binary Tree, return the **diagonal traversal** of the binary tree.

Consider lines of slope -1 passing between nodes. Given a Binary Tree, return a single list containing all diagonal elements in a binary tree belonging to same line.If the diagonal element are present in two different subtrees then left subtree diagonal element should be taken first and then right subtree.

- Example:
    
    **Examples :**
    
    ```
    Input : root = [8, 3, 10, 1, 6, N, 14, N, N, 4, 7, 13]
    
    Output : [8, 10, 14, 3, 6, 7, 13, 1, 4]
    Explanation:
    
    Diagonal Traversal of binary tree : 8 10 14 3 6 7 13 1 4
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700193/Web/Other/blobid1_1752144358.webp)
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700193/Web/Other/blobid2_1752144427.webp)
    
    ```
    Input: root = [1, 2, N, 3, N]
    
    Output: [1, 2, 3]
    ```
    
    ![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700193/Web/Other/blobid3_1752144482.webp)
    

---

## Solution: DFS with Level Mapping (Diagonal Indexing)

```cpp
/* A binary tree node
struct Node{
    int data;
    Node *left, *right;
}; */

class Solution {
  public:
    // Collect nodes grouped by their diagonal index.
    // Rule: moving right keeps you on the same diagonal,
    //       moving left moves you to the next diagonal (index + 1).
    void collectDiagonal(Node* node,
                         int diagonalIndex,
                         unordered_map<int, vector<int>>& groups,
                         int &maxDiagonal) {
        if (!node) return;

        groups[diagonalIndex].push_back(node->data);
        maxDiagonal = max(maxDiagonal, diagonalIndex);

        // Visit right first to preserve expected diagonal order (root->right chain first)
        collectDiagonal(node->right, diagonalIndex, groups, maxDiagonal);      // same diagonal
        collectDiagonal(node->left, diagonalIndex + 1, groups, maxDiagonal);   // next diagonal
    }

    vector<int> diagonal(Node *root) {
        if (!root) return {};

        unordered_map<int, vector<int>> groups;
        int maxDiagonal = 0;

        collectDiagonal(root, 0, groups, maxDiagonal);

        // Flatten diagonals in order: 0, 1, 2, ...
        vector<int> traversal;
        traversal.reserve(groups.size()); // rough reserve
        for (int d = 0; d <= maxDiagonal; ++d) {
            if (groups.count(d)) {
                // Append nodes of diagonal d preserving insertion order
                for (int value : groups[d]) traversal.push_back(value);
            }
        }
        return traversal;
    }
};

```

---

## Alternative Solution: Iterative Queue (BFS-Style)

```cpp
/* A binary tree node
struct Node{
    int data;
    Node *left, *right;
}; */

class Solution {
  public:
    // Classic iterative approach:
    // Use a queue to store left children while walking right chains.
    vector<int> diagonal(Node *root) {
        if (!root) return {};

        vector<int> traversal;
        queue<Node*> pending;      // holds the next starting points (left children)
        pending.push(root);

        while (!pending.empty()) {
            Node* current = pending.front();
            pending.pop();

            // Walk the entire right chain from 'current'
            while (current) {
                traversal.push_back(current->data);
                if (current->left) {
                    // Left child starts a new diagonal later
                    pending.push(current->left);
                }
                current = current->right; // stay on the same diagonal
            }
        }
        return traversal;
    }
};

```

---

## 📝 How It Works

- Think of each **diagonal** as moving along **right pointers**; going **left** bumps you to the **next diagonal**.
- **DFS version** groups nodes by `diagonalIndex`:
    - Right child ⇒ same `diagonalIndex`
    - Left child ⇒ `diagonalIndex + 1`
    - We visit **right first** to match expected order (root-right chain before diving left).
- **BFS version**:
    - Keep a queue of left children.
    - For each queued node, traverse its entire right chain, pushing each node’s left child to the queue for later.
    - Naturally yields diagonal-by-diagonal order.

---

## 🧩 Key Formula / Recurrence

- If `diag(u)` is the diagonal index of node `u`:
    - `diag(u->right) = diag(u)`
    - `diag(u->left) = diag(u) + 1`

---

## ⏱️ Time & Space Complexity

- **Time:** `O(N)` for both approaches (each node is visited once).
- **Space:**
    - DFS + `unordered_map`: `O(N)` for storing groups + recursion stack `O(H)`.
    - BFS (queue): `O(W)` where `W` is max number of nodes held across diagonals (≤ `N`).

---

## ⚠️ Edge Cases

- Empty tree ⇒ return empty vector.
- Single-node tree ⇒ return `{root->data}`.
- **Right-skewed** tree ⇒ all nodes on the same diagonal.
- **Left-skewed** tree ⇒ each node on a new diagonal (indices 0..H-1).
- Using `unordered_map` demands we **emit diagonals in order** (0..max); iterating map directly would be unordered.

---

## 💡 Other Approaches

- Use `std::map<int, vector<int>>` to keep diagonals auto-sorted by key (simplifies emission order; slightly higher overhead).
- Compute **Diagonal Sums** instead of traversal using the same indexing trick (replace vector with running sum).
- Morris-style variants exist but add complexity with limited benefit here.

---

## 🔁 Related Problems

- Vertical Order Traversal of Binary Tree
- Top View / Bottom View of Binary Tree
- Boundary Traversal of Binary Tree