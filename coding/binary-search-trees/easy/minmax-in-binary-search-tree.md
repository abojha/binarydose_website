---
title: Min/Max in Binary Search Tree
description: ""
tags:
  - binary-search-trees
  - easy
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Solution 1: **Minimum Value in BST**

### 🔹 Iterative Approach

```cpp
int minValue(Node* root) {
    // Traverse to the leftmost node
    while(root->left){
        root = root->left;
    }
    return root->data; // This is the minimum
}

```

---

### 🔹 Recursive Approach

```cpp
int minValue(Node* root) {
    // Base case: leftmost node reached
    if(root->left == NULL) return root->data;

    // Keep going left
    return minValue(root->left);
}

```

---

## ✅ Solution 2: **Maximum Value in BST**

### 🔹 Iterative Approach

```cpp
int maxValue(Node* root) {
    // Traverse to the rightmost node
    while(root->right){
        root = root->right;
    }
    return root->data; // This is the maximum
}

```

---

### 🔹 Recursive Approach

```cpp
int maxValue(Node* root) {
    // Base case: rightmost node reached
    if(root->right == NULL) return root->data;

    // Keep going right
    return maxValue(root->right);
}

```

---

## 📝 How It Works

- **In BST**, the leftmost node has the **smallest** value, and the rightmost node has the **largest** value.
- You can reach these nodes by simply following `.left` or `.right` pointers respectively, until `NULL`.

---

## 🧩 Key Rule

- `min = leftmost node`
- `max = rightmost node`

---

## ⏱️ Time & Space Complexity

| Approach | Time Complexity | Space Complexity |
| --- | --- | --- |
| Iterative | O(H) | O(1) ✅ |
| Recursive | O(H) | O(H) (call stack) |

Where `H` is the height of the BST. In a balanced BST, H = log N.

---

## ⚠️ Edge Cases

- BST with only one node (both min and max are the same).
- Left skewed tree → min deep, max shallow.
- Right skewed tree → min shallow, max deep.

---

## 🔁 Related Problems

- [LeetCode 700. Search in BST](https://leetcode.com/problems/search-in-a-binary-search-tree/)
- Find floor/ceil in BST
- Kth smallest/largest in BST
- Validate BST

---