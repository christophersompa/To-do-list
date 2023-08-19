// selectors
const todoInput = document.querySelector('.todo-input'); // select a selector from css file
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);

// functions
function addTodo(event){
    // prevents form from submitting
    event.preventDefault();
    
    // {todoDiv} create todo div element, classList names the div class
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo")
    
    // {newTodo} create li
    const newTodo = document.createElement("li");
    // add text content to the element - return input value
    newTodo.innerHTML= todoInput.value;
    // creating class name 
    newTodo.classList.add("todo-item");
    // places newTodo inside todoDiv 
    todoDiv.appendChild(newTodo);

    //Save todos values 
    saveLocalTodos(todoInput.value);

    //checked button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"><i/>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    //delete button
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = '<i class="fas fa-trash"><i/>';
    deleteButton.classList.add("delete-btn");
    todoDiv.appendChild(deleteButton);

    //append to list in html
    todoList.appendChild(todoDiv);

    // clear to do value 
    todoInput.value = "";
}

function deleteCheck(e){
    const item = e.target;

    // delete
    if(item.classList[0] === 'delete-btn'){
        const todo = item.parentElement;
        // animation
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function(){
            todo.remove();
        });
    }

    // checked
    if(item.classList[0] === 'complete-btn'){
        const todo = item.parentElement;
        todo.classList.toggle('completed');
    }
}

// filter tasks
function filterTodo(e){
    const todos = todoList.childNodes;
    todos.forEach(function(todo){
        const mStyle = todo.style;
        if(mStyle !== undefined && mStyle !== null){
            switch(e.target.value){
                case "all":
                    mStyle.display = 'flex';
                    break;
                case "completed":
                    if(todo.classList.contains('completed')){
                        mStyle.display = 'flex';
                    } else {
                        mStyle.display = 'none';
                    }
                    break;
                case "uncompleted":
                    if(todo.classList.contains('completed')){
                        mStyle.display = 'none';
                    } else {
                        mStyle.display = 'flex';
                    }
                    break;
            }
        }
    });
}

// save todos in local storage

function saveLocalTodos(todo){
    // check if you already have things in there 
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}


// get saved todo list 

function getTodos(){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.forEach(function(todo){

        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo")
        
        const newTodo = document.createElement("li");
        newTodo.innerHTML= todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"><i/>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fas fa-trash"><i/>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        todoList.appendChild(todoDiv);
    })
}

// delete saved todo list items
function removeLocalTodos(todo){
    let todos;

    if(localStorage.getItem('todos') === null){
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem('todos', JSON.stringify(todos));
}