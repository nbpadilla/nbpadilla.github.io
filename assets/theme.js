(() => {
    const storageKey = 'site-theme';
    const validThemes = ['light', 'dark'];
    const root = document.documentElement;
    const toggle = document.querySelector('[data-theme-toggle]');
    let savedTheme = 'light';

    try {
        const preference = window.localStorage.getItem(storageKey);
        if (validThemes.includes(preference)) {
            savedTheme = preference;
        }
    } catch (error) {
        console.warn('Unable to read the saved theme preference.', error);
    }

    function applyTheme(theme, persist) {
        const isDark = theme === 'dark';
        root.dataset.theme = isDark ? 'dark' : 'light';
        toggle.setAttribute('aria-pressed', String(isDark));
        toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} theme`);
        toggle.querySelector('[data-theme-icon]').textContent = isDark ? '☀️' : '🌙';

        if (persist) {
            try {
                window.localStorage.setItem(storageKey, root.dataset.theme);
            } catch (error) {
                console.warn('Unable to save the theme preference.', error);
            }
        }
    }

    applyTheme(savedTheme, false);
    toggle.addEventListener('click', () => {
        applyTheme(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
})();
