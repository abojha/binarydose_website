---
title: Four Sum
description: ""
tags:
  - array
  - hard
---

### Problem Statement:

Given an array of N integers, your task is to find unique quads that add up to give a target value. In short, you need to return an array of all the unique quadruplets [arr[a], arr[b], arr[c], arr[d]] such that their sum is equal to a given target.

- Example:
    
    ```
    Example 1:
    Input Format: arr[] = [1,0,-1,0,-2,2], target = 0
    Result: [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
    Explanation: We have to find unique quadruplets from the array such that the sum of those elements is equal to the target sum given that is 0. The result obtained is such that the sum of the quadruplets yields 0.
    
    Example 2:
    Input Format: arr[] = [4,3,3,4,4,2,1,2,1,1], target = 9
    Result: [[1,1,3,4],[1,2,2,4],[1,2,3,3]]
    Explanation: The sum of all the quadruplets is equal to the target i.e. 9.
    ```
    

---

---

## ✅ Solution: Two Pointer + Sorting (4Sum Problem)

```cpp
vector<vector<int>> fourSum(vector<int>& nums, int target) {
    vector<vector<int>> result;
    sort(nums.begin(), nums.end());  // Sort to enable two-pointer & deduplication

    for (int i = 0; i < nums.size(); i++) {
        if (i > 0 && nums[i] == nums[i - 1]) continue;  // Skip duplicate i

        for (int j = i + 1; j < nums.size(); j++) {
            if (j > i + 1 && nums[j] == nums[j - 1]) continue;  // Skip duplicate j

            int left = j + 1;
            int right = nums.size() - 1;

            while (left < right) {
                long long sum = (long long)nums[i] + nums[j] + nums[left] + nums[right];

                if (sum < target) {
                    left++;
                } else if (sum > target) {
                    right--;
                } else {
                    result.push_back({nums[i], nums[j], nums[left], nums[right]});
                    left++, right--;

                    // Skip duplicate left and right
                    while (left < right && nums[left] == nums[left - 1]) left++;
                    while (left < right && nums[right] == nums[right + 1]) right--;
                }
            }
        }
    }

    return result;
}

```

---

### 📝 How It Works

1. **Sort the array** to allow using the two-pointer method and to handle duplicates easily.
2. Fix the **first two elements** using two nested loops.
3. Use the **two-pointer approach** (`left`, `right`) for the remaining part of the array to find pairs that, along with `nums[i]` and `nums[j]`, sum to `target`.
4. **Skip duplicates** at all four positions (`i`, `j`, `left`, `right`) to ensure unique quadruples.

---

### 🧩 Key Idea

Find all quadruples such that:

nums[i]+nums[j]+nums[k]+nums[l]=targetwhere i < j < k < lnums[i] + nums[j] + nums[k] + nums[l] = target \quad \text{where } i < j < k < l

Fix `i`, `j` and use two pointers to find `k`, `l`.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N³) |
| Space | O(1) (excluding result) |
- Outer loop (i): O(N)
- Second loop (j): O(N)
- Two-pointer inside: O(N)
- So overall: O(N³)

---

### ⚠️ Edge Cases

- Array with < 4 elements → return empty result.
- Duplicates must be **skipped** to avoid repeating quadruples.
- Large values → potential **overflow**, hence use `long long` for `sum`.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force (4 loops) | O(N⁴) | O(1) | TLE for large N |
| Hashing | O(N³) | O(N) | Store pairs and look up complement |
| Sorting + 2 Pointers ✅ | O(N³) | O(1) | Optimal and clean |

---

### 🔁 Related Problems

- [LC 18. 4Sum](https://leetcode.com/problems/4sum/)
- [LC 15. 3Sum](https://leetcode.com/problems/3sum/)
- [LC 1. Two Sum](https://leetcode.com/problems/two-sum/)
- [LC 16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/)
- [LC 454. 4Sum II](https://leetcode.com/problems/4sum-ii/) — variant using maps

---

### 🛠️ Other Notes

- Real-world analogy: Think of combining 4 numbers on a combination lock to match a target code.
- This pattern generalizes to **K-Sum** using recursion with two-pointer at the base.
- Always **cast to long long** when dealing with `sum` of 4 integers to avoid overflow.

Let me know if you want a **generic K-Sum** template or solution with hash maps for optimization!