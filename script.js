(() => {
  const $ = (id) => document.getElementById(id);

  $('avatar').textContent = PROFILE.name.charAt(0).toUpperCase();
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
        <span class="arrow">↗</span>
      </div>
      <h2 class="card-name">${t.name}</h2>
      <p class="card-desc">${t.description}</p>
    </a>
  `).join('');
})();
