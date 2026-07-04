(() => {
  const $ = (id) => document.getElementById(id);

  if (PROFILE.avatar) {
    $('avatar').style.backgroundImage = `url(${PROFILE.avatar})`;
  } else {
    $('avatar').textContent = PROFILE.name.charAt(0).toUpperCase();
  }
  $('name').textContent = PROFILE.name;
  $('role').textContent = PROFILE.role;
  $('bio').textContent = PROFILE.bio;

  $('links').innerHTML = PROFILE.links.map(
    (l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`
  ).join('');

  $('grid').innerHTML = TOOLS.map((t) => `
    <a class="card" href="${t.url}" target="_blank" rel="noopener">
      <div class="card-top">
        <span class="tag">${t.tag || 'Tool'}</span>
        <svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
      <h2 class="card-name">${t.name}</h2>
      <p class="card-desc">${t.description}</p>
    </a>
  `).join('');

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

  // Instant Search filter logic
  const searchInput = $('search');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      document.querySelectorAll('.card').forEach((card) => {
        const name = card.querySelector('.card-name').textContent.toLowerCase();
        const desc = card.querySelector('.card-desc').textContent.toLowerCase();
        const tag = card.querySelector('.tag').textContent.toLowerCase();

        if (name.includes(query) || desc.includes(query) || tag.includes(query)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });

    // Keyboard shortcut '/' to focus search input
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }
})();
