var todoForm = document.getElementById("todo-form");
var todoInput = document.getElementById("todo-input");
var todoList = document.getElementById("todo-list");

function renderTodoFromLocalStorage() {
    var todoFromLocalStorage = localStorage.getItem("todoList");
    if(todoFromLocalStorage !== null && todoFromLocalStorage !== undefined) { //Check if todo arr empty in local storage
        todoFromLocalStorage = JSON.parse(localStorage.getItem("todoList"));
        for(var i=0; i<todoFromLocalStorage.length;i++) {
            renderTodoCard(todoFromLocalStorage[i].message);
        }
    }
}
renderTodoFromLocalStorage();

function addTodoInLocalStorage(message) {
    var todoFromLocalStorage = localStorage.getItem("todoList");
    if(todoFromLocalStorage === null || todoFromLocalStorage === undefined) { //Check if todo arr empty in local storage
        var todoArr = [];
        todoArr.push({id: 1, message: message});

        localStorage.setItem("todoList", JSON.stringify(todoArr));
    } else {
        todoFromLocalStorage = JSON.parse(localStorage.getItem("todoList"));
        todoFromLocalStorage.push({id: 1, message: message})
        localStorage.setItem("todoList", JSON.stringify(todoFromLocalStorage));
    }
}

function renderTodoCard(todoText) {
       var card = document.createElement("div");
    card.classList.add("todo-card");

    var todoViewWrapper = document.createElement("div");
    todoViewWrapper.className = "todo-view-wrapper";

    var message = document.createElement("p");
    message.classList.add("todo-message");
    message.innerHTML = todoText;
    todoViewWrapper.appendChild(message);

    var iconWrapper = document.createElement("div");
    var editIcon = document.createElement("i");
    editIcon.className = "fas fa-pen";
    iconWrapper.appendChild(editIcon);
    editIcon.onclick = function() {
        todoViewWrapper.style.display = "none";
        todoEditWrapper.style.display = "flex";
    }

    var deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fas")
    deleteIcon.classList.add("fa-trash");
    iconWrapper.appendChild(deleteIcon);
    deleteIcon.addEventListener("click", function(e) {
        card.remove();
    })
    todoViewWrapper.appendChild(iconWrapper);
    card.appendChild(todoViewWrapper);

    var todoEditWrapper = document.createElement("div");
    todoEditWrapper.className = "todo-edit-wrapper";

    var todoEditInputField = document.createElement("input");
    todoEditInputField.type = "text";
    todoEditInputField.value = todoText;
    todoEditWrapper.appendChild(todoEditInputField);

    var saveIcon = document.createElement("i");
    saveIcon.className = "fas fa-save";
    saveIcon.addEventListener("click", function() {
        message.innerHTML = todoEditInputField.value;
        todoViewWrapper.style.display = "flex";
        todoEditWrapper.style.display = "none";
    })

    todoEditWrapper.appendChild(saveIcon);
    card.appendChild(todoEditWrapper);

    // console.log(card);
    todoList.appendChild(card);
}

todoForm.addEventListener("submit", function(e) {
    e.preventDefault();
    if(todoInput.value !== "") {
        renderTodoCard(todoInput.value);
        addTodoInLocalStorage(todoInput.value);
        todoInput.value = "";
    } else {
        alert("Please enter a TODO")
    }
})


var menuToggle = document.getElementById("btn-menu-toggle");
var navigationDrawer = document.getElementById("drawer");
var btnCloseDrawer = document.getElementById("btn-close-drawer");
var overlay = document.getElementById("overlay");

menuToggle.onclick = function() {
    overlay.style.display = "block";
    navigationDrawer.style.transform = "translateX(0%)";
}

function hideNavDrawer() {
    overlay.style.display = "none";
    navigationDrawer.style.transform = "translateX(-100%)";
}

btnCloseDrawer.onclick = hideNavDrawer

overlay.onclick = hideNavDrawer