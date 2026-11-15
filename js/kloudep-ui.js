(() => {
  const root = document.documentElement;
  const key = 'kloudep-theme';
  const systemDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  let saved = null;
  try { saved = localStorage.getItem(key); } catch (_) {}
  const apply = theme => {
    root.dataset.theme = theme;
    document.querySelectorAll('.kg-theme-toggle').forEach(btn => {
      btn.textContent = theme === 'dark' ? '☀' : '☾';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Use light theme' : 'Use dark theme');
      btn.title = theme === 'dark' ? 'Light theme' : 'Dark theme';
    });
  };
  apply(saved || (systemDark ? 'dark' : 'light'));
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('header .nav, .site-header .nav').forEach(nav => {
      if (nav.querySelector('.kg-theme-toggle')) return;
      const menu = nav.querySelector('.menu');
      if (!menu) return;
      const btn = document.createElement('button');
      btn.type = 'button'; btn.className = 'kg-theme-toggle';
      menu.before(btn);
      btn.addEventListener('click', () => {
        const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(key, next); } catch (_) {}
        apply(next);
      });
    });
    apply(root.dataset.theme || 'dark');
  });
})();

// v4.2: show the visitor what requirement brought them to the contact panel.
document.addEventListener('DOMContentLoaded', () => {
  const box = document.getElementById('contact-context');
  if (!box) return;
  const labels = {
    'general': 'General business requirement',
    'ict-procurement': 'ICT procurement / specified hardware pricing',
    'software-development': 'Software development / project discovery',
    'crm-automation': 'CRM and business automation'
  };
  const topic = new URLSearchParams(window.location.search).get('topic');
  if (topic && labels[topic]) {
    box.textContent = 'You are discussing: ' + labels[topic] + '.';
    box.classList.add('is-visible');
  }
});
