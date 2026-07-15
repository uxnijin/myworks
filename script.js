(() => {
  const $ = (id) => document.getElementById(id);

  // --- STATE MANAGEMENT ---
  let currentProject = null;

  // --- THEME MANAGEMENT ---
  const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
      document.body.classList.add('dark-mode');
      updateThemeToggles(true);
    } else {
      document.body.classList.remove('dark-mode');
      updateThemeToggles(false);
    }
  };

  const updateThemeToggles = (isDark) => {
    const sunIcons = document.querySelectorAll('.sun-icon');
    const moonIcons = document.querySelectorAll('.moon-icon');
    
    sunIcons.forEach(icon => icon.style.display = isDark ? 'block' : 'none');
    moonIcons.forEach(icon => icon.style.display = isDark ? 'none' : 'block');
  };

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeToggles(isDark);
  };

  $('theme-toggle').addEventListener('click', toggleTheme);
  $('theme-toggle-mobile').addEventListener('click', toggleTheme);

  // --- NAVIGATION RENDERING ---
  const initNavigation = () => {
    // Render profile info in sidebar
    if (PROFILE.avatar) {
      $('sidebar-avatar').style.backgroundImage = `url(${PROFILE.avatar})`;
    } else {
      $('sidebar-avatar').textContent = PROFILE.name.charAt(0).toUpperCase();
    }

    // Render Home profile info
    if (PROFILE.avatar && $('avatar')) {
      $('avatar').style.backgroundImage = `url(${PROFILE.avatar})`;
    }
    $('name').innerHTML = `${PROFILE.name} <svg class="verify-badge" viewBox="0 0 40 40"><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"/></svg>`;
    $('role').textContent = PROFILE.role || 'Product Designer';
    $('bio').innerHTML = PROFILE.bio;

    // Render Social/Link icons in sidebar
    const ICONS = {
      instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
      linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
      youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.136C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.482A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.136c1.87.482 9.388.482 9.388.482s7.518 0 9.388-.482a3.002 3.002 0 0 0 2.11-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
      github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
      instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
      link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2m6 10h2a5 5 0 0 0 0-10h-2M8 12h8"/></svg>`
    };

    $('nav-social-links').innerHTML = PROFILE.links.map((l) => {
      const key = (l.label || '').toLowerCase().trim();
      const iconSvg = ICONS[key] || ICONS['link'];
      return `
        <li>
          <a href="${l.url}" target="_blank" rel="noopener" class="nav-sub-item">
            ${iconSvg}
            <span>${l.label}</span>
          </a>
        </li>
      `;
    }).join('');

    // Distribute case studies vs utility tools
    let caseStudiesHtml = '';
    let utilitiesHtml = '';

    TOOLS.forEach((tool) => {
      const activeClass = '';
      const icon = tool.caseStudy ? `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
      ` : `
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
      `;

      const markup = `
        <li>
          <a href="#/project/${tool.id}" class="nav-sub-item" data-id="${tool.id}">
            ${icon}
            <span>${tool.name}</span>
          </a>
        </li>
      `;

      if (tool.caseStudy) {
        caseStudiesHtml += markup;
      } else {
        utilitiesHtml += markup;
      }
    });

    $('nav-case-studies').innerHTML = caseStudiesHtml;
    $('nav-utilities').innerHTML = utilitiesHtml;
  };

  // --- SEARCH FILTERING ---
  $('sidebar-search').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    const navItems = document.querySelectorAll('.sidebar-nav li:not(.nav-section-title)');

    navItems.forEach(item => {
      const link = item.querySelector('a');
      if (!link) return;
      
      const text = link.textContent.toLowerCase();
      const id = link.dataset.id;
      
      let match = text.includes(q);
      
      // Also match tool descriptions in query
      if (id) {
        const tool = TOOLS.find(t => t.id === id);
        if (tool && tool.description.toLowerCase().includes(q)) {
          match = true;
        }
      }
      
      if (q === '' || match || link.id === 'nav-home') {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // --- HOME VIEW RENDER ---
  const getTagHue = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
  };

  const renderHomeGrid = () => {
    $('grid').innerHTML = TOOLS.map((t) => {
      const tag = t.tag || 'Tool';
      const hue = getTagHue(tag);
      return `
        <a class="card" href="#/project/${t.id}">
          <div class="card-top">
            <span class="tag" style="--tag-hue: ${hue}">${tag}</span>
            <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </div>
          <h2 class="card-name">${t.name}</h2>
          <p class="card-desc">${t.description}</p>
        </a>
      `;
    }).join('');
  };

  // --- CASE STUDY RENDER ENGINE ---
  const renderCaseStudy = (project) => {
    currentProject = project;
    const article = $('project-article');
    const isDoc = !!project.caseStudy;
    
    // Header section
    let html = `
      <h1>${project.name}</h1>
      <p class="case-subtitle">${isDoc ? project.caseStudy.subtitle : project.description}</p>
      <div class="case-meta">
        <span class="tag">${project.tag || 'Application'}</span>
        <a href="${project.url}" target="_blank" rel="noopener" class="launch-btn">
          <span>Launch Project</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
      </div>
    `;

    if (isDoc) {
      project.caseStudy.content.forEach((block) => {
        switch (block.type) {
          case 'h2':
            html += `<h2 id="${block.id}">${block.text}</h2>`;
            break;
          case 'h3':
            html += `<h3>${block.text}</h3>`;
            break;
          case 'p':
            html += `<p>${block.text}</p>`;
            break;
          case 'list':
            html += `<ul>${block.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
            break;
          case 'callout':
            const iconSvg = getCalloutIcon(block.style);
            html += `
              <div class="callout ${block.style}">
                ${iconSvg}
                <div>${block.text}</div>
              </div>
            `;
            break;
          case 'code':
            html += `
              <div class="code-container">
                <div class="code-header">
                  <span>${block.language || 'code'}</span>
                  <button class="copy-btn">Copy</button>
                </div>
                <pre><code class="language-${block.language}">${escapeHtml(block.code)}</code></pre>
              </div>
            `;
            break;
          case 'diagram':
            html += block.html;
            break;
          case 'slider':
            html += `
              <div class="slider-container" style="--slider-pos: 0.5;">
                <img src="${block.beforeImage}" class="slider-img before" alt="Before">
                <img src="${block.afterImage}" class="slider-img after" alt="After">
                <div class="slider-label before">${block.beforeLabel}</div>
                <div class="slider-label after">${block.afterLabel}</div>
                <div class="slider-handle">
                  <div class="slider-button">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="8 5 1 12 8 19"></polyline><polyline points="16 5 23 12 16 19"></polyline>
                    </svg>
                  </div>
                </div>
              </div>
            `;
            break;
          case 'gallery':
            html += `
              <div class="gallery">
                ${block.images.map(img => `
                  <div class="gallery-item">
                    <div class="gallery-img-wrapper">
                      <img src="${img.url}" alt="${img.caption || 'Project visual'}">
                    </div>
                    ${img.caption ? `<div class="gallery-caption">${img.caption}</div>` : ''}
                  </div>
                `).join('')}
              </div>
            `;
            break;
          case 'figma':
            html += `
              <div class="figma-embed-container">
                <iframe src="${block.url}" allowfullscreen></iframe>
              </div>
            `;
            break;
          case 'interactive-color-generator':
            html += `
              <div class="color-picker-widget">
                <div class="widget-controls">
                  <span class="swatch-row-label">Base Color:</span>
                  <div class="color-input-wrapper">
                    <input type="color" class="color-picker-input" value="#0066cc">
                    <input type="text" class="hex-text-input" value="#0066cc" maxlength="7">
                  </div>
                </div>
                <div class="widget-swatches-grid">
                  <div class="swatch-row">
                    <div class="swatch-row-label">Tints (Lighter Steps)</div>
                    <div class="swatches-flex" id="tints-swatches"></div>
                  </div>
                  <div class="swatch-row">
                    <div class="swatch-row-label">Shades (Darker Steps)</div>
                    <div class="swatches-flex" id="shades-swatches"></div>
                  </div>
                </div>
              </div>
            `;
            break;
        }
      });
    } else {
      // Default placeholder info for external tools
      html += `
        <h2>Project Overview</h2>
        <p>This application is hosted externally. You can launch it using the link above to view it in full screen.</p>
        <div class="callout info">
          <svg class="callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div><strong>External Access:</strong> You are navigating to <code>${project.url}</code>. Ensure popup blockers are disabled if the app loads on a separate tab.</div>
        </div>
      `;
    }

    article.innerHTML = html;

    // Build Table of Contents
    const tocList = $('toc-list');
    const tocSidebar = $('app-toc');
    
    if (isDoc && project.caseStudy.toc && project.caseStudy.toc.length > 0) {
      tocSidebar.style.display = 'block';
      tocList.innerHTML = project.caseStudy.toc.map(item => `
        <li><a href="#${item.id}" class="toc-link" data-id="${item.id}">${item.title}</a></li>
      `).join('');
      
      // Bind TOC smooth scroll
      document.querySelectorAll('.toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = $(link.dataset.id);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Update URL hash without reload
            history.pushState(null, null, `${window.location.hash.split('?')[0]}?section=${link.dataset.id}`);
          }
        });
      });
    } else {
      tocSidebar.style.display = 'none';
      tocList.innerHTML = '';
    }

    // Attach Event Handlers for components
    attachSliderHandlers();
    attachCopyHandlers();
    attachLightboxHandlers();
    attachInteractiveColorHandlers();
  };

  // Helper formatting and SVGs
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const getCalloutIcon = (style) => {
    const base = 'class="callout-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
    if (style === 'success') {
      return `<svg ${base}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    }
    if (style === 'warning') {
      return `<svg ${base}><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`;
    }
    // Default info
    return `<svg ${base}><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
  };

  // --- COMPONENT HANDLERS IMPLEMENTATION ---
  
  // 1. Comparison Slider dragging
  const attachSliderHandlers = () => {
    const sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(slider => {
      const updateSlider = (clientX) => {
        const rect = slider.getBoundingClientRect();
        let pos = (clientX - rect.left) / rect.width;
        pos = Math.max(0, Math.min(1, pos));
        slider.style.setProperty('--slider-pos', pos);
      };

      let isDragging = false;

      slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        updateSlider(e.clientX);
      });

      window.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        updateSlider(e.clientX);
      });

      window.addEventListener('mouseup', () => {
        isDragging = false;
      });

      // Touch events support
      slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        if (e.touches[0]) updateSlider(e.touches[0].clientX);
      });

      window.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        if (e.touches[0]) updateSlider(e.touches[0].clientX);
      });

      window.addEventListener('touchend', () => {
        isDragging = false;
      });
    });
  };

  // 2. Code block clipboard copy
  const attachCopyHandlers = () => {
    const codeContainers = document.querySelectorAll('.code-container');
    codeContainers.forEach(container => {
      const btn = container.querySelector('.copy-btn');
      const codeNode = container.querySelector('code');
      
      btn.addEventListener('click', () => {
        navigator.clipboard.writeText(codeNode.textContent).then(() => {
          btn.textContent = 'Copied!';
          btn.style.borderColor = 'var(--border-active)';
          btn.style.color = 'var(--accent)';
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.style.borderColor = 'var(--border)';
            btn.style.color = 'var(--ink-dim)';
          }, 2000);
        });
      });
    });
  };

  // 3. Image Lightbox
  const attachLightboxHandlers = () => {
    const imgWrappers = document.querySelectorAll('.gallery-img-wrapper');
    const lightbox = $('image-lightbox');
    const lightboxImg = $('lightbox-img');
    const lightboxCaption = $('lightbox-caption');

    imgWrappers.forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('img');
        const caption = wrapper.nextElementSibling;
        
        lightboxImg.src = img.src;
        lightboxCaption.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('show');
        lightbox.setAttribute('aria-hidden', 'false');
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove('show');
      lightbox.setAttribute('aria-hidden', 'true');
    };

    lightbox.querySelector('.lightbox-close').addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.classList.contains('show')) {
        closeLightbox();
      }
    });
  };

  // 4. Interactive Tints & Shades Generator
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 0, g: 102, b: 204 };
  };

  const rgbToHex = (r, g, b) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const generateSwatches = (hex) => {
    const baseRgb = hexToRgb(hex);
    const tintsContainer = $('tints-swatches');
    const shadesContainer = $('shades-swatches');
    
    if (!tintsContainer || !shadesContainer) return;

    let tintsHtml = '';
    let shadesHtml = '';

    for (let i = 1; i <= 10; i++) {
      const factor = i * 0.09;
      // Tint (interpolate towards white: 255, 255, 255)
      const tr = Math.round(baseRgb.r + (255 - baseRgb.r) * factor);
      const tg = Math.round(baseRgb.g + (255 - baseRgb.g) * factor);
      const tb = Math.round(baseRgb.b + (255 - baseRgb.b) * factor);
      const tintHex = rgbToHex(tr, tg, tb);

      // Shade (interpolate towards black: 0, 0, 0)
      const sr = Math.round(baseRgb.r * (1 - factor));
      const sg = Math.round(baseRgb.g * (1 - factor));
      const sb = Math.round(baseRgb.b * (1 - factor));
      const shadeHex = rgbToHex(sr, sg, sb);

      tintsHtml += `
        <div class="swatch-card" style="background: ${tintHex};" data-hex="${tintHex}" title="Click to copy ${tintHex}">
          <span class="swatch-card-hex">${tintHex.toUpperCase()}</span>
        </div>
      `;

      shadesHtml += `
        <div class="swatch-card" style="background: ${shadeHex};" data-hex="${shadeHex}" title="Click to copy ${shadeHex}">
          <span class="swatch-card-hex">${shadeHex.toUpperCase()}</span>
        </div>
      `;
    }

    tintsContainer.innerHTML = tintsHtml;
    shadesContainer.innerHTML = shadesHtml;

    // Attach clipboard click copy to cards
    document.querySelectorAll('.swatch-card').forEach(card => {
      card.addEventListener('click', () => {
        const color = card.dataset.hex;
        navigator.clipboard.writeText(color).then(() => {
          const hexLabel = card.querySelector('.swatch-card-hex');
          const originalText = hexLabel.textContent;
          hexLabel.textContent = 'COPIED';
          setTimeout(() => {
            hexLabel.textContent = originalText;
          }, 1000);
        });
      });
    });
  };

  const attachInteractiveColorHandlers = () => {
    const picker = document.querySelector('.color-picker-input');
    const textInput = document.querySelector('.hex-text-input');

    if (!picker || !textInput) return;

    picker.addEventListener('input', (e) => {
      const color = e.target.value;
      textInput.value = color;
      generateSwatches(color);
    });

    textInput.addEventListener('input', (e) => {
      let color = e.target.value;
      if (!color.startsWith('#')) {
        color = '#' + color;
      }
      if (/^#[0-9A-F]{6}$/i.test(color)) {
        picker.value = color;
        generateSwatches(color);
      }
    });

    // Initial swatches render
    generateSwatches(picker.value);
  };

  // --- ROUTER ENGINE ---
  const route = () => {
    const hash = window.location.hash || '#/';
    
    // Close mobile sidebar on navigation
    $('app-sidebar').classList.remove('show');
    
    // Deactivate all nav items
    document.querySelectorAll('.sidebar-nav a').forEach(a => a.classList.remove('active'));

    if (hash === '#/') {
      // Toggle views
      $('home-view').style.display = 'block';
      $('project-view').style.display = 'none';
      $('app-toc').style.display = 'none';
      $('nav-home').classList.add('active');
      window.scrollTo(0, 0);
      currentProject = null;
    } else if (hash.startsWith('#/project/')) {
      const id = hash.split('?')[0].replace('#/project/', '');
      const project = TOOLS.find(t => t.id === id);
      
      if (project) {
        // Toggle views
        $('home-view').style.display = 'none';
        $('project-view').style.display = 'block';
        
        // Mark navigation sidebar active
        const navLink = document.querySelector(`.sidebar-nav a[data-id="${id}"]`);
        if (navLink) navLink.classList.add('active');

        // Render project case study
        renderCaseStudy(project);
        
        // Handle section scrolling if specified in URL query
        const queryParams = new URLSearchParams(hash.split('?')[1] || '');
        const sectionId = queryParams.get('section');
        if (sectionId) {
          setTimeout(() => {
            const el = $(sectionId);
            if (el) el.scrollIntoView({ behavior: 'auto', block: 'start' });
          }, 100);
        } else {
          window.scrollTo(0, 0);
        }
      } else {
        // Not found, redirect home
        window.location.hash = '#/';
      }
    }
  };

  window.addEventListener('hashchange', route);

  // --- SCROLL SPY (TOC HIGHLIGHTING) ---
  window.addEventListener('scroll', () => {
    if (!currentProject || !currentProject.caseStudy) return;
    
    const headings = currentProject.caseStudy.toc.map(item => $(item.id)).filter(Boolean);
    if (headings.length === 0) return;

    let activeId = null;
    const scrollPos = window.scrollY + 100; // Offset for accuracy

    for (let i = 0; i < headings.length; i++) {
      const el = headings[i];
      if (scrollPos >= el.offsetTop) {
        activeId = el.id;
      }
    }

    if (!activeId && headings.length > 0) {
      activeId = headings[0].id;
    }

    document.querySelectorAll('.toc-link').forEach(link => {
      if (link.dataset.id === activeId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  });

  // --- MOBILE NAVIGATION BAR TOGGLE ---
  $('mobile-menu-toggle').addEventListener('click', () => {
    $('app-sidebar').classList.toggle('show');
  });

  // Close sidebar clicking outside on mobile
  document.addEventListener('click', (e) => {
    const sidebar = $('app-sidebar');
    const menuToggle = $('mobile-menu-toggle');
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      sidebar.classList.remove('show');
    }
  });

  // --- INITIALIZATION ---
  initTheme();
  initNavigation();
  renderHomeGrid();
  route();

  // --- GITHUB CONTRIBUTION GRAPH RENDERING ---
  const renderGithubGraph = () => {
    if (!$('github-graph-card') || !PROFILE.github) return;

    const card = $('github-graph-card');
    card.innerHTML = `<div style="text-align: center; color: var(--grey-2); padding: 16px; font-size: 13px; font-weight: 500;">Loading GitHub contributions...</div>`;

    fetch(`https://github-contributions-api.deno.dev/${PROFILE.github}.json`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to load contributions');
        return response.json();
      })
      .then(data => {
        const contributions = data.contributions;
        const totalContributions = data.totalContributions || 0;
        const dayData = contributions.flat();

        const levelMap = {
          'NONE': 0,
          'FIRST_QUARTILE': 1,
          'SECOND_QUARTILE': 2,
          'THIRD_QUARTILE': 3,
          'FOURTH_QUARTILE': 4
        };

        const mappedDays = dayData.map(d => {
          const date = new Date(d.date);
          const count = d.contributionCount || 0;
          const level = levelMap[d.contributionLevel] ?? 0;
          return { date, count, level };
        });

        let monthsHtml = '';
        let lastMonth = -1;
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const cols = contributions.length;

        for (let col = 0; col < cols; col++) {
          const firstDayOfCol = contributions[col][0];
          if (firstDayOfCol) {
            const firstDate = new Date(firstDayOfCol.date);
            const currentMonth = firstDate.getMonth();
            if (currentMonth !== lastMonth) {
              monthsHtml += `<span class="github-graph-month-label" style="grid-column-start: ${col + 1};">${months[currentMonth]}</span>`;
              lastMonth = currentMonth;
            }
          }
        }

        card.innerHTML = `
          <div class="github-graph-header">
            <h3 class="github-graph-title">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
              <a href="https://github.com/${PROFILE.github}" target="_blank" rel="noopener" style="color: inherit; text-decoration: none; display: inline-flex; align-items: center; gap: 4px;">
                @${PROFILE.github} on GitHub
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="width: 12px; height: 12px; opacity: 0.6;"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3"/></svg>
              </a>
            </h3>
            <div class="github-graph-stats">
              <strong>${totalContributions.toLocaleString()}</strong> contributions in the last year
            </div>
          </div>
          
          <div class="github-graph-scroll">
            <div class="github-graph-wrapper" style="min-width: ${cols * 13 + 36}px;">
              <div class="github-graph-months" style="grid-template-columns: repeat(${cols}, 1fr);">
                ${monthsHtml}
              </div>
              <div class="github-graph-body">
                <div class="github-graph-days">
                  <span>Mon</span>
                  <span>Wed</span>
                  <span>Fri</span>
                </div>
                <div class="github-graph-grid" id="github-grid" style="grid-template-columns: repeat(${cols}, 1fr);">
                  ${mappedDays.map(d => {
                    const formattedDate = d.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
                    const text = d.count === 0 ? `No contributions on ${formattedDate}` : `${d.count} contribution${d.count > 1 ? 's' : ''} on ${formattedDate}`;
                    return `<div class="github-cell" data-level="${d.level}" title="${text}"></div>`;
                  }).join('')}
                </div>
              </div>
            </div>
          </div>
        `;
      })
      .catch(err => {
        console.error(err);
        card.innerHTML = `<div style="text-align: center; color: var(--grey-2); padding: 16px; font-size: 13px;">Could not load GitHub contributions. <a href="https://github.com/${PROFILE.github}" target="_blank" rel="noopener" style="color: var(--accent); text-decoration: underline;">View Profile</a></div>`;
      });
  };

  renderGithubGraph();

  // Dynamic favicon generation matching theme
  if (PROFILE.avatar) {
    const faviconImg = new Image();
    faviconImg.src = PROFILE.avatar;
    faviconImg.onload = () => {
      const canvas = document.createElement('canvas');
      const size = 64;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
      ctx.clip();

      const minSize = Math.min(faviconImg.width, faviconImg.height);
      const srcX = (faviconImg.width - minSize) / 2;
      const srcY = (faviconImg.height - minSize) / 2;
      ctx.drawImage(faviconImg, srcX, srcY, minSize, minSize, 0, 0, size, size);

      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      link.type = 'image/png';
      link.href = canvas.toDataURL('image/png');
    };
  }

})();
