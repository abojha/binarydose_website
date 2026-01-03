---
title: Next Greater Element - I
description: ""
tags:
  - easy
  - monotonic
  - queue
  - stack
  - stack-queue
---

### Problem Statement:

The **next greater element** of some element `x` in an array is the **first greater** element that is **to the right** of `x` in the same array.

You are given two **distinct 0-indexed** integer arrays `nums1` and `nums2`, where `nums1` is a subset of `nums2`.

For each `0 <= i < nums1.length`, find the index `j` such that `nums1[i] == nums2[j]` and determine the **next greater element** of `nums2[j]` in `nums2`. If there is no next greater element, then the answer for this query is `-1`.

Return *an array* `ans` *of length* `nums1.length` *such that* `ans[i]` *is the **next greater element** as described above.*

- Example:
    
    ```
    Example 1:
    
    Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
    Output: [-1,3,-1]
    Explanation: The next greater element for each value of nums1 is as follows:
    - 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
    - 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
    - 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
    Example 2:
    
    Input: nums1 = [2,4], nums2 = [1,2,3,4]
    Output: [3,-1]
    Explanation: The next greater element for each value of nums1 is as follows:
    - 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
    - 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.
     
    ```
    

---

## ✅ Solution: Monotonic Stack — Next Greater Element I

---

```cpp
// ✅ Next Greater Element I Using Monotonic Stack + Map Lookup

class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        int n1 = nums1.size();
        int n2 = nums2.size();
        map<int, int> mpp;  // Maps each number in nums2 to its next greater element
        stack<int> st;
        vector<int> res;

        // Process nums2 from right to left
        for (int i = n2 - 1; i >= 0; i--) {
            int num = nums2[i];

            // Maintain decreasing stack
            while (!st.empty() && st.top() <= num) {
                st.pop();
            }

            if (!st.empty()) {
                mpp[num] = st.top();
            } else {
                mpp[num] = -1;
            }

            st.push(num);
        }

        // Build result for nums1 using precomputed map
        for (auto n : nums1) {
            res.push_back(mpp[n]);
        }

        return res;
    }
};

```

---

## 📝 How It Works

- **Step 1:** Preprocess `nums2` using a monotonic decreasing stack:
    - For each number from right to left, find the next greater element using the stack.
    - Store results in a map for quick lookup.
- **Step 2:** Build the result for `nums1` by looking up values from the map:
    - This ensures O(1) lookup per element in `nums1`.

✅ This method avoids searching `nums2` again for each element in `nums1` by precomputing everything once.

---

## 🧩 Key Formula / Recurrence

- **Stack Processing Rule:**
    
    `while (!stack.empty() && stack.top() <= nums2[i]) stack.pop();`
    
- **Map Lookup Rule:**
    
    `result = mpp[nums1[i]]`
    

---

## ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| **Time** | O(N + M) |
| **Space** | O(N + M) |
- **N = nums2.size()**
- **M = nums1.size()**
- Map + stack both use O(N) space.

---

## ⚠️ Edge Cases

- Elements in `nums1` not present in `nums2` → Assumed valid input as per problem statement.
- Single element arrays.
- All elements strictly decreasing in `nums2`.

---

## 💡 Other Approaches

| Approach | Time Complexity | Notes |
| --- | --- | --- |
| Brute Force (Nested Loops) | O(N × M) | Inefficient for large inputs. |
| Monotonic Stack + Map | O(N + M) | Optimal approach. |

---

## 🔁 Related Problems

- Next Greater Element II (Circular Array)
- Daily Temperatures
- Stock Span Problem
- Next Smaller Element

---