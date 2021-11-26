'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }

    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todo.value}</span>
            <div class="todo-buttons">
                <button class="todo-remove"></button>
                <button class="todo-complete"></button>
            </div>
        `);

        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }

    addTodo(event) {
        event.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey()
            };

            this.todoData.set(newTodo.key, newTodo);
            this.input.placeholder = 'Какие планы?';
            this.render();
        } else {
            this.input.placeholder = 'Нельзя добавить пустую задау :(';
        }
        
        this.input.value = '';
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem(event) {
        // нужно будет найти по ключу элемент и удалить из нью мэп, псоле этого сделать рендер

    }

    comletedItem() {
        // нужно будет перебрать через forEach все элементы todoData, и найти тот элемент, которому соответствует ключ элемента, на который мы кликнули и поменять значение completed
        this.todoData.forEach((item) => {
            if ()
            item.completed = !item.completed;
        });
        this.render();
    }

    handler() {
        // обработчик событий
        // он будет определять, на какукю из кнопок был клик (корзина, выполнить дело)
        // делегирование
        // после клика вызываем один из следующих методов выше
        // навешивать события нужно на списки todoList и todoCompleted, либо на их общего родителя
        this.todoContainer.addEventListener('click', (event) => {
            const target = event.target;

            if (target.closest('.todo-remove')) {
                this.deleteItem();
            } else if (target.closest('.todo-complete')) {
                this.comletedItem.bind(this)();             
            }
        });
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
    }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();
todo.handler();