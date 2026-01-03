---
title: Min Heap Implementation in CPP
description: ""
tags:
  - easy
  - heaps
  - learning
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

## ✅ **Min Heap Full Code with Structured Notes**

```cpp
#include<iostream>
using namespace std;

struct Heaps {
    int *array;
    int capacity;
    int count;
    int heap_type; // 0 for Min Heap
};

Heaps* create_a_heap(int capacity, int heap_type) {
    Heaps *h = new Heaps();
    if (!h) {
        cout << "Memory Error\n";
        return NULL;
    }
    h->heap_type = heap_type;
    h->capacity = capacity;
    h->count = 0;
    h->array = new int[h->capacity];
    return h;
}

int Parent(Heaps *h, int i) {
    if (i <= 0 || i >= h->count) return -1;
    return (i - 1) / 2;
}

int left_child(Heaps *h, int i) {
    int left = 2 * i + 1;
    if (left >= h->count) return -1;
    return left;
}

int right_child(Heaps *h, int i) {
    int right = 2 * i + 2;
    if (right >= h->count) return -1;
    return right;
}

int min_element(Heaps *h) {
    if (h->count == 0) return -1;
    return h->array[0];
}

int max_element(Heaps *h) {
    int maxVal = INT_MIN;
    if (h->count == 0) return -1;
    for (int i = (h->count + 1) / 2; i < h->count; i++) {
        maxVal = max(maxVal, h->array[i]);
    }
    return maxVal;
}

void prelocate_down(Heaps *h, int i) {
    int l = left_child(h, i);
    int r = right_child(h, i);
    int minIndex = i;

    if (l != -1 && h->array[l] < h->array[minIndex])
        minIndex = l;
    if (r != -1 && h->array[r] < h->array[minIndex])
        minIndex = r;

    if (minIndex != i) {
        swap(h->array[i], h->array[minIndex]);
        prelocate_down(h, minIndex);
    }
}

int delete_element(Heaps *h) {
    if (h->count == 0) return -1;
    int data = h->array[0];
    h->array[0] = h->array[h->count - 1];
    h->count--;
    prelocate_down(h, 0);
    return data;
}

void Resize(Heaps *h) {
    int *old_array = h->array;
    h->array = new int[h->capacity * 2];
    for (int i = 0; i < h->capacity; i++) {
        h->array[i] = old_array[i];
    }
    h->capacity *= 2;
    delete[] old_array;
}

void Insert(Heaps *h, int data) {
    if (h->count == h->capacity) Resize(h);

    int i = h->count;
    h->count++;

    while (i > 0 && data < h->array[(i - 1) / 2]) {
        h->array[i] = h->array[(i - 1) / 2];
        i = (i - 1) / 2;
    }
    h->array[i] = data;
}

void Destroy(Heaps *h) {
    if (!h) return;
    delete[] h->array;
    delete h;
}

void Build_Heap(Heaps *h, int *a, int n) {
    if (!h) return;
    while (n > h->capacity) Resize(h);

    for (int i = 0; i < n; i++) {
        h->array[i] = a[i];
    }
    h->count = n;

    for (int i = (n - 1) / 2; i >= 0; i--) {
        prelocate_down(h, i);
    }
}

void delete_at_index(Heaps *h, int i) {
    if (i >= h->count) {
        cout << "Wrong Position";
        return;
    }
    h->array[i] = h->array[h->count - 1];
    h->count--;
    prelocate_down(h, i);
    cout << "Successfully Deleted the element\n";
}

int Delete_Kth_element(Heaps *h, int k) {
    for (int i = 0; i < k - 1; i++) {
        delete_element(h);
    }
    return delete_element(h);
}

int main() {
    Heaps *s = create_a_heap(5, 0); // Min Heap type
    int a[] = {23, 67, 45, 32, 11};
    Build_Heap(s, a, 5);

    cout << "Min element: " << min_element(s) << endl;
    cout << "Max leaf element: " << max_element(s) << endl;

    cout << "4th smallest element: " << Delete_Kth_element(s, 4) << endl;

    Destroy(s);
    return 0;
}

```

---

## ✅ Revision Notes Template

---

### 📝 How It Works

- **Min Heap:** Smallest element always at root.
- All core functionalities like insert, delete, resize, build heap from array are implemented.
- Switched comparison signs from Max Heap to Min Heap logic:
    - `>` → `<` during insertion and prelocate_down.

---

### 🧩 Key Formulas

- **Parent:** `(i - 1) / 2`
- **Left Child:** `2 * i + 1`
- **Right Child:** `2 * i + 2`
- **Min Heap Property:** `parent <= children`

---

### ⏱️ Time & Space Complexity

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Insert | O(log N) | O(1) |
| Delete Min | O(log N) | O(1) |
| Build Heap | O(N) | O(1) |
| Delete K-th Element | O(K * log N) | O(1) |

---

### ⚠️ Edge Cases

- Heap is empty.
- Deleting invalid index.
- Dynamic resize tested.

---

### 💡 Other Approaches

- C++ STL `priority_queue` (use `greater<int>` comparator for min heap).
- Class-based heap implementation for encapsulation.

---

### 🔁 Related Problems

- LeetCode 703: Kth Largest Element in a Stream
- LeetCode 295: Find Median from Data Stream (Min and Max Heap combined)

---

### ✅ Real-World Analogy

- **Priority Line System:** Customers with smaller waiting times (values) are served first.

---