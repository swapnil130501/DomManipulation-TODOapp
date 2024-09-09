function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || {todoList: []};
    console.log(todos);
    return todos;
}

function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push({...todo});
    localStorage.setItem("todos", JSON.stringify(todos));
}

function refreshTodos(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function executeFilterAction(event) {
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    todoList.innerHTML = '';
    const todos = loadTodos();

    if(value == "all") {
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        });
    }

    else if(value == "pending") {
        todos.todoList.forEach(todo => {
            if(todo.isCompleted != true) {
                appendTodoInHtml(todo);
            }     
        });
    }

    else {
        todos.todoList.forEach(todo => {
            if(todo.isCompleted === true) {
                appendTodoInHtml(todo);
            } 
        });
    }
    
}

function toggleTodo(event) {
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if(todo.id == todoId) {
            todo.isCompleted = !todo.isCompleted;
        }
    });

    refreshTodos(todos);
    const todoList = document.getElementById("todoList");

    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
}

function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id", todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompleted) {
        textDiv.classList.add("completed");
    }

    textDiv.textContent = todo.text;
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

    completeBtn.addEventListener("click", toggleTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completeBtn);

    todoItem.append(textDiv);
    todoItem.append(wrapper);
    
    todoList.appendChild(todoItem);
}

document.addEventListener("DOMContentLoaded", () => {
    let todos = loadTodos();

    const todoInput = document.getElementById("todoInput");

    const submitButton = document.getElementById("addTodo");

    const todoList = document.getElementById("todoList");

    const filterBtns = document.getElementsByClassName("filterBtn");

    for(btn of filterBtns) {
        btn.addEventListener("click", executeFilterAction);
    }

    

    submitButton.addEventListener("click", (event) => {
        const todoText = todoInput.value;
        if(todoText == '') {
            alert("Please write something for todo");
        }

        else {
            todos = loadTodos();
            addTodoToLocalStorage({text: todoText, isCompleted: false, id: todos.todoList.length});
            appendTodoInHtml({text: todoText, isCompleted: false, id: todos.todoList.length});
            todoInput.value = '';
        }
    });

    todoInput.addEventListener("change", (event) => {
        const todoText = event.target.value;
        event.target.value = todoText.trim();
    });

    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });
});