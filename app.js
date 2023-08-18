// selectors
const todoInput = document.querySelector('.todo-input'); // select a selector from css file
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');

// event listeners
todoButton.addEventListener('click', addTodo)

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