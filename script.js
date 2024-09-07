function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || {todoList: []};
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function appendTodoInHtml(todoText) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    const textDiv = document.createElement("div");

    textDiv.textContent = todoText;
    todoItem.classList.add("todoItem");

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");

    const editBtn = document.createElement('button');
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    const completeBtn = document.createElement('button');
    completeBtn.textContent = "Complete";
    completeBtn.classList.add("completeBtn");

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completeBtn);

    todoItem.append(textDiv);
    todoItem.append(wrapper);
    
    todoList.appendChild(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {

    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");
    const todoList = document.getElementById("todoList");

    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if(todoText == '') {
            alert("Please write something for todo");
        }

        else {
            addTodoToLocalStorage(todoText);
            appendTodoInHtml(todoText);
            todoInput.value = '';
        }
    });

    todoInput.addEventListener("change", (event) => {
        const todoText = event.target.value;
        event.target.value = todoText.trim();
    });

    const todos = loadTodos();

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
});