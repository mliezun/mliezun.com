const HLJS_BASE = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/';
const HLJS_LIGHT = HLJS_BASE + 'github.min.css';
const HLJS_DARK = HLJS_BASE + 'atom-one-dark.min.css';

function getEffectiveTheme(theme) {
    if (theme === 'dark') {
        return 'dark';
    }
    if (theme === 'light') {
        return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function updateHljsTheme(theme) {
    const link = document.getElementById('hljs-theme');
    if (!link) {
        return;
    }
    const effective = getEffectiveTheme(theme);
    link.href = effective === 'dark' ? HLJS_DARK : HLJS_LIGHT;
}

function updateThemeToggle(theme) {
    const themeToggle = document.getElementById('theme-toggle');
    const img = themeToggle.querySelector('img');
    let icon = '/assets/images/circle-half.svg';
    let label = 'Auto';
    if (theme === 'light') {
        icon = '/assets/images/circle-empty.svg';
        label = 'Light';
    } else if (theme === 'dark') {
        icon = '/assets/images/circle-filled.svg';
        label = 'Dark';
    }
    img.src = icon;
    img.alt = label + ' mode';
    themeToggle.title = 'Theme: ' + label;
    updateHljsTheme(theme);
}

const themes = ['auto', 'light', 'dark'];
let currentThemeIndex = 0;

const savedTheme = localStorage.getItem('theme') || 'auto';
currentThemeIndex = themes.indexOf(savedTheme);

updateThemeToggle(themes[currentThemeIndex]);

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (themes[currentThemeIndex] === 'auto') {
        updateHljsTheme('auto');
    }
});

const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeToggle(newTheme);
});
