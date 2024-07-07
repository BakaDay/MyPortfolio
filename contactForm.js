export function initializeContactForm() {
    const form = document.getElementById('contact-form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !message) {
            showMessage('Please fill in all fields.', 'error');
            return;
        }

        if (!validateEmail(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Call your backend service or API here
        showMessage('Form submitted successfully!', 'success');
        form.reset();
    });
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

function showMessage(message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.className = `message ${type}`;
    messageContainer.textContent = message;
    document.body.appendChild(messageContainer);
    setTimeout(() => {
        document.body.removeChild(messageContainer);
    }, 3000);
}