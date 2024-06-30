import { initializeDarkMode } from './darkMode.js';
import { initializeContactForm } from './contactForm.js';
import { initializeTodoList } from './todo.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    initializeDarkMode();
    initializeContactForm();
    initializeTodoList();
});