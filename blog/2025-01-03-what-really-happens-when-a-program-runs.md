---
title: What Really Happens When a Program Runs?
description: From writing source code to execution in memory – a simple, step-by-step explanation.
tags: [computer-science, basics, os, programming]
---

## 🎯 Why This Topic Matters

Every computer science student writes code, but **very few truly understand what happens after pressing “Run”**.

Whether you write C, C++, Python, or Java — the journey from **source code to running program** involves the compiler, operating system, memory, and CPU working together.

Understanding this gives you: ....

<!-- truncate -->
- Strong **OS fundamentals**
- Better **debugging skills**
- Clear answers in **interviews**
- A real **mental model** of how computers work

### 1️⃣ Writing the Source Code

This is the part everyone knows.

```c
#include <stdio.h>

int main() {
    printf("Hello, Binary Dose!");
    return 0;
}
```
At this stage:

- It is human-readable
- The CPU cannot understand it
- It is just a text file on disk

### 2️⃣ Compilation vs Interpretation
What happens next depends on the language.

#### Compiled Languages (C, C++)
- Source code → machine code before execution
- Errors caught early
- Faster execution

#### Interpreted Languages (Python, JavaScript)
- Code executed line by line (conceptually)
- More flexible
- Slightly slower

⚠️ Note: Modern languages often use hybrid models (bytecode + virtual machine).

### 3️⃣ Creating an Executable File
For compiled languages:

```
source code → object file → executable
```
The executable contains:
- Machine instructions
- Metadata (entry point, sections)
- Information required by the OS loader

At this point, still nothing is running.

### 4️⃣ OS Loads the Program into Memory
When you run the program:
- The OS creates a process
- A unique Process ID (PID) is assigned
- Virtual memory is allocated
- Required libraries are linked

### 5️⃣ Program Memory Layout
Each process gets its own virtual address space, divided into regions:

🧩 Typical Memory Segments
| Segment |	Purpose |
|----------|----------|
| Text |	Program instructions |
| Data |	Global & static variables |
| Heap |	Dynamic memory (malloc, new) |
| Stack | Function calls & local variables |

👉 This isolation is why one program cannot directly access another program’s memory.

### 6️⃣ CPU Starts Executing Instructions
Now the real execution begins.

The CPU follows the instruction cycle:

```
Fetch → Decode → Execute → Repeat
```
- Program Counter (PC) points to the next instruction
- Instructions are fetched from memory
- Results are stored in registers or memory
- This continues until the program ends.

### 7️⃣ Program Termination
When the program finishes:
- return 0 (or equivalent) is executed
- OS frees memory
- File handles are closed
- Process entry is removed

The system is now clean again.

⚠️ Common Misconceptions
- ❌ “Program runs directly from disk” ✅ Programs run from RAM, not disk
- ❌ “Page fault always means disk access”
✅ Page fault can occur even when data is already in memory

- ❌ “Stack and heap are language features”
✅ They are runtime memory concepts

💡 Interview Perspective
You may be asked:
- What happens after main() starts?
- Difference between process and program?
- Why virtual memory is used?
- How stack overflow occurs?

This topic connects OS, memory, and execution — a favorite interview area.

📌 Final Thought
If you understand what happens when a program runs,
you understand how computers actually work — not just how to write code.

This foundation will help you everywhere in computer science.