---
title: Array partition with minimum difference
description: ""
tags:
  - dp
  - dynamic-programming
  - med
  - on
  - subsequences
---

### Problem Statement:

You are given an array **'arr'** containing **'n'** non-negative integers.

Your task is to partition this array into two subsets such that the absolute difference between subset sums is minimum.

You just need to find the minimum absolute difference considering any valid division of the array elements.

- Example:
    
    ```
    
    ```
    

---

---

### Solution: Memoization

```cpp
bool f(int ind, int target, vector<int> &arr, vector<vector<int>> &dp){
	if(target == 0) return true;
	if(ind == 0) return (arr[0] == target);
	if(dp[ind][target] != -1) return dp[ind][target];

	bool take = false;
	if(arr[ind] <= target)
		take = f(ind - 1, target - arr[ind], arr, dp);

	bool notTake = f(ind - 1, target, arr, dp);
	
	return dp[ind][target] = take || notTake;
}

int minSubsetSumDifference(vector<int>& arr, int n)
{
	int totalSum = accumulate(arr.begin(), arr.end(), 0);
	vector<vector<int>> dp(n, vector<int>(totalSum + 1, -1));
	
	// Fill the DP table for all possible sums
	for(int i = 0; i <= totalSum; i++)
		f(n - 1, i, arr, dp);

	int mini = INT_MAX;
	for(int i = 0; i <= totalSum; i++){
		if(dp[n - 1][i] == true){
			int s1 = i;
			int s2 = totalSum - i;
			mini = min(mini, abs(s1 - s2));
		}
	}
	return mini;
}

```

---

---

### Solution: Tabulation

```cpp
int minSubsetSumDifference(vector<int>& arr, int n)
{
	int totalSum = accumulate(arr.begin(), arr.end(), 0);
	vector<vector<bool>> dp(n, vector<bool>(totalSum + 1, false));
	
	// Base Cases
	for(int i = 0; i < n; i++) dp[i][0] = true;
	if(arr[0] <= totalSum) dp[0][arr[0]] = true;

	// Build DP table
	for(int i = 1; i < n; i++){
		for(int target = 1; target <= totalSum; target++){
			bool take = false;
			if(arr[i] <= target)
				take = dp[i - 1][target - arr[i]];
			bool notTake = dp[i - 1][target];

			dp[i][target] = take || notTake;
		}
	}

	// Find minimum difference
	int mini = INT_MAX;
	for(int i = 0; i <= totalSum; i++){
		if(dp[n - 1][i]){
			int s1 = i, s2 = totalSum - i;
			mini = min(mini, abs(s1 - s2));
		}
	}
	return mini;
}

```

---

---

### Solution: Space Optimized

```cpp
int minSubsetSumDifference(vector<int>& arr, int n)
{
	int totalSum = accumulate(arr.begin(), arr.end(), 0);
	vector<bool> prev(totalSum + 1, false);
	
	// Base Case
	prev[0] = true;
	if(arr[0] <= totalSum) prev[arr[0]] = true;

	for(int i = 1; i < n; i++){
		vector<bool> curr(totalSum + 1, false);
		curr[0] = true;
		for(int target = 1; target <= totalSum; target++){
			bool take = false;
			if(arr[i] <= target)
				take = prev[target - arr[i]];
			bool notTake = prev[target];

			curr[target] = take || notTake;
		}
		prev = curr;
	}

	// Find minimum difference
	int mini = INT_MAX;
	for(int i = 0; i <= totalSum; i++){
		if(prev[i]){
			int s1 = i, s2 = totalSum - i;
			mini = min(mini, abs(s1 - s2));
		}
	}
	return mini;
}

```

---

### ✅ **How It Works**

- You're given an array, and you must partition it into two subsets such that the **absolute difference of their sums is minimized**.
- This is a variation of the subset sum problem.
- The idea is to **calculate all possible subset sums** and find the one that minimizes `abs(sum1 - sum2)`.

---

### 🧩 **Key Formula**

- Try all subset sums `S1` from `0` to `totalSum/2`.
- `min(abs(S1 - (totalSum - S1)))` for all valid S1.

---

### ⏱️ **Time & Space Complexity**

| Approach | Time | Space |
| --- | --- | --- |
| Memoization | O(N * sum) | O(N * sum) |
| Tabulation | O(N * sum) | O(N * sum) |
| Space Optimized | O(N * sum) | O(sum) |

---

### ⚠️ **Edge Cases**

- All elements are the same.
- Array contains only one element.
- Odd total sum (partition not possible into equal sums, but valid for min diff).

---

### 💡 **Other Approaches**

| Approach | Time Complexity |
| --- | --- |
| Recursion only | Exponential ❌ |
| Memoization | O(N * sum) ✅ |
| Tabulation | O(N * sum) ✅ |
| Space Optimized | O(N * sum) ✅ |

---

### 🔁 **Related Problems**

- Subset Sum
- Equal Sum Partition
- Target Sum
- Count Subsets with Given Sum
- Partition to K Equal Sum Subsets