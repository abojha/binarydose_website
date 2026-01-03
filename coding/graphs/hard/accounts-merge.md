---
title: Accounts Merge
description: ""
tags:
  - disjoing
  - graphs
  - hard
  - mst
  - set
---

### Problem Statement:

Given a list of `accounts` where each element `accounts[i]` is a list of strings, where the first element `accounts[i][0]` is a name, and the rest of the elements are **emails** representing emails of the account.

Now, we would like to merge these accounts. Two accounts definitely belong to the same person if there is some common email to both accounts. Note that even if two accounts have the same name, they may belong to different people as people could have the same name. A person can have any number of accounts initially, but all of their accounts definitely have the same name.

After merging the accounts, return the accounts in the following format: the first element of each account is the name, and the rest of the elements are emails **in sorted order**. The accounts themselves can be returned in **any order**.

- Example:
    
    **Example 1:**
    
    ```
    Input: accounts = [["John","johnsmith@mail.com","john_newyork@mail.com"],["John","johnsmith@mail.com","john00@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
    Output: [["John","john00@mail.com","john_newyork@mail.com","johnsmith@mail.com"],["Mary","mary@mail.com"],["John","johnnybravo@mail.com"]]
    Explanation:
    The first and second John's are the same person as they have the common email "johnsmith@mail.com".
    The third John and Mary are different people as none of their email addresses are used by other accounts.
    We could return these lists in any order, for example the answer [['Mary', 'mary@mail.com'], ['John', 'johnnybravo@mail.com'],
    ['John', 'john00@mail.com', 'john_newyork@mail.com', 'johnsmith@mail.com']] would still be accepted.
    
    ```
    
    **Example 2:**
    
    ```
    Input: accounts = [["Gabe","Gabe0@m.co","Gabe3@m.co","Gabe1@m.co"],["Kevin","Kevin3@m.co","Kevin5@m.co","Kevin0@m.co"],["Ethan","Ethan5@m.co","Ethan4@m.co","Ethan0@m.co"],["Hanzo","Hanzo3@m.co","Hanzo1@m.co","Hanzo0@m.co"],["Fern","Fern5@m.co","Fern1@m.co","Fern0@m.co"]]
    Output: [["Ethan","Ethan0@m.co","Ethan4@m.co","Ethan5@m.co"],["Gabe","Gabe0@m.co","Gabe1@m.co","Gabe3@m.co"],["Hanzo","Hanzo0@m.co","Hanzo1@m.co","Hanzo3@m.co"],["Kevin","Kevin0@m.co","Kevin3@m.co","Kevin5@m.co"],["Fern","Fern0@m.co","Fern1@m.co","Fern5@m.co"]]
    
    ```
    

---

---

### ✅ Solution: Disjoint Set (Union Find with Union by Size)

```cpp
class DisjointSet {
public:
    vector<int> parent, rank, size;

    // Initialize parent, rank, and size arrays
    DisjointSet(int n){
        rank.resize(n + 1, 0);
        parent.resize(n + 1);
        size.resize(n + 1, 1);
        for(int i = 0; i <= n; i++){
            parent[i] = i; // Every node is its own parent initially
        }
    }

    // Find ultimate parent with path compression
    int findParent(int node){
        if(parent[node] == node) return node;
        return parent[node] = findParent(parent[node]);
    }

    // Union two sets based on size
    void unionBySize(int u, int v){
        int parentU = findParent(u);
        int parentV = findParent(v);

        if(parentU == parentV) return; // Already in the same set

        // Attach smaller set to larger one
        if(size[parentU] > size[parentV]){
            parent[parentV] = parentU;
            size[parentU] += size[parentV];
        }
        else {
            parent[parentU] = parentV;
            size[parentV] += size[parentU];
        }
    }
};

class Solution {
public:
    vector<vector<string>> accountsMerge(vector<vector<string>>& accounts) {
        int totalAccounts = accounts.size();
        DisjointSet ds(totalAccounts);

        // Maps each email to an account index
        unordered_map<string, int> emailToAccountMap;

        // Step 1: Union accounts with shared emails
        for(int accountIndex = 0; accountIndex < totalAccounts; accountIndex++){
            for(int j = 1; j < accounts[accountIndex].size(); j++){
                string currentEmail = accounts[accountIndex][j];

                // If email not seen before, map it to this account
                if(emailToAccountMap.find(currentEmail) == emailToAccountMap.end()){
                    emailToAccountMap[currentEmail] = accountIndex;
                }
                else {
                    // Merge current account with previously mapped account for this email
                    ds.unionBySize(accountIndex, emailToAccountMap[currentEmail]);
                }
            }
        }

        // Step 2: Group emails based on final parent (merged accounts)
        vector<vector<string>> groupedEmails(totalAccounts);
        for(auto it : emailToAccountMap){
            string email = it.first;
            int mappedAccount = it.second;
            int representative = ds.findParent(mappedAccount);
            groupedEmails[representative].push_back(email);
        }

        // Step 3: Construct merged account result
        vector<vector<string>> mergedAccounts;
        for(int i = 0; i < totalAccounts; i++){
            if(groupedEmails[i].size() == 0) continue;

            // Sort emails lexicographically
            sort(groupedEmails[i].begin(), groupedEmails[i].end());

            // First add the account name
            vector<string> currentAccount;
            currentAccount.push_back(accounts[i][0]);

            // Then add all associated emails
            for(auto email : groupedEmails[i]){
                currentAccount.push_back(email);
            }

            mergedAccounts.push_back(currentAccount);
        }

        // Optional: sort accounts lexicographically by name/email
        sort(mergedAccounts.begin(), mergedAccounts.end());
        return mergedAccounts;
    }
};

```

---

## 📝 How It Works

- Each account is treated as a **node** in DSU.
- Emails are **keys** used to **merge accounts**.
- `emailToAccountMap` stores the first index where an email appeared.
- Whenever the same email appears again, we **merge** the current account with the earlier one using `unionBySize`.
- Finally, we group all emails under their **representative account index** and construct the result.

---

## 🧩 Key Formula / Recurrence

- No recurrence relation (not DP), but:
    - If two accounts share an email → they belong to the same connected component.

---

## ⏱️ Time & Space Complexity

| Metric | Complexity |
| --- | --- |
| ⏱️ Time | `O(N × M × α(N)) + E log E` |
| 💾 Space | `O(N + E)` |

---

## ⚠️ Edge Cases

- Multiple accounts with same name but no common email → don’t merge.
- All emails are already merged → just sort and return one group.

---

## 💡 Other Approaches

- DFS to build connected components.
- Trie-based prefix merge (uncommon here).

---

## 🔁 Related Problems

- Leetcode 721: **Accounts Merge**
- Leetcode 547: **Number of Provinces**
- Leetcode 1319: **Make Network Connected**
- Leetcode 200: **Number of Islands**