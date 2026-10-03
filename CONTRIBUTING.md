# Contributing to Binary Dose 🚀

Thank you for your interest in contributing to **Binary Dose**! We are an open-source, community-driven platform dedicated to providing zero-fluff, high-clarity computer science education, DSA patterns, visual algorithm labs, and interview preparation.

Whether you are fixing a typo, adding an optimal DSA solution, authoring a core computer science lesson, or building an interactive visualizer, your contributions help thousands of students and software engineers worldwide.

---

## 🗺️ Choose Your Contribution Track

Binary Dose is built around **4 core pillars** and our **engineering blog**. Each area has a dedicated, highly detailed specification:

| Track | Guide | Focus Area |
| :--- | :--- | :--- |
| 🎓 **CoreDose** | [`contributing/COREDOSE.md`](./contributing/COREDOSE.md) | University & GATE notes (OS, DBMS, CN, OOPs, Architecture) with mathematical derivations and 7-layer lesson blueprints. |
| 🛠️ **DevDose** | [`contributing/DEVDOSE.md`](./contributing/DEVDOSE.md) | 100 Days of Tech Interview series, System Design blueprints, and applied language tracks. |
| ⚡ **CodeDose** | [`contributing/CODEDOSE.md`](./contributing/CODEDOSE.md) | Curated DSA solutions in C++ and Python with complexity analysis and AutoIndex discovery. |
| 🕹️ **AlgoDose** | [`contributing/ALGODOSE.md`](./contributing/ALGODOSE.md) | Interactive step-by-step visualizers with zero lag, 7-item caps, and synchronized code execution. |
| 📐 **Diagrams** | [`contributing/DIAGRAMS.md`](./contributing/DIAGRAMS.md) | Universal React educational diagram components (`<FlowPipeline>`, `<ArchitectureStack>`, etc.). |
| ✍️ **Blog** | [`contributing/BLOG.md`](./contributing/BLOG.md) | Standalone engineering deep-dives, interview round breakdowns, and author profile registration. |

---

## 🛡️ Git & Pull Request Protocol (CRITICAL)

To maintain platform stability, clean git history, and automated deployment pipelines, **all contributors must adhere strictly to this workflow**:

### ⚠️ Golden Rule: NEVER Push Directly to `main`
* Direct pushes to `main` are strictly protected and blocked by GitHub branch protection.
* Never open a Pull Request directly from your fork's `main` branch. Always use a dedicated, well-named **feature branch**.

---

### Step-by-Step GitHub Workflow:

#### 1. Fork the Repository
Click the **Fork** button at the top right of [github.com/abojha/binarydose_website](https://github.com/abojha/binarydose_website) to create a copy under your personal account.

#### 2. Clone Your Fork Locally
```bash
git clone https://github.com/YOUR_USERNAME/binarydose_website.git
cd binarydose_website
npm install
```

#### 3. Create a Dedicated Feature Branch
Always create a clean, descriptive branch off the latest `main`:
```bash
git checkout -b feat/coredose-cn-tcp-handshake
```

Branch naming conventions:
* `feat/codedose-<pattern>-<problem>`
* `feat/coredose-<subject>-<topic>`
* `feat/devdose-<track>-<topic>`
* `feat/algodose-<algorithm>`
* `feat/blog-<article-slug>`
* `fix/<area>-<description>`

#### 4. Run Locally & Verify
Start the local development server:
```bash
npm run start
```
Inspect your changes at `http://localhost:3000/`. Ensure that:
* No console errors or hydration warnings appear in Developer Tools (`F12`).
* All internal links and images resolve cleanly.
* Responsive layouts look sharp on mobile viewports (360px–420px).

#### 5. Commit with Clear Conventional Messages
```bash
git add .
git commit -m "feat(coredose): add Module 04 lesson on TCP 3-way handshake"
```

#### 6. Push to Your Fork
```bash
git push -u origin feat/coredose-cn-tcp-handshake
```

#### 7. Open a Pull Request (PR)
1. Go to your fork on GitHub and click **Compare & pull request**.
2. Target the base repository: `abojha/binarydose_website` on branch `main`.
3. Fill out the PR description using the checklist below.

---

## ✅ Pull Request Review Checklist

Before submitting your PR, verify the following:

- [ ] **Follows Track Guide**: Adheres to the specific rules in [`COREDOSE.md`](./contributing/COREDOSE.md), [`DEVDOSE.md`](./contributing/DEVDOSE.md), [`CODEDOSE.md`](./contributing/CODEDOSE.md), or [`ALGODOSE.md`](./contributing/ALGODOSE.md).
- [ ] **No Raw Mermaid SVGs**: Uses pure React diagram components from [`DIAGRAMS.md`](./contributing/DIAGRAMS.md).
- [ ] **Clean Frontmatter**: Correct `title`, `description`, and tags without duplicate fields.
- [ ] **No Dead Links**: All internal references and navigation links resolve with HTTP 200.
- [ ] **Author Profile**: Added yourself to `blog/authors.yml` if contributing an article or major guide.
- [ ] **Zero Hardcoded Stats**: Does not hardcode static problem or module counts in components.

---

## 🌟 Contributor Recognition & Perks

Every merged contribution is celebrated!
* **Author Attribution**: Articles and major guides feature your custom profile card linking to your LinkedIn, GitHub, and portfolio.
* **Community Spotlight**: Top contributors are featured on our social channels and project repository.
* **Open-Source Credibility**: Demonstrates verified, high-quality engineering writing and production-grade code on your resume.

If you have any questions or want to discuss an idea before writing, feel free to reach out via [GitHub Issues](https://github.com/abojha/binarydose_website/issues) or email `dosebinary@gmail.com`.
