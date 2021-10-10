'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = JSON.parse(localStorage.getItem('todo')) ?? [];

const render = function() {
    todoList.textContent = '';
    todoCompleted.textContent = '';

    todoData.forEach(function(item, i){
        const li = document.createElement('li');
        li.classList.add('todo-item');

        li.innerHTML = `<span class="text-todo"> ${item.value} </span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>`;

        if (item.completed) {
            todoCompleted.prepend(li);
        } else {
            todoList.prepend(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            updateLsAndRenderItems();
        });

        btnTodoRemove.addEventListener('click', function() {
            const itemId = item.id;
            const findItem = todoData.findIndex(item => item.id === itemId); 
            todoData.splice(findItem, 1);
            updateLsAndRenderItems();
        });
    });

};
todoControl.addEventListener('submit', function(event) {
    event.preventDefault();
    const trimmedTaskText = headerInput.value.trim();

    if (!trimmedTaskText) {
        headerInput.value = '';
        return;
    }

    const newTodo = {
        value: headerInput.value,
        completed: false,
        id: createId(),
    };

    todoData.push(newTodo);
    updateLsAndRenderItems();
    headerInput.value = '';
});

function createId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function updateLsAndRenderItems() {
    localStorage.setItem('todo', JSON.stringify(todoData));
    render();
}

render();