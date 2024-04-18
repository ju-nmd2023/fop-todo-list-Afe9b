// refrence input box and list container
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

// function addTask makes so the user can add a new task.
function addTask() {
  const inputValue = inputBox.value.trim();
  // Check if the input box is empty, if it empty a alert message will appear
  if (inputValue === "") {
    alert("Please enter something.");
  } else {
    // If input box is not empty it create a new list item
    const li = document.createElement("li");
    // text content of list item to the value written from user
    li.textContent = inputValue;

    // Create a close button (x-mark) with unicode character \u00d7
    const closeButton = document.createElement("span");
    closeButton.textContent = "\u00d7";
    li.appendChild(closeButton);
    // Add the new created list item to the list container
    listContainer.appendChild(li);
    // Save the updated list
    saveData();
    // Clear the input box after adding task text
    inputBox.value = "";
  }
}

// cite https://www.youtube.com/watch?v=G0jO8kUrg-I&t=1308s
listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      // Toggle the "checked" class to mark the task as completed or not
      // if complete, it will mark with a "line-through" from style.css
      e.target.classList.toggle("checked");
      // Save the updated list of tasks
      saveData();
    } else if (e.target.tagName === "SPAN") {
      // If the close button is clicked, remove the task
      e.target.parentElement.remove();
      // Save the updated list of tasks
      saveData();
    }
  },
  false
);
// Function saveData will save the cureent list of task to local storage
function saveData() {
  // Empty array to store tasks
  const tasks = [];
  // Get all task element from list container, targets all <li> element with ID "list-container"
  const taskElements = document.querySelectorAll("#list-container li");
  // Iterate over each task element
  taskElements.forEach(function (taskElement) {
    // Extract the text of the task and trims any leading and trailing whitespace characters
    const taskText = taskElement.childNodes[0].nodeValue.trim();
    // Check if the task is checked
    const isChecked = taskElement.classList.contains("checked");
    // Add the task to the array of tasks
    tasks.push({ text: taskText, checked: isChecked });
  });
  // Save the array of tasks to local storage
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to display the saved tasks when the page loads
function showTasks() {
  // Retrieve the saved tasks from local storage, or initialize an empty array
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  // Clear the listContainer
  listContainer.innerHTML = "";

  // Iterate over each saved task
  tasks.forEach(function (task) {
    // Create a new list item for the task
    let li = document.createElement("li");
    // Add the task text to the list item
    let taskText = document.createTextNode(task.text);
    li.appendChild(taskText);

    // Create a close button for the task
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);

    // Check the task if it was previously checked, mark it as complete with a "line-through"
    if (task.checked) {
      li.classList.add("checked");
    }
    // Add the task to the list container
    listContainer.appendChild(li);
  });
}
// Display the saved tasks when the page loads
showTasks();

// Add event listener to show tasks when the page loads or reloads
window.addEventListener("load", showTasks);
