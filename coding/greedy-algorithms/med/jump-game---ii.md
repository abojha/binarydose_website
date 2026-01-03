---
title: Jump Game - II
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

You are given a **0-indexed** array of integers `nums` of length `n`. You are initially positioned at `nums[0]`.

Each element `nums[i]` represents the maximum length of a forward jump from index `i`. In other words, if you are at `nums[i]`, you can jump to any `nums[i + j]` where:

- `0 <= j <= nums[i]` and
- `i + j < n`

Return *the minimum number of jumps to reach* `nums[n - 1]`. The test cases are generated such that you can reach `nums[n - 1]`.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [2,3,1,1,4]
    Output: 2
    Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.
    Example 2:
    
    Input: nums = [2,3,0,1,4]
    Output: 2
     
    ```
    

---

---

## ✅ **Solution: Greedy**

```cpp
class Solution {
public:
    int jump(vector<int>& nums) {
        int maxReachable = 0;     // The farthest index we can currently reach
        int currentJumpEnd = 0;   // End of the range for the current jump
        int jumpCount = 0;        // Total jumps taken

        for(int currentIndex = 0; currentIndex < nums.size() - 1; currentIndex++) {
            maxReachable = max(maxReachable, currentIndex + nums[currentIndex]);

            // If we reach the end of the current jump range
            if(currentIndex == currentJumpEnd) {
                jumpCount++;
                currentJumpEnd = maxReachable;
            }
        }

        return jumpCount;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- You're given an array `nums` where each element represents **maximum jump length from that position**.
- Goal: **Reach the end using minimum number of jumps**.
- Use a greedy strategy:
    - Track `maxReachable` (how far you can go in current scope).
    - Track `currentJumpEnd` (when to commit a jump).
    - Every time you reach the end of a jump (`i == currentJumpEnd`), make the jump and update the range to `maxReachable`.

---

### 🧩 Key Formula / Transition

- At every index `i`:
    
    ```cpp
    maxReachable = max(maxReachable, i + nums[i]);
    if(i == currentJumpEnd):
        jumpCount++;
        currentJumpEnd = maxReachable;
    
    ```
    

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- `nums = [0]` → No jump needed → returns `0`.
- `nums = [1, 2, 3]` → One jump from 0 to 1, another from 1 to end.
- `nums = [2,3,1,1,4]` → Best path: 2 → 3 → 4.

---

### 💡 Other Approaches

| Approach | Time | Space | Status |
| --- | --- | --- | --- |
| BFS Style (Level-wise) | O(N) | O(1) | ✅ Optimal |
| DP | O(N²) | O(N) | ❌ TLE for large inputs |

---

### 🔁 Related Problems

- [LC 55. Jump Game](https://leetcode.com/problems/jump-game/)
- [LC 1345. Jump Game IV](https://leetcode.com/problems/jump-game-iv/)
- [LC 45. Jump Game II](https://leetcode.com/problems/jump-game-ii/)

---