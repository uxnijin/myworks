// ========================================================
// EDIT EVERYTHING HERE. Nothing else needs to change.
// ========================================================

const PROFILE = {
  name: "Nijin",
  avatar: "avatar.jpg",
  bio: `Product Designer worked with <strong>30+ clients</strong>
Mentored <strong>500+ design students</strong> at <a href="https://harisandcoacademy.com" target="_blank" rel="noopener">HACA</a>`,
  github: "uxnijin",
  links: [
    { label: "Instagram", url: "https://instagram.com/uxnijin" },
    { label: "LinkedIn", url: "https://linkedin.com/in/nijinmuhammed" },
    { label: "YouTube", url: "https://www.youtube.com/@designschoolmalayalam" },
    { label: "GitHub", url: "https://github.com/uxnijin" },
  ],
};

// Add one object per tool. Order here = order shown on the page.
const TOOLS = [
  {
    id: "design-system-extractor",
    name: "Design System Extractor",
    description: "Extract colors, typography, images, icons, and CSS styles from any website in seconds.",
    url: "./design-system-extractor/index.html",
    tag: "Chrome Extension",
    caseStudy: {
      subtitle: "A professional extension that parses website DOM and CSS variables to output a complete design token export.",
      toc: [
        { id: "overview", title: "Overview" },
        { id: "features", title: "Core Capabilities" },
        { id: "architecture", title: "System Architecture" },
        { id: "comparison", title: "Extraction Slider" },
        { id: "code", title: "Computing Style Tokens" },
        { id: "figma", title: "Figma Prototyping" },
      ],
      content: [
        {
          type: "h2",
          id: "overview",
          text: "Overview"
        },
        {
          type: "p",
          text: "Design System Extractor is a utility for developers and designers looking to reverse-engineer design tokens. Instead of manually inspecting elements inside browser devtools, users can click a button to list, filter, and export colors, typography, weights, and image assets."
        },
        {
          type: "callout",
          style: "info",
          text: "<strong>Privacy-First Engine:</strong> All CSS computations and DOM traversals run entirely inside your browser sandbox. No telemetry, tracking, or asset details are sent to external servers."
        },
        {
          type: "h2",
          id: "features",
          text: "Core Capabilities"
        },
        {
          type: "list",
          items: [
            "<strong>Color Swatch Collection:</strong> Aggregates RGB, HEX, HSL colors across active stylesheets.",
            "<strong>Typography Mapping:</strong> Computes font families, sizes, weights, and line heights in absolute pixel values.",
            "<strong>Asset Downloader:</strong> Detects inline SVGs, background images, and standard image tags for download.",
            "<strong>Export Formats:</strong> Generates JSON for design tokens, raw CSS custom properties, and Figma-compatible styles."
          ]
        },
        {
          type: "h2",
          id: "architecture",
          text: "System Architecture"
        },
        {
          type: "p",
          text: "The extension is designed around decoupled modules that communicate via message passing. A content script reads the active DOM and computed styles, passing structured data to the popup script which renders the tabbed user interface."
        },
        {
          type: "diagram",
          html: `
            <div class="custom-diagram">
              <div class="diagram-node">
                <div class="node-title">Browser Tab</div>
                <div class="node-desc">Active Webpage DOM</div>
              </div>
              <div class="diagram-arrow">
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                <span>Content Script Injection</span>
              </div>
              <div class="diagram-node active">
                <div class="node-title">Computation Engine</div>
                <div class="node-desc">Parse CSS & SVG nodes</div>
              </div>
              <div class="diagram-arrow">
                <svg viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" fill="none"/></svg>
                <span>Message Passing</span>
              </div>
              <div class="diagram-node">
                <div class="node-title">Popup UI</div>
                <div class="node-desc">JSON Tokens & Swatches</div>
              </div>
            </div>
          `
        },
        {
          type: "h2",
          id: "comparison",
          text: "Extraction Slider"
        },
        {
          type: "p",
          text: "Use the slider below to view the original webpage alongside the extracted colors and design tokens."
        },
        {
          type: "slider",
          beforeImage: "popmart_banner.png",
          afterImage: "avatar.jpg",
          beforeLabel: "Webpage View",
          afterLabel: "Extracted System"
        },
        {
          type: "h2",
          id: "code",
          text: "Computing Style Tokens"
        },
        {
          type: "p",
          text: "The snippet below demonstrates how the extension reads computed styles of selected nodes, dedupes colors, and generates clean hex tokens."
        },
        {
          type: "code",
          language: "javascript",
          code: `// Get all computed color values on the page
function extractColors() {
  const elements = document.querySelectorAll('*');
  const colors = new Set();

  elements.forEach(el => {
    const style = window.getComputedStyle(el);
    const bg = style.backgroundColor;
    const fg = style.color;
    
    if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
      colors.add(rgbToHex(bg));
    }
    if (fg) {
      colors.add(rgbToHex(fg));
    }
  });

  return Array.from(colors);
}`
        },
        {
          type: "h2",
          id: "figma",
          text: "Figma Prototyping"
        },
        {
          type: "p",
          text: "Review the original UX flow and visual drafts of the chrome extension directly in the Figma embed below."
        },
        {
          type: "figma",
          url: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Ffile%2Fexample-file-id"
        }
      ]
    }
  },
  {
    id: "tasks-extension",
    name: "Tasks Extension",
    description: "A beautiful Chrome extension to manage and sync your tasks directly with Google Tasks.",
    url: "./tasks/index.html",
    tag: "Chrome Extension",
    caseStudy: {
      subtitle: "A highly-responsive sidebar task manager syncing directly with Google's API.",
      toc: [
        { id: "overview", title: "Overview" },
        { id: "features", title: "Key Features" },
        { id: "auth", title: "Secure Google Authentication" },
        { id: "screens", title: "Visual Layouts" }
      ],
      content: [
        {
          type: "h2",
          id: "overview",
          text: "Overview"
        },
        {
          type: "p",
          text: "Tasks Extension is a Chrome Extension designed to bring Google Tasks out of the side panels of Gmail and calendar, and put them inside a dedicated browser window. It provides offline persistence and custom styling options."
        },
        {
          type: "callout",
          style: "warning",
          text: "<strong>Requirement:</strong> Synchronizing tasks requires a Google account with permissions to read/write Google Tasks data."
        },
        {
          type: "h2",
          id: "features",
          text: "Key Features"
        },
        {
          type: "list",
          items: [
            "<strong>Google OAuth2 Login:</strong> One-click authentication with Google services.",
            "<strong>Offline Syncing:</strong> Store tasks in localStorage, resolving server conflicts when online.",
            "<strong>Search & Filter:</strong> Quick filter by list, title, or completion status."
          ]
        },
        {
          type: "h2",
          id: "auth",
          text: "Secure Google Authentication"
        },
        {
          type: "p",
          text: "We use Chrome's Identity API to request access tokens from the Google OAuth2 server. This keeps credential handling native and secure."
        },
        {
          type: "code",
          language: "javascript",
          code: `// Retrieve OAuth token from Chrome Identity API
chrome.identity.getAuthToken({ interactive: true }, function(token) {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  fetch('https://www.googleapis.com/tasks/v1/users/@me/lists', {
    headers: { 'Authorization': 'Bearer ' + token }
  })
  .then(res => res.json())
  .then(data => renderTaskLists(data));
});`
        },
        {
          type: "h2",
          id: "screens",
          text: "Visual Layouts"
        },
        {
          type: "gallery",
          images: [
            { url: "popmart_banner.png", caption: "Dashboard Task Management" },
            { url: "avatar.jpg", caption: "Settings Panel and Preferences" }
          ]
        }
      ]
    }
  },
  {
    id: "tints-and-shades",
    name: "Tints & Shades",
    description: "A Figma plugin that generates color scales of tints and shades in seconds.",
    url: "https://tintsandshades.nijin.site/",
    tag: "Figma Plugin",
    caseStudy: {
      subtitle: "Generate dynamic HSL color steps for design systems within Figma.",
      toc: [
        { id: "overview", title: "Overview" },
        { id: "calculator", title: "Interactive Generator" },
        { id: "implementation", title: "Palette Generation Logic" }
      ],
      content: [
        {
          type: "h2",
          id: "overview",
          text: "Overview"
        },
        {
          type: "p",
          text: "Tints & Shades is a Figma plugin built to generate systematic palettes. Providing a single primary color generates a list of lighter steps (tints) and darker steps (shades) following proportional lightness spacing."
        },
        {
          type: "h2",
          id: "calculator",
          text: "Interactive Generator"
        },
        {
          type: "p",
          text: "Test the engine inside this document. Select a color to output tints and shades immediately."
        },
        {
          type: "interactive-color-generator"
        },
        {
          type: "h2",
          id: "implementation",
          text: "Palette Generation Logic"
        },
        {
          type: "p",
          text: "The algorithm calculates tints by interpolating between the selected base color and absolute white, and shades by interpolating between the base color and absolute black."
        },
        {
          type: "code",
          language: "javascript",
          code: `// Generate 10 tint steps and 10 shade steps
function generateTintsAndShades(hexColor) {
  const baseRgb = hexToRgb(hexColor);
  const tints = [];
  const shades = [];

  for (let i = 1; i <= 10; i++) {
    const factor = i * 0.1;
    // Tint (interpolate towards white: 255, 255, 255)
    tints.push({
      r: Math.round(baseRgb.r + (255 - baseRgb.r) * factor),
      g: Math.round(baseRgb.g + (255 - baseRgb.g) * factor),
      b: Math.round(baseRgb.b + (255 - baseRgb.b) * factor)
    });
    // Shade (interpolate towards black: 0, 0, 0)
    shades.push({
      r: Math.round(baseRgb.r * (1 - factor)),
      g: Math.round(baseRgb.g * (1 - factor)),
      b: Math.round(baseRgb.b * (1 - factor))
    });
  }
  return { tints, shades };
}`
        }
      ]
    }
  },
  {
    id: "design-school",
    name: "Design School",
    description: "A curated collection of resources for learning design.",
    url: "https://design.nijin.site/",
    tag: "Resource",
  },
  {
    id: "speed-test",
    name: "Speed Test",
    description: "Internet speed test — download, upload, ping, jitter.",
    url: "https://speedtest.nijin.site/",
    tag: "Network",
  },
  {
    id: "site-speed-test",
    name: "Site Speed Test",
    description: "Checks page load time, size, and request waterfall for any website.",
    url: "https://sitespeedcheck.nijin.site/",
    tag: "Network",
  },
  {
    id: "dns-checker",
    name: "DNS Checker",
    description: "Shows your DNS records + propagation.",
    url: "https://dnschecker.nijin.site/",
    tag: "Network",
  },
  {
    id: "ip-checker",
    name: "IP Checker",
    description: "Check IP and location.",
    url: "https://ipchecker.nijin.site/",
    tag: "Network",
  }
];
