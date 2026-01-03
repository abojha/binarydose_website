---
title: Next Greater Element - II
description: ""
tags:
  - easy
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

Given a circular integer array `nums` (i.e., the next element of `nums[nums.length - 1]` is `nums[0]`), return *the **next greater number** for every element in* `nums`.

The **next greater number** of a number `x` is the first greater number to its traversing-order next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return `-1` for this number.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [1,2,1]
    Output: [2,-1,2]
    Explanation: The first 1's next greater number is 2; 
    The number 2 can't find next greater number. 
    The second 1's next greater number needs to search circularly, which is also 2.
    Example 2:
    
    Input: nums = [1,2,3,4,3]
    Output: [2,3,4,-1,4]
    ```
    

---

## ✅ Solution: Monotonic Stack — Next Greater Element I (Circular Array)

---

```cpp
// ✅ Next Greater Element II Using Monotonic Stack (Circular Array)

class Solution {
public:
    vector<int> nextGreaterElements(vector<int>& nums) {
        int n = nums.size();
        vector<int> res(n, -1);
        stack<int> st;

        // Traverse the array twice in reverse to simulate circular behavior
        for (int i = 2 * n - 1; i >= 0; i--) {
            while (!st.empty() && st.top() <= nums[i % n]) {
                st.pop();
            }

            if (i < n) {
                if (!st.empty()) {
                    res[i] = st.top();
                }
            }

            st.push(nums[i % n]);
        }

        return res;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Initialize result array `res` with `1`.
- **Step 2:** Traverse the array twice in reverse:
    - This simulates circular behavior.
    - Use `% n` to wrap around the array index.
- **Step 3:** Maintain a monotonic decreasing stack:
    - Pop all smaller elements from the stack.
    - The top of the stack is the next greater element.
- **Step 4:** For the first `n` elements (`i < n`), store results in `res[]`.

✅ This approach efficiently finds the next greater element for each element considering the circular nature of the array.

---

## 🧩 Key Formula / Recurrence

- **Stack Condition:**
    
    `while (!stack.empty() && stack.top() <= nums[i % n]) → stack.pop()`
    
- **Next Greater Element:**
    
    If stack not empty → `res[i] = stack.top()`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N) |
| **Space** | O(N) |
- Each element is pushed and popped at most once.
- Stack holds elements temporarily.

---

## ⚠️ Edge Cases

- Single element array → Output should be `[-1]`.
- All elements same → No greater element exists for any index.
- Strictly decreasing array → No greater element exists.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force (Two Loops) | O(N²) | Not efficient, especially for large N. |
| Monotonic Stack (Optimal) | O(N) | Standard approach for this problem. |

---

## 🔁 Related Problems

- Next Greater Element I
- Daily Temperatures
- Stock Span Problem
- Circular Array Maximum/Minimum Queries

---