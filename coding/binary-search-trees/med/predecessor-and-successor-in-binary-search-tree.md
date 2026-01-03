---
title: Predecessor and Successor in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - med
---

### Problem Statement:

You are given root node of the **BST** and an integer **key**. You need to find the in-order **successor** and **predecessor** of the given key. If either predecessor or successor is not found, then set it to **NULL**.

**Note**:- In an inorder traversal the number just **smaller** than the target is the predecessor and the number just **greater** than the target is the successor.

**Examples :**

```
Input:root[] = [8, 1, 9, N, 4, N, 10, 3, N, N, N], key = 8
Output:4 9
Explanation:In the given BST the inorder predecessor of 8 is 4 and inorder successor of 8 is 9.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700614/Web/Other/blobid4_1746526041.webp)

```
Input:root[] = [10, 2, 11, 1, 5, N, N, N, N, 3, 6, N, 4, N, N], key = 11
Output:10 -1
Explanation:In given BST, the inorder predecessor of 11 is 10 whereas it does not have any inorder successor.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700614/Web/Other/blobid6_1746526133.webp)

```
Input:root[] = [2, 1, 3], key = 3
Output:2 -1
Explanation: In given BST, the inorder predecessor of 3 is 2 whereas it does not have any inorder successor.
```

![](https://media.geeksforgeeks.org/img-practice/prod/addEditProblem/700614/Web/Other/blobid7_1746526171.webp)

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution: Recursive/Iterative Hybrid (Using BST Properties)

```cpp
class Solution {
  public:
    Node* findPre(Node* root, int key) {
        Node* predecessor = NULL;
        Node* current = root;

        while (current) {
            if (current->data < key) {
                predecessor = current;
                current = current->right;
            } else if (current->data > key) {
                current = current->left;
            } else break;
        }

        if (current != NULL && current->left) {
            Node* temp = current->left;
            while (temp->right) {
                temp = temp->right;
            }
            return temp;
        }

        return predecessor;
    }

    Node* findSuc(Node* root, int key) {
        Node* successor = NULL;
        Node* current = root;

        while (current) {
            if (current->data < key) {
                current = current->right;
            } else if (current->data > key) {
                successor = current;
                current = current->left;
            } else break;
        }

        if (current != NULL && current->right) {
            Node* temp = current->right;
            while (temp->left) {
                temp = temp->left;
            }
            return temp;
        }

        return successor;
    }

    vector<Node*> findPreSuc(Node* root, int key) {
        vector<Node*> res;
        res.push_back(findPre(root, key));
        res.push_back(findSuc(root, key));
        return res;
    }
};

```

---

## 📝 How It Works

- **Predecessor**: Largest value **less than** key.
    - Traverse towards right when possible, tracking the last valid predecessor.
    - If exact node found, look into its left subtree’s rightmost node.
- **Successor**: Smallest value **greater than** key.
    - Traverse towards left when possible, tracking the last valid successor.
    - If exact node found, look into its right subtree’s leftmost node.

---

## 🧩 Key Observations

- **For predecessor**:
    
    While traversing, if `node->data < key`, store `node` and move right.
    
- **For successor**:
    
    While traversing, if `node->data > key`, store `node` and move left.
    

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(H) |
| Space | O(1) |

Where `H` is the height of the BST → `O(log N)` for balanced BST.

---

## ⚠️ Edge Cases

- Key not present in BST → predecessor and successor are calculated based on nearest smaller/larger value.
- Tree with only one node → both predecessor and successor are `NULL`.
- Key is the smallest/largest value in BST → one of predecessor or successor will be `NULL`.

---

## 💡 Other Approaches

| Method | Time | Space | Notes |
| --- | --- | --- | --- |
| Full Inorder Traversal | O(N) | O(N) | Simple but not BST optimized |
| ✅ BST Property Based | O(H) | O(1) | Efficient for BST |

---

## 🔁 Related Problems

- Leetcode 285: [Inorder Successor in BST](https://leetcode.com/problems/inorder-successor-in-bst/)
- Leetcode 510: Inorder Successor in BST II
- Predecessor in BST problem
- Find Floor and Ceil in BST

---