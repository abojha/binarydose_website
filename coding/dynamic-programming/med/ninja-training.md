---
title: Ninja Training
description: ""
tags:
  - 2d
  - 3d
  - dp
  - dynamic-programming
  - med
---

### Problem Statement:

Ninja is planing this ‘N’ days-long training schedule. Each day, he can perform any one of these three activities. (Running, Fighting Practice or Learning New Moves). Each activity has some merit points on each day. As Ninja has to improve all his skills, he can’t do the same activity in two consecutive days. Can you help Ninja find out the maximum merit points Ninja can earn?

You are given a 2D array of size N*3 ‘POINTS’ with the points corresponding to each day and activity. Your task is to calculate the maximum number of merit points that Ninja can earn.

- Example:
    
    ```
    If the given ‘POINTS’ array is [[1,2,5], [3 ,1 ,1] ,[3,3,3] ],the answer will be 11 as 5 + 3 + 3.
    ```
    

---

---

### Solution: Memoization

```cpp
int f(int day, int last, vector<vector<int>> &points, vector<vector<int>> &dp){
    if(dp[day][last] != -1) return dp[day][last];

    if(day == 0){
        int maxi = 0;
        for(int i = 0; i <= 2; i++){
            if(i != last){
                maxi =  max(maxi, points[0][i]);
            }
        }
        return dp[day][last] = maxi;
    }

    int maxi = 0;
    for(int i = 0; i <= 2; i++){
        if(i != last){
            int activity = points[day][i] + f(day - 1, i, points, dp);
            maxi = max(maxi, activity);
        }
    }
    dp[day][last] = maxi;
    return dp[day][last];
    
}

int ninjaTraining(int n, vector<vector<int>> &points)
{
    // Write your code here.
    vector<vector<int>> dp(n, vector<int>(4, -1));
    return f(n - 1, 3, points, dp);
}
```

---

---

### Solution: Tabulation

```cpp
int ninjaTraining(int n, vector<vector<int>> &points)
{
    // Write your code here.

    vector<vector<int>> dp(n, vector<int>(4, -1));

    dp[0][0] = max(points[0][1], points[0][2]);
    dp[0][1] = max(points[0][0], points[0][2]);
    dp[0][2] = max(points[0][0], points[0][1]);
    dp[0][3] = max(points[0][0], max(points[0][1], points[0][2]));

    for(int day = 1; day < n; day++){
        for(int last = 0; last < 4; last++){
            dp[day][last] = 0;

            for(int task = 0; task <= 2; task++){
                if(task != last){
                    int activity = points[day][task] + dp[day - 1][task];
                    dp[day][last] = max(activity, dp[day][last]);
                }
            }

        }
    }

    return dp[n-1][3];
}
```

---

---

### Solution: Space Optimized

```cpp
int ninjaTraining(int n, vector<vector<int>> &points)
{
    // Write your code here.

    // vector<vector<int>> dp(n, vector<int>(4, -1));
    vector<int> prev(4, 0);

    prev[0] = max(points[0][1], points[0][2]);
    prev[1] = max(points[0][0], points[0][2]);
    prev[2] = max(points[0][0], points[0][1]);
    prev[3] = max(points[0][0], max(points[0][1], points[0][2]));

    for(int day = 1; day < n; day++){
        vector<int> temp(4, 0);
        for(int last = 0; last < 4; last++){
            temp[last] = 0;

            for(int task = 0; task <= 2; task++){
                if(task != last){
                    int activity = points[day][task] + prev[task];
                    temp[last] = max(temp[last], activity);
                }
            }

        }
        prev = temp;
    }

    return prev[3];
}
```

---