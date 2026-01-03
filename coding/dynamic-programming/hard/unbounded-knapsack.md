---
title: Unbounded Knapsack
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - subsequences
---

### Problem Statement:

You are given ***‘n’*** items with certain ***‘profit’*** and ***‘weight’*** and a knapsack with weight capacity ***‘w’***.

You need to fill the knapsack with the items in such a way that you get the maximum profit. You are allowed to take one item multiple times.

- Example:
    
    ```
    Input: 
    'n' = 3, 'w' = 10, 
    'profit' = [5, 11, 13]
    'weight' = [2, 4, 6]
    
    Output: 27
    
    Explanation:
    We can fill the knapsack as:
    
    1 item of weight 6 and 1 item of weight 4.
    1 item of weight 6 and 2 items of weight 2.
    2 items of weight 4 and 1 item of weight 2.
    5 items of weight 2.
    
    The maximum profit will be from case 3 = 11 + 11 + 5 = 27. Therefore maximum profit = 27.
    
    Detailed explanation ( Input/output format, Notes, Images )
    Sample Input 1:
    3 15
    7 2 4
    5 10 20
    
    Expected Answer:
    21
    
    Output on console:
    21
    
    Explanation of Sample Input 1
    The given knapsack capacity is 15. We can fill the knapsack as [1, 1, 1] giving us profit 21 and as [1,2] giving us profit 9. Thus maximum profit will be 21.
    
    Sample Input 2
    2 3
    6 12
    4 17
    
    Expected Answer:
    0
    
    Output on console:
    0
    
    Explanation of Sample Input 2:
    We can clearly see that no item has weight less than knapsack capacity. Therefore we can not fill knapsack with any item.
    
    Expected Time Complexity:
    Try to solve this in O(n*w).
    
    Constraints
    1 <= n <= 10^3
    1 <= w <= 10^3
    1 <= profit[i] , weight[i] <= 10^8
    
    Time Limit: 1 sec
    
    ```
    

---

---

## ✅ Solution 1: Memoization

```cpp
int solve(int ind, int w, vector<int> &profit, vector<int> &weight, vector<vector<int>>& dp){
    // Base case: only one item to consider
    if(ind == 0){
        if(weight[0] <= w)
            return (w / weight[0]) * profit[0]; // take as many as possible
        else
            return 0;
    }

    if(dp[ind][w] != -1) return dp[ind][w];

    int notTake = solve(ind - 1, w, profit, weight, dp); // don't take current
    int take = 0;

    if(weight[ind] <= w){
        take = profit[ind] + solve(ind, w - weight[ind], profit, weight, dp); // take again
    }

    return dp[ind][w] = max(take, notTake);
}

int unboundedKnapsack(int n, int w, vector<int> &profit, vector<int> &weight){
    vector<vector<int>> dp(n, vector<int>(w + 1, -1));
    return solve(n - 1, w, profit, weight, dp);
}

```

---

## ✅ Solution 2: Tabulation

```cpp
int unboundedKnapsack(int n, int w, vector<int> &profit, vector<int> &weight){
    vector<vector<int>> dp(n, vector<int>(w + 1, 0));

    // Fill base case: only 0th item allowed
    for(int i = 0; i <= w; i++){
        if(weight[0] <= i){
            dp[0][i] = (i / weight[0]) * profit[0];
        }
    }

    for(int ind = 1; ind < n; ind++){
        for(int tar = 0; tar <= w; tar++){
            int notTake = dp[ind - 1][tar];
            int take = 0;
            if(weight[ind] <= tar){
                take = profit[ind] + dp[ind][tar - weight[ind]];
            }
            dp[ind][tar] = max(take, notTake);
        }
    }

    return dp[n - 1][w];
}

```

---

## ✅ Solution 3: Space Optimized

```cpp
int unboundedKnapsack(int n, int w, vector<int> &profit, vector<int> &weight){
    vector<int> prev(w + 1, 0);

    // Fill base case
    for(int i = 0; i <= w; i++){
        if(weight[0] <= i){
            prev[i] = (i / weight[0]) * profit[0];
        }
    }

    for(int ind = 1; ind < n; ind++){
        vector<int> curr(w + 1, 0);
        for(int tar = 0; tar <= w; tar++){
            int notTake = prev[tar];
            int take = 0;
            if(weight[ind] <= tar){
                take = profit[ind] + curr[tar - weight[ind]];
            }
            curr[tar] = max(take, notTake);
        }
        prev = curr;
    }

    return prev[w];
}

```

---

## 📝 Revision Notes – Unbounded Knapsack

---

### ✅ How It Works

- You are given `n` items with `profit[i]` and `weight[i]`, and a knapsack of capacity `w`.
- Unlike 0/1 Knapsack, you can take **any item unlimited times**.
- At each step:
    - You either **don't take** the item.
    - Or **take it again**, and reduce remaining capacity (`w - weight[i]`).

---

### 🧩 Key Formula / Recurrence

```
dp[i][w] = max(
    dp[i-1][w],                        // not take
    profit[i] + dp[i][w - weight[i]]  // take again (unbounded)
)

```

- Base Case:
    - For `i == 0`: `dp[0][w] = (w / weight[0]) * profit[0]`

---

### ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N × W) | O(N × W) |
| Tabulation | O(N × W) | O(N × W) |
| Space Optimized | O(N × W) | O(W) |

---

### ⚠️ Edge Cases

- `weight[i] > w` → can’t take that item.
- Repeated use of item is allowed, so `take` call remains on `i` (not `i - 1`).
- `profit[i] = 0` or `weight[i] = 0` → handled by base case (avoid infinite loop).

---

### 💡 Other Approaches

| Type | When to Use |
| --- | --- |
| Recursive Only ❌ | Too slow |
| Memoization ✅ | Easy to understand |
| Tabulation ✅ | Clean bottom-up logic |
| Space Optimized ✅ | Best for constrained W |

---

### 🔁 Related Problems

- **Leetcode 518 – Coin Change II**
- **Unbounded Knapsack** (GFG classic)
- **Rod Cutting Problem**
- **Minimum Coins to Make Amount**

---