function getInitialTheme() {
  const persistedTheme = localStorage.getItem('theme');
  const hasPersistedPreference = typeof persistedTheme === 'string';
  if (hasPersistedPreference) return persistedTheme;
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const hasMediaQueryPreference = typeof mql.matches === 'boolean';
  if (hasMediaQueryPreference) {
    return mql.matches ? 'dark' : 'light';
  }
  return 'light';
}

function setTheme() {
  document.documentElement.classList.toggle('dark', getInitialTheme() === 'dark');
}

setTheme();
document.addEventListener('astro:after-swap', setTheme);
