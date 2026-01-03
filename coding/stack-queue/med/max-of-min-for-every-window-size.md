---
title: Max of min for every window size
description: ""
tags:
  - med
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

You are given an integer array **arr[]**, the task is to find the **maximum of minimum values** for every window size **k** where **1≤ k ≤ arr.size()**.

For each window size **k**, consider all contiguous subarrays of length **k**, determine the minimum element in each subarray, and then take the maximum among all these minimums.

Return the results as an array, where the element at index **i** represents the answer for window size **i+1**.

- Example:
    
    ```
    Input:arr[] = [10, 20, 30, 50, 10, 70, 30]
    Output:[70, 30, 20, 10, 10, 10, 10]
    Explanation:
    Window size 1: minimums are [10, 20, 30, 50, 10, 70, 30], maximum of minimums is 70.
    Window size 2: minimums are [10, 20, 30, 10, 10, 30], maximum of minimums is 30.
    Window size 3: minimums are [10, 20, 10, 10, 10], maximum of minimums is 20.
    Window size 4–7: minimums are [10, 10, 10, 10], maximum of minimums is 10.
    ```
    
    ```
    Input:arr[] = [10, 20, 30]
    Output:[30, 20, 10]
    Explanation:
    Window size 1: minimums of  [10], [20], [30], maximum of minimums is 30.
    Window size 2: minimums of [10, 20], [20,30], maximum of minimums is 20.
    Window size 3: minimums of [10,20,30], maximum of minimums is 10.
    ```
    

---

## ✅ Solution: Previous/Next Smaller Elements (Stack) — Window-of-Minimums

```cpp
#include <bits/stdc++.h>
using namespace std;

class Solution {
public:
    vector<int> maxOfMins(vector<int>& arr) {
        int n = arr.size();
        vector<int> prevSmaller(n), nextSmaller(n);
        stack<int> st;

        // Prev smaller element indices (strictly smaller)
        while(!st.empty()) st.pop();
        for(int i = 0; i < n; ++i){
            while(!st.empty() && arr[st.top()] >= arr[i]) st.pop();
            prevSmaller[i] = st.empty() ? -1 : st.top();
            st.push(i);
        }

        // Next smaller element indices (strictly smaller)
        while(!st.empty()) st.pop();
        for(int i = n - 1; i >= 0; --i){
            while(!st.empty() && arr[st.top()] >= arr[i]) st.pop();
            nextSmaller[i] = st.empty() ? n : st.top();
            st.push(i);
        }

        // res[len] will store the maximum of minimums for windows of length = len
        vector<int> res(n + 1, INT_MIN);
        for(int i = 0; i < n; ++i){
            int length = nextSmaller[i] - prevSmaller[i] - 1;     // window length where arr[i] is minimum
            res[length] = max(res[length], arr[i]);
        }

        // Fill empty entries: for smaller window sizes there might be no direct value,
        // so propagate max to smaller lengths (monotonicity).
        for(int len = n - 1; len >= 1; --len){
            res[len] = max(res[len], res[len + 1]);
        }

        // build answer for window sizes 1..n
        vector<int> ans(n);
        for(int len = 1; len <= n; ++len) ans[len - 1] = res[len] == INT_MIN ? 0 : res[len];

        return ans;
    }
};

```

---

## 📝 How It Works

- For each element `arr[i]` we find how far it can extend as the **minimum** in contiguous windows:
    - `prevSmaller[i]` = index of previous element strictly smaller than `arr[i]` (or `1` if none).
    - `nextSmaller[i]` = index of next element strictly smaller than `arr[i]` (or `n` if none).
- The largest window length where `arr[i]` is the minimum equals `len = nextSmaller[i] - prevSmaller[i] - 1`.
- For that `len`, `arr[i]` is a candidate minimum; we record `res[len] = max(res[len], arr[i])`.
- Finally, some lengths might not get a direct value; we propagate maxima from larger window sizes downwards:
    - `res[k] = max(res[k], res[k+1])` for `k = n-1 .. 1`.
- Return `res[1..n]` as the answer (shifted to 0-based vector).

---

## 🧩 Key Formula / Relation

- Window length where `arr[i]` is minimum:
    
    ```
    len(i) = nextSmaller[i] - prevSmaller[i] - 1
    
    ```
    
- Final value for a window length `L`:
    
    ```
    ans[L] = max{ arr[i] | len(i) == L }   (then propagate ans[L] = max(ans[L], ans[L+1]))
    
    ```
    

---

## ⏱️ Time & Space Complexity

- Time: **O(n)** — Each element is pushed/popped from the stack at most once; rest are linear passes.
- Space: **O(n)** — For `prevSmaller`, `nextSmaller`, `res` and the stack.

---

## ⚠️ Edge Cases

- Single element array (`n = 1`) — returns that element as the only value.
- All elements equal — every window size has the same minimum; propagation handles this correctly.
- Strictly increasing or strictly decreasing arrays — next/prev smaller logic still valid.
- When using `INT_MIN` as sentinel, ensure final output maps unset entries to an appropriate value (I used `0` for safety; depending on problem statement you may want another default — often all windows will be filled after propagation so sentinel rarely persists).

---

## 💡 Other Approaches

1. **Brute force sliding windows** — O(n²) or O(n³) depending on implementation; impractical for large `n`.
2. **Segment tree / RMQ + binary searches** — could compute minima over ranges, but still slower and more complex than the linear stack method.
3. **Divide & conquer** — theoretical possibility but more complex and not faster than the stack approach for this problem.

---

## 🔁 Related Problems

- "Sliding Window Minimum" — computing min for each fixed-size window (deque method).
- "Maximum of minimum for every window size" (this exact problem / GFG classic).
- "Next Greater Element / Next Smaller Element" family of problems (stack-based).

---