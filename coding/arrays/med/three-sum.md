---
title: Three Sum
description: ""
tags:
  - array
  - med
---

### Problem Statement:

 Given an array of N integers, your task is to find unique triplets that add up to give a sum of zero. In short, you need to return *an array of all the unique* triplets [arr[a], arr[b], arr[c]] such that i!=j, j!=k, k!=i, and their sum is equal to zero.

- Example:
    
    ```
    Example 1: 
    
    Input: nums = [-1,0,1,2,-1,-4]
    
    Output: [[-1,-1,2],[-1,0,1]]
    
    Explanation: Out of all possible unique triplets possible, [-1,-1,2] and [-1,0,1] satisfy the condition of summing up to zero with i!=j!=k
    
    Example 2:
    
    Input: nums=[-1,0,1,0]
    Output: Output: [[-1,0,1],[-1,1,0]]
    Explanation: Out of all possible unique triplets possible, [-1,0,1] and [-1,1,0] satisfy the condition of summing up to zero with i!=j!=k
    
    ```
    

---

---

## ✅ Solution: Two Pointers + Sorting (3Sum Problem)

```cpp
vector<vector<int>> threeSum(vector<int>& nums) {
    sort(nums.begin(), nums.end());  // Sort the array
    vector<vector<int>> triplets;

    for (int i = 0; i < nums.size(); i++) {
        // Skip duplicate fixed elements
        if (i > 0 && nums[i] == nums[i - 1]) continue;

        int left = i + 1, right = nums.size() - 1;

        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];

            if (sum < 0) left++;
            else if (sum > 0) right--;
            else {
                triplets.push_back({nums[i], nums[left], nums[right]});
                left++, right--;

                // Skip duplicates for left and right pointers
                while (left < right && nums[left] == nums[left - 1]) left++;
                while (left < right && nums[right] == nums[right + 1]) right--;
            }
        }
    }

    return triplets;
}

```

---

### 📝 How It Works

1. **Sort the array** to make it easy to avoid duplicates and apply two-pointer technique.
2. Fix one number `nums[i]` and then use two pointers `left` and `right` to find two other numbers such that their sum is `nums[i]`.
3. Move `left` and `right` based on whether the current sum is `<`, `>`, or = 0.
4. **Skip duplicates** for all three indices (`i`, `left`, `right`) to avoid repeating triplets.

---

### 🧩 Key Idea / Formula

Find all triplets where:

`nums[i]  + nums[j] +nums[k] = 0  (with i < j < k)nums[i] + nums[j] + nums[k] = 0 \quad \text{(with } i < j < k \text{)}`

- Fix `nums[i]`, and find pairs `(j, k)` such that:

nums[j]+nums[k]=−nums[i]nums[j] + nums[k] = -nums[i]

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N²) |
| Space | O(1) (ignoring output) |
- Outer loop runs N times.
- Inner loop (two pointers) runs in O(N) for each `i`.

---

### ⚠️ Edge Cases

- Array has fewer than 3 elements → return empty list.
- All zeros → e.g., `[0,0,0,0]` → return only one `[0,0,0]`.
- Must **avoid duplicate triplets**, hence the `continue` and `while` conditions.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| Brute Force | O(N³) | O(1) | Check all triplets |
| Hash Set | O(N²) | O(N) | Use unordered_set for pair lookup |
| Two Pointers ✅ | O(N²) | O(1) | Best and most efficient |

---

### 🔁 Related Problems

- [LC 15. 3Sum](https://leetcode.com/problems/3sum/)
- [LC 16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/)
- [LC 18. 4Sum](https://leetcode.com/problems/4sum/)
- [LC 1. Two Sum](https://leetcode.com/problems/two-sum/)
- [LC 167. Two Sum II – Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/)

---

### 🛠️ Other Notes

- Sorting is essential to handle duplicates and optimize pointer movement.
- You can generalize this to **k-Sum** problems using recursion.
- Real-world analogy: trying to balance three items to sum to zero — fix one and adjust the others like a see-saw.