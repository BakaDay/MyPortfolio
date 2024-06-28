document.addEventListener("DOMContentLoaded", () => {
    // Dark mode toggle
    document.body.classList.add('dark-mode');
    const toggleButton = document.getElementById('dark-mode-toggle');
    const toggleBox = document.getElementById('dark-mode-box');

    toggleButton.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        toggleBox.checked = !toggleBox.checked;
        applyDarkModeToTodo();
    });

    // Form validation and submission to backend
    const form = document.getElementById('contact-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        if (name && email && message) {
            fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, email, message })
            })
                .then(response => response.json())
                .then(data => {
                    alert(data.message);
                    if (data.message === 'Message received successfully!') {
                        form.reset();
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('Failed to send message. Please try again.');
                });
        } else {
            alert('Please fill in all fields.');
        }
    });

    // To-Do List Functionality
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-items');
    const todoListSection = document.getElementById('todo-list');
    const todoListToggle = document.getElementById('todo-list-toggle');

    todoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const newTodoText = todoInput.value.trim();
        if (newTodoText) {
            addTodoItem(newTodoText);
            todoInput.value = '';
            saveTodos();
        }
    });

    todoListToggle.addEventListener('click', (event) => {
        event.preventDefault();
        todoListSection.classList.toggle('expanded');
        saveTodoListState();
    });

    function addTodoItem(text, isCompleted = false) {
        const li = document.createElement('li');
        li.textContent = text;
        if (isCompleted) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete');
        deleteButton.addEventListener('click', () => {
            li.remove();
            saveTodos();
        });

        li.appendChild(deleteButton);
        todoList.appendChild(li);

        li.addEventListener('click', () => {
            li.classList.toggle('completed');
            saveTodos();
        });

        applyDarkModeToTodoItem(li); // Apply dark mode to new item
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('li').forEach(li => {
            todos.push({
                text: li.firstChild.textContent,
                completed: li.classList.contains('completed')
            });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => addTodoItem(todo.text, todo.completed));
    }

    function saveTodoListState() {
        const isExpanded = todoListSection.classList.contains('expanded');
        localStorage.setItem('todoListState', JSON.stringify({ expanded: isExpanded }));
    }

    function loadTodoListState() {
        const savedState = JSON.parse(localStorage.getItem('todoListState')) || { expanded: false };
        if (savedState.expanded) {
            todoListSection.classList.add('expanded');
        } else {
            todoListSection.classList.remove('expanded');
        }
    }

    // Load todos and the state on page load
    loadTodos();
    loadTodoListState();

    function applyDarkModeToTodo() {
        const todoContainer = document.querySelector('.todo-container');
        const todoItems = document.querySelectorAll('.todo-container li');
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            todoContainer.classList.add('dark-mode');
            todoItems.forEach(item => item.classList.add('dark-mode'));
        } else {
            todoContainer.classList.remove('dark-mode');
            todoItems.forEach(item => item.classList.remove('dark-mode'));
        }
    }

    function applyDarkModeToTodoItem(item) {
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            item.classList.add('dark-mode');
        } else {
            item.classList.remove('dark-mode');
        }
    }

    // Apply dark mode to To-Do List on load if dark mode is enabled
    applyDarkModeToTodo();
});
