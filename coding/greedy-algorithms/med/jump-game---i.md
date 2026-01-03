---
title: Jump Game - I
description: ""
tags:
  - greedy-algorithms
  - med
---

### Problem Statement:

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element in the array represents your maximum jump length at that position.

Return `true` *if you can reach the last index, or* `false` *otherwise*.

- Example:
    
    ```
    Example 1:
    
    Input: nums = [2,3,1,1,4]
    Output: true
    Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.
    Example 2:
    
    Input: nums = [3,2,1,0,4]
    Output: false
    Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.
    ```
    

---

---

## ✅ **Solution: Greedy**

```cpp
class Solution {
public:
    bool canJump(vector<int>& nums) {
        int furthestReachable = 0;

        for(int currentIndex = 0; currentIndex < nums.size(); currentIndex++) {
            // If current index is not reachable
            if(currentIndex > furthestReachable){
                return false;
            }

            // Update the furthest index we can reach from here
            furthestReachable = max(furthestReachable, currentIndex + nums[currentIndex]);
        }

        return true;
    }
};

```

---

## 📝 Revision Notes

### 📝 How It Works

- You’re given an array where each element tells you **maximum jump length** from that position.
- Start from index `0` and **track the furthest index** you can reach (`furthestReachable`).
- If you reach an index **greater than `furthestReachable`**, it means you **can’t proceed** → return `false`.
- If the loop completes, it means the last index is reachable → return `true`.

---

### 🧩 Key Formula / Transition

- Maintain:
    
    ```cpp
    furthestReachable = max(furthestReachable, currentIndex + nums[currentIndex])
    
    ```
    
- If `currentIndex > furthestReachable`, return `false`.

---

### ⏱️ Time & Space Complexity

| Metric | Value |
| --- | --- |
| Time | O(N) |
| Space | O(1) |

---

### ⚠️ Edge Cases

- `nums = [0]` → Already at the end, return `true`.
- `nums = [0,1,2]` → Can’t move from index 0, return `false`.
- Large jumps early on cover entire array.

---

### 💡 Other Approaches

| Approach | Time | Space | Status |
| --- | --- | --- | --- |
| DP (Top-down) | O(N²) | O(N) | ❌ TLE |
| Greedy | O(N) | O(1) | ✅ Optimal |

---

### 🔁 Related Problems

- [LC 45. Jump Game II](https://leetcode.com/problems/jump-game-ii/)
- [LC 55. Jump Game](https://leetcode.com/problems/jump-game/)
- [LC 1345. Jump Game IV](https://leetcode.com/problems/jump-game-iv/)

---