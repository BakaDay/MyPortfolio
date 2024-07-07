import emailjs from 'emailjs';

export function initializeContactForm() {
    const form = document.getElementById('contact-form');
    emailjs.init({
        PublicKey: '1oZm-RJNnJc_9a2it'
    })

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

        // Send the email using EmailJS
        emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, {
            name: name,
            email: email,
            message: message
        }, process.env.REACT_APP_EMAILJS_USER_ID)
            .then((response) => {
                showMessage('Form submitted successfully!', 'success');
                form.reset();
            }, (error) => {
                console.error('Failed to send message:', error);
                showMessage('Failed to send message. Please try again.', 'error');
            });
    });
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

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}