(() => {
  const $ = (id) => document.getElementById(id);

  if (PROFILE.avatar) {
    $('avatar').style.backgroundImage = `url(${PROFILE.avatar})`;
  } else {
    $('avatar').textContent = PROFILE.name.charAt(0).toUpperCase();
  }
  $('name').innerHTML = `${PROFILE.name} <svg class="verify-badge" viewBox="0 0 40 40"><path d="M19.998 3.094 14.638 0l-2.972 5.15H5.432v6.354L0 14.64 3.094 20 0 25.359l5.432 3.137v5.905h5.975L14.638 40l5.36-3.094L25.358 40l3.232-5.6h6.162v-6.01L40 25.359 36.905 20 40 14.641l-5.248-3.03v-6.46h-6.419L25.358 0l-5.36 3.094Zm7.415 11.225 2.254 2.287-11.43 11.5-6.835-6.93 2.244-2.258 4.587 4.581 9.18-9.18Z"/></svg>`;
  if (PROFILE.role) {
    $('role').textContent = PROFILE.role;
  } else {
    $('role').style.display = 'none';
  }
  $('bio').innerHTML = PROFILE.bio;

  const ICONS = {
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.136C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.482A3.003 3.003 0 0 0 .502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 0 0 2.11 2.136c1.87.482 9.388.482 9.388.482s7.518 0 9.388-.482a3.002 3.002 0 0 0 2.11-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`,
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    dribbble: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm4.72-21.4c-1.3-.8-2.7-1.3-4.2-1.5-.1.3-.2.7-.3 1.1-.5 1.7-.8 3.5-.9 5.3 1.7-.4 3.4-.6 5-.6.1-.8.2-1.6.3-2.4.2-.7.2-1.4.1-1.9zm-8.8 1c-.8.5-1.5 1.1-2.1 1.8.8.7 1.7 1.4 2.7 2 .8-1.3 1.6-2.5 2.5-3.7-.8.1-1.5 0-3.1-.1zm-2.8 4.2C3.9 10.3 3 12.1 3 14c0 .3 0 .7.1 1 .1 0 .3 0 .5-.1 2.2-.4 4.3-1.4 6-2.8-.7-1.2-1.5-2.4-2.5-3.5-.8-.1-1.4 0-2.3-.4zm3 10.4c1.1.9 2.4 1.5 3.8 1.7.3-1 .8-2.1 1.4-3.1-1.2-.8-2.6-1.4-4-1.8-.7 1.1-1.1 2.2-1.2 3.2zm6.7 1.2c1.7-.4 3.2-1.2 4.4-2.4-1.1-.9-2.5-1.6-4.1-2.1-.5.9-.9 1.8-1.3 2.7 0 .6.3 1.2 1 1.8zm4.9-6c.2-.7.3-1.4.3-2.2 0-2.3-.9-4.4-2.4-6-.1.6-.2 1.3-.4 2-.5 1.7-1.3 3.3-2.3 4.8 1.4.6 2.7 1.1 4.1 1.4h.7z"/></svg>`,
    behance: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 7h-7v1.5h7V7zm-13.18 5c.875-.027 1.65-.453 2.1-1.19.333-.56.467-1.227.4-1.867a2.91 2.91 0 0 0-2.62-2.583C8.16 6.307 7.6 6.3 6.94 6.3H2v11.4h5.66c1.187 0 2.267-.32 3.08-1.047.88-.786 1.26-1.88 1.047-3.087-.167-.98-.747-1.747-1.567-2.18.667-.38.867-.98.8-1.4zm-4.32-3.2h2.26c.72 0 1.28.32 1.28 1.04 0 .72-.56 1.04-1.28 1.04H4.5V8.8zm3 6.4H4.5v-2.4h3c.8 0 1.4.4 1.4 1.2 0 .8-.6 1.2-1.4 1.2zm8.56-6.4c-2.387.053-4.227 1.787-4.307 4.187-.067 2.453 1.8 4.467 4.307 4.467 2.066 0 3.68-1.347 4.106-3.267H19c-.32 1.066-1.226 1.786-2.426 1.786-1.534 0-2.614-1.12-2.56-2.733H22v-.8c0-2.347-1.787-3.64-4.44-3.64zm-2.48 4c0-1.4 1-2.427 2.427-2.427s2.427 1.027 2.427 2.427h-4.854z"/></svg>`,
    mail: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    email: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 4H2C.9 4 0 4.9 0 6v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-2 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 17H7A5 5 0 0 1 7 7h2m6 10h2a5 5 0 0 0 0-10h-2M8 12h8"/></svg>`
  };

  $('links').innerHTML = PROFILE.links.map((l) => {
    const key = (l.icon || l.label || '').toLowerCase().trim();
    const iconSvg = ICONS[key] || ICONS['link'];
    return `<a href="${l.url}" target="_blank" rel="noopener" title="${l.label || key}" aria-label="${l.label || key}">${iconSvg}</a>`;
  }).join('');

  const getTagHue = (tag) => {
    let hash = 0;
    for (let i = 0; i < tag.length; i++) {
      hash = tag.charCodeAt(i) + ((hash << 5) - hash);
    }
    return Math.abs(hash % 360);
  };

  $('grid').innerHTML = TOOLS.map((t) => {
    const tag = t.tag || 'Tool';
    const hue = getTagHue(tag);
    return `
      <a class="card" href="${t.url}" target="_blank" rel="noopener">
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


  // Mouse spotlight & 3D Tilt hover effect
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);

      // 3D Tilt
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((centerY - y) / centerY) * 6; // Max 6 degrees tilt
      const rotateY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // Dynamic rounded favicon generation
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

  // Render GitHub Contribution Graph (Real Data)
  if ($('github-graph-card') && PROFILE.github) {
    const card = $('github-graph-card');

    // Set loading state
    card.innerHTML = `<div style="text-align: center; color: var(--ink-dim); padding: 24px; font-size: 14px; font-weight: 500;">Loading GitHub contributions...</div>`;

    fetch(`https://github-contributions-api.deno.dev/${PROFILE.github}.json`)
      .then(response => {
        if (!response.ok) throw new Error('Network response was not ok');
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
          return {
            date,
            count,
            level
          };
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
          return `<div class="github-cell" data-level="${d.level}" data-tooltip="${text}"></div>`;
        }).join('')}
                </div>
              </div>
            </div>
          </div>
          
          <div class="github-tooltip" id="github-tooltip"></div>
        `;

        const tooltip = $('github-tooltip');
        const cells = card.querySelectorAll('.github-cell');

        cells.forEach(cell => {
          if (!cell.dataset.tooltip) return;
          cell.addEventListener('mouseenter', (e) => {
            tooltip.textContent = cell.dataset.tooltip;
            tooltip.classList.add('show');

            const rect = cell.getBoundingClientRect();
            const cardRect = card.getBoundingClientRect();
            const left = rect.left - cardRect.left + (rect.width / 2);
            const top = rect.top - cardRect.top;

            tooltip.style.left = `${left}px`;
            tooltip.style.top = `${top}px`;
          });

          cell.addEventListener('mouseleave', () => {
            tooltip.classList.remove('show');
          });
        });
      })
      .catch(err => {
        console.error(err);
        card.innerHTML = `<div style="text-align: center; color: var(--ink-dim); padding: 24px; font-size: 14px;">Could not load GitHub contributions. <a href="https://github.com/${PROFILE.github}" target="_blank" rel="noopener" style="color: var(--white); text-decoration: underline; margin-left: 4px;">View Profile</a></div>`;
      });
  }
})();
