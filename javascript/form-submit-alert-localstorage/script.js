document.querySelector("#userForm").addEventListener("submit", handleSubmit);
let storageArray = [];

if (JSON.parse(localStorage.getItem("storageList"))) {
  storageArray = JSON.parse(localStorage.getItem("storageList"));
  getListItems();
}

function handleSubmit(event) {
  event.preventDefault();
  saveUser();
}

function saveUser() {
  let userVal = document.querySelector("#usernameID").value;
  let notVal = document.querySelector("#noteID").value;
  if (userVal && notVal) {
    let userInfo = { userName: userVal, not: notVal };
    storageArray.push(userInfo);
    localStorage.setItem("storageList", JSON.stringify(storageArray));
    document.querySelector("#usernameID").value = "";
    document.querySelector("#noteID").value = "";
    deleteAllChildren();
    getListItems();
    const success = document.querySelector("#successAlert");
    success.setAttribute("style", "display: block");
    closeAlert();
  } else {
    const error = document.querySelector("#errorAlert");
    error.setAttribute("style", "display: block");
    closeAlert();
  }
}

function getListItems() {
  let items = JSON.parse(localStorage.getItem("storageList"));

  for (const element of items) {
    let not = element.not;
    let userName = element.userName;
    
    var liItem = document.createElement("li");
    
    liItem.innerHTML = `${userName}: <span class="badge badge-primary badge-pill">${not}</span>`;

    liItem.classList.add("list-group-item","d-flex","justify-content-between","align-items-center");

    document.querySelector("#resultsUL").appendChild(liItem);
  }
}

function deleteAllChildren() {
  let results = document.querySelector("#resultsUL");
  let resultsCount = document.querySelector("#resultsUL").childElementCount;
  for (var i = 0; i < resultsCount; i++) {
    results.lastChild.remove();
  }
}

function closeAlert() {
  let items = document.querySelectorAll(".alert");
  for (var i = 0; i < items.length; i++) {
    fadeOutEffect(items[i]);
  }
}

function fadeOutEffect(item) {
  var fadeTarget = item;
  var fadeEffect = setInterval(function () {
    if (!fadeTarget.style.opacity) {
      fadeTarget.style.opacity = 1.5;
    }
    if (fadeTarget.style.opacity > 0) {
      fadeTarget.style.opacity -= 0.05;
    } else {
      clearInterval(fadeEffect);
      item.style.display = "none";
    }
  }, 150);
}