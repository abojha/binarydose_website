---
title: Floor in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - easy
---

### Problem Statement:

You are given a BST(Binary Search Tree) withv**n** number of nodes and value **x**. your task is to find the greatest value node of the BST which is smaller than or equal to x.

**Note:** when x is smaller than the smallest node of BST then returns -1.

- Example:
    
    ```
    Input:
    n = 7               2
                         \
                          81
                        /     \
                     42       87
                       \       \
                        66      90
                       /
                     45
    x = 87
    Output: 87
    Explanation: 87 is present in tree so floor will be 87.
    ```
    

---

---

## ✅ Solution: Iterative

```cpp
int floor(Node* root, int x) {
    int flr = -1;

    while(root){
        if(root->data == x){
            // Exact match is the floor
            flr = root->data;
            return flr;
        }
        else if(x > root->data){
            // Potential floor found, but try to find closer value in right subtree
            flr = root->data;
            root = root->right;
        }
        else{
            // Current node is greater, floor must lie in the left subtree
            root = root->left;
        }
    }
    return flr;
}

```

---

## 📝 How It Works

- Start at the root and try to locate the greatest value ≤ `x`.
- If node's value equals `x` ⇒ it's the floor.
- If current node's value < `x`, it's a **potential floor**, but we try to move right to find a closer one.
- If current node > `x`, floor must be in the left subtree.
- Continue this till you reach the end of the tree.

---

## 🧩 Key Logic

> The floor of x in BST is the largest number ≤ x.
> 
- This leverages BST's sorted structure:
    - Go left for smaller values.
    - Go right for potentially closer floors.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(H) |
| Space | O(1) |

Where `H` is height of the tree. (O(log N) for balanced BST)

---

## ⚠️ Edge Cases

- No node ≤ `x` ⇒ return `1`
- `x` exists ⇒ return it directly
- `x` < all values in BST ⇒ return `1`
- `x` > all values ⇒ return the maximum node

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Recursive | O(H) | O(H) (stack) |
| Inorder + Linear Scan | O(N) | O(N) |

---

## 🔁 Related Problems

- **Ceil in BST** (smallest ≥ x)
- **Find kth largest/smallest in BST**
- **Predecessor & Successor in BST**
- **Floor in a sorted array**

---