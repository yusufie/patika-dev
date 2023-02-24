
// Tüm elementleri seçme
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const filter = document.querySelector("#filter");
const clearButton = document.querySelector("#clear-todos");


eventListeners();


function eventListeners() { // Tüm event listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    secondCardBody.addEventListener("click", deleteTodo);
    filter.addEventListener("keyup", filterTodos);
    clearButton.addEventListener("click", clearAllTodos);
}


function clearAllTodos(e) {
    if (confirm("Tümünü silmek istediğinize emin misiniz?")) {
        // arayüzden todoları temizleme
        todoList.innerHTML = "";
        // storagedan todoları temizleme
        localStorage.removeItem("todos");
    }
}


function filterTodos(e) {
    const filterValue = e.target.value.toLowerCase();
    const listItems = document.querySelectorAll(".list-group-item");

    listItems.forEach(function (listItem) {
        const text = listItem.textContent.toLocaleLowerCase();
        if (text.indexOf(filterValue) === -1) {
            // bulamadı
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
            todos.splice(index, 1); // Arrayden değeri silebiliriz.
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
    const newTodo = todoInput.value.trim(); // buradaki trim fonksiyonu stringin basşındaki veya sonundaki boşlukları siler


    if (newTodo === "") {
        showAlert("danger", "Listeye boş ekleme yapamazsınız!");
    }
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo başarıyla eklendi...");
    }





    e.preventDefault(); // formumuzun tekrardan sayfaya yönelmemesi için 
}


function getTodosFromStorage() { // Storagedan Todoları Alan fonksiyon
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



function showAlert(type, message) { // uyarıları ayarladıgımız fonksiyon
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;

    firstCardBody.appendChild(alert);


    setTimeout(function () {   // alerti silmek için (setTimeout ayarlı)
        alert.remove();
    }, 2000)
}



function addTodoToUI(newTodo) {  // aldığı string değerini liste elemanı olarak ekleyecek fonksiyon

    // List İtem Oluşturma
    const listItem = document.createElement("li");

    // Link oluşturma
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";



    listItem.className = "list-group-item d-flex justify-content-between";

    //Text Node Ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);


    //Todo List'e list itemı ekleme (yani ul ye ekleme)
    todoList.appendChild(listItem);


    todoInput.value = "" // inputun içini boşaltmak için
}