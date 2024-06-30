import { applyDarkModeToTodo } from './todo.js';

export function initializeDarkMode() {
    const toggleBox = document.getElementById('dark-mode-box');

    // Apply dark mode by default
    document.body.classList.add('dark-mode');
    applyDarkModeToTodo();

    toggleBox.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        applyDarkModeToTodo();
    });
}
