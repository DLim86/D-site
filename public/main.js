const GITHUB_USER = 'DLim86';

const LANG_COLORS = {
  JavaScript:  '#F1E05A',
  TypeScript:  '#3178C6',
  Python:      '#3572A5',
  Java:        '#B07219',
  'C++':       '#F34B7D',
  C:           '#555555',
  'C#':        '#178600',
  Go:          '#00ADD8',
  Rust:        '#DEA584',
  Ruby:        '#701516',
  PHP:         '#4F5D95',
  Swift:       '#F05138',
  Kotlin:      '#A97BFF',
  HTML:        '#E34C26',
  CSS:         '#563D7C',
  SCSS:        '#C6538C',
  Shell:       '#89E051',
};

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

async function loadRepos() {
  const grid = document.getElementById('repos-grid');
  const loading = document.getElementById('repos-loading');

  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=12`
    );
    if (!res.ok) throw new Error(`GitHub API returned ${res.status}`);
    const repos = await res.json();

    if (loading) loading.remove();

    if (!repos.length) {
      grid.innerHTML = '<p class="repos-status">No public repositories yet.</p>';
      return;
    }

    for (const repo of repos) {
      const card = document.createElement('a');
      card.className = 'repo-card';
      card.href = repo.html_url;
      card.target = '_blank';
      card.rel = 'noopener noreferrer';
      card.setAttribute('aria-label', `${repo.name} on GitHub`);

      const desc = repo.description
        ? `<p class="repo-desc">${escapeHtml(repo.description)}</p>`
        : `<p class="repo-desc repo-desc--empty" aria-hidden="true">No description</p>`;

      const dotColor = LANG_COLORS[repo.language] ?? '#8899A6';
      const lang = repo.language
        ? `<span class="repo-lang">
             <span class="lang-dot" style="background:${dotColor}" aria-hidden="true"></span>
             ${escapeHtml(repo.language)}
           </span>`
        : '';

      const stars = repo.stargazers_count > 0
        ? `<span class="repo-stars" aria-label="${repo.stargazers_count} stars">
             ★ ${repo.stargazers_count}
           </span>`
        : '';

      card.innerHTML = `
        <span class="repo-name">${escapeHtml(repo.name)}</span>
        ${desc}
        <div class="repo-meta">${lang}${stars}</div>
      `;
      grid.appendChild(card);
    }
  } catch {
    if (loading) loading.remove();
    grid.innerHTML = `
      <p class="repos-error">
        Could not load repositories.
        <a href="https://github.com/${GITHUB_USER}" target="_blank" rel="noopener noreferrer">
          View on GitHub →
        </a>
      </p>
    `;
  }
}

function initNav() {
  const links = [...document.querySelectorAll('.sidebar nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if (!links.length || !sections.length) return;

  const visible = new Set();

  const refresh = () => {
    const first = sections.find(s => visible.has(s.id));
    if (!first) return;
    links.forEach(a =>
      a.classList.toggle('active', a.getAttribute('href') === `#${first.id}`)
    );
  };

  const observer = new IntersectionObserver(entries => {
    for (const e of entries) {
      if (e.isIntersecting) visible.add(e.target.id);
      else visible.delete(e.target.id);
    }
    refresh();
  }, { rootMargin: '-10% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}

function initMobileNav() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.getElementById('mobile-nav');
  if (!btn || !nav) return;

  const setOpen = open => {
    btn.setAttribute('aria-expanded', String(open));
    nav.hidden = !open;
  };

  btn.addEventListener('click', () =>
    setOpen(btn.getAttribute('aria-expanded') !== 'true')
  );

  nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => setOpen(false))
  );

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      btn.focus();
    }
  });
}

loadRepos();
initNav();
initMobileNav();
