---
title: Frog Jump
description: ""
tags:
  - 1d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

Given an integer array **height[]** where **height[i]** represents the height of the **i-th** stair, a frog starts from the **first stair** and wants to reach the **top**. From any stair **i**, the frog has two options: it can either jump to the **(i+1)th** stair or the **(i+2)th** stair. The cost of a jump is the absolute difference in height between the two stairs. Determine the minimum total cost required for the frog to reach the top.

- Example:
    
    ```
    Input: heights[] = [20, 30, 40, 20] 
    Output: 20
    Explanation:  Minimum cost is incurred when the frog jumps from stair 0 to 1 then 1 to 3:
    jump from stair 0 to 1: cost = |30 - 20| = 10
    jump from stair 1 to 3: cost = |20-30|  = 10
    Total Cost = 10 + 10 = 20
    Input: heights[] = [30, 20, 50, 10, 40]
    Output: 30
    Explanation: Minimum cost will be incurred when frog jumps from stair 0 to 2 then 2 to 4:
    jump from stair 0 to 2: cost = |50 - 30| = 20
    jump from stair 2 to 4: cost = |40-50|  = 10
    Total Cost = 20 + 10 = 30
    ```
    

---

---

### Solution: Recursive + Memoization (Top-Down)

```cpp
int calMinCost(int n, vector<int>& height, vector<int> &dp){
    if(n == 0) return 0;  // Base case: no cost at first stone

    if(dp[n] != -1) return dp[n];  // Use cached result

    int right = INT_MAX;
    int left = calMinCost(n - 1, height, dp) + abs(height[n] - height[n - 1]);
    
    if(n > 1)
        right = calMinCost(n - 2, height, dp) + abs(height[n] - height[n - 2]);

    return dp[n] = min(left, right);  // Store result
}

int minCost(vector<int>& height) {
    int n = height.size();
    vector<int> dp(n, -1);  // Initialize DP array with -1
    return calMinCost(n - 1, height, dp);  // Start from last index
}

```

- Python Implementation
    
    ```python
    
    ```
    

---

### Solution: **Tabulation (Bottom-Up)**

```cpp
int minCost(vector<int>& height) {
    int n = height.size();
    vector<int> dp(n, -1);
    dp[0] = 0;  // Base cost to reach first stone

    for(int i = 1; i < n; i++){
        int right = INT_MAX;
        int left = dp[i - 1] + abs(height[i] - height[i - 1]);

        if (i > 1)
            right = dp[i - 2] + abs(height[i] - height[i - 2]);

        dp[i] = min(left, right);
    }

    return dp[n - 1];
}

```

---

---

### Solution: **Space Optimized DP**

```cpp
int minCost(vector<int>& height) {
    int n = height.size();
    int prev = 0;  // dp[i-1]
    int prev2 = 0; // dp[i-2]

    for(int i = 1; i < n; i++){
        int right = INT_MAX;
        int left = prev + abs(height[i] - height[i - 1]);

        if (i > 1)
            right = prev2 + abs(height[i] - height[i - 2]);

        int curri = min(left, right);
        prev2 = prev;
        prev = curri;
    }

    return prev;  // Final cost is stored in prev
}

```

---

### ✅ **How It Works**

- Frog starts at index `0` and can jump to:
    - `i + 1` with cost `|height[i+1] - height[i]|`
    - `i + 2` with cost `|height[i+2] - height[i]|`
- Goal: Reach last stone with **minimum total cost**
- Use **DP** to store best cost for each index.
    - `dp[i] = min(dp[i-1] + abs(height[i] - height[i-1]), dp[i-2] + abs(height[i] - height[i-2]))`

---

### 🧠 **Key Points**

- Classic example of **recurrence relation + optimization**
- Variants:
    - Top-down (memoization)
    - Bottom-up (tabulation)
    - Space optimized (constant space)
- Base condition: `dp[0] = 0`

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Recursive + Memo ✅ | O(n) | O(n) |
| Tabulation ✅ | O(n) | O(n) |
| Space Optimized ✅ | O(n) | O(1) ✅ |

---

### ⚠️ **Edge Cases**

- Only 1 stone → 0 cost
- Just 2 stones → simple absolute difference
- Negative heights still valid (use `abs()`)

---

### 💡 **Other Approaches**

| Approach | Time | Space |
| --- | --- | --- |
| Pure recursion ❌ | O(2ⁿ) | O(1) |
| Memoization ✅ | O(n) | O(n) |
| Tabulation ✅ | O(n) | O(n) |
| Space Optimized ✅ | O(n) | O(1) |

---

### 🔁 **Related Problems**

- Frog Jump with K Distance (Leet code variant)
- Minimum Path Sum (Grid DP)
- Climbing Stairs
- House Robber (DP with jump condition)

---

### 🔍 **Quick Example**

Input: `height = [10, 30, 20]`

- Step 0 → 1: `|30-10| = 20`
- Step 0 → 2: `|20-10| = 10` ✅
    
    Answer: **10**