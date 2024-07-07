export function initializeTodoList() {
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
        li.classList.add('todo__item');
        if (isCompleted) {
            li.classList.add('completed');
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('todo__delete');
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

        applyDarkModeToTodoItem(li);
    }

    function saveTodos() {
        const todos = [];
        todoList.querySelectorAll('.todo__item').forEach(li => {
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

    loadTodos();
    loadTodoListState();

    applyDarkModeToTodo();
}

export function applyDarkModeToTodo() {
    const todoContainer = document.querySelector('.todo__container');
    const todoItems = document.querySelectorAll('.todo__item');
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
