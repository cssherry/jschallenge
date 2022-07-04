window.onload = () => {
    let todoList = JSON.parse(localStorage.getItem('todo')) || [];
    const todoInput = document.getElementById('todo-input');
    const todoDone = document.getElementById('todo-done');
    const todoUndone = document.getElementById('todo-undone');

    function storeTodos() {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }

    function resetTodos() {
        localStorage.removeItem('todo');
        todoList = [];
        drawTodos()
    }

    function addItemToList(todo, idx) {
        const itemList = todo.done ? todoDone : todoUndone;
        const newItem = document.createElement('li');
        const inputId = `checkbox${idx}`
        const checked = todo.done ? 'checked' : ''
        newItem.innerHTML = `<input type="checkbox" id="${inputId}" data-id="${idx}" name="subscribe" value="newsletter" ${checked}>`
        const newLabel = document.createElement('label');
        newLabel.setAttribute('for', inputId);
        newItem.appendChild(newLabel);
        newLabel.textContent = todo.value;
        itemList.appendChild(newItem)
    }

    function drawTodos() {
        todoDone.innerHTML = '';
        todoUndone.innerHTML = '';
        todoList.forEach(addItemToList);
    }

    function changeList(currTodo, ul) {
        const isDone = currTodo.done;
        currTodo.done = !currTodo.done;
        storeTodos();
        const newTodoList = isDone ? todoUndone : todoDone;
        setTimeout(() => {
            newTodoList.appendChild(ul);
        }, 500);
    }

    // Handle reset
    document.getElementById('todo-reset').addEventListener('click', resetTodos);

    // Handle when new item added
    document.getElementById('todo-form').addEventListener('submit', function addTodo(e) {
        e.preventDefault();
        const newIdx = todoList;
        const newTodo = {
            value: todoInput.value,
            done: false,
        };
        todoList.push(newTodo);
        storeTodos();
        addItemToList(newTodo, newIdx);
    });

    // Handle when things get marked as done/undone
    document.addEventListener('change', (e) => {
        const changedInput = e.target;
        if (changedInput.id === 'todo-input') return; // Don't try to change list if new item

        const objIdx = changedInput.dataset.id;
        const currTodo = todoList[objIdx];
        changeList(currTodo, changedInput.parentElement);
    });

    // Purely to test the event propagation
    document.addEventListener('click', (e) => {
        console.log('Event bubbled');
        console.log('Event target: ', e.target);
        console.log('Event currentTarget: ', e.currentTarget);
    })

    document.addEventListener('click', (e) => {
        console.log('Event captured');
    }, true)

    drawTodos();
};