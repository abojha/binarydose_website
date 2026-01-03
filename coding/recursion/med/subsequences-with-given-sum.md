---
title: Subsequences with given sum
description: ""
tags:
  - med
  - recursion
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---

---

### Solution: Generate all subsequences with given sum

```cpp
void generateSubsequence(vector<int> &arr, int target, int i, int sum,
                         vector<int> &curr, vector<vector<int>> &ans) {
    if (i == arr.size()) {
        if (sum == target)
            ans.push_back(curr);
        return;
    }

    // Include
    curr.push_back(arr[i]);
    generateSubsequence(arr, target, i + 1, sum + arr[i], curr, ans);
    curr.pop_back();

    // Exclude
    generateSubsequence(arr, target, i + 1, sum, curr, ans);
}

vector<vector<int>> allSubsequencesWithSum(int n, vector<int>& arr, int k) {
    vector<vector<int>> ans;
    vector<int> curr;
    generateSubsequence(arr, k, 0, 0, curr, ans);
    return ans;
}

```

---

---

### Solution: Count all subsequences with given sum

```cpp
int countSubsequence(vector<int> &arr, int target, int i, int sum) {
    if (i == arr.size()) {
        return sum == target ? 1 : 0;
    }

    // Include + Exclude
    int include = countSubsequence(arr, target, i + 1, sum + arr[i]);
    int exclude = countSubsequence(arr, target, i + 1, sum);

    return include + exclude;
}

int totalSubsequenceCount(int n, vector<int>& arr, int k) {
    return countSubsequence(arr, k, 0, 0);
}

```

---

---

### Solution:

```cpp
bool existsSubsequence(vector<int> &arr, int target, int i, int sum) {
    if (i == arr.size()) {
        return sum == target;
    }

    // Include current
    if (existsSubsequence(arr, target, i + 1, sum + arr[i]))
        return true;

    // Exclude current
    if (existsSubsequence(arr, target, i + 1, sum))
        return true;

    return false;
}

bool checkSubsequenceSum(int n, vector<int>& arr, int k) {
    return existsSubsequence(arr, k, 0, 0);
}

```

---

### ✅ **How It Works**

Use recursion to explore two choices at each index:

1. **Include** the current element in the sum
2. **Exclude** the current element
- Base case: When `i == n`, check if `sum == target`
- This is a classic **subset recursion tree** structure

---

### 🧠 **Key Points**

- All three functions use the same recursive skeleton
- For `bool`, stop on first success (`OR`)
- For `count`, accumulate all paths (`+`)
- For `generate`, push valid subsets to result

---

### ⏱️ **Time & Space Complexity**

| Operation | Time Complexity | Space Complexity |
| --- | --- | --- |
| Exists ✅ | O(2ⁿ) | O(n) (stack) |
| Count ✅ | O(2ⁿ) | O(n) |
| Generate ✅ | O(2ⁿ) | O(n × 2ⁿ) (output) |

---

### ⚠️ **Edge Cases**

- All elements = 0
    - Multiple subsets can sum to 0
- Negative elements? Works fine unless constraints say otherwise
- Empty array → only empty subset exists

---

### 💡 **Other Variants**

| Problem | Note |
| --- | --- |
| Subset Sum (DP) | Top-down or bottom-up memoized |
| K Sum Subset | Count only `k`-length subsets |
| Subsets with Constraints (e.g., no repeat) | Use `set` or sorted logic |
| Partition Equal Subset Sum | Classic DP + recursion |