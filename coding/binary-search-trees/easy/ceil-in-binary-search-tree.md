---
title: Ceil in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - easy
---

### Problem Statement:

Given a BST and a number **X**, find **Ceil of X**.

**Note:** Ceil(X) is a number that is either equal to X or is immediately greater than X.

If Ceil could not be found, return -1.

**Examples:**

```
Input:root = [5, 1, 7, N, 2, N, N, N, 3], X = 3

Output:3
Explanation:We find 3 in BST, so ceil of 3 is 3.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/701135/Web/Other/blobid1_1747983254.webp)

```
Input:root = [10, 5, 11, 4, 7, N, N, N, N, N, 8], X = 6

Output:7
Explanation:We find 7 in BST, so ceil of 6 is 7.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/701135/Web/Other/blobid2_1747983312.webp)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Iterative

```cpp
int findCeil(Node* root, int input) {
    int ceil = -1;

    while(root){
        if(root->data == input){
            // Found exact match — this is the ceil
            ceil = root->data;
            return ceil;
        }
        else if(input > root->data){
            // Move right to find a bigger or equal value
            root = root->right;
        }
        else{
            // Potential ceil found, move left to find smaller closer candidate
            ceil = root->data;
            root = root->left;
        }
    }
    return ceil;
}

```

---

## 📝 How It Works

- Start at the root.
- If the current node's value is equal to the target, it is the ceil.
- If the current node's value is **less than** the input, move **right** (need a larger number).
- If the current node's value is **greater than** the input, store it as a potential **ceil** and move **left** (to possibly find a smaller ceil).
- Repeat until you exhaust the tree.

---

## 🧩 Key Logic

> The ceil of a number x in BST is the smallest number ≥ x.
> 
- Use BST properties:
    - Left < Node < Right
    - Traverse accordingly.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(H) |
| Space | O(1) |

Where `H` is the height of the tree — O(log N) for balanced BST, O(N) for skewed.

---

## ⚠️ Edge Cases

- No node ≥ input ⇒ return `1`
- Exact match exists ⇒ return immediately
- Input is greater than all values ⇒ return `1`
- Input is smaller than all values ⇒ return leftmost node

---

## 💡 Other Approaches

| Approach | Time | Space |
| --- | --- | --- |
| Recursive | O(H) | O(H) (stack) |
| Brute Force (inorder traversal + binary search) | O(N) | O(N) |

---

## 🔁 Related Problems

- [Leetcode 701: Insert into BST](https://leetcode.com/problems/insert-into-a-binary-search-tree/)
- [Find Floor in BST](https://www.geeksforgeeks.org/floor-in-a-binary-search-tree/)
- Kth smallest/largest element in BST
- Predecessor and Successor in BST

---