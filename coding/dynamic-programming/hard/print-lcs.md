---
title: Print LCS
description: ""
tags:
  - dp
  - dynamic-programming
  - hard
  - on
  - strings
---

### Problem Statement:

- Example:
    
    ```
    
    ```
    

---


```cpp
class Solution {
public:
void printAllLCS(int i, int j, string s1, string s2, vector<vector<int>> &dp, string &curr, set<string> &result){

    if(i == 0 || j == 0){
      string temp = curr;
    reverse(temp.begin(), temp.end());
    result.insert(temp);
        return;
    }

    if(s1[i - 1] == s2[j - 1]){
        curr.push_back(s1[i - 1]);
        printAllLCS(i - 1, j - 1, s1, s2, dp, curr, result);
        curr.pop_back();
    }
    else{
        if(dp[i-1][j] == dp[i][j-1]){
            printAllLCS(i -1, j, s1, s2, dp, curr, result);
            printAllLCS(i, j-1, s1, s2, dp, curr, result);
        }
        else if(dp[i-1][j] > dp[i][j-1]){
            printAllLCS(i-1, j, s1, s2, dp, curr, result);
        }
        else{
            printAllLCS(i, j-1, s1, s2, dp, curr, result);
        }
    }
    return;
}
vector<string> allLCS(string &s1, string &s2) {
    // Code here
    int n = s1.size();
    int m = s2.size();

    vector<vector<int>> dp(n + 1, vector<int>(m + 1, 0));

    for(int i = 1; i <= n; i++){
        for(int j = 1; j <= m; j++){
            if(s1[i-1] == s2[j-1]){
                dp[i][j] = 1 + dp[i-1][j-1];
            }
            else{
                dp[i][j] = max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }

    set<string> result;
    string curr = "";
    printAllLCS(n, m, s1, s2, dp, curr, result);
     return vector<string>(result.begin(), result.end());
}

```

};