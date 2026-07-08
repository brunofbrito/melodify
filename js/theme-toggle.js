// theme-toggle.js
// Toggles between light and dark mode, remembering the user's choice.

function applySavedTheme() {
    if (localStorage.getItem('melodify-theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function toggleTheme() {
    const isDark = document.body.classList.toggle('dark-mode');
    localStorage.setItem('melodify-theme', isDark ? 'dark' : 'light');
}

document.addEventListener('DOMContentLoaded', applySavedTheme);
