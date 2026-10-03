# Contributing to the Blog ✍️

The Binary Dose Blog features engineering articles, deep-dives, and interview experiences from developers across the community. **Your writing style is your own** — there is no rigid section template to follow. Just write a great article.

This guide covers only the **structural essentials** that keep the site working correctly.

---

## 👤 Step 1: Add Yourself to `blog/authors.yml`

Before submitting an article, register your author profile at the bottom of `blog/authors.yml`:

```yaml
your_github_username:
  name: Your Full Name
  title: Software Engineer @ Company / CS Student @ University
  url: https://linkedin.com/in/your-profile
  image_url: https://github.com/your_github_username.png  # or direct avatar URL
  socials:
    linkedin: https://linkedin.com/in/your-profile
    github: https://github.com/your_github_username
    twitter: https://x.com/your_handle
```

---

## 📁 Step 2: Create Your Article File

Create a new file in `blog/` using the date-prefix format:

```
blog/YYYY-MM-DD-your-topic-title.md
```

Use `.mdx` instead of `.md` only if your article uses React diagram components (e.g., `<ArchitectureStack />`, `<FlowPipeline />`).

---

## 📑 Step 3: Required Structural Elements

Your article **must** include these structural pieces. Everything else — headings, sections, tone, depth — is entirely up to you.

### 3a. Frontmatter (Required)

```markdown
---
title: "Your Article Title"
description: "A one-liner summary of what the reader will learn."
authors: [your_github_username]
tags: [backend, redis, system-design]
hide_table_of_contents: true
---
```

### 3b. TOC Import + Truncate Marker (Required)

Place these right after the frontmatter. The `<!-- truncate -->` marker controls what shows on the blog listing page, so put it after your opening paragraph(s).

```markdown
import TOCInline from '@theme/TOCInline';

Your introduction goes here — hook the reader.

<!-- truncate -->

<div className="inline-toc-container">
  <details open>
    <summary><strong>📑 Table of Contents</strong></summary>
    <TOCInline toc={toc} />
  </details>
</div>
```

### 3c. Diagrams (Optional but Preferred)

If your article benefits from visuals, use the React diagram components documented in [`DIAGRAMS.md`](./DIAGRAMS.md). Raw Mermaid SVGs are not allowed — see DIAGRAMS.md for the reasoning.

---

## ✅ Pre-Submission Checklist

- [ ] Frontmatter includes `title`, `description`, `authors`, and `tags`.
- [ ] Author profile exists in `blog/authors.yml` with `name`, `title`, `url`, and `image_url`.
- [ ] `<!-- truncate -->` marker is present after the introduction.
- [ ] `TOCInline` import and collapsible TOC block are included.
- [ ] Code blocks have a language tag (e.g., ` ```cpp `, ` ```python `).
- [ ] If diagrams are used, they use React components from [`DIAGRAMS.md`](./DIAGRAMS.md) — not raw Mermaid.
- [ ] Runs cleanly on `npm run start` with zero console errors.
