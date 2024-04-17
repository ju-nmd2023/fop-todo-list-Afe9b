const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    let taskText = document.createTextNode(inputBox.value);
    li.appendChild(taskText);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    listContainer.appendChild(li);
    saveData();
  }
  inputBox.value = "";
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  const tasks = [];
  const taskElements = document.querySelectorAll("#list-container li");
  taskElements.forEach(function (taskElement) {
    const taskText = taskElement.childNodes[0].nodeValue.trim();
    const isChecked = taskElement.classList.contains("checked"); // Check if the task is checked
    tasks.push({ text: taskText, checked: isChecked });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function showTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Clear the listContainer
  listContainer.innerHTML = "";

  tasks.forEach(function (task) {
    let li = document.createElement("li");
    let taskText = document.createTextNode(task.text);
    li.appendChild(taskText);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    // Check the task if it was previously checked
    if (task.checked) {
      li.classList.add("checked");
    }

    listContainer.appendChild(li);
  });
}

showTasks();

window.addEventListener("load", showTasks);
