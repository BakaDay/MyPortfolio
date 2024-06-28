document.addEventListener("DOMContentLoaded", () => {
    //dark mode toggle
    document.body.classList.add('dark-mode'); // Correctly add the dark-mode class to the body
    const toggleButton = document.getElementById('dark-mode-toggle');
    const toggleBox = document.getElementById('dark-mode-box');
    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBox.checked = !toggleBox.checked; 
    });

    //form validation
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            alert('Form submitted successfully!');
            form.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });


});



