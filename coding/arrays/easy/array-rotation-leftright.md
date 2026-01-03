---
title: Array Rotation (Left/Right)
description: ""
tags:
  - array
  - easy
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ Left Rotate – Using Extra Space (Normal Method)

```cpp
void rotateArr(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;

    vector<int> temp(k); // Step 1: store first k elements

    for (int i = 0; i < k; i++) {
        temp[i] = arr[i];
    }

    // Step 2: shift remaining elements to the left
    for (int i = k; i < n; i++) {
        arr[i - k] = arr[i];
    }

    // Step 3: place stored k elements at the end
    for (int i = 0; i < k; i++) {
        arr[n - k + i] = temp[i];
    }
}

```

---

## ✅ Left Rotate – Using Reverse Function

```cpp
void rotateArr(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;

    // Reverse the first k elements
    reverse(arr.begin(), arr.begin() + k);

    // Reverse the remaining n - k elements
    reverse(arr.begin() + k, arr.end());

    // Reverse the whole array
    reverse(arr.begin(), arr.end());
}

```

---

## ✅ Right Rotate – Using Extra Space (Normal Method)

```cpp
void rotateToRight(int arr[], int n, int k) {
    if (n == 0) return;

    k = k % n;
    if (k > n) return;

    int temp[k];

    // Step 1: Store last k elements
    for (int i = n - k; i < n; i++) {
        temp[i - (n - k)] = arr[i];
    }

    // Step 2: Shift first n - k elements to the right
    for (int i = n - k - 1; i >= 0; i--) {
        arr[i + k] = arr[i];
    }

    // Step 3: Place temp[] elements at the start
    for (int i = 0; i < k; i++) {
        arr[i] = temp[i];
    }
}

```

---

## ✅ Right Rotate – Using Reverse Function

```cpp
void rotateRight(vector<int>& arr, int k) {
    int n = arr.size();
    k = k % n;

    // Step 1: Reverse last k elements
    reverse(arr.begin() + (n - k), arr.end());

    // Step 2: Reverse first n - k elements
    reverse(arr.begin(), arr.begin() + (n - k));

    // Step 3: Reverse entire array
    reverse(arr.begin(), arr.end());
}

```

---

## 📝 How It Works

### Left Rotate (Normal):

- Save the first `k` elements into a temp array.
- Shift the rest to the left.
- Place saved elements at the end.

### Left Rotate (Reverse):

- Reverse first `k`, then rest, then whole array.
- Works due to **reversal rotation logic**.

### Right Rotate (Normal):

- Save the last `k` elements.
- Shift remaining elements to the right.
- Place saved elements at the beginning.

### Right Rotate (Reverse):

- Reverse last `k`, then the rest, then the entire array.

---

## 🧩 Key Formula

### Reverse Logic:

- To **left rotate by `k`**, reverse in this order:
    1. First `k`
    2. Remaining `n-k`
    3. Whole array
- To **right rotate by `k`**, reverse:
    1. Last `k`
    2. First `n-k`
    3. Whole array

---

## ⏱️ Time & Space Complexity

| Version | Time | Space |
| --- | --- | --- |
| Left Rotate (Normal) | O(N) | O(K) |
| Left Rotate (Reverse) | O(N) | O(1) |
| Right Rotate (Normal) | O(N) | O(K) |
| Right Rotate (Reverse) | O(N) | O(1) |

---

## ⚠️ Edge Cases

- `k = 0` → No rotation
- `k >= n` → Normalize with `k % n`
- Empty array → No operation
- `k == n` → Full rotation → same as original

---

## 🔁 Related Problems

- Rotate Array (Leetcode 189)
- Reverse a portion of array
- Rotate Matrix
- Cyclically Rotate Linked List

---