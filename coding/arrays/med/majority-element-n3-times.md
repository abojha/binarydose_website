---
title: Majority Element (n/3 times)
description: ""
tags:
  - array
  - med
---

### Problem Statement:

Given an array of N integers. Find the elements that appear more than **N/3** times in the array. If no such element exists, return an empty vector.

- Example:
    
    ```
    Example 1:
    Input Format: N = 5, array[] = {1,2,2,3,2}
    Result: 2
    Explanation: Here we can see that the Count(1) = 1, Count(2) = 3 and Count(3) = 1.Therefore, the count of 2 is greater than N/3 times. Hence, 2 is the answer.
    
    Example 2:
    Input Format:  N = 6, array[] = {11,33,33,11,33,11}
    Result: 11 33
    Explanation: Here we can see that the Count(11) = 3 and Count(33) = 3. Therefore, the count of both 11 and 33 is greater than N/3 times. Hence, 11 and 33 is the answer.
    ```
    

---

---

## ✅ Solution: Extended Boyer-Moore Voting Algorithm (for n/3 Majority Elements)

```cpp
vector<int> majorityElement(vector<int> nums) {
    int el1 = INT_MIN, el2 = INT_MIN;
    int cnt1 = 0, cnt2 = 0;

    // Phase 1: Find candidates for majority elements
    for (int num : nums) {
        if (cnt1 == 0 && num != el2) {
            el1 = num;
            cnt1 = 1;
        }
        else if (cnt2 == 0 && num != el1) {
            el2 = num;
            cnt2 = 1;
        }
        else if (num == el1) cnt1++;
        else if (num == el2) cnt2++;
        else {
            cnt1--;
            cnt2--;
        }
    }

    // Phase 2: Verify the actual counts of the candidates
    cnt1 = cnt2 = 0;
    for (int num : nums) {
        if (num == el1) cnt1++;
        if (num == el2) cnt2++;
    }

    // Collect results if they appear more than n/3 times
    vector<int> result;
    int threshold = nums.size() / 3;
    if (cnt1 > threshold) result.push_back(el1);
    if (el2 != el1 && cnt2 > threshold) result.push_back(el2);

    return result;
}

```

---

### 📝 How It Works

- **Goal**: Find elements that appear more than ⌊n/3⌋ times in an array.
- At most **2 elements** can satisfy this condition (otherwise total count > n).
- The algorithm works in **2 phases**:
    1. **Candidate Selection**:
        - Use two counters (`cnt1`, `cnt2`) and two candidate variables (`el1`, `el2`).
        - Simulate a “voting” system to find **potential majority candidates**.
    2. **Candidate Verification**:
        - Recount how many times each candidate actually appears.
        - Add to the result only if the frequency > ⌊n/3⌋.

---

### 🧩 Key Insight

If an element appears more than `n/3` times, it will **survive the voting** (will not be eliminated during the count down phase).

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| Time | O(N) |
| Space | O(1) |
- Two linear passes over the array.
- Constant extra space used for counters and candidates.

---

### ⚠️ Edge Cases

- Multiple elements appearing exactly ⌊n/3⌋ times → not included.
- Less than 2 valid candidates.
- Duplicates like `[2,2,2,2]` → only one candidate.

---

### 💡 Other Approaches

| Approach | Time | Space | Notes |
| --- | --- | --- | --- |
| HashMap Count | O(N) | O(N) | Easier to implement, but not space efficient |
| Boyer-Moore | O(N) | O(1) | Optimal solution ✅ |

---

### 🔁 Related Problems

- [LC 229. Majority Element II](https://leetcode.com/problems/majority-element-ii/)
- [LC 169. Majority Element (n/2)](https://leetcode.com/problems/majority-element/)
- Find All Elements Occurring More Than ⌊n/k⌋ Times
- [LC 871. Minimum Number of Refueling Stops](https://leetcode.com/problems/minimum-number-of-refueling-stops/) — uses greedy counters conceptually

---

### 🛠️ Other Notes

- This is a generalized version of **Boyer-Moore Voting Algorithm**.
- Works for any **n/k** type majority search by extending to `k - 1` counters.
- **Analogy**: Like political candidates—if there's too much opposition, the weak ones drop out.