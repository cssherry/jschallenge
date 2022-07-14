import './style.scss';
import { TodoItem } from './types';

window.onload = () => {
    let todoList: TodoItem[] = JSON.parse(localStorage.getItem('todo') || '[]') || [];
    const todoInput = document.getElementById('todo-input') as HTMLInputElement;
    const todoDone = document.getElementById('todo-done') as HTMLUListElement;
    const todoUndone = document.getElementById('todo-undone') as HTMLUListElement;

    function storeTodos() {
        localStorage.setItem('todo', JSON.stringify(todoList));
    }

    function resetTodos() {
        localStorage.removeItem('todo');
        todoList = [];
        drawTodos()
    }

    function addItemToList(todo: TodoItem, idx: number) {
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
        if (todoDone) {
            todoDone.innerHTML = '';
        }

        if (todoUndone) {
            todoUndone.innerHTML = '';
        }

        todoList.forEach(addItemToList);
    }

    function changeList(currTodo: TodoItem, ul: HTMLElement) {
        const isDone = currTodo.done;
        currTodo.done = !currTodo.done;
        storeTodos();
        const newTodoList = isDone ? todoUndone : todoDone;
        setTimeout(() => {
            newTodoList.appendChild(ul);
        }, 500);
    }

    // Handle reset
    document.getElementById('todo-reset')?.addEventListener('click', resetTodos);

    // Handle when new item added
    document.getElementById('todo-form')?.addEventListener('submit', function addTodo(e) {
        e.preventDefault();
        const newIdx = todoList.length;
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
        const changedInput = e.target as HTMLElement;
        if (!changedInput || changedInput.id === 'todo-input') return; // Don't try to change list if new item

        const objIdx = changedInput.dataset.id;
        /* @ts-expect-error Element implicitly has an 'any' type because index expression is not of type 'number' */
        const currTodo = todoList[objIdx];

        if (changedInput.parentElement) {
            changeList(currTodo, changedInput.parentElement);
        }
    });

    // Purely to test the event propagation
    document.addEventListener('click', (e) => {
        console.log('Event bubbled');
        console.log('Event target: ', e.target);
        console.log('Event currentTarget: ', e.currentTarget);
    })

    document.addEventListener('click', () => {
        console.log('Event captured');
    }, true)

    drawTodos();
};