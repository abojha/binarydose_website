---
title: "SQL Joins Explained: INNER JOIN vs LEFT JOIN with Examples"
description: "Understand SQL joins with simple examples, table relationships, queries, and common interview mistakes."
authors: [anjijha]
tags: [sql, database, interview]
hide_table_of_contents: true
---

import TOCInline from '@theme/TOCInline';

SQL joins are one of the most important concepts in SQL. They are used to combine data from two or more tables based on a related column.

If you are preparing for SQL interviews or working with relational databases, understanding joins is essential.

<!-- truncate -->

<div className="inline-toc-container">
  <details open>
    <summary><strong>📑 Table of Contents</strong></summary>
    <TOCInline toc={toc} />
  </details>
</div>

---

## 1. What is a SQL JOIN?

A JOIN is used to combine rows from two or more tables using a related column.

For example, suppose we have two tables:

### Employees

| employee_id | name | department_id |
|---|---|---|
| 1 | Anjali | 101 |
| 2 | Rahul | 102 |
| 3 | Priya | 103 |
| 4 | Amit | 104 |

### Departments

| department_id | department_name |
|---|---|
| 101 | IT |
| 102 | HR |
| 103 | Finance |

Here, `department_id` is the common column between the two tables.

We can use a JOIN to get the employee name along with their department name.

---

## 2. INNER JOIN

An `INNER JOIN` returns only the rows that have matching values in both tables.

### Syntax

```sql
SELECT columns
FROM table1
INNER JOIN table2
ON table1.column = table2.column;

SELECT employees.name, departments.department_name
FROM employees
INNER JOIN departments
ON employees.department_id = departments.department_id;

| name   | department_name |
| ------ | --------------- |
| Anjali | IT              |
| Rahul  | HR              |
| Priya  | Finance         |

Amit is not included because department 104 does not exist in the departments table.

Key point
INNER JOIN = Only matching records from both tables.

3. LEFT JOIN

A LEFT JOIN returns all records from the left table and the matching records from the right table.

If there is no match, the columns from the right table contain NULL.

Example
SELECT employees.name, departments.department_name
FROM employees
LEFT JOIN departments
ON employees.department_id = departments.department_id;

| name   | department_name |
| ------ | --------------- |
| Anjali | IT              |
| Rahul  | HR              |
| Priya  | Finance         |
| Amit   | NULL            |

Amit is included because employees is the left table.

Key point

LEFT JOIN = Everything from the left table + matching data from the right table.

4. RIGHT JOIN

A RIGHT JOIN returns all records from the right table and the matching records from the left table.

Example
SELECT employees.name, departments.department_name
FROM employees
RIGHT JOIN departments
ON employees.department_id = departments.department_id;

This is useful when we want to make sure every record from the right table is included.

Key point

RIGHT JOIN = Everything from the right table + matching data from the left table.

In practice, many developers prefer using LEFT JOIN by changing the order of the tables because it can make queries easier to read.

5. FULL OUTER JOIN

A FULL OUTER JOIN returns:

Matching records from both tables
Unmatched records from the left table
Unmatched records from the right table

Example
SELECT employees.name, departments.department_name
FROM employees
FULL OUTER JOIN departments
ON employees.department_id = departments.department_id;

This gives us all records from both tables.

Note: FULL OUTER JOIN is not directly supported by some databases, such as MySQL. In such cases, it can be simulated using UNION with LEFT JOIN and RIGHT JOIN.

6. SQL JOINs in a Real-World Example

Imagine an e-commerce application with two tables.

Customers
| customer_id | customer_name |
| ----------- | ------------- |
| 1           | Anjali        |
| 2           | Rahul         |
| 3           | Priya         |

Orders
| order_id | customer_id | amount |
| -------- | ----------- | ------ |
| 101      | 1           | 500    |
| 102      | 1           | 800    |
| 103      | 2           | 300    |

To find customer names along with their orders:

SELECT customers.customer_name, orders.order_id, orders.amount
FROM customers
INNER JOIN orders
ON customers.customer_id = orders.customer_id;
This allows us to connect information stored in different tables.

7. Common SQL JOIN Mistakes
Mistake 1: Forgetting the JOIN condition

Always make sure the relationship between the tables is clearly defined.
ON employees.department_id = departments.department_id

Mistake 2: Using INNER JOIN when LEFT JOIN is required

If you need all records from the first table, use a LEFT JOIN.

Mistake 3: Not understanding NULL values

A LEFT JOIN can produce NULL values when there is no matching record in the right table.

Mistake 4: Joining on the wrong column

Always check which columns actually represent the relationship between the tables.

8. SQL JOIN Interview Questions
Question 1: What is the difference between INNER JOIN and LEFT JOIN?

INNER JOIN returns only matching records.

LEFT JOIN returns all records from the left table and matching records from the right table.

Question 2: What happens when there is no matching record in a LEFT JOIN?

The columns from the right table contain NULL.

Question 3: Which JOIN returns all records from both tables?

A FULL OUTER JOIN returns matching and unmatched records from both tables.

Question 4: Can we use multiple JOINs in one query?

Yes. Multiple tables can be joined in a single SQL query.

For example:
SELECT e.name, d.department_name, p.project_name
FROM employees e
JOIN departments d
ON e.department_id = d.department_id
JOIN projects p
ON e.employee_id = p.employee_id;

9. Key Takeaways
INNER JOIN returns matching records from both tables.
LEFT JOIN returns all records from the left table and matching records from the right table.
RIGHT JOIN returns all records from the right table and matching records from the left table.
FULL OUTER JOIN returns all records from both tables.
The ON condition defines how tables are related.
Understanding JOINs is important for SQL development and technical interviews.
Conclusion

SQL JOINs help us combine related information stored across multiple tables.

The most commonly used joins are INNER JOIN and LEFT JOIN. Once you understand how matching and non-matching records behave, writing JOIN queries becomes much easier.

Practice these joins with different datasets to build a strong foundation in SQL.


