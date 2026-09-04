// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import fs from "node:fs";
import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// Load local .env file if present
if (fs.existsSync(".env")) {
  try {
    if (typeof process.loadEnvFile === "function") {
      process.loadEnvFile();
    }
  } catch {
    // Ignore if already loaded or on platforms managing env directly
  }
}

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Binary Dose",
  tagline: "Zero-Fluff Computer Science, DSA & Interview Prep",
  favicon: "img/logo.png",

  // Enable Mermaid diagrams in all markdown/MDX content
  markdown: {
    mermaid: true,
  },
  themes: [
    "@docusaurus/theme-mermaid",
    [
      "@easyops-cn/docusaurus-search-local",
      /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
      ({
        hashed: true,
        language: ["en"],
        docsRouteBasePath: ["100-days", "pyqs", "coding"],
        docsDir: ["100-days", "pyqs", "coding"],
        docsPluginIdForPreferredVersion: "coding",
        blogRouteBasePath: "blog",
        blogDir: "blog",
        indexDocs: true,
        indexBlog: true,
        indexPages: true,
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        highlightSearchTermsOnTargetPage: true,
        searchBarShortcutHint: false,
        searchBarShortcutKeymap: "mod+k",
        searchBarPosition: "right",
      }),
    ],
  ],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://binarydose.in",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",
  trailingSlash: false,

  clientModules: ["./src/utils/gtagShim.js"],

  onBrokenLinks: "throw",

  // Inject Google AdSense script if client ID is provided in environment variables
  scripts: process.env.ADSENSE_CLIENT_ID
    ? [
        {
          src: `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.ADSENSE_CLIENT_ID}`,
          async: true,
          crossorigin: "anonymous",
        },
      ]
    : [],

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  stylesheets: [
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css",
      type: "text/css",
      crossorigin: "anonymous",
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          blogSidebarCount: 0,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
          remarkPlugins: [remarkMath],
          rehypePlugins: [rehypeKatex],
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.8,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
        },
        gtag: {
          trackingID: "G-86LMP8KT9T",
          anonymizeIP: true,
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "interview",
        path: "100-days",
        routeBasePath: "100-days",
        sidebarPath: false,

        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "pyqs",
        path: "pyqs",
        routeBasePath: "pyqs",
        sidebarPath: false,

        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
    [
      "@docusaurus/plugin-content-docs",
      {
        id: "coding",
        path: "coding",
        routeBasePath: "coding",
        sidebarPath: false,

        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Project official Open Graph 1200x630 social card
      image: "img/binarydose-og.png",
      metadata: [
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: "Binary Dose - Master DSA, System Design & CS Fundamentals" },
        { name: "keywords", content: "computer science, data structures, algorithms, dsa sheet, system design, operating systems, dbms, computer networks, 100 days of interview, coding interview, leetcode solutions" },
        { name: "author", content: "Binary Dose" },
        { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
        { property: "og:site_name", content: "Binary Dose" },
        { property: "og:type", content: "website" },
        { name: "twitter:site", content: "@binarydose" },
        { name: "twitter:creator", content: "@binarydose" },
        { name: "theme-color", content: "#2563eb" },
      ],
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: "Binary Dose",
        logo: {
          alt: "Binary Dose Logo",
          src: "img/logo.png",
        },
        items: [
          {
            label: "CodeDose (DSA)",
            position: "left",
            to: "/coding",
          },
          {
            label: "100 Days Interview",
            position: "left",
            to: "/100-days",
          },
          {
            label: "Video Courses",
            position: "left",
            to: "/courses",
          },
          {
            to: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            to: "/contribute",
            label: "Contribute 🚀",
            position: "left",
            className: "nav-contribute-cta",
          },
          {
            label: "More",
            position: "left",
            items: [
              {
                label: "PYQs",
                to: "/pyqs",
              },
              {
                label: "About Us",
                to: "/about-us",
              },
              {
                label: "Contact",
                to: "/contact-us",
              },
            ],
          },

          {
            href: "https://www.youtube.com/@binarydose",
            position: "right",
            className: "nav-icon nav-youtube",
            "aria-label": "Binary Dose YouTube Channel",
          },
          {
            href: "https://www.instagram.com/binarydose",
            position: "right",
            className: "nav-icon nav-instagram",
            "aria-label": "Binary Dose Instagram",
          },
        ],
      },

      footer: {
        style: "dark",
        links: [
          {
            title: "Learning Tracks",
            items: [
              {
                label: "CodeDose (DSA Sheet)",
                to: "/coding",
              },
              {
                label: "100 Days of Interview Questions",
                to: "/100-days",
              },
              {
                label: "Video Courses (Playlists)",
                to: "/courses",
              },
              {
                label: "Previous Year Questions",
                to: "/pyqs",
              },
              {
                label: "Engineering Blog",
                to: "/blog",
              },
            ],
          },
          {
            title: "Community & Open Source",
            items: [
              {
                label: "YouTube Channel",
                href: "https://www.youtube.com/@binarydose",
              },
              {
                label: "Instagram",
                href: "https://www.instagram.com/binarydose",
              },
              {
                label: "GitHub Repository",
                href: "https://github.com/abojha/binarydose_website",
              },
              {
                label: "🚀 Contribute to Binary Dose",
                to: "/contribute",
              },
            ],
          },
          {
            title: "About Binary Dose",
            items: [
              {
                label: "About Us & Vision",
                to: "/about-us",
              },
              {
                label: "Contributor Guide",
                to: "/contribute",
              },
              {
                label: "Contact & Feedback",
                to: "/contact-us",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Binary Dose. Built with ❤️ by Abhay Ojha.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      mermaid: {
        theme: {
          light: "neutral",
          dark: "dark",
        },
      },
    }),
};

export default config;
