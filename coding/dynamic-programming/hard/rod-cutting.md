---
title: Rod Cutting
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - subsequences
---

### Problem Statement:

Given a rod of length ‘N’ units. The rod can be cut into different sizes and each size has a cost associated with it. Determine the maximum cost obtained by cutting the rod and selling its pieces.

**Note:**

```
1. The sizes will range from 1 to ‘N’ and will be integers.

2. The sum of the pieces cut should be equal to ‘N’.

3. Consider 1-based indexing.
```

- Example:
    
    ```
    Sample Input 1:
    2
    5
    2 5 7 8 10
    8
    3 5 8 9 10 17 17 20
    Sample Output 1:
    12
    24
    Explanation of sample input 1:
    Test case 1:
    
    All possible partitions are:
    1,1,1,1,1           max_cost=(2+2+2+2+2)=10
    1,1,1,2             max_cost=(2+2+2+5)=11
    1,1,3               max_cost=(2+2+7)=11
    1,4                 max_cost=(2+8)=10
    5                   max_cost=(10)=10
    2,3                 max_cost=(5+7)=12
    1,2,2               max _cost=(1+5+5)=12    
    
    Clearly, if we cut the rod into lengths 1,2,2, or 2,3, we get the maximum cost which is 12.
    
    Test case 2:
    
    Possible partitions are:
    1,1,1,1,1,1,1,1         max_cost=(3+3+3+3+3+3+3+3)=24
    1,1,1,1,1,1,2           max_cost=(3+3+3+3+3+3+5)=23
    1,1,1,1,2,2             max_cost=(3+3+3+3+5+5)=22
    and so on….
    
    If we cut the rod into 8 pieces of length 1, for each piece 3 adds up to the cost. Hence for 8 pieces, we get 8*3 = 24.
    Sample Input 2:
    1
    6
    3 5 6 7 10 12
    Sample Output 2:
    18
    ```
    

---

---

## ✅ Solution 1: Memoization

```cpp
int solve(int ind, int w, vector<int> &price, vector<vector<int>> &dp){
	// Base case: only length = 1 rod available
	if(ind == 0){
		return (w / (ind + 1)) * price[0]; // pick as many of length 1 as possible
	}

	if(dp[ind][w] != -1) return dp[ind][w];

	int notTake = solve(ind - 1, w, price, dp); // don't cut at length ind+1
	int take = 0;
	if((ind + 1) <= w){
		take = price[ind] + solve(ind, w - (ind + 1), price, dp); // take and cut again
	}

	return dp[ind][w] = max(take, notTake);
}

int cutRod(vector<int> &price, int n){
	vector<vector<int>> dp(n, vector<int>(n + 1, -1));
	return solve(n - 1, n, price, dp);
}

```

---

## ✅ Solution 2: Tabulation

```cpp
int cutRod(vector<int> &price, int n){
	vector<vector<int>> dp(n, vector<int>(n + 1, 0));

	// Base case: only piece of length 1
	for(int w = 0; w <= n; w++){
		dp[0][w] = (w / 1) * price[0];
	}

	for(int ind = 1; ind < n; ind++){
		for(int w = 0; w <= n; w++){
			int notTake = dp[ind - 1][w];
			int take = 0;
			int rodLen = ind + 1;

			if(rodLen <= w)
				take = price[ind] + dp[ind][w - rodLen];

			dp[ind][w] = max(take, notTake);
		}
	}

	return dp[n - 1][n];
}

```

---

## ✅ Solution 3: Space Optimized

```cpp
int cutRod(vector<int> &price, int n){
	vector<int> prev(n + 1, 0);

	// Base case
	for(int w = 0; w <= n; w++){
		prev[w] = (w / 1) * price[0];
	}

	for(int ind = 1; ind < n; ind++){
		vector<int> curr(n + 1, 0);
		for(int w = 0; w <= n; w++){
			int notTake = prev[w];
			int take = 0;
			int rodLen = ind + 1;

			if(rodLen <= w)
				take = price[ind] + curr[w - rodLen];

			curr[w] = max(take, notTake);
		}
		prev = curr;
	}

	return prev[n];
}

```

---

## 📝 Revision Notes – Rod Cutting Problem (Unbounded Knapsack)

---

### ✅ How It Works

- Given a rod of length `n` and an array `price[i]` where `price[i]` is the value of a rod of length `i+1`.
- Cut the rod in different lengths such that the **sum of prices is maximized**.
- You can make **unlimited cuts** of any length.

### Key Idea:

- It's exactly like **unbounded knapsack** where:
    - Each rod length is like a weight.
    - Each price is like a profit.

---

### 🧩 Key Formula / Recurrence

```
dp[ind][w] = max(
    dp[ind - 1][w],                                // not take rod of length (ind+1)
    price[ind] + dp[ind][w - (ind + 1)]            // take rod again
)

```

- Base case:
    
    ```
    dp[0][w] = (w / 1) * price[0]
    
    ```
    

---

### ⏱️ Time & Space Complexity

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N²) | O(N²) |
| Tabulation | O(N²) | O(N²) |
| Space Optimized | O(N²) | O(N) |

Where `N = length of the rod`

---

### ⚠️ Edge Cases

- `n = 0` → no rod to cut, return 0
- `price = {}` → empty prices array, return 0
- `price[i] = 0` → zero profit for that cut

---

### 💡 Other Approaches

| Type | When to Use |
| --- | --- |
| Recursive ❌ | Exponential |
| Memoization ✅ | Clear recursion logic |
| Tabulation ✅ | Iterative DP |
| Space Optimized ✅ | Most efficient space-wise |

---

### 🔁 Related Problems

- Unbounded Knapsack
- Coin Change II (count)
- Minimum Coins (target sum)
- Partition Equal Subset

---