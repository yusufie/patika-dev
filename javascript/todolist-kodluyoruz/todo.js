// Selectors
const body = document.querySelector("body");
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");
const alertDiv = document.querySelector("#alert");

eventListeners();


function eventListeners() { // All event listeners
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
    todoList.addEventListener("click", toggleDone);
}


function toggleDone (e) {
    if (e.target.tagName === 'LI') {
        // toggle the 'done' class on the clicked list item
        e.target.classList.toggle('done');
    }
}



function clearAllTodos(e) {
    if (confirm("Hepsini silmek istediğinize emin misiniz?")) {
        // delete all todos from UI
        todoList.innerHTML = "";
        // delete all todos from storage
        localStorage.removeItem("todos");
    }
}


function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // could not find
            listItem.setAttribute("style", "display : none !important");
        }
        else {
            listItem.setAttribute("style", "display : block");
        }
    })
}

function deleteTodo(e) {

    if (e.target.className == "fa fa-remove") {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("success", "Todo başarıyla silindi...")
    }
}


function deleteTodoFromStorage(deleteTodo) {
    let todos = getTodosFromStorage();
    todos.forEach(function (todo, index) {
        if (todo === deleteTodo) {
            todos.splice(index, 1); // delete todo from array
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}


function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    })
}


function addTodo(e) {
    const newTodo = todoInput.value.trim(); // trim deletes the spaces from the beginning and the end of the string

    if (newTodo === "") {
        showAlert("danger", "Listeye boş ekleme yapamazsınız!");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi...");
    }

    e.preventDefault(); // doesn't let refresh the page
}


function getTodosFromStorage() { // gets todos from storage
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}


function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}


function showAlert(type, message) { // shows the alert message
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    alertDiv.appendChild(alert);


    setTimeout(function () {   // deletes the alert message after 3 seconds
        alert.remove();
    }, 3000)
}



function addTodoToUI(newTodo) {  // adds strings to the list

    // create list item
    const listItem = document.createElement("li");

    // create a link
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item text-danger";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";

    listItem.className = "list-group-item d-flex justify-content-between";

    // add text node
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    // add list item to the list    
    todoList.appendChild(listItem);

    todoInput.value = "" // deletes the text from the input after adding it to the list
}