// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Binary Dose",
  tagline: "A Dose of Binary",
  favicon: "img/logo.png",

  // Enable Mermaid diagrams in all markdown/MDX content
  markdown: {
    mermaid: true,
  },
  themes: ["@docusaurus/theme-mermaid"],

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: "https://binarydose.in",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  onBrokenLinks: "throw",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

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
        },
        theme: {
          customCss: "./src/css/custom.css",
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
      // Replace with your project's social card
      image: "img/logo.png",
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
            label: "100 Days CS 🔥",
            position: "left",
            to: "/100-days",
          },
          {
            label: "Video Courses",
            position: "left",
            to: "/courses",
          },
          {
            label: "PYQs",
            position: "left",
            to: "/pyqs",
          },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/contribute", label: "Contribute 🚀", position: "left" },
          { to: "/about-us", label: "About Us", position: "left" },
          { to: "/contact-us", label: "Contact", position: "left" },

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
                label: "100 Days CS Series 🔥",
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
