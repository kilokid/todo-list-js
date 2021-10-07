'use strict';

const todoControl = document.querySelector('.todo-control'),
    headerInput = document.querySelector('.header-input'),
    todoList = document.querySelector('.todo-list'),
    todoCompleted = document.querySelector('.todo-completed');

const todoData = localStorage.length > 0 ? JSON.parse(localStorage.getItem('todo')) : [];

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
            todoCompleted.append(li);
        } else {
            todoList.append(li);
        }

        const btnTodoComplete = li.querySelector('.todo-complete');
        const btnTodoRemove = li.querySelector('.todo-remove');

        btnTodoComplete.addEventListener('click', function() {
            item.completed = !item.completed;
            render();
        });

        btnTodoRemove.addEventListener('click', function() {
            todoData.splice(i, 1);
            localStorage.removeItem('todo');
            render();
        });
        localStorage.setItem('todo', JSON.stringify(todoData));
    });
};


function addTodoItem() {
    todoControl.addEventListener('submit', function(event) {
        event.preventDefault();
    
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
    
        if (newTodo.value.trim()) {
            todoData.push(newTodo);
            headerInput.value = '';
        } else {
            headerInput.value = '';
        }
        
        render();
    });
}

addTodoItem();
render();