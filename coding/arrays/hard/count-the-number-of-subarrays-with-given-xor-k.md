---
title: Count the number of subarrays with given xor K
description: ""
tags:
  - array
  - hard
---

### Problem Statement:

Given an array of integers A and an integer B. Find the total number of subarrays having bitwise XOR of all elements equal to k.

- Example:
  ```
  Example 1:
  Input Format: A = [4, 2, 2, 6, 4] , k = 6
  Result: 4
  Explanation: The subarrays having XOR of their elements as 6 are  [4, 2], [4, 2, 2, 6, 4], [2, 2, 6], [6]

  Example 2:
  Input Format: A = [5, 6, 7, 8, 9], k = 5
  Result: 2
  Explanation: The subarrays having XOR of their elements as 5 are [5] and [5, 6, 7, 8, 9]

  ```

---

---

## ✅ Solution: Prefix XOR + HashMap (Subarrays with XOR = K)

```cpp
int long subarrayXor(vector<int> &arr, int k) {
    int xr = 0;  // Prefix XOR
    long count = 0;
    map<int, int> mp;
    mp[0] = 1;  // XOR 0 occurs once before we start

    for (int i = 0; i < arr.size(); i++) {
        xr ^= arr[i];  // Compute prefix XOR

        int requiredXor = xr ^ k;  // If xr ^ k = prev_xor => prev_xor = xr ^ k

        // If required prefix XOR exists, it forms a valid subarray
        count += mp[requiredXor];

        mp[xr]++;  // Record current prefix XOR
    }

    return count;
}

```

---

### 📝 How It Works

- **Prefix XOR** helps break the problem into a manageable form:
  If:

    `prefixXor[i] = A` and `prefixXor[j] = B`

    then:

    `subarrayXor(j + 1 .. i) = A ^ B`

- So, if we want `subarrayXor == k`, we check whether
  If `prefixXor ^ k` exists in the map, then a valid subarray is found.
- We maintain a **map of prefixXor → frequency** and update it as we go.

---

### 🧩 Key Formula

If `xor_prefix ^ k = x` exists in the map, then a valid subarray is found.

---

### ⏱️ Time & Space Complexity

| Metric | Complexity |
| ------ | ---------- |
| Time   | O(N)       |
| Space  | O(N)       |

- Single pass over the array: O(N)
- Map can grow up to N entries (in worst case).

---

### ⚠️ Edge Cases

- `k = 0` → subarrays whose XOR is 0.
- All zeros → large number of valid subarrays.
- Duplicates handled automatically via map count.

---

### 💡 Other Approaches

| Approach            | Time  | Space | Notes                |
| ------------------- | ----- | ----- | -------------------- |
| Brute Force         | O(N²) | O(1)  | TLE for large arrays |
| Prefix XOR + Map ✅ | O(N)  | O(N)  | Optimal solution     |

---

### 🔁 Related Problems

- [LC 560. Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) — same pattern with `+` instead of `^`
- [GFG: Count the number of subarrays with given XOR](https://www.geeksforgeeks.org/count-number-subarrays-given-xor/)
- [LC 1310. XOR Queries of a Subarray](https://leetcode.com/problems/xor-queries-of-a-subarray/)

---

### 🛠️ Other Notes

- **XOR behaves like subtraction** in prefix logic:
  - `a ^ b = c` ⇒ `a = b ^ c`
- This approach is useful in **bit manipulation**, **security**, and **checksum validation** problems.
- **Map** can be replaced with `unordered_map` for better average-case performance.
