/**
 * Global Browser Shims & Markdown Alert Enhancer
 * 1. Safe fallback for window.gtag on client-side route transitions.
 * 2. Automatic transformer for GitHub-style Markdown alerts (> [!NOTE], > [!IMPORTANT], etc.)
 */
if (typeof window !== "undefined") {
  if (typeof window.gtag !== "function") {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () {
      window.dataLayer.push(arguments);
    };
  }

  // Digital attribution & copyright signature
  if (!window.__binaryDoseSignature) {
    window.__binaryDoseSignature = true;
    console.log(
      "%c⚡ Binary Dose %c\nCreated by Abhay Ojha | https://binarydose.in\nProtected by Binary Dose License. All rights reserved.",
      "font-weight: 800; font-size: 13px; color: #2563eb; padding: 2px 4px;",
      "font-size: 11px; color: #64748b;"
    );
  }

  // Global GitHub-style Alert Transformer (> [!NOTE], > [!IMPORTANT], etc.)
  function transformGitHubAlerts() {
    if (typeof document === 'undefined') return;
    const blockquotes = document.querySelectorAll('.markdown blockquote, article blockquote');
    blockquotes.forEach((bq) => {
      if (bq.dataset.alertProcessed) return;
      const firstP = bq.querySelector('p');
      if (!firstP) return;
      const rawHtml = firstP.innerHTML.trim();
      const match = rawHtml.match(/^\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]/i);
      if (match) {
        bq.dataset.alertProcessed = 'true';
        const type = match[1].toLowerCase();
        bq.classList.add('github-alert', `github-alert-${type}`);
        const labels = {
          note: { icon: 'ℹ️', label: 'Note' },
          important: { icon: '💎', label: 'Important' },
          warning: { icon: '⚠️', label: 'Warning' },
          tip: { icon: '💡', label: 'Tip' },
          caution: { icon: '🛑', label: 'Caution' },
        };
        const info = labels[type] || { icon: '📌', label: match[1] };
        const headerDiv = document.createElement('div');
        headerDiv.className = 'github-alert-header';
        headerDiv.innerHTML = `<span class="github-alert-icon">${info.icon}</span><span class="github-alert-title">${info.label}</span>`;
        bq.insertBefore(headerDiv, firstP);
        firstP.innerHTML = rawHtml.replace(/^\[!(NOTE|IMPORTANT|WARNING|TIP|CAUTION)\]\s*(<br\s*\/?>)?/i, '').trim();
      }
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', transformGitHubAlerts);
    } else {
      transformGitHubAlerts();
    }
    const observer = new MutationObserver(() => transformGitHubAlerts());
    observer.observe(document.body, { childList: true, subtree: true });
  }
}
